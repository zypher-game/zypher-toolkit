import { useEffect, useState } from 'react'

function debounce<T extends (...args: any[]) => any>(ms: number, callback: T): (...args: Parameters<T>) => Promise<ReturnType<T>> {
    let timer: NodeJS.Timeout | undefined

    return (...args: Parameters<T>) => {
        if (timer) {
            clearTimeout(timer)
        }
        return new Promise<ReturnType<T>>(resolve => {
            timer = setTimeout(() => {
                const returnValue = callback(...args) as ReturnType<T>
                resolve(returnValue)
            }, ms)
        })
    }
}

function useScrollDirection(time = 100) {
    if (typeof window === 'undefined') return
    const isClient = typeof window === 'object'

    const getSize = () => {
        return isClient ? window.scrollY : undefined
    }

    const [_, setScrollY] = useState(getSize())
    const [scrollDirection, setScrollDirection] = useState<string | undefined>()

    useEffect(() => {
        if (!isClient) {
            return
        }

        const debouncedHandleScroll = debounce(time, () => {
            const newY = getSize()
            setScrollY(prevState => {
                if (prevState !== undefined && newY !== undefined) {
                    setScrollDirection(prevState > newY ? 'up' : 'down')
                    return newY
                }
                setScrollDirection('down')
                return 0
            })
        })

        window.addEventListener('scroll', debouncedHandleScroll)
        return () => {
            window.removeEventListener('scroll', debouncedHandleScroll)
        }
    }, [])

    if (scrollDirection === undefined) return

    return scrollDirection
}

export default useScrollDirection
