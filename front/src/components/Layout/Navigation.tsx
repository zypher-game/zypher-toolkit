import { preStaticUrl, useIsMd1220 } from '@ui/src'
import React, { forwardRef, memo, Ref, useCallback, useEffect, useRef, useState } from 'react'
import { Link, LinkProps } from 'react-router-dom'

import sleep from '@/utils/sleep'
export const NavKey = [['airdrop'], ['', 'games']]
type NavLinkProps = {
  label: string
  ref: Ref<HTMLAnchorElement> | undefined
}

const NavLink: React.FC<NavLinkProps & Omit<LinkProps, 'children'>> = forwardRef(({ label, ...rest }: NavLinkProps & LinkProps, ref) => (
  <Link {...rest} ref={ref}>
    {label}
  </Link>
))

const Navigation: React.FC<{ pathname: string }> = memo(({ pathname }: { pathname: string }) => {
  const [chooseIndex, setChooseIndex] = useState<number | null | undefined>(null)
  const [activeIndex, setActiveIndex] = useState<number | null | undefined>(null)
  const linksRefs = useRef<(HTMLAnchorElement | null)[]>([])
  const isM1200 = useIsMd1220()
  const init = useCallback(async () => {
    if (!isM1200) {
      let index = null
      if (NavKey[0].includes(pathname)) {
        index = 0
      } else if (NavKey[1].includes(pathname)) {
        index = 1
      }
      if (index !== null) {
        setChooseIndex(index)
        setActiveIndex(index)
      }
    }
  }, [pathname, isM1200])
  useEffect(() => {
    init()
  }, [init])
  const init2 = useCallback(async () => {
    if (!isM1200) {
      linksRefs.current.forEach((linkRef, index) => {
        if (linkRef?.className === 'nav_on') {
          setActiveIndex(index)
        }
        if (chooseIndex !== null) {
          const handleMouseEnter = () => {
            setActiveIndex(index)
          }
          const handleMouseLeave = () => {
            setActiveIndex(chooseIndex)
          }
          if (linkRef) {
            linkRef.addEventListener('mouseenter', handleMouseEnter)
            linkRef.addEventListener('mouseleave', handleMouseLeave)

            // 清理回调函数，防止内存泄漏
            return () => {
              linkRef.removeEventListener('mouseenter', handleMouseEnter)
              linkRef.removeEventListener('mouseleave', handleMouseLeave)
            }
          }
        }
      })
    }
  }, [isM1200, chooseIndex, pathname])
  useEffect(() => {
    init2()
  }, [init2])
  const updateLinePosition = useCallback(async () => {
    if (activeIndex !== null && activeIndex !== undefined && linksRefs.current[activeIndex]) {
      const line = document.querySelector('.pixel_line') as HTMLElement
      const link = linksRefs.current[activeIndex]
      if (link) {
        const linkWidth = link.offsetWidth
        if (linkWidth) {
          const leftPosition = link.offsetLeft + (linkWidth - 36) / 2
          line.style.width = '36px'
          line.style.left = `${leftPosition}px`
          if (chooseIndex !== activeIndex) {
            line.style.opacity = '0.8'
          }
        } else {
          await sleep(0.7)
          updateLinePosition()
        }
      }
    }
  }, [chooseIndex, activeIndex, pathname])
  useEffect(() => {
    updateLinePosition()
  }, [updateLinePosition])

  return (
    <div className="nav">
      {/* <NavLink
        to={NavKey[0][0]}
        label="Airdrop"
        className={`${NavKey[0].includes(pathname) ? 'nav_on' : ''}`}
        ref={ref => (linksRefs.current[0] = ref)}
      /> */}
      <NavLink
        to={NavKey[1][0]}
        label="Games"
        className={`${NavKey[1].includes(pathname) ? 'nav_on' : ''}`}
        ref={ref => (linksRefs.current[1] = ref)}
      />
      <a href="https://zypher.network/" target="_blank" rel="noreferrer" ref={ref => (linksRefs.current[2] = ref)}>
        Zypher Network
        <img src={preStaticUrl + '/img/icon/pixel_link.svg'} alt="pixel_link" className="nav_img" />
      </a>
      <div className="pixel_line" />
    </div>
  )
})

export default Navigation
