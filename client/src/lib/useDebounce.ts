import { useEffect, useState } from 'react'

export const useDebounce = <T>(
    value: T,
    delay: number,
    cb: (value?: T) => Promise<void>,
    dependencies: (string | number)[]
) => {
    const [debouncedValue, setDebouncedValue] = useState<T>(value)
    useEffect(() => {
        const handler = setTimeout(async () => {
            setDebouncedValue(value)
            await cb(value)
        }, delay)

        return () => {
            clearTimeout(handler)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [...dependencies, delay])

    return debouncedValue
}
