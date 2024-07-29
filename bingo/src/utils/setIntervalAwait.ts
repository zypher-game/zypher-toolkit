export const setIntervalAwait = (fun: () => Promise<any>, time: number) => {
  let timer: NodeJS.Timeout
  let closed = false
  const run = () => {
    if (closed) {
      return
    }
    fun().then(() => {
      if (closed) {
        return
      }
      timer = setTimeout(run, time)
    })
  }
  run()

  return () => {
    closed = true
    if (timer) {
      clearTimeout(timer)
    }
  }
}
