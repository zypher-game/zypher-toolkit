import { ChainId, preStaticUrl, SvgComponent, useSetRecoilState } from '@UI/src/'
import { ActivePixelButtonColor, PixelCube2 } from '@UI/src/'
import { Tooltip } from 'antd'
import React, { memo, useCallback, useState } from 'react'
import { zeroAddress } from 'viem'

import { PixelTableBorder } from '@/components/PixelTable/PixelTable'
import TokenWithChain from '@/pages/Active/components/Token/TokenWithChain/TokenWithChain'
import { tvlStakingDialogState } from '@/pages/Active/state/activeState'

import FrPixelBorder from '../../components/FrPixelBorder/FrPixelBorder'
import TVLWrap from '../TVLWrap'
import css from './ActiveTVLStaking.module.styl'

const ActiveTVLStaking = memo(() => {
  const [chainIndex, setChainIndex] = useState(0)
  const setIsTvlStakingDialogOpen = useSetRecoilState(tvlStakingDialogState)
  const changeChainIndexHandle = useCallback(index => {
    setChainIndex(index)
  }, [])
  const showStakingHandle = useCallback(() => {
    setIsTvlStakingDialogOpen(true)
  }, [])
  return (
    <TVLWrap
      fl_children={
        <>
          <h3 className={css.fl_title}>Get $GP Rewards + Airdrop Points + CR Hero Mystery Boxes!</h3>
          <p className={css.fl_grey}>Improve your character profile by increasing your stake amount! Show your glory!</p>
          <h3 className={css.fl_title}>This round of competition time: April 20, 2024 ~ July 20, 2024</h3>
          <p className={css.fl_grey}>The airdrop points will continue to grow based on the amount and duration of your pledged assets!</p>
          <div className={css.tab_col}>
            <PixelCube2 className={css.ActiveTVLStaking_tab} pixel_height={2} height="32px" backgroundColor="#1D263B" borderColor="#1649FF">
              {['All', 'Ethreum'].map((v, index) => (
                <div
                  className={`${css.ActiveTVLStaking_tab_li} ${index === chainIndex ? css.on : ''}`}
                  key={v}
                  onClick={() => changeChainIndexHandle(index)}
                >
                  <p>{v}</p>
                </div>
              ))}
            </PixelCube2>
            <ActivePixelButtonColor
              className={css.staking}
              width="110px"
              height="32px"
              pixel_height={2}
              borderBottomColor="#D99716"
              borderTopColor="#FFE99A"
              backgroundColor="#FFD02B"
              onClick={showStakingHandle}
            >
              <p>Stake</p>
            </ActivePixelButtonColor>
          </div>
          {chainIndex === 1 ? (
            <Tooltip title="prompt text" className={css.warn_tab_tooltip}>
              <p>Earn Linea XP</p>
              <SvgComponent src={preStaticUrl + '/img/icon/pixel_warn.svg'} />
              <p>by staking! And Linea’s airdrop expectations!</p>
            </Tooltip>
          ) : (
            <></>
          )}
          <PixelTableBorder
            classNameHeader="tvlPixelTable_header_table"
            pixel_height={7}
            header_children={<Row className={css.fl_tab_header} data={['Token', 'Restaked', 'Points', 'GP', 'APR', 'TVL']} />}
            body_children={
              <>
                {['dd', 'd'].map(v => (
                  <Row
                    key={v}
                    className={css.fl_tab_body}
                    data={[
                      <>
                        <div className={css.fl_tab_body_col1}>
                          <TokenWithChain
                            width={32}
                            token={{
                              address: zeroAddress,
                              symbol: '',
                              logoPath: '',
                              index: 0
                            }}
                            chainId={ChainId.Sepolia}
                          />
                          <p>ETH</p>
                        </div>
                      </>,
                      '1.9874',
                      '200',
                      '200',
                      '20%',
                      '2,982,351.9874'
                    ]}
                  />
                ))}
              </>
            }
          />
        </>
      }
      fr_children={
        <>
          <FrPixelBorder>
            <div className={css.fr_title}>
              <div className={css.fr_title_fl}>
                <p>Restaked</p>
                <Tooltip title="prompt text">
                  <SvgComponent src={preStaticUrl + '/img/icon/pixel_warn.svg'} />
                </Tooltip>
              </div>
              <div className={css.fr_title_fr}>
                <p>Restaked ratio</p>
                <Tooltip title="prompt text" className={css.fr_title_fr}>
                  <SvgComponent src={preStaticUrl + '/img/icon/pixel_warn.svg'} />
                </Tooltip>
              </div>
            </div>
            <div className={css.fr_title_content}>
              <p>
                1.9874 <i>ETH</i>
              </p>
              <p>1.67%</p>
            </div>
          </FrPixelBorder>
          <FrPixelBorder>
            <div className={css.fr_title}>
              <Tooltip title="prompt text" className={css.fr_title_fl}>
                <p>Airdrop Points</p>
                <SvgComponent src={preStaticUrl + '/img/icon/pixel_warn.svg'} />
              </Tooltip>
              <Tooltip title="prompt text" className={css.fr_title_fr}>
                <p>growth coefficient</p>
                <SvgComponent src={preStaticUrl + '/img/icon/pixel_warn.svg'} />
              </Tooltip>
            </div>
            <div className={css.fr_title_content}>
              <p>269,982.00</p>
              <p>10</p>
            </div>
          </FrPixelBorder>
          <FrPixelBorder>
            <div className={css.fr_title}>
              <Tooltip title="prompt text" className={css.fr_title_fl}>
                <p>CR Hero Mystery Box</p>
                <SvgComponent src={preStaticUrl + '/img/icon/pixel_warn.svg'} />
              </Tooltip>
            </div>
            <div className={css.fr_title_content}>
              <p>1</p>
            </div>
            <ActivePixelButtonColor pixel_height={3} width="144px" height="36px" className={css.fr_btn}>
              <p>Open</p>
            </ActivePixelButtonColor>
          </FrPixelBorder>
          <FrPixelBorder>
            <div className={css.fr_title}>
              <Tooltip title="prompt text" className={css.fr_title_fl}>
                <p>Rewards</p>
                <SvgComponent src={preStaticUrl + '/img/icon/pixel_warn.svg'} />
              </Tooltip>
            </div>
            <div className={css.fr_title_content}>
              <p>
                5,902.3463 <i>$GP</i>
              </p>
            </div>
            <ActivePixelButtonColor pixel_height={3} width="144px" height="36px" className={css.fr_btn}>
              <p>Claim</p>
            </ActivePixelButtonColor>
          </FrPixelBorder>
        </>
      }
    />
  )
})
const Row = memo(({ className, data }: { className: string; data: (string | React.ReactNode)[] }) => {
  return <div className={`${css.row} ${className}`}>{data.map(v => (typeof v === 'string' ? <p key={v}>{v} </p> : v))}</div>
})
export default ActiveTVLStaking
