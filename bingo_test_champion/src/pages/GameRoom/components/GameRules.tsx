import { ExclamationCircleOutlined } from '@ant-design/icons'
import { LngNs, useCustomTranslation } from '@ui/src'
import { Space, Tooltip } from 'antd'
import React from 'react'

import { IRoomInfo } from '@/hooks/useGetGameInfoV1.types'
import InputValue from '@/pages/components/GameRules/inputValue'

import css from '../index.module.stylus'

interface GameRulesProps {
  roomInfo: IRoomInfo
}

const GameRules: React.FC<GameRulesProps> = ({ roomInfo }) => {
  const { t } = useCustomTranslation([LngNs.zBingo])

  return (
    <div>
      <Space>
        <div className={css.title}>{t('Bingo Rules')}</div>
        <Tooltip
          title={
            <div>
              {t('BingoRules01')} 2-5
              <br />
              {t('BingoRules0201')}
              {t('BingoRules0202')}
              <br />
              {t('BingoRules0301')}
              {t('BingoRules0302')}
              <br />
              {t('BingoRules04')}
              <br />
              {t('BingoRules05')}
              <br />
              {t('BingoRules06')}
            </div>
          }
        >
          <ExclamationCircleOutlined style={{ color: '#FFF0CF' }} />
        </Tooltip>
      </Space>
      <div className={css.rulesCard}>
        <div className={css.rulesLabel}>{t('BingoRules0201')}</div>
        <div className={css.rulesValue}>{t('BingoRules0202')}</div>
        <div className={css.rulesLabel}>{t('BingoRules0301')}</div>
        <div className={css.rulesValue}>{t('BingoRules0302')}</div>
      </div>
      <div className={css.rulesCard}>
        <InputValue playersNumber={roomInfo.players.length} betSize={roomInfo.betSize} room color={'#C0A885'} />
      </div>
    </div>
  )
}

export default GameRules
