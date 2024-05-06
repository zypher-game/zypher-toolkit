import { LoadingOutlined } from '@ant-design/icons'
import { preStaticUrl } from '@ui/src'
import { useCustomTranslation } from '@ui/src'
import { useIsMobile } from '@ui/src'
import { LngNs } from '@ui/src'
import { Button, Tooltip } from 'antd'
import classnames from 'classnames'
import { isEqual } from 'lodash'
import React, { memo, useMemo } from 'react'

import { AccountMonsterKeyType } from '@/store/monster/reducer'

import { ImonsterUserStatus } from '../../hooks/monster.types'
import { IMonsterBottom } from '../MonsterBottom'
import css from './MonsterSinginAction.module.stylus'
const MonsterSinginAction = memo(
  ({
    monsterState,
    isGetNftLoading,
    isBuyNftLoading,
    handleGetNft,
    handleOpenBuyBattlePass,
    accountMonsterState,
    monsterUserStatus
  }: IMonsterBottom) => {
    const { t } = useCustomTranslation([LngNs.defense])
    const isMobile = useIsMobile()
    const width = useMemo(() => {
      if (isMobile) {
        return 'calc(30vw * 3 + 36px * 3 - 36px * 2 + 4px)'
      }
      return 'calc(5vw * 3 + 45px * 3 - 45px * 2 + 4px)'
    }, [isMobile])
    return (
      <div className={css.monsterSinginAction}>
        <div className={css.fl}>
          <div className={css.lineBg}>
            <div className={css.line} style={{ width: width }}>
              <div className={css.lineInner} />
            </div>
          </div>
          <div className={css.singInContent}>
            {Array.from({ length: 3 }, (val, index) => `${index + 1}`).map(v => (
              <NumberItem key={v} v={v} accountMonsterState={accountMonsterState} />
            ))}
          </div>
        </div>
        <div className={css.btn}>
          <Button
            className={classnames(css.chechIn, monsterUserStatus === ImonsterUserStatus.AlreadyHaveACard ? css.forbid : null)}
            onClick={handleGetNft}
          >
            {monsterUserStatus === ImonsterUserStatus.CannotGetCard
              ? t('Get your Battle Pass')
              : monsterUserStatus === ImonsterUserStatus.CanGetACard
              ? t('Claim Battle Pass')
              : t('Get Battle Pass')}
            {isGetNftLoading && <LoadingOutlined />}
          </Button>
          <Button
            className={classnames(css.battlePass, monsterUserStatus === ImonsterUserStatus.AlreadyHaveACard ? css.forbid : null)}
            onClick={handleOpenBuyBattlePass}
          >
            {t('Buy')}
            {isBuyNftLoading && <LoadingOutlined />}
          </Button>
        </div>
      </div>
    )
  },
  isEqual
)

const NumberItem = memo(({ v, accountMonsterState }: any) => {
  if (v === '3') {
    return (
      <Tooltip
        open={true}
        overlayClassName={'nfttooltip'}
        title={
          <div className="nfttooltipcard">
            <img src={preStaticUrl + `/img/monster/passCardbg.svg`} alt="passCard" className="nfttooltipcardimgbg" />
            <img src={preStaticUrl + `/img/monster/passCard02.png`} alt="passCard" className="nfttooltipcardimg" />
            <p className="nfttooltipcardNumber">x1</p>
          </div>
        }
      >
        <NumberItemInner v={v} accountMonsterState={accountMonsterState} />
      </Tooltip>
    )
  }
  return <NumberItemInner v={v} accountMonsterState={accountMonsterState} />
}, isEqual)

const NumberItemInner = memo(({ v, accountMonsterState }: any) => {
  const isOn = useMemo(() => {
    const record = accountMonsterState?.[AccountMonsterKeyType.record]
    return Number(`${record ?? '0'}`) >= Number(v)
  }, [accountMonsterState])

  return (
    <div className={classnames(css.singIn, isOn ? css.on : '')}>
      <p>{v}</p>
      <img src={preStaticUrl + `/img/monster/singin_bg${isOn ? '_on' : ''}.png`} alt="singin" />
    </div>
  )
}, isEqual)
export default MonsterSinginAction
