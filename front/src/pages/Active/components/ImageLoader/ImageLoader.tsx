import React, { memo, useEffect, useState } from 'react'
export interface IImageProps {
  src: string
  alt?: string
  className?: string
  cb?: any
  errCb?: any
}

const ImageLoader: React.FC<IImageProps> = memo(({ src, className, alt, cb, errCb }: IImageProps) => {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
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
      setIsLoading(false)
      setError(true)
      setIsLoading(false)
      if (errCb) {
        errCb()
      }
    }
  }, [src])
  return <>{!isLoading && !error && <img src={src} alt={alt} className={`${className ?? ''}`} />}</>
})

export default ImageLoader
