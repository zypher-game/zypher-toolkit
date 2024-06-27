import BigNumber from 'bignumber.js'

export function getSupplyApy(supplyRatePerBlock: BigNumber): BigNumber {
    const blockTime = 13.5 // seconds
    const mantissa = 1e18 // mantissa is the same even the underlying asset has different decimals
    const blocksPerDay = (24 * 60 * 60) / blockTime
    const daysPerYear = 365

    const supplyApy = new BigNumber(Math.pow((supplyRatePerBlock.toNumber() / mantissa) * blocksPerDay + 1, daysPerYear - 1) - 1)
    return supplyApy
}
