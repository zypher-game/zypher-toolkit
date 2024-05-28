import { ActivePixelButton, ActivePixelButtonColor, LinkPre, LoadingButton, useActiveWeb3React, useIsW768, useRecoilState } from '@ui/src'
import React, { memo, useCallback, useState } from 'react'

import { GlobalVar } from '@/constants/constants'
import { usePreHandleAction } from '@/pages/Active/hooks/activeHooks'
import { useActiveData } from '@/pages/Active/hooks/useActiveData'
import { useCodeCheckCall } from '@/pages/Active/hooks/useDataCall'
import { setErrorToast } from '@/utils/Error/setErrorToast'

import InputCode from './InputCode'
import css from './InvitationCode.module.styl'

const InvitationCode = memo(() => {
  const [codeStr, setCodeStr] = useState<string>('')
  const { activeData, setActiveData } = useActiveData()
  const { account, chainId } = useActiveWeb3React()
  const preHandleAction = usePreHandleAction()
  const isW768 = useIsW768()
  const { loading, codeCheck } = useCodeCheckCall()
  const checkInvitationCode = useCallback(async () => {
    if (loading || activeData.isInitLoading) {
      return
    }
    if (!codeStr) {
      setErrorToast(GlobalVar.dispatch, 'Please enter the invitation code')
      return
    }
    const chainKey = codeStr[0]
    const choseChainKey = LinkPre[chainKey]
    if (!choseChainKey) {
      setErrorToast(GlobalVar.dispatch, 'Please enter the right invitation code')
      return
    }
    // 如果当前网络不是用户邀请码所在的网络，则要求用户切换网络
    const isOk = preHandleAction(choseChainKey.chainId)
    if (!isOk) {
      return
    }
    if (codeStr === activeData.invitationCode) {
      setActiveData(pre => ({
        ...pre,
        signedStr: '0000'
      }))
    } else {
      try {
        const check = await codeCheck(codeStr)
        if (check) {
          setActiveData(pre => ({
            ...pre,
            invitationCode: codeStr
          }))
        } else {
          setErrorToast(GlobalVar.dispatch, 'Verification code has been registered')
        }
      } catch (e: any) {
        setErrorToast(GlobalVar.dispatch, e)
      }
    }
  }, [codeStr, chainId, JSON.stringify(activeData)])

  return (
    <div className={css.invitationCode}>
      <h5>Enter the invitation code</h5>
      <InputCode setCodeStr={setCodeStr} />
      <ActivePixelButtonColor
        themeType="brightBlue"
        className={css.join}
        onClick={checkInvitationCode}
        width={isW768 ? '100%' : '216px'}
        height={isW768 ? '48px' : '52px'}
        pixel_height={isW768 ? 4 : 5}
        disable={loading || activeData.isInitLoading}
      >
        <p>Join Now</p>
        <LoadingButton isLoading={loading || activeData.isInitLoading} />
      </ActivePixelButtonColor>
      {!account || !chainId ? (
        <>
          <p className={css.or}>or</p>
          <p className={css.text}>Already Joined ?</p>
          <ActivePixelButton
            className={css.continue}
            width={isW768 ? '100%' : '260px'}
            height="36px"
            pixel_height={5}
            backgroundColor="#3E4350"
            onClick={preHandleAction}
          >
            <p>Connect Wallet to Continue</p>
          </ActivePixelButton>
        </>
      ) : null}
    </div>
  )
})
export default InvitationCode
