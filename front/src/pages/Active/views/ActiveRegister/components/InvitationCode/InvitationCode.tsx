import { request, useActiveWeb3React, useRecoilState, useSetRecoilState } from '@UI/src/'
import { ActivePixelButton, ActivePixelButtonColor } from '@UI/src/'
import React, { memo, useCallback, useState } from 'react'

import { GlobalVar } from '@/constants/constants'
import LoadingButton from '@/pages/Active/components/LoadingSvg/LoadingButton'
import { usePreHandleAction } from '@/pages/Active/hooks/activeHooks'
import { useCodeCheckCall } from '@/pages/Active/hooks/useDataCall'
import { activeDataState, IActiveData } from '@/pages/Active/state/activeState'
import { setErrorToast } from '@/utils/Error/setErrorToast'

import InputCode from './InputCode'
import css from './InvitationCode.module.styl'

const InvitationCode = memo(() => {
  const [codeStr, setCodeStr] = useState<string>('')
  const [activeData, setActiveData] = useRecoilState<IActiveData>(activeDataState)
  const { account, chainId } = useActiveWeb3React()
  const preHandleAction = usePreHandleAction()
  const { loading, codeCheck } = useCodeCheckCall()
  const checkInvitationCode = useCallback(async () => {
    if (loading || activeData.isInitLoading) {
      return
    }
    if (!codeStr) {
      setErrorToast(GlobalVar.dispatch, 'Please enter the invitation code')
      return
    }
    if (codeStr === activeData.invitationCode) {
      setActiveData(pre => ({
        ...pre,
        signedStr: '0000'
      }))
    } else {
      try {
        const isOk = preHandleAction()
        if (!isOk) {
          return
        }
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
  }, [codeStr, JSON.stringify(activeData)])

  return (
    <div className={css.invitationCode}>
      <h5>Enter the invitation code</h5>
      <InputCode setCodeStr={setCodeStr} />
      <ActivePixelButtonColor className={css.join} onClick={checkInvitationCode} width="216px" height="52px" pixel_height={5}>
        <p>Join Now</p>
        <LoadingButton isLoading={loading || activeData.isInitLoading} />
      </ActivePixelButtonColor>
      {!account || !chainId ? (
        <>
          <p className={css.or}>or</p>
          <p className={css.text}>Already Joined ?</p>
          <ActivePixelButton
            className={css.continue}
            width="260px"
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
