import React, { memo, useEffect, useState } from 'react'
export interface IImageProps {
  src: string
  alt?: string
  className?: string
  cb?: any
  errCb?: any
}

const MAX_RETRY_ATTEMPTS = 3 // 最大重试次数
const RETRY_DELAY = 2000 // 重试间隔时间，单位为毫秒

const ImageLoader: React.FC<IImageProps> = memo(({ src, className, alt, cb, errCb }: IImageProps) => {
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

  return <>{!isLoading && !error && <img src={src} alt={alt} className={`${className ?? ''}`} />}</>
})

export default ImageLoader
