import { DialogClose, ModalWithMotion, PixelCube2, preStaticUrl, SvgComponent, useRecoilValue, useSetRecoilState } from '@ui/src'
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
    <ModalWithMotion isOpen={!!(parent || owner)} onDismiss={handleCancel} contentClassName={css.center}>
      <div className={css.card}>
        {owner ? (
          <Item
            className={css.owner}
            bg={preStaticUrl + '/img/tvl/airdrop_point/owner_bg.png'}
            icon={preStaticUrl + '/img/icon/owner_icon.svg'}
            label={`@${owner}'s team`}
            text={'Congratulations on successfully leading your team to achieve the group goal and earning the airdrop points card reward.'}
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
            text={
              "Congratulations! Your captain's team has triumphed by completing the group goal, and they've just snagged the exciting airdrop scorecard reward! Keep up the great teamwork!"
            }
          />
        ) : (
          <></>
        )}
      </div>
      <PixelCube2 className={css.close} pixel_height={4} backgroundColor="#FFFFFF">
        <DialogClose onClick={handleCancel} />
      </PixelCube2>
    </ModalWithMotion>
  )
})
const Item = memo(({ className, bg, icon, label, text }: { className: string; bg: string; icon: string; label: string; text: string }) => {
  return (
    <div className={`${css.item} ${className}`}>
      <SvgComponent src={icon} className={css.icon} />
      <p className={css.title}>{label}</p>
      <p className={css.text}>{text}</p>
      <img decoding="async" loading="lazy" src={bg} className={css.bg} />
    </div>
  )
})
export default GetPointCardDialog
