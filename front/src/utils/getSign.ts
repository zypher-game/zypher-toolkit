import { getProvider } from '@UI/src/'
import * as ethers from 'ethers'

export async function getSign(dataToSign: string, account: string | undefined | null): Promise<void | ethers.Signature> {
  if (!account) {
    return
  }
  try {
    const sign = await getWeb3Sign(dataToSign, account)
    if (!sign) {
      return
    }
    return ethers.utils.splitSignature(sign as string)
  } catch (e) {
    return
  }
}

export async function getWeb3Sign(dataToSign: string, account: string, isArrayify = true): Promise<boolean | string> {
  if (!account) {
    return false
  }
  const provider = await getProvider()
  const signer = provider.getSigner(account)
  return await signer.signMessage(isArrayify ? ethers.utils.arrayify(dataToSign) : dataToSign)
}