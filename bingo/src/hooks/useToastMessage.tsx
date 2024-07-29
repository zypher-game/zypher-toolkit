import { preStaticUrl, SvgComponent, useActiveChainId } from '@ui/src'
import { notification } from 'antd'
import React, { useEffect } from 'react'

import { useAppDispatch, useAppSelector } from '../store/hooks'
import { changeUserStateValue } from '../store/user/reducer'
import { env } from '../utils/config'

export const useToastMessage = () => {
  const { chainId } = useActiveChainId(env)
  const error: any = useAppSelector(state => state.user.error)
  const success: any = useAppSelector(state => state.user.success)
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (chainId && error && error.message) {
      notification.destroy()
      notification.error({
        className: 'customNotification failed',
        message: error.message,
        // description: error.message,
        icon: <SvgComponent className="notification_icon" src={preStaticUrl + '/img/icon/failed.svg'} />,
        // icon: <Icon name="failed" />,
        duration: 3,
        btn: null,
        closeIcon: null,
        top: 75
        // closeIcon: <Icon name="close" />
      })
      dispatch(changeUserStateValue({ key: 'error', value: undefined }))
    }
  }, [chainId, error])
  useEffect(() => {
    if (chainId && success && success.message) {
      notification.destroy()
      notification.success({
        className: 'customNotification success',
        message: success.message,
        icon: <SvgComponent className="notification_icon" src={preStaticUrl + '/img/icon/success.svg'} />,
        duration: 3,
        btn: null,
        closeIcon: null,
        top: 75
      })
      dispatch(changeUserStateValue({ key: 'success', value: undefined }))
    }
  }, [chainId, success])
}
