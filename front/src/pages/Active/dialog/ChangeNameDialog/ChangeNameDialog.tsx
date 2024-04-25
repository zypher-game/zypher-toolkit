import { DialogContent, DialogOverlay } from '@reach/dialog'
import {
  ActivePixelButtonColor,
  PixelBorderCardSize3,
  preStaticUrl,
  SvgComponent,
  useActiveWeb3React,
  useRecoilValue,
  useSetRecoilState
} from '@UI/src/'
import { isEqual } from 'lodash'
import React, { memo, useCallback, useEffect, useState } from 'react'

import { GlobalVar } from '@/constants/constants'
import { setErrorToast } from '@/utils/Error/setErrorToast'
import sleep from '@/utils/sleep'

import LoadingButton from '../../components/LoadingSvg/LoadingButton'
import { PixelTable } from '../../components/PixelTable/PixelTable'
import { useUpdateInfoCall } from '../../hooks/useDataCall'
import { useInit } from '../../hooks/useInit'
import { activeDataState, changeNameDialogState } from '../../state/activeState'
import Avatar from '../../views/ActiveTVLHome/components/Avatar/Avatar'
import css from './ChangeNameDialog.module.styl'
const ChangeNameDialog = memo(() => {
  const isModalOpen = useRecoilValue(changeNameDialogState)
  const setIsModalOpen = useSetRecoilState(changeNameDialogState)
  const activeData = useRecoilValue(activeDataState)
  const { avatar, nickname } = activeData
  const [avatarLocal, setAvatarLocal] = useState<FormData | null>(null)
  const [previewSrc, setPreviewSrc] = useState<string>('')
  const [nicknameLocal, setNicknameLocal] = useState('')
  const [loading, setLoading] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const { updateInfo } = useUpdateInfoCall()
  const { account } = useActiveWeb3React()
  const { getData } = useInit()
  useEffect(() => {
    if (avatar && nickname) {
      setPreviewSrc(avatar)
      setNicknameLocal(nickname)
    }
  }, [avatar, nickname])
  const handleCancel = useCallback(() => {
    setIsModalOpen(false)
  }, [])
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value
    setNicknameLocal(inputValue)
  }, [])
  const updateInfoHandle = useCallback(async () => {
    if (account && avatarLocal && nicknameLocal) {
      setLoading(true)
      try {
        console.log({ avatarLocal })
        const res = await updateInfo({ address: account, headImg: avatarLocal, nickname: nicknameLocal })
        if (res) {
          getData()
        }
        setLoading(false)
      } catch (e) {
        setErrorToast(GlobalVar.dispatch, e)
        setLoading(false)
      }
    }
  }, [nicknameLocal, account, avatarLocal])

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0]
      setSelectedFile(file)
      console.log(111, file)
      // 创建一个新的FileReader实例
      const reader = new FileReader()

      // 为FileReader的onload事件绑定处理函数
      reader.onloadend = () => {
        // 当文件读取完成后，将结果赋值给previewSrc
        setPreviewSrc(reader.result as string)
        console.log(3333, reader.result)
      }

      // 开始读取文件内容为DataURL
      reader.readAsDataURL(file)

      const formData = new FormData()
      formData.append('file', file)
      setAvatarLocal(formData)
    }
  }
  useEffect(() => {
    console.log('avatarLocal changed:', avatarLocal)
  }, [avatarLocal])
  return (
    <DialogOverlay isOpen={isModalOpen} onDismiss={handleCancel}>
      <DialogContent>
        <PixelTable
          width="380px"
          height="390px"
          className={css.table_body}
          backgroundColor="#1D263B"
          header_children={<p className={css.title}>Change Name</p>}
          body_children={
            <div className={css.body_inner}>
              <Avatar src={previewSrc} nickname={nickname} width="88px">
                <p className={css.edit}>
                  Edit
                  <input type="file" accept="image/*" onChange={handleFileSelect} />
                </p>
              </Avatar>
              <p className={css.text}>Name</p>
              <PixelBorderCardSize3 className={css.input} pixel_height={2} width="100%" height="48px" backgroundColor="#343C4F" borderColor="#484F60">
                <input onChange={handleChange} type="text" value={nicknameLocal} />
              </PixelBorderCardSize3>
              <ActivePixelButtonColor pixel_height={3} onClick={updateInfoHandle} width="144px" height="36px">
                <p className={css.save}>Save</p>
                <LoadingButton isLoading={loading} />
              </ActivePixelButtonColor>
            </div>
          }
          pixel_height={10}
        />
        <div className="select_cursor" onClick={handleCancel}>
          <SvgComponent src={preStaticUrl + '/img/icon/pixel_close.svg'} />
        </div>
      </DialogContent>
    </DialogOverlay>
  )
}, isEqual)

export default ChangeNameDialog
