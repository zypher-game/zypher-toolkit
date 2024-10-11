export const getHrefCode = (): string | undefined => {
  const url = new URL(window.location.href)
  const params = new URLSearchParams(url.search)
  let code = params.get('code')?.trim()
  if (!code) {
    const hashParams = new URLSearchParams(window.location.hash.split('?')[1])
    code = hashParams.get('code')?.trim()
  }
  if (!code) {
    const pathname = window.location.pathname
    if (pathname && (pathname.startsWith('/B') || pathname.startsWith('/L'))) {
      code = pathname.substring(1)
    }
  }
  return code
}
