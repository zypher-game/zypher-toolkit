export const setIntervalAwait = (fun: () => Promise<any>, time: number, shouldContinue: () => boolean) => {
  let timer: NodeJS.Timeout
  let closed = false
  const run = async () => {
    if (closed || !shouldContinue()) {
      return
    }
    await fun()
    if (closed || !shouldContinue()) {
      return
    }
    timer = setTimeout(run, time)
  }
  run()

  return () => {
    closed = true
    if (timer) {
      clearTimeout(timer)
    }
  }
}
