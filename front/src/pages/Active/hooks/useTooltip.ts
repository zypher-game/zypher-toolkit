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
  [TVLChainId.LineaTestnet]: '2,000,000'
}

const stakeAmountListConfig: Record<TVLChainId, string[]> = {
  [TVLChainId.B2]: ['0.25 '],
  [TVLChainId.B2Testnet]: ['0.25 '],
  [TVLChainId.LineaMainnet]: ['5 '],
  [TVLChainId.LineaTestnet]: ['5 ']
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
          `The points earned by staking will grow according to the formula: X * Amount of ${Currency[chainId]} * Staking duration, and the X variable depends on your pledge amount.`
          // '(Airdrop points also include additional airdrop point rewards obtained by completing the team.)'
        ],
        growthCoefficientNativeTooltip: [
          'The growth coefficient of airdrop points depends on your pledge amount. The higher the pledge amount, the greater the coefficient.',
          'Note: The coefficients of Staking and Staking are different.'
        ],
        growthCoefficientTooltip: [
          'The growth coefficient of airdrop points depends on your pledge amount. The higher the pledge amount, the greater the coefficient.',
          'Note: The coefficients of Restaking and Staking are different.'
        ],
        SBTTooltip: [
          'Pledge any token and meet the pledge amount requirements to obtain SBT. Users with SBT can experience gas-free gaming on Zytron L3.',
          ...(isTvlDataLoading ? [] : SBTWarn)
        ],
        crHeroTooltip: [
          'Hero mystery box rewards for platformer Crypto Rumble.',
          '1. Total issuance: 10,000 CR  hero mystery boxes.',
          `2. Every time the Staking amount of each address reaches ${CrHero}, a hero blind box will be obtained.`,
          '3. There is no upper limit on the quantity available for each address, while supplies last.'
        ],
        gpTooltip: [
          `$GP rewards are settled weekly. Based on last week’s pledge status. Note: The profit is $GP and the value is constant $${
            Currency[chainId]
          } ( 1 $${Currency[chainId]} = ${
            GPNumber[chainId as unknown as TVLChainId]
          } $GP). $GP can only be circulated in games within the platform and cannot be transferred. You can later sell DP to earn $${
            Currency[chainId]
          } through the [$GP to DP] function.`
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
        `1. After staking ${minStakingValue[chainId as unknown as TVLChainId]} ${Currency[chainId]} for the first time, activate 5 invitation codes.`,
        '2. After successfully inviting 2 players, you will get 2 invitation codes.',
        '3. After successfully inviting 2 more players, you will get 3 invitation codes.',
        '4. Complete 1 group goal and activate 1 invitation code.',
        `5. If the total pledge amount of the group reaches ${stakeAmountListConfig[chainId as unknown as TVLChainId][0]}${
          Currency[chainId]
        }, a permanent invitation code will be obtained.`
      ]
    }
  }, [chainId])
  return {
    availableInvitationsTooltip
  }
}
