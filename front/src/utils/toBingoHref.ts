export const toBingoHref = ({ navigate }: { navigate: any }) => {
  toHref({
    link: '/bingo/',
    navigate,
    isOpen: true
  })
  return
}

export const toBingoPlayHref = ({ navigate, path }: { navigate: any; path?: string }) => {
  toHref({
    link: `/bingo/#/play${path ?? ''}`,
    navigate,
    isOpen: false
  })
  return
}

export const toBingoPlayOpen = ({ navigate, path }: { navigate: any; path?: string }) => {
  toHref({
    link: `/bingo/#/play${path ?? ''}`,
    navigate,
    isOpen: true
  })
  return
}
const toHref = ({ link, navigate, isOpen }: { link: string; navigate: any; isOpen?: boolean }) => {
  setTimeout(() => {
    try {
      if (isOpen) {
        window.open(link, '_blank')
      } else {
        if (link.indexOf('http') > -1) {
          window.open(link, '_blank')
        } else {
          navigate(link)
        }
      }
    } catch (e) {
      window.location.href = link
    }
  }, 200)
  return
}
