// import { ChainId, ChainRpcUrls, Gas0Constants, getContractFromRpc, getProvider, useActiveWeb3React, useWalletClient } from '@ui/src'
// import { PermitProxyAbi } from '@ui/src/gas0/abis/PermitProxy'
// import { sample } from 'lodash'
// import { getAddress } from 'viem'
import { useAaWallet } from '@ui/src'
import { aaApprove } from '@ui/src/gas0/utils/aaApproveAndFcErc20'
import { useEffect } from 'react'

export const useRead = () => {
  const { wallet, aaWalletClient: walletClient, aa, aa_mm_address } = useAaWallet()

  useEffect(() => {
    if (wallet && aa_mm_address) {
      // aaApprove({ wallet })
    }
    //   const data = async () => {
    //     try {
    //       const tokenProxy = Gas0Constants[ChainId.ZytronLineaMain].PermitProxy
    //       const res = await fetch('https://zytron-linea-mainnet-0gas.zypher.game/api/config')
    //       const json = await res.json()
    //       console.log(json)
    //       const library = await getProvider(sample(ChainRpcUrls[chainId]))
    //       const tpc = await getContractFromRpc({
    //         address: tokenProxy,
    //         abi: PermitProxyAbi,
    //         library,
    //         account
    //       })
    //       const deployer = await tpc.deployer()
    //       const walletCode = await tpc.walletCode()
    //       console.log(json.data)
    //       console.log('deployer', deployer == getAddress(json.data.deployer_address), json.data.deployer_address, deployer)
    //       console.log('walletcode', walletCode === json.data.wallet_bytecode)
    //       console.log('walletCode', walletCode.length, json.data.wallet_bytecode.length)
    //       console.log('walletCode', walletCode.length, json.data.wallet_bytecode.length)
    //     } catch (e) {
    //       console.log('e', e)
    //     }
    //   }
    //   data()
  }, [wallet, aa_mm_address])
}
