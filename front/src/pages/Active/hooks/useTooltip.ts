import { ChainId, Currency, useActiveWeb3React } from '@ui/src'
import { useCallback, useMemo } from 'react'

import { TVLChainId } from '../constants/activeConstants'
const CrHero: Record<TVLChainId, string> = {
  [TVLChainId.Sepolia]: '0.5 ETH / 0.5 wstETH / 0.5 ezETH',
  [TVLChainId.B2]: '0.025 BTC / 0.025 stBTC',
  [TVLChainId.B2Testnet]: '0.025 BTC / 0.025 stBTC',
  [TVLChainId.LineaMainnet]: '0.5 ETH / 0.5 wstETH / 0.5 ezETH',
  [TVLChainId.LineaTestnet]: '0.5 ETH / 0.5 wstETH / 0.5 ezETH'
}

const SBTWarn: Record<TVLChainId, string[]> = {
  [TVLChainId.Sepolia]: ['0.2/1 ETH', '0.3/1 wstETH', '0.1/1'],
  [TVLChainId.B2]: ['0.2/0.05 BTC', '0.3/0.05 stBTC'],
  [TVLChainId.B2Testnet]: ['0.2/0.05 BTC', '0.3/0.05 stBTC'],
  [TVLChainId.LineaMainnet]: ['0.2/1 ETH', '0.3/1 wstETH', '0.1/1'],
  [TVLChainId.LineaTestnet]: ['0.2/1 ETH', '0.3/1 wstETH', '0.1/1']
}
const GPNumber: Record<TVLChainId, string> = {
  [TVLChainId.Sepolia]: '2,000,000',
  [TVLChainId.B2]: '40,000,000',
  [TVLChainId.B2Testnet]: '40,000,000',
  [TVLChainId.LineaMainnet]: '2,000,000',
  [TVLChainId.LineaTestnet]: '2,000,000'
}

const stakeAmountListConfig: Record<TVLChainId, string[]> = {
  [TVLChainId.Sepolia]: ['0.01', '5'],
  [TVLChainId.B2]: ['0.0005', '0.25'],
  [TVLChainId.B2Testnet]: ['0.0005', '0.25'],
  [TVLChainId.LineaMainnet]: ['0.01'],
  [TVLChainId.LineaTestnet]: ['0.01']
}
export const useAirdropPointsTooltip = () => {
  const getTooltip = useCallback((chainId: ChainId) => {
    return {
      airdropPointsTooltip: [
        `The points earned by staking will grow according to the formula: X * Amount of ${Currency[chainId]} * Staking duration, and the X variable depends on your pledge amount.`,
        '(Airdrop points also include additional airdrop point rewards obtained by completing the team.)'
      ],
      growthCoefficientTooltip: [
        'The growth coefficient of airdrop points depends on your pledge amount. The higher the pledge amount, the greater the coefficient.',
        'Note: The coefficients of Staking and Restaking are different.'
      ],
      SBTTooltip: [
        'Pledge any token and meet the pledge amount requirements to obtain SBT. Users with SBT can experience gas-free gaming on Zytron L3.',
        ...(SBTWarn[chainId as unknown as TVLChainId] ?? [])
      ],
      crHeroTooltip: [
        'Hero mystery box rewards for platformer Crypto Rumble.',
        '1. Total issuance: 10,000 CR  hero mystery boxes.',
        `2. Every time the Staking amount of each address reaches ${CrHero[chainId as unknown as TVLChainId]}, a hero blind box will be obtained.`,
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
      ],
      availableInvitationsTooltip: [
        `1. After staking ${(stakeAmountListConfig[chainId as unknown as TVLChainId] ?? [])[0]}${
          Currency[chainId]
        } for the first time, activate 5 invitation codes.`,
        '2. After successfully inviting 2 players, you will get 2 invitation codes.',
        '3. After successfully inviting 2 more players, you will get 3 invitation codes.',
        '4. Complete 1 group goal and activate 1 invitation code.',
        `5. If the total pledge amount of the group reaches ${(stakeAmountListConfig[chainId as unknown as TVLChainId] ?? ['-', '-'])[1]}${
          Currency[chainId]
        }, a permanent invitation code will be obtained.`
      ]
    }
  }, [])

  return {
    getTooltip
  }
}

export const useTeamTooltip = () => {
  const { chainId } = useActiveWeb3React()

  const { availableInvitationsTooltip } = useMemo(() => {
    return {
      availableInvitationsTooltip: [
        `1. After staking ${stakeAmountListConfig[chainId as unknown as TVLChainId][0]}${
          Currency[chainId]
        } for the first time, activate 5 invitation codes.`,
        '2. After successfully inviting 2 players, you will get 2 invitation codes.',
        '3. After successfully inviting 2 more players, you will get 3 invitation codes.',
        '4. Complete 1 group goal and activate 1 invitation code.',
        `5. If the total pledge amount of the group reaches ${stakeAmountListConfig[chainId as unknown as TVLChainId][1]}${
          Currency[chainId]
        }, a permanent invitation code will be obtained.`
      ]
    }
  }, [chainId])
  return {
    availableInvitationsTooltip
  }
}
