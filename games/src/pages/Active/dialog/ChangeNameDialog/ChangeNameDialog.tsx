import {
  ActivePixelButtonColor,
  DialogClose,
  getLinkPre,
  LoadingButton,
  ModalWithMotion,
  PixelCube3,
  PixelTable,
  refreshAvatarState,
  sleep,
  useActiveWeb3React,
  useIsW768,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState
} from '@ui/src'
import { ethers } from 'ethers'
import { isEqual } from 'lodash'
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'

import { GlobalVar } from '@ui/src'
import { setErrorToast, setSuccessToast } from '@/utils/Error/setErrorToast'
import { getWeb3Sign } from '@ui/src'

import { canNext } from '../../hooks/activeHooks'
import { useChainIndex } from '../../hooks/useChainIndex'
import { useUpdateInfoCall } from '../../hooks/useDataCall'
import { activeDataState, changeNameDialogState, IActiveDataState, initActiveData } from '../../state/activeState'
import Avatar from '../../views/ActiveTVLHome/components/Avatar/Avatar'
import css from './ChangeNameDialog.module.styl'
const ChangeNameDialog = memo(() => {
  const isW768 = useIsW768()
  const isModalOpen = useRecoilValue(changeNameDialogState)
  const setIsModalOpen = useSetRecoilState(changeNameDialogState)

  const [avatarLocal, setAvatarLocal] = useState<FormData | null>(null)
  const [previewSrc, setPreviewSrc] = useState<string>('')
  const [nicknameLocal, setNicknameLocal] = useState('')
  const [loading, setLoading] = useState(false)
  // const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const { updateInfo, updateHeadImg } = useUpdateInfoCall()
  const { account } = useActiveWeb3React()
  const { chainIdLocal: chainId } = useChainIndex()
  const activeDataSource = useRecoilValue<IActiveDataState>(activeDataState)
  const [, setRefreshAvatar] = useRecoilState(refreshAvatarState)
  const { avatar, nickname } = useMemo(() => {
    if (canNext(account, chainId)) {
      return activeDataSource[chainId] ?? initActiveData
    }
    return initActiveData
  }, [JSON.stringify(activeDataSource), chainId])
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
      setLoading(true)
      const hashedCardBytes = ethers.utils.hexConcat([account!])
      let _signedStr
      try {
        _signedStr = await getWeb3Sign(hashedCardBytes, account!, false)
      } catch (err) {
        setLoading(false)
        setErrorToast(err)
        return
      }
      if (typeof _signedStr === 'string') {
        // updateHeadImg
        const linkType = getLinkPre(chainId).key
        let updateHeadRes = false
        let updateInfoRes = false
        if (!avatarLocal) {
          updateHeadRes = true
        } else {
          const formData = avatarLocal
          formData.append('address', account!)
          formData.append('linkType', `${linkType}`)
          formData.append('signature', `${_signedStr}`)
          updateHeadRes = await updateHeadImg({ formData: avatarLocal })
        }
        // || previewSrc
        if (updateHeadRes && nicknameLocal.replace('@', '') !== nickname) {
          const formData = new FormData()
          formData.append('address', account!)
          formData.append('nickname', nicknameLocal.replace('@', ''))
          formData.append('linkType', `${linkType}`)
          formData.append('signature', _signedStr)
          updateInfoRes = await updateInfo({
            formData
          })
        } else {
          updateInfoRes = true
        }
        if (updateInfoRes && updateHeadRes) {
          await sleep(2)
          setRefreshAvatar(pre => pre + 1)
          setLoading(false)
          setSuccessToast({ title: '', message: 'Change successful' })
          setIsModalOpen(false)
        } else {
          throw new Error('Update has Error')
        }
      }
    } catch (e) {
      setErrorToast(e)
      setLoading(false)
    }
  }, [_canNext, nicknameLocal, account, avatarLocal])

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0]
      if (file.size > 2 * 1024 * 1024) {
        // 2MB
        setErrorToast('The image size cannot exceed 2MB!')
        return
      }
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
    <ModalWithMotion isOpen={isModalOpen} onDismiss={handleCancel} contentClassName={css.inner}>
      <PixelTable
        width={isW768 ? '100%' : '380px'}
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
            <ActivePixelButtonColor
              themeType="brightBlue"
              pixel_height={3}
              onClick={updateInfoHandle}
              width="144px"
              height="36px"
              disable={!_canNext || loading}
            >
              <p className={css.save}>Save</p>
              <LoadingButton isLoading={loading} />
            </ActivePixelButtonColor>
          </div>
        }
        pixel_height={isW768 ? 5 : 10}
      />
      <DialogClose onClick={handleCancel} />
    </ModalWithMotion>
  )
}, isEqual)

export default ChangeNameDialog
