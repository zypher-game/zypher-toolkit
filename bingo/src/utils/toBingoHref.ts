import { BASE_URL } from './config'

export const toBingoHref = ({ chainIdParams, navigate, pathname }: { chainIdParams: string; navigate: any; pathname?: string }): any => {
  return toHref({
    link: `/${BASE_URL}/${chainIdParams}/`,
    navigate: navigate,
    isOpen: false
  })
}

export const toBingoPlayHref = ({
  chainIdParams,
  navigate,
  path,
  pathname
}: {
  chainIdParams: string
  navigate: any
  path?: string
  pathname?: string
}): any => {
  return toHref({
    link: `/${BASE_URL}/${chainIdParams}/play${path ?? ''}`,
    navigate,
    pathname,
    isOpen: false
  })
}

const toHref = ({ link, navigate, isOpen, pathname }: { link: string; navigate?: any; isOpen?: boolean; pathname?: string }) => {
  setTimeout(() => {
    try {
      if (isOpen) {
        window.open(link, '_blank')
      } else {
        if (link.indexOf('http') > -1) {
          window.open(link, '_blank')
        } else {
          if (pathname === link) {
            window.location.reload()
          } else {
            navigate(link)
          }
        }
      }
    } catch (e) {
      window.location.href = link
    }
  }, 0)
  return
}
