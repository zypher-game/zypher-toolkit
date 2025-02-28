import { DialogContent, DialogOverlay } from '@reach/dialog'
import { preStaticUrl, useRecoilState } from '@ui/src'
import React, { useCallback } from 'react'

import { ChampionRewardsHistoryState } from '../../../state/championState'
import css from './RewardHistoryDialog.module.stylus'

type Props = {
  onClose?: () => void
}

type RewardRecord = {
  date: string
  ranking: number
  reward: number
}

const RewardHistoryDialog: React.FC<Props> = () => {
  const [isModalOpen, setIsModalOpen] = useRecoilState(ChampionRewardsHistoryState)

  const handleCancel = useCallback(() => {
    setIsModalOpen(false)
  }, [])

  // Mock data - replace with actual data from your API
  const unclaimedRewards = 1234567
  const totalClaimedRewards = 1234567
  const rewardRecords: RewardRecord[] = Array(8).fill({
    date: '2024-12-03 01:00',
    ranking: 3,
    reward: 22500
  })
  rewardRecords[0] = { ...rewardRecords[0], ranking: 1 }
  rewardRecords[1] = { ...rewardRecords[1], ranking: 2 }

  return (
    <DialogOverlay isOpen={isModalOpen} onDismiss={handleCancel} className={css.zindex}>
      <DialogContent className={css.championRule}>
        <div className={css.inner}>
          <div className={css.header}>
            <h2>Rewards History</h2>
            <img src={preStaticUrl + '/img/bingo/close.webp'} alt="close" className={css.close} onClick={handleCancel} />
          </div>
          <div className={css.totalRewards}>
            <img src={preStaticUrl + '/img/bingo/gift.svg'} alt="gift" />
            <span>Total Claimed Rewards: {totalClaimedRewards.toLocaleString()} GP</span>
          </div>

          <div className={css.unclaimedSection}>
            <div className={css.unclaimedInfo}>
              <div className={css.title}>Unclaim Rwwards</div>
              <div className={css.amount}>{unclaimedRewards.toLocaleString()} GP</div>
            </div>
            <button className={css.claimButton}>Claim</button>
          </div>

          <div className={css.rewardsList}>
            <div className={css.listHeader}>
              <span>Date</span>
              <span>Ranking</span>
              <span>Reward</span>
            </div>
            {rewardRecords.map((record, index) => (
              <div key={index} className={css.listItem}>
                <span>{record.date}</span>
                <span className={css.ranking}>#{record.ranking}</span>
                <span className={css.reward}>
                  +{record.reward.toLocaleString()}
                  <img src={preStaticUrl + '/img/bingo/radish.svg'} alt="coin" />
                </span>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </DialogOverlay>
  )
}

export default RewardHistoryDialog
