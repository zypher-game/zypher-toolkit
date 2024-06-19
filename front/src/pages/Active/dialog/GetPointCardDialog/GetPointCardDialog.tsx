import { DialogContent, DialogOverlay } from '@reach/dialog'
import { DialogClose, PixelCube2, preStaticUrl, SvgComponent, useRecoilValue, useSetRecoilState } from '@ui/src'
import React, { memo, useCallback } from 'react'

import { useGetPointCardDialog, usePostPointCardDialog } from '../../hooks/useGetPointCardDialog'
import { getPointCardDialogState } from '../../state/activeState'
import css from './GetPointCardDialog.module.styl'
const GetPointCardDialog = memo(() => {
  const [owner, parent] = useRecoilValue(getPointCardDialogState)
  const setIsModalOpen = useSetRecoilState(getPointCardDialogState)
  useGetPointCardDialog()
  const { postGroupRead } = usePostPointCardDialog()
  const handleCancel = useCallback(async () => {
    const res = await postGroupRead()
    if (res) {
      setIsModalOpen([undefined, undefined])
    }
  }, [postGroupRead])
  return (
    <DialogOverlay isOpen={!!(parent || owner)} onDismiss={handleCancel}>
      <DialogContent className={css.center}>
        <div className={css.card}>
          {owner ? (
            <Item
              className={css.owner}
              bg={preStaticUrl + '/img/tvl/airdrop_point/owner_bg.png'}
              icon={preStaticUrl + '/img/icon/owner_icon.svg'}
              label={`@${owner}'s team`}
              text={'Congratulations on the team you led completing the group goal and receiving the airdrop points card reward!'}
            />
          ) : (
            <></>
          )}
          {parent ? (
            <Item
              className={css.parent}
              bg={preStaticUrl + '/img/tvl/airdrop_point/parent_bg.png'}
              icon={preStaticUrl + '/img/icon/parent_icon.svg'}
              label={`@${parent}'s team`}
              text={'Congratulations! The team that invited your captain has completed the group goal and received the airdrop score card reward!'}
            />
          ) : (
            <></>
          )}
        </div>
        <PixelCube2 className={css.close} pixel_height={4} backgroundColor="#FFFFFF">
          <DialogClose onClick={handleCancel} />
        </PixelCube2>
      </DialogContent>
    </DialogOverlay>
  )
})
const Item = memo(({ className, bg, icon, label, text }: { className: string; bg: string; icon: string; label: string; text: string }) => {
  return (
    <div className={`${css.item} ${className}`}>
      <SvgComponent src={icon} className={css.icon} />
      <p className={css.title}>{label}</p>
      <p className={css.text}>{text}</p>
      <img src={bg} className={css.bg} />
    </div>
  )
})
export default GetPointCardDialog
