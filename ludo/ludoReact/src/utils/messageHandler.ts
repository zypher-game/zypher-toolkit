export const setupMessageHandler = (walletClient: any, aa_mm_address: any, walletFunctions: any) => {
  const { setDialogOpen, handleWeb3Info, handleCallStatus, handleStart, handleSubmit, handleVerify, handleWasm, handleCheckIn, handleClaim } =
    walletFunctions

  const messageHandler = async (event: any) => {
    console.log(event)
    console.log(event.data)
    const { method, args } = event.data
    setDialogOpen(true)
    if (undefined == method) {
      return
    }
    console.log('Received message:', method, args)
    try {
      switch (method) {
        case 'handleCallStatus':
          const status = await handleCallStatus()
          console.log('handleCallStatus:', status)
          event.source?.postMessage({ method: 'callStatusResponse', status }, event.origin)
          break

        case 'handleStart':
          console.log('handleStart', args)
          const txHashStart = await handleStart(...args)
          event.source?.postMessage({ method: 'startResponse', txHash: txHashStart }, event.origin)
          break
        case 'handleCheckIn':
          console.log('handleCheckIn', args)
          const txHashCheckIn = await handleCheckIn(...args)
          event.source?.postMessage({ method: 'checkInResponse', txHash: txHashCheckIn }, event.origin)
          break
        case 'handleClaim':
          console.log('handleClaim', args)
          const txHashClaim = await handleClaim(...args)
          event.source?.postMessage({ method: 'claimResponse', txHash: txHashClaim }, event.origin)
          break
        case 'handleSubmit':
          console.log('handleSubmit', args)
          const txHashSubmit = await handleSubmit(...args)
          event.source?.postMessage({ method: 'submitResponse', txHash: txHashSubmit }, event.origin)
          break

        case 'handleVerify':
          const verify = await handleVerify(...args)
          event.source?.postMessage({ method: 'callVerifyResponse', verify }, event.origin)
          break

        case 'handleWasm':
          const wasmData = await handleWasm(...args)
          event.source?.postMessage({ method: 'callWasmResponse', wasmData }, event.origin)
          break

        case 'handleWeb3Info':
          console.log('handleWeb3Info    :   ', args)
          const web3Info = await handleWeb3Info(...args)
          event.source?.postMessage({ method: 'callWeb3InfoResponse', web3Info }, event.origin)
          break

        default:
          console.log('Unknown method:', method)
          break
      }
    } catch (error: any) {
      console.error(`${method} 出错:`, error)
      event.source?.postMessage({ method: `${method}Response`, error: error.message }, event.origin)
    }
  }

  window.addEventListener('message', messageHandler)

  return () => {
    window.removeEventListener('message', messageHandler)
  }
}
