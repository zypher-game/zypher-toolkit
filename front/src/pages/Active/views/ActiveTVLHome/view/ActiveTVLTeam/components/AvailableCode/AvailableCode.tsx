import { ActivePixelButtonColor, getLinkPre, PixelBorderCard, PixelTableBorder, useActiveWeb3React, useIsW768 } from '@ui/src'
import React, { memo, useRef } from 'react'

import NoDataListLoading from '@/components/NoData/NoDataListLoading/NoDataListLoading'
import PixelTooltip from '@/pages/Active/components/PixelTooltip/PixelTooltip'
import { IAvailableCode } from '@/pages/Active/hooks/useTeam'
import { useTeamTooltip } from '@/pages/Active/hooks/useTooltip'
import copy from '@/utils/copy'

import css from './AvailableCode.module.styl'
const AvailableCode = memo(({ availableCode, loading }: { availableCode: IAvailableCode[]; loading: boolean }) => {
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
            {loading ? <NoDataListLoading /> : null}
            {!loading ? (
              <>
                {availableCode
                  .sort((a, b) => b.codeType - a.codeType)
                  .map(v => ({ ...v, isForever: v.codeType === 255 }))
                  .map(v => (
                    <IsPixelWidget key={v.inviteCode} isPixel={v.isForever}>
                      <div className={css.fl}>
                        {v.isForever ? <p className={css.grey}>Permanent invitation code</p> : null}
                        <p className={css.text}>
                          {window.location.origin}/{getLinkPre(chainId).label}-{v.inviteCode}
                        </p>
                      </div>
                      <ActivePixelButtonColor
                        themeType={v.isForever ? 'yellow' : 'brightBlue'}
                        width={isW768 ? '64px' : '88px'}
                        height={isW768 ? '28px' : '36px'}
                        pixel_height={3}
                        onClick={() => copy(`${window.location.origin}/${getLinkPre(chainId).label}-${v.inviteCode}`, toastContainerRef)}
                      >
                        <p className={css.btn_text}>Copy</p>
                      </ActivePixelButtonColor>
                    </IsPixelWidget>
                  ))}
              </>
            ) : null}
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
