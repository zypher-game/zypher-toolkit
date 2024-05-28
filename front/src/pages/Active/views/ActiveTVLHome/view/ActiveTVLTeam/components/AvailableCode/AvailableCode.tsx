import { ActivePixelButtonColor, getLinkPre, PixelBorderCard, PixelTableBorder, useActiveWeb3React, useIsW768 } from '@ui/src'
import React, { memo, useRef } from 'react'

import PixelTooltip from '@/pages/Active/components/PixelTooltip/PixelTooltip'
import { IAvailableCode } from '@/pages/Active/hooks/useTeam'
import { useTeamTooltip } from '@/pages/Active/hooks/useTooltip'
import copy from '@/utils/copy'

import css from './AvailableCode.module.styl'
const AvailableCode = memo(({ availableCode }: { availableCode: IAvailableCode[] }) => {
  const { availableInvitationsTooltip } = useTeamTooltip()
  const toastContainerRef = useRef<HTMLElement | null>(null)
  const { chainId } = useActiveWeb3React()
  const isW768 = useIsW768()
  return (
    <>
      <PixelTableBorder
        pixel_height={6}
        header_children={
          <div className={css.tvl_fr_title}>
            <h2>Available invitations</h2>
            <PixelTooltip title={availableInvitationsTooltip} />
          </div>
        }
        body_children={
          <div className={css.tvl_fr_table_ul}>
            {availableCode
              .sort((a, b) => b.codeType - a.codeType)
              .map(v => (
                <IsPixelWidget key={v.inviteCode} isPixel={v.codeType === 7}>
                  <div className={css.fl}>
                    {v.codeType === 7 ? <p className={css.grey}>Permanent invitation code</p> : null}
                    <p className={css.text}>
                      {window.location.origin}/{getLinkPre(chainId).label}-{v.inviteCode}
                    </p>
                  </div>
                  <ActivePixelButtonColor
                    themeType={v.codeType === 7 ? 'yellow' : 'brightBlue'}
                    width={isW768 ? '64px' : '88px'}
                    height={isW768 ? '28px' : '36px'}
                    pixel_height={3}
                    onClick={() => copy(`${window.location.origin}/${getLinkPre(chainId).label}-${v.inviteCode}`, toastContainerRef)}
                  >
                    <p className={css.btn_text}>Copy</p>
                  </ActivePixelButtonColor>
                </IsPixelWidget>
              ))}
            <div className="toast__" ref={ref => (toastContainerRef.current = ref)} />
          </div>
        }
      />
    </>
  )
})
const IsPixelWidget = memo(({ isPixel, children }: { isPixel: boolean; children: React.ReactNode }) => {
  return isPixel ? (
    <PixelBorderCard className={css.forever} pixel_height={5} backgroundColor="#242b3c" borderColor="#303647">
      {children}
    </PixelBorderCard>
  ) : (
    <div className={css.li}>{children}</div>
  )
})
export default AvailableCode
