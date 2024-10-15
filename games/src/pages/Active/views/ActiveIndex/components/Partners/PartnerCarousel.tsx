import React, { useEffect, useRef } from 'react'

import { partnerPath } from '../../config/config'

interface PartnerCarouselProps {
  partners: string[]
  index: number
  className: string
}

const PartnerCarousel: React.FC<PartnerCarouselProps> = ({ className, partners, index }) => {
  const carouselRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const totalItems = partners.length * 2 // 创建足够的副本以覆盖整个动画过程
    const carouselInner = carouselRef.current

    if (carouselInner) {
      for (let i = 0; i < totalItems; i++) {
        const partnerIndex = i % partners.length
        const newElement = document.createElement('div')
        newElement.className = 'partners_swiper_item'
        newElement.innerHTML = `
          <img src="${partnerPath}/${partners[partnerIndex]}.png" />
        `
        carouselInner.appendChild(newElement)
      }
    }
  }, [partners])
  return (
    <div className={`partners_swiper ${className}`}>
      <div ref={carouselRef} className={`partners_swiper_inner ${index % 2 === 1 ? 'partners_swiper_inner_revose' : ''}`} />
    </div>
  )
}

export default PartnerCarousel
