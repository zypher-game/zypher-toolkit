import { DialogContent, DialogOverlay } from '@reach/dialog'
import {
  ChainId,
  ChainImage,
  ChainName,
  DialogClose,
  TVLStakingSupportedChainId,
  useActiveWeb3React,
  useIsW768,
  useRecoilValue,
  useSetRecoilState,
  useSwitchNetwork
} from '@ui/src'
import { ActivePixelCard, PixelCube3 } from '@ui/src'
import { isEqual } from 'lodash'
import React, { memo, useCallback, useEffect, useState } from 'react'

import { GlobalVar } from '@/constants/constants'
import { setErrorToast } from '@/utils/Error/setErrorToast'

import { selectChainDialogState } from '../../state/activeState'
import css from './SelectChainDialog.module.stylus'

const SelectChainDialog = memo(() => {
  const isW768 = useIsW768()
  const isModalOpen = useRecoilValue(selectChainDialogState)
  const setIsModalOpen = useSetRecoilState(selectChainDialogState)
  const { chainId } = useActiveWeb3React()
  const { switchNetwork } = useSwitchNetwork()
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    if (loading) {
      setLoading(false)
      setIsModalOpen(false)
    }
  }, [chainId])
  const handleCancel = useCallback(() => {
    setIsModalOpen(false)
  }, [])
  const changeChainHandle = useCallback(
    (v: ChainId) => {
      try {
        if (v !== chainId && switchNetwork) {
          setLoading(true)
          switchNetwork(v)
        }
      } catch (err) {
        setLoading(false)
        setErrorToast(GlobalVar.dispatch, err)
      }
    },
    [switchNetwork, chainId]
  )

  return (
    <DialogOverlay className="select_dialogWrap" isOpen={isModalOpen} onDismiss={handleCancel}>
      <DialogContent className="select_dialogContent">
        <ActivePixelCard
          className="select_dialogContentInnerTop"
          width="380px"
          height="64px"
          pixel_height={isW768 ? 5 : 10}
          hidePixel={isW768 ? true : false}
          backgroundColor="#293457"
        >
          <h3>Switch Networds</h3>
        </ActivePixelCard>
        <ActivePixelCard
          className="select_dialogContentInnerBottom select_dialogChainBottom"
          width="380px"
          height="290px"
          pixel_height={isW768 ? 5 : 10}
          backgroundColor="#1D263B"
        >
          <div className="select_token_ul">
            {TVLStakingSupportedChainId.map(v => (
              <PixelCube3
                pixel_height={3}
                // height="32px"
                // backgroundColor="#1D263B" borderColor="#1649FF"
                key={v}
                className={`select_staking_switch select_staking_switch_chain ${v === chainId ? 'staking_switch_li_dialog' : ''}`}
                height={isW768 ? '58px' : '68px'}
                width="100%"
                onClick={() => changeChainHandle(v)}
                backgroundColor={`${v === chainId ? '#343C4F' : '#1D263B'}`}
                borderColor={`${v === chainId ? '#1649FF' : '#3A4254'}`}
                showHover={true}
              >
                <img src={ChainImage[v]} alt={ChainName[v]} className={css.chain} />
                <div className="select_currency">
                  <h3>{ChainName[v]}</h3>
                </div>
                {v === chainId ? (
                  <div className={css.fr}>
                    <p>Connected</p>
                    <i className={css.point} />
                  </div>
                ) : null}
              </PixelCube3>
            ))}
          </div>
        </ActivePixelCard>

        <DialogClose onClick={handleCancel} />
      </DialogContent>
    </DialogOverlay>
  )
}, isEqual)

export default SelectChainDialog
