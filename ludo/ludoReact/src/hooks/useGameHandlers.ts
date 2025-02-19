import { useActiveWeb3React } from '@ui/src'
import { groth16 } from 'snarkjs'

// 将所有处理函数放入组件内部
const useWalletFunctions = () => {
  const { chainId, account } = useActiveWeb3React()

  const handleWeb3Info = async () => {
    try {
      const web3Info = { account: account, chainId: chainId }
      console.log('Current handleWeb3Info:', web3Info)
      return web3Info // 确保返回状态
    } catch (error) {
      console.error('获取handleWeb3Info时出错:', error)
    }
  }

  const handleWasm = async (input: any) => {
    console.log('input: ', input)

    try {
      const data = await groth16.fullProve(input, '/zk/main_game.wasm', '/zk/main_game_final.zkey')
      console.log('handleWasm:', data)
      const { proof, publicSignals } = data
      console.log('proof:', proof)
      console.log('publicSignals:', publicSignals)
      return data // 返回状态数据
    } catch (error) {
      console.error('handleWasm 获取状态时出错:', error)
      throw error
    }
  }

  return {
    handleWeb3Info,
    handleWasm
  }
}

export default useWalletFunctions
