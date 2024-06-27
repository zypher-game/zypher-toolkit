import { useEffect, useState } from 'react'

const useScrollPosition = (): number => {
    const [scrollPosition, setScrollPosition] = useState(0)

    useEffect(() => {
        let requestRunning: number | null = null
        const updatePosition = (): void => {
            if (requestRunning === null) {
                requestRunning = window.requestAnimationFrame(() => {
                    setScrollPosition(window.pageYOffset)
                    requestRunning = null
                })
            }
        }
        window.addEventListener('scroll', updatePosition)
        updatePosition()
        return () => window.removeEventListener('scroll', updatePosition)
    }, [])

    return scrollPosition
}

export default useScrollPosition
