import { AddressZero } from '@ethersproject/constants'
import { ChainId, Currency, minStakingValue, TVLChainId, tvlTokenAddress, useActiveWeb3React, useRecoilValue } from '@ui/src'
import { useCallback, useMemo } from 'react'

import { isTvlDataLoadingState, ITVLStakingData, tvlStakingDataState } from '../state/activeState'

// const CrHero: Record<TVLChainId, string> = {
//   [TVLChainId.Sepolia]: '0.5 ETH / 0.5 wstETH / 0.5 ezETH',
//   [TVLChainId.B2]: '0.025 BTC / 0.025 stBTC',
//   [TVLChainId.B2Testnet]: '0.025 BTC / 0.025 stBTC',
//   [TVLChainId.LineaMainnet]: '0.5 ETH / 0.5 wstETH / 0.5 ezETH',
//   [TVLChainId.LineaTestnet]: '0.5 ETH / 0.5 wstETH / 0.5 ezETH'
// }

// const SBTWarn: Record<TVLChainId, string[]> = {
//   [TVLChainId.Sepolia]: ['0.2/1 ETH', '0.3/1 wstETH', '0.1/1'],
//   [TVLChainId.B2]: ['0.2/0.05 BTC', '0.3/0.05 stBTC'],
//   [TVLChainId.B2Testnet]: ['0.2/0.05 BTC', '0.3/0.05 stBTC'],
//   [TVLChainId.LineaMainnet]: ['0.2/1 ETH', '0.3/1 wstETH', '0.1/1'],
//   [TVLChainId.LineaTestnet]: ['0.2/1 ETH', '0.3/1 wstETH', '0.1/1']
// }
const GPNumber: Record<TVLChainId, string> = {
  [TVLChainId.B2]: '40,000,000',
  [TVLChainId.B2Testnet]: '40,000,000',
  [TVLChainId.LineaMainnet]: '2,000,000',
  [TVLChainId.LineaSepolia]: '2,000,000'
}

const stakeAmountListConfig: Record<TVLChainId, string[]> = {
  [TVLChainId.B2]: ['0.25 '],
  [TVLChainId.B2Testnet]: ['0.25 '],
  [TVLChainId.LineaMainnet]: ['5 '],
  [TVLChainId.LineaSepolia]: ['5 ']
}
export const useAirdropPointsTooltip = () => {
  const tvlStakingData = useRecoilValue<Record<TVLChainId | ChainId, Record<string, ITVLStakingData>>>(tvlStakingDataState)
  const isTvlDataLoading = useRecoilValue(isTvlDataLoadingState)
  const getTooltip = useCallback(
    ({ chainId, mintMinimum }: { chainId: ChainId; mintMinimum: string }) => {
      const stakingData = Object.values(tvlStakingData[chainId]).filter(vs => vs.address !== AddressZero)
      const SBTWarn = stakingData.map(
        v => `${v.userStakedAmountStr}/${mintMinimum} ${v.symbol === `W${Currency[chainId]}` ? Currency[chainId] : v.symbol}`
      )
      const CrHero = stakingData.map(v => `${v.getMinStake} ${v.symbol === `W${Currency[chainId]}` ? Currency[chainId] : v.symbol}`).join(' / ')
      return {
        airdropPointsTooltip: [
          `Points earned from staking will grow according to the following formula: X * Amount of ${Currency[chainId]} * Staking Duration, where the X variable is determined by your stake amount.`
          // `The points earned by staking will grow according to the formula: X * Amount of ${Currency[chainId]} * Staking duration, and the X variable depends on your stake amount.`
          // '(Airdrop points also include additional airdrop point rewards obtained by completing the team.)'
        ],
        growthCoefficientNativeTooltip: [
          'The growth coefficient of airdrop points is based on the amount staked. The higher your stake, the greater the coefficient. ',
          '',
          'Note: The coefficients for staking and restaking are different.'
        ],
        growthCoefficientTooltip: [
          'The growth coefficient of airdrop points is based on the amount staked. The higher your stake, the greater the coefficient. ',
          '',
          'Note: The coefficients for staking and restaking are different.'
        ],
        SBTTooltip: [
          'Stake any amount of token and meet the minimum amount requirements to obtain Gas-free SBT. Users with SBT can enjoy gas-free gaming on Zytron Layer 3.',
          'Staking Requirements',
          ...(mintMinimum && mintMinimum !== '' ? SBTWarn : [])
        ],
        crHeroTooltip: [
          'CR Hero Mystery Box Rewards',
          'Available for the game Crypto Rumble.',
          '1. Total issuance: 10,000 CR hero mystery boxes.',
          `2. For every ${CrHero} staked, you will receive a hero mystery box.`,
          '3. There is no upper limit on the number of boxes an address can earn, while supplies last.'
        ],
        //         $GP rewards are settled weekly. Based on last week’s stake status.

        //  Note: The profit is $GP and the value is a constant $ETH ( 1 $ETH = 2,000,000 $GP). $GP can only be circulated in games within the platform and cannot be transferred. We will lift the restrictions on converting $GP into ETH and transferring $GP between accounts in the future.
        gpTooltip: [
          'Rewards are settled weekly, based on the previous week’s staking status.',
          '',
          `$GP Value: 1 $${Currency[chainId]} = ${GPNumber[chainId as unknown as TVLChainId]} $GP`,
          `Note: $GP can only be used within platform games and is non-transferable. In the future, restrictions on converting $GP to ${Currency[chainId]} and transferring $GP between accounts will be lifted.`
        ]
      }
    },
    [JSON.stringify(tvlStakingData), isTvlDataLoading]
  )

  return {
    getTooltip
  }
}

export const useTeamTooltip = () => {
  const { chainId } = useActiveWeb3React()

  const { availableInvitationsTooltip } = useMemo(() => {
    return {
      availableInvitationsTooltip: [
        `1. Stake ${minStakingValue[chainId as unknown as TVLChainId]} ${Currency[chainId]} for the first time to activate 5 invitation codes.`,
        '2. Successfully invite 2 players to receive 2 additional invitation codes.',
        '3. Invite 2 more players to unlock 3 more invitation codes.',
        '4. Complete 1 group goal to activate 1 additional invitation code.',
        `5. If the total group stake reaches ${stakeAmountListConfig[chainId as unknown as TVLChainId][0]}${
          Currency[chainId]
        }, a permanent invitation code will be awarded.`
      ]
    }
  }, [chainId])
  return {
    availableInvitationsTooltip
  }
}
