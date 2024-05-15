import { DialogContent, DialogOverlay } from '@reach/dialog'
import {
  ActivePixelButtonColor,
  DialogClose,
  LoadingButton,
  PixelCube3,
  PixelTable,
  preStaticUrl,
  SvgComponent,
  useActiveWeb3React,
  useRecoilValue,
  useSetRecoilState
} from '@ui/src'
import { isEqual } from 'lodash'
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'

import { GlobalVar } from '@/constants/constants'
import { setErrorToast } from '@/utils/Error/setErrorToast'

import { getLinkPre } from '../../constants/activeConstants'
import { useActiveData } from '../../hooks/useActiveData'
import { useUpdateInfoCall } from '../../hooks/useDataCall'
import { useGetData, useInit } from '../../hooks/useInit'
import { activeDataState, changeNameDialogState, IActiveDataState } from '../../state/activeState'
import Avatar from '../../views/ActiveTVLHome/components/Avatar/Avatar'
import css from './ChangeNameDialog.module.styl'
const ChangeNameDialog = memo(() => {
  const isModalOpen = useRecoilValue(changeNameDialogState)
  const setIsModalOpen = useSetRecoilState(changeNameDialogState)
  const { activeData } = useActiveData()
  const { avatar, nickname } = activeData
  const [avatarLocal, setAvatarLocal] = useState<FormData | null>(null)
  const [previewSrc, setPreviewSrc] = useState<string>('')
  const [nicknameLocal, setNicknameLocal] = useState('')
  const [loading, setLoading] = useState(false)
  // const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const { updateInfo, updateHeadImg } = useUpdateInfoCall()
  const { account, chainId } = useActiveWeb3React()
  const { getData } = useGetData()
  useEffect(() => {
    if (avatar && nickname) {
      setPreviewSrc(avatar)
      setNicknameLocal(`@${nickname}`)
    }
  }, [avatar, nickname])
  const handleCancel = useCallback(() => {
    setIsModalOpen(false)
  }, [])
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = e.target.value
    if (!inputValue.startsWith('@')) {
      inputValue = `@${inputValue}`
    }
    setNicknameLocal(inputValue)
  }, [])
  const _canNext = useMemo(() => {
    if (!account) {
      return false
    }
    if (!avatarLocal && nicknameLocal.length > 20 && nickname !== nicknameLocal) {
      return false
    }
    if (nicknameLocal.length > 0) {
      return true
    }
    return false
  }, [nicknameLocal, avatarLocal, account])
  const updateInfoHandle = useCallback(async () => {
    try {
      if (!_canNext) {
        return
      }
      console.log(1, account, avatarLocal, nicknameLocal)
      // updateHeadImg
      const linkType = getLinkPre(chainId).key
      let updateHeadRes = false
      let updateInfoRes = false
      setLoading(true)
      if (!avatarLocal) {
        updateHeadRes = true
      } else {
        const formData = avatarLocal
        formData.append('address', account!)
        formData.append('linkType', `${linkType}`)
        updateHeadRes = await updateHeadImg({ formData: avatarLocal })
      }
      // || previewSrc
      if (updateHeadRes && nicknameLocal !== nickname) {
        updateInfoRes = await updateInfo({ address: account!, nickname: nicknameLocal, linkType: linkType })
      } else {
        updateInfoRes = true
      }
      if (updateInfoRes && updateHeadRes) {
        getData()
      }
      setLoading(false)
    } catch (e) {
      setErrorToast(GlobalVar.dispatch, e)
      setLoading(false)
    }
  }, [_canNext, nicknameLocal, account, avatarLocal])

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0]
      // setSelectedFile(file)
      // 创建一个新的FileReader实例
      const reader = new FileReader()

      // 为FileReader的onload事件绑定处理函数
      reader.onloadend = () => {
        // 当文件读取完成后，将结果赋值给previewSrc
        setPreviewSrc(reader.result as string)
      }

      // 开始读取文件内容为DataURL
      reader.readAsDataURL(file)

      const formData = new FormData()
      formData.append('headImg', file, file.name)
      setAvatarLocal(formData)
    }
  }
  return (
    <DialogOverlay isOpen={isModalOpen} onDismiss={handleCancel}>
      <DialogContent>
        <PixelTable
          width="380px"
          height="390px"
          className={css.table_body}
          backgroundColor="#1D263B"
          header_children={<p className="modalTitleInnerTitle">Change Name</p>}
          body_children={
            <div className={css.body_inner}>
              <Avatar src={previewSrc} nickname={nickname} width="88px">
                <p className={css.edit}>
                  Edit
                  <input type="file" accept="image/*" onChange={handleFileSelect} />
                </p>
              </Avatar>
              <p className={css.text}>Name</p>
              <PixelCube3 className={css.input} pixel_height={2} width="100%" height="48px" backgroundColor="#343C4F" borderColor="#484F60">
                <input onChange={handleChange} type="text" value={nicknameLocal} />
              </PixelCube3>
              <ActivePixelButtonColor pixel_height={3} onClick={updateInfoHandle} width="144px" height="36px" disable={!_canNext}>
                <p className={css.save}>Save</p>
                <LoadingButton isLoading={loading} />
              </ActivePixelButtonColor>
            </div>
          }
          pixel_height={10}
        />
        <DialogClose onClick={handleCancel} />
      </DialogContent>
    </DialogOverlay>
  )
}, isEqual)

export default ChangeNameDialog
