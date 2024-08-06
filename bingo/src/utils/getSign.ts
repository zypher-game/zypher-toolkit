import { getProvider } from '@ui/src'
import * as ethers from 'ethers'

export async function getWeb3Sign(dataToSign: string, account: string, isArrayify = true, walletClient: any): Promise<boolean | string> {
  if (!account) {
    return false
  }
  console.log({ dataToSign })
  if (window.IS_TELEGRAM) {
    window.isArrayify = isArrayify
    window.dataToSign = dataToSign
    return await walletClient?.signMessage({
      message: dataToSign,
      account: account
    })
  } else {
    const provider = await getProvider()
    const signer = provider.getSigner(account)
    const data = isArrayify ? ethers.utils.arrayify(dataToSign) : dataToSign
    return await signer.signMessage(data)
  }
}
export async function getEIP712Sign(domain: any, types: any, data: any, account: string): Promise<boolean | string> {
  if (!account) {
    return false
  }
  const provider = await getProvider()
  const signer = provider.getSigner(account)

  const signature = await signer._signTypedData(domain, types, data)
  return signature
}
