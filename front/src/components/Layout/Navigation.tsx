import { preStaticUrl, useIsW1220, useWindowSize } from '@ui/src'
import React, { forwardRef, memo, Ref, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Link, LinkProps } from 'react-router-dom'

import sleep from '@/utils/sleep'
export const NavKey = [['', 'airdrop', 'airdropLoading'], ['games'], ['zeroGas']]
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
  const { width } = useWindowSize()
  const { isW768, isW1670, isWBig } = useMemo(() => {
    return {
      isW768: width <= 768,
      isW1540: width <= 1540 && width > 768,
      isW1670: width < 1670 && width > 1540,
      isWBig: width >= 1670
    }
  }, [width])
  const init = useCallback(async () => {
    if (!isW768) {
      const index = NavKey.findIndex(key => key.includes(pathname))
      console.log({ sdafasdf: index })
      if (index > -1) {
        setChooseIndex(index)
        setActiveIndex(index)
      }
    }
  }, [pathname, isW768])
  useEffect(() => {
    init()
  }, [init])
  const init2 = useCallback(async () => {
    if (!isW768) {
      linksRefs.current.forEach(async (linkRef, index) => {
        if (linkRef?.className === 'nav_on') {
          const w = hasFontWeight600(linkRef)
          if (!w) {
            await sleep(0.2)
          }
          if (w) {
            console.log({ linkRefclassName: index })
            setActiveIndex(index)
          }
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
  }, [chooseIndex, pathname])
  useEffect(() => {
    init2()
  }, [chooseIndex, pathname])

  const updateLinePosition = useCallback(async () => {
    if (activeIndex !== null && activeIndex !== undefined && linksRefs.current[activeIndex]) {
      const line = document.querySelector('.pixel_line') as HTMLElement
      const link = linksRefs.current[activeIndex]
      if (link) {
        const linkWidth = link.offsetWidth
        if (linkWidth) {
          const leftPosition = link.offsetLeft + (linkWidth - 36) / 2
          line.style.width = '36px'
          line.style.left = `${leftPosition}px` // 67px   71px
          if (chooseIndex !== activeIndex) {
            line.style.opacity = '0.8'
          }
        } else {
          await sleep(0.7)
          updateLinePosition()
        }
      }
    }
  }, [chooseIndex, activeIndex, pathname, linksRefs])
  useEffect(() => {
    updateLinePosition()
  }, [chooseIndex, activeIndex, pathname])
  console.log({ isW768, isW1670, isWBig })
  useEffect(() => {
    ;(async () => {
      await sleep(0.3)
      updateLinePosition()
    })()
  }, [isW768, isW1670, isWBig])
  return (
    <div className="nav">
      <NavLink
        to={NavKey[0][0]}
        label="Airdrop"
        className={`nav_airdrop ${NavKey[0].includes(pathname) ? 'nav_on' : ''}`}
        ref={ref => (linksRefs.current[0] = ref)}
      />
      <NavLink
        to={NavKey[1][0]}
        label="Games"
        className={`nav_games ${NavKey[1].includes(pathname) ? 'nav_on' : ''}`}
        ref={ref => (linksRefs.current[1] = ref)}
      />
      <NavLink
        to={NavKey[2][0]}
        label="Zero Gas"
        className={`nav_zero_gas ${NavKey[2].includes(pathname) ? 'nav_on' : ''}`}
        ref={ref => (linksRefs.current[2] = ref)}
      />
      <a className="nav_network" href="https://zypher.network/" target="_blank" rel="noreferrer" ref={ref => (linksRefs.current[3] = ref)}>
        Zypher Network
        <img src={preStaticUrl + '/img/icon/pixel_link.svg'} alt="pixel_link" className="nav_img" />
      </a>
      <div className="pixel_line" />
    </div>
  )
})
function hasFontWeight600(element: HTMLAnchorElement | null): boolean {
  if (!element) {
    return false
  }

  const computedStyle = window.getComputedStyle(element)
  const fontWeight = computedStyle.getPropertyValue('font-weight')
  console.log({ fontWeight })
  // 类型断言，确保 fontWeight 是 string 类型，尽管在实际应用中这应该是安全的
  return fontWeight === ('600' as unknown as string)
}
export default Navigation
