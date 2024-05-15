import './SelectTokenDialog.stylus'

import { DialogContent, DialogOverlay } from '@reach/dialog'
import {
  ChainId,
  ChainImage,
  Currency,
  DialogClose,
  preStaticUrl,
  SvgComponent,
  useActiveWeb3React,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState
} from '@ui/src'
import { ActivePixelButton, ActivePixelCard, PixelBorderCardButton } from '@ui/src'
import { isEqual } from 'lodash'
import React, { memo, useCallback, useEffect, useMemo } from 'react'

import TokenWithChain from '../../components/Token/TokenWithChain/TokenWithChain'
import { defaultActiveChainId, TVLStakingSupportedChainId } from '../../constants/activeConstants'
import { canNext } from '../../hooks/activeHooks'
import { chooseChainState, depositCurrencyState, ITVLStakingData, selectTokenDialogState, tvlStakingDataState } from '../../state/activeState'

const SelectTokenDialog = memo(() => {
  const isModalOpen = useRecoilValue(selectTokenDialogState)
  const setIsModalOpen = useSetRecoilState(selectTokenDialogState)
  const tvlStakingData = useRecoilValue(tvlStakingDataState)
  const { account, chainId } = useActiveWeb3React()
  const [chainIdLocal, setChainIdLocal] = useRecoilState(chooseChainState)

  const [depositCurrency, setDepositCurrency] = useRecoilState(depositCurrencyState)
  console.log({ tvlStakingData })
  useEffect(() => {
    const can = canNext(account, chainId)
    if (can) {
      setChainIdLocal(chainId)
    } else {
      setChainIdLocal(defaultActiveChainId)
    }
  }, [chainId])
  const tokenList = useMemo(() => {
    const can = canNext(account, chainIdLocal)
    let arr = Object.values(tvlStakingData[defaultActiveChainId]) as ITVLStakingData[]
    if (can && chainIdLocal) {
      arr = Object.values(tvlStakingData[chainIdLocal]) as ITVLStakingData[]
    }
    return arr.sort((a, b) => a.index - b.index)
  }, [JSON.stringify(tvlStakingData), chainIdLocal])
  const handleCancel = useCallback(() => {
    setIsModalOpen(false)
  }, [])
  const changeChainHandle = useCallback((v: ChainId) => {
    setChainIdLocal(v)
  }, [])
  const changeTokenHandle = useCallback((v: ITVLStakingData) => {
    setDepositCurrency(v.symbol)
    setIsModalOpen(false)
  }, [])

  return (
    <DialogOverlay className="select_dialogWrap" isOpen={isModalOpen} onDismiss={handleCancel}>
      <DialogContent className="select_dialogContent">
        <ActivePixelCard className="select_dialogContentInnerTop" width="380px" height="142px" pixel_height={10} backgroundColor="#293457">
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
        <ActivePixelCard className="select_dialogContentInnerBottom" width="380px" pixel_height={10} backgroundColor="#1D263B">
          <div className="select_token_ul">
            {tokenList.map(v => (
              <PixelBorderCardButton
                key={v.address}
                className={`select_staking_switch ${depositCurrency === v.symbol && v.chainId === chainIdLocal ? 'staking_switch_li_dialog' : ''}`}
                height="68px"
                width="100%"
                pixel_height={6}
                onClick={() => changeTokenHandle(v)}
                backgroundColor={`${depositCurrency === v.symbol && v.chainId === chainIdLocal ? '#343C4F' : '#1D263B'}`}
                borderColor={`${depositCurrency === v.symbol && v.chainId === chainIdLocal ? '#1649FF' : '#3A4254'}`}
                showHover={true}
              >
                <TokenWithChain chainId={chainIdLocal ?? defaultActiveChainId} token={v} width={44} />
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
