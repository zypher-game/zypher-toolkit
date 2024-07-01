import { motion } from '@ui/src'
import React, { memo, useEffect, useState } from 'react'
export interface IImageProps {
  src: string
  showMotion?: boolean
  alt?: string
  className?: string
  cb?: any
  errCb?: any
}

const MAX_RETRY_ATTEMPTS = 3 // 最大重试次数
const RETRY_DELAY = 300 // 重试间隔时间，单位为毫秒

const ImageLoader: React.FC<IImageProps> = memo(({ src, showMotion, className, alt, cb, errCb }: IImageProps) => {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)
  const [retryCount, setRetryCount] = useState(0)

  useEffect(() => {
    const loadImage = () => {
      setIsLoading(true)
      const img = new Image()
      img.src = src
      img.onload = () => {
        setIsLoading(false)
        if (cb) {
          cb()
        }
      }
      img.onerror = () => {
        handleImageError()
      }
    }
    const handleImageError = () => {
      if (retryCount < MAX_RETRY_ATTEMPTS && errCb) {
        setTimeout(() => {
          setRetryCount(retryCount + 1)
          errCb(loadImage)
        }, RETRY_DELAY)
      } else {
        setIsLoading(false)
        setError(true)
        if (errCb) {
          errCb()
        }
      }
    }
    loadImage()
  }, [src])

  return (
    <>
      {!isLoading && !error ? (
        showMotion ? (
          <motion.img
            initial={{ x: -100, y: 0 }}
            animate={{
              x: 0,
              y: [-20, 0]
            }}
            transition={{
              x: { duration: 0.4 },
              y: { duration: 0.2, yoyo: Infinity, ease: 'easeOut' } // 跳跃动作
            }}
            decoding="async"
            loading="lazy"
            src={src}
            alt={alt}
            className={`${className ?? ''}`}
          />
        ) : (
          <img decoding="async" loading="lazy" src={src} alt={alt} className={`${className ?? ''}`} />
        )
      ) : null}
    </>
  )
})

export default ImageLoader
