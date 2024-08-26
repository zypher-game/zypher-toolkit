import { preStaticUrl, SvgComponent, useSetGlobalVar } from '@ui/src'
import { GlobalVar } from '@ui/src'
import { notification } from 'antd'
import React, { useEffect, useRef } from 'react'

import { useAppDispatch, useAppSelector } from '../store/hooks'
import { changeUserStateValue } from '../store/user/reducer'

export const useToastMessage = () => {
  const toastContainerRef = useRef<HTMLElement | null>(null)
  const error: any = useAppSelector(state => state.user.error)
  const success: any = useAppSelector(state => state.user.success)
  const dispatch = useAppDispatch()
  const setGlobalVar = useSetGlobalVar()
  useEffect(() => {
    if (toastContainerRef.current) {
      setGlobalVar(pre => ({
        ...pre,
        getContainer: toastContainerRef.current
      }))
    }
  }, [toastContainerRef])
  useEffect(() => {
    if (error && error.message && toastContainerRef.current !== null) {
      notification.destroy()
      setTimeout(() => {
        toastContainerRef.current!.style.opacity = '1'
      }, 100)
      notification.error({
        className: 'customNotification failed',
        message: error.message,
        icon: <SvgComponent src={preStaticUrl + '/img/icon/pixel_fail.svg'} />,
        duration: 3,
        btn: null,
        closeIcon: null,
        top: 75,
        getContainer: () => toastContainerRef.current!
        // closeIcon: <Icon name="close" />
      })
      setTimeout(() => {
        toastContainerRef.current!.style.opacity = '0'
      }, 3000)
      dispatch(changeUserStateValue({ key: 'error', value: undefined }))
    }
  }, [error])
  useEffect(() => {
    if (success && success.message && toastContainerRef.current) {
      notification.destroy()
      setTimeout(() => {
        toastContainerRef.current!.style.opacity = '1'
      }, 100)
      notification.success({
        className: 'customNotification success',
        message: success.message,
        icon: <SvgComponent src={preStaticUrl + '/img/icon/pixel_success.svg'} />,
        duration: 3,
        btn: null,
        closeIcon: null,
        top: 75,
        getContainer: () => toastContainerRef.current!
      })
      setTimeout(() => {
        toastContainerRef.current!.style.opacity = '0'
      }, 3000)
      dispatch(changeUserStateValue({ key: 'success', value: undefined }))
    }
  }, [success])
  return { toastContainerRef }
}
