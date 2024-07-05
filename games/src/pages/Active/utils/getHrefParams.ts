export const getHrefCode = (): string | undefined => {
  const url = new URL(window.location.href)
  const params = new URLSearchParams(url.search)
  let code = params.get('code')?.trim()
  if (!code) {
    const hashParams = new URLSearchParams(window.location.hash.split('?')[1])
    console.log({ hashParams, code })
    code = hashParams.get('code')?.trim()
  }
  if (!code) {
    const pathname = window.location.pathname
    if (pathname && pathname.startsWith('/L' || '/B')) {
      console.log({ pathname, code })
      code = pathname.substring(1)
    }
  }
  console.log({ code })
  return code
}
