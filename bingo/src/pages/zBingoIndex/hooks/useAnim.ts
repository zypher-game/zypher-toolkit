import { useEffect } from 'react'

export const useAnim = () => {
  // useEffect(() => {
  //   const cards = document.querySelectorAll('.innerItem')
  //   const cardsz = document.querySelectorAll('.labelImg')
  //   const timer = setInterval(() => {
  //     const counter = Math.floor(Math.random() * cards.length)
  //     if (cards.length > 0 && cards[counter]) {
  //       cards[counter].classList.add('readyAnimating')
  //       setTimeout(() => {
  //         cards[counter].classList.remove('readyAnimating')
  //       }, 1200 * 2)
  //     }
  //     if (cardsz.length > 0 && cardsz[counter]) {
  //       cardsz[counter].classList.add('labelImgAnim')
  //       setTimeout(() => {
  //         cardsz[counter].classList.remove('labelImgAnim')
  //       }, 400 * 2)
  //     }
  //   }, 2000 * 2)
  //   return () => {
  //     clearInterval(timer) // 清除定时器，避免内存泄漏
  //   }
  // }, [])
}
