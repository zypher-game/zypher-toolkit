import './SelectTokenDialog.stylus'

import { DialogContent, DialogOverlay } from '@reach/dialog'
import {
  ChainId,
  ChainImage,
  Currency,
  defaultActiveChainId,
  DialogClose,
  TVLStakingSupportedChainId,
  useActiveWeb3React,
  useIsW768,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState
} from '@ui/src'
import { ActivePixelButton, ActivePixelCard, PixelBorderCardButton } from '@ui/src'
import { isEqual } from 'lodash'
import React, { memo, useCallback, useEffect, useState } from 'react'

import TokenWithChain from '../../components/Token/TokenWithChain/TokenWithChain'
import { canNext } from '../../hooks/activeHooks'
import { chooseChainState, depositCurrencyState, ITVLStakingData, selectTokenDialogState, tvlStakingDataState } from '../../state/activeState'

const SelectTokenDialog = memo(() => {
  const isW768 = useIsW768()
  const isModalOpen = useRecoilValue(selectTokenDialogState)
  const setIsModalOpen = useSetRecoilState(selectTokenDialogState)
  const tvlStakingData = useRecoilValue(tvlStakingDataState)
  const { account, chainId } = useActiveWeb3React()
  const [chainIdLocal, setChainIdLocal] = useRecoilState(chooseChainState)
  const [tokenList, setTokenList] = useState<ITVLStakingData[]>([])
  const [depositCurrency, setDepositCurrency] = useRecoilState(depositCurrencyState)
  console.log({ depositCurrency })
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
    setTokenList(arr.sort((a, b) => a.index - b.index))
  }, [JSON.stringify(tvlStakingData), chainIdLocal])
  console.log({ tvlStakingData, tokenList, defaultActiveChainId, chainIdLocal })
  const handleCancel = useCallback(() => {
    setIsModalOpen(false)
  }, [])
  const changeChainHandle = useCallback((v: ChainId) => {
    setChainIdLocal(v)
  }, [])
  const changeTokenHandle = useCallback((v: ITVLStakingData) => {
    console.log({ v }, 3223)
    setDepositCurrency(v.symbol)
    setIsModalOpen(false)
  }, [])

  return (
    <DialogOverlay className="select_dialogWrap" isOpen={isModalOpen} onDismiss={handleCancel}>
      <DialogContent className="select_dialogContent">
        <ActivePixelCard
          className="select_dialogContentInnerTop select_dialogContentInnerTopToken"
          width="380px"
          height="142px"
          pixel_height={isW768 ? 5 : 10}
          backgroundColor="#293457"
          hidePixel={isW768 ? true : false}
        >
          <h3>Select Token</h3>
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
                <img src={ChainImage[v]} alt={Currency[v]} className="select_chain_li_img" />
              </ActivePixelButton>
            ))}
          </div>
        </ActivePixelCard>
        <ActivePixelCard className="select_dialogContentInnerBottom" width="380px" pixel_height={isW768 ? 5 : 10} backgroundColor="#1D263B">
          <div className="select_token_ul">
            {/* {tokenList.map((v, index) => (
              <p key={index}>{v.address}</p>
            ))} */}
            {tokenList.map((v, index) => (
              <PixelBorderCardButton
                key={index}
                className={`select_staking_switch ${depositCurrency === v.symbol && v.chainId === chainIdLocal ? 'staking_switch_li_dialog' : ''}`}
                height="68px"
                width="100%"
                pixel_height={6}
                onClick={() => changeTokenHandle(v)}
                backgroundColor={`${depositCurrency === v.symbol && v.chainId === chainIdLocal ? '#343C4F' : '#1D263B'}`}
                borderColor={`${depositCurrency === v.symbol && v.chainId === chainIdLocal ? '#1649FF' : '#3A4254'}`}
                showHover={true}
              >
                <TokenWithChain chainId={chainIdLocal} token={v} width={44} />
                <div className="select_currency">
                  <h3>{v.symbol}</h3>
                  <p>{v.name}</p>
                </div>
                <p>{v.balanceStr}</p>
              </PixelBorderCardButton>
            ))}
          </div>
        </ActivePixelCard>
        <DialogClose onClick={handleCancel} />
      </DialogContent>
    </DialogOverlay>
  )
}, isEqual)

export default SelectTokenDialog
