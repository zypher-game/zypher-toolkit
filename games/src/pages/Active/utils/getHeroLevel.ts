import { ChainId, divisorBigNumber } from '@ui/src'
import { BigNumberJs } from '@ui/src'
import { utils } from 'ethers'

// 定义等级对应的质押阈值数组
const DEFAULT_LEVEL_THRESHOLDS = [
  // utils.parseUnits('1', 'ether').toString(),
  utils.parseUnits('3', 'ether').toString(),
  utils.parseUnits('5', 'ether').toString()
]

const B2_LEVEL_THRESHOLDS = [
  // utils.parseUnits('0.5', 'ether').toString(),
  utils.parseUnits('1.5', 'ether').toString(),
  utils.parseUnits('2.5', 'ether').toString()
]

export const getHeroLevel = ({ stake, chainId }: { stake: string; chainId: ChainId }): '1' | '2' | '3' => {
  let thresholds: string[]
  if (chainId === ChainId.B2 || chainId === ChainId.B2Testnet) {
    thresholds = B2_LEVEL_THRESHOLDS
  } else {
    thresholds = DEFAULT_LEVEL_THRESHOLDS
  }
  const stakeAmount = new BigNumberJs(stake)
  for (let i = 0; i < thresholds.length; i++) {
    if (stakeAmount.lte(new BigNumberJs(thresholds[i]))) {
      return `${i + 1}` as '1' | '2' | '3'
    }
  }

  // 如果超过所有阈值，返回最高级
  return `${thresholds.length}` as '1' | '2' | '3'
}
