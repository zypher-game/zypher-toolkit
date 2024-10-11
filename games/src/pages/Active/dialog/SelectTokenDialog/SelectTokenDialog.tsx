import './SelectTokenDialog.stylus'

import {
  ChainId,
  ChainImage,
  Currency,
  defaultActiveChainId,
  DialogClose,
  hideTVLStakingSupportedChainId,
  ModalWithMotion,
  TVLStakingSupportedChainId,
  useActiveWeb3React,
  useIsW768,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState
} from '@ui/src'
import { ActivePixelButton, ActivePixelCard, PixelBorderCardButton } from '@ui/src'
import { isEqual } from 'lodash'
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { zeroAddress } from 'viem'

import TokenWithChain from '../../components/Token/TokenWithChain/TokenWithChain'
import { canNext } from '../../hooks/activeHooks'
import {
  chooseChainState,
  depositCurrencyState,
  extendCurrencyState,
  ITVLStakingData,
  redepositCurrencyState,
  selectTokenDialogState,
  tvlExtendDialogState,
  tvlRedepositDialogState,
  tvlStakingDataState,
  tvlWithdrawDialogState,
  withdrawCurrencyState
} from '../../state/activeState'

const SelectTokenDialog = memo(() => {
  const isW768 = useIsW768()
  const isModalOpen = useRecoilValue(selectTokenDialogState)
  const setIsModalOpen = useSetRecoilState(selectTokenDialogState)
  const tvlStakingData = useRecoilValue(tvlStakingDataState)
  const { account, chainId } = useActiveWeb3React()
  const [chainIdLocal, setChainIdLocal] = useRecoilState(chooseChainState)
  const [tokenList, setTokenList] = useState<ITVLStakingData[]>([])
  const isWithdrawDialog = useRecoilValue(tvlWithdrawDialogState)
  const isExtendDialog = useRecoilValue(tvlExtendDialogState)
  const isRedepositDialog = useRecoilValue(tvlRedepositDialogState)
  const [depositCurrency, setDepositCurrency] = useRecoilState(depositCurrencyState)
  const [withdrawCurrency, setWithdrawCurrency] = useRecoilState(withdrawCurrencyState)
  const [redepositCurrency, setRedepositCurrency] = useRecoilState(redepositCurrencyState)
  const [extendCurrency, setExtendCurrency] = useRecoilState(extendCurrencyState)
  useEffect(() => {
    const can = canNext(account, chainId)
    if (can) {
      setChainIdLocal(chainId)
    } else {
      setChainIdLocal(defaultActiveChainId)
    }
  }, [chainId])
  useEffect(() => {
    const can = canNext(account, chainIdLocal)
    let arr = Object.values(tvlStakingData[defaultActiveChainId]) as ITVLStakingData[]
    if (can) {
      arr = Object.values(tvlStakingData[chainIdLocal!]) as ITVLStakingData[]
    }
    if (isWithdrawDialog || isExtendDialog) {
      arr = arr.filter(v => v.address !== zeroAddress)
    }
    setTokenList(arr.sort((a, b) => a.index - b.index))
  }, [JSON.stringify(tvlStakingData), isWithdrawDialog, isExtendDialog, chainIdLocal])
  const handleCancel = useCallback(() => {
    setIsModalOpen(false)
  }, [])
  const changeChainHandle = useCallback((v: ChainId) => {
    setChainIdLocal(v)
  }, [])
  const changeTokenHandle = useCallback(
    (v: ITVLStakingData) => {
      if (isWithdrawDialog) {
        setWithdrawCurrency(v.symbol)
      } else if (isRedepositDialog) {
        setRedepositCurrency(v.symbol)
      } else if (isExtendDialog) {
        setExtendCurrency(v.symbol)
      } else {
        setDepositCurrency(v.symbol)
      }
      setIsModalOpen(false)
    },
    [isRedepositDialog, isWithdrawDialog, isExtendDialog]
  )

  return (
    <ModalWithMotion overlayClassName="select_dialogWrap" isOpen={isModalOpen} onDismiss={handleCancel} contentClassName="select_dialogContent">
      <ActivePixelCard
        className="select_dialogContentInnerTop select_dialogContentInnerTopToken"
        width="380px"
        height={hideTVLStakingSupportedChainId ? '75px' : '142px'}
        pixel_height={isW768 ? 5 : 10}
        backgroundColor="#293457"
        hidePixel={isW768 ? true : false}
      >
        <h3>Select Token</h3>
        {hideTVLStakingSupportedChainId ? (
          <></>
        ) : (
          <div className="select_chain_ul">
            {TVLStakingSupportedChainId.map(v => (
              <ActivePixelButton
                key={v}
                width="58px"
                height="58px"
                backgroundColor={`${chainIdLocal === v ? '#1649FF' : '#1D263B'}`}
                pixel_height={4}
                onClick={() => changeChainHandle(v)}
                className={chainIdLocal === v ? 'select_chain_li_on' : ''}
              >
                <img decoding="async" loading="lazy" src={ChainImage[v]} alt={Currency[v]} className="select_chain_li_img" />
              </ActivePixelButton>
            ))}
          </div>
        )}
      </ActivePixelCard>
      <ActivePixelCard className="select_dialogContentInnerBottom" width="380px" pixel_height={isW768 ? 5 : 10} backgroundColor="#1D263B">
        <div className="select_token_ul">
          {/* {tokenList.map((v, index) => (
              <p key={index}>{v.address}</p>
            ))} */}
          {tokenList.map((v, index) => (
            <Item
              v={v}
              key={v.address}
              isWithdrawDialog={isWithdrawDialog}
              isExtendDialog={isExtendDialog}
              isRedepositDialog={isRedepositDialog}
              withdrawCurrency={withdrawCurrency}
              redepositCurrency={redepositCurrency}
              depositCurrency={depositCurrency}
              chainIdLocal={chainIdLocal}
              changeTokenHandle={changeTokenHandle}
              extendCurrency={extendCurrency}
            />
          ))}
        </div>
      </ActivePixelCard>
      <DialogClose onClick={handleCancel} />
    </ModalWithMotion>
  )
}, isEqual)
const Item = memo(
  ({
    isWithdrawDialog,
    isExtendDialog,
    withdrawCurrency,
    isRedepositDialog,
    redepositCurrency,
    depositCurrency,
    extendCurrency,
    chainIdLocal,
    changeTokenHandle,
    v
  }: {
    chainIdLocal?: ChainId
    changeTokenHandle: any
    v: ITVLStakingData
    isExtendDialog: boolean
    isWithdrawDialog: boolean
    withdrawCurrency?: string
    isRedepositDialog: boolean
    redepositCurrency?: string
    extendCurrency?: string
    depositCurrency?: string
  }) => {
    const [isOn, balance] = useMemo(() => {
      const key = isWithdrawDialog ? withdrawCurrency : isRedepositDialog ? redepositCurrency : isExtendDialog ? extendCurrency : depositCurrency
      const _balance = isWithdrawDialog ? v.withdrawAmountStr : isExtendDialog ? v.withdrawAmountStr : v.balanceStr
      return [key === v.symbol && v.chainId === chainIdLocal, _balance]
    }, [depositCurrency, withdrawCurrency, redepositCurrency, isWithdrawDialog, isRedepositDialog, isExtendDialog])
    return (
      <PixelBorderCardButton
        className={`select_staking_switch ${isOn ? 'staking_switch_li_dialog' : ''}`}
        height="68px"
        width="100%"
        pixel_height={6}
        onClick={() => changeTokenHandle(v)}
        backgroundColor={`${isOn ? '#343C4F' : '#1D263B'}`}
        borderColor={`${isOn ? '#1649FF' : '#3A4254'}`}
        showHover={true}
        borderSize={2}
      >
        <TokenWithChain chainId={chainIdLocal} token={v} width={44} />
        <div className="select_currency">
          <h3>{v.symbol}</h3>
          <p>{v.name}</p>
        </div>
        <p>{balance}</p>
      </PixelBorderCardButton>
    )
  },
  isEqual
)
export default SelectTokenDialog
