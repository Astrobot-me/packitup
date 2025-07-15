import { useEffect, useState } from "react"

type PropType = {
    key: string,
    value: string
}

export default function useLocalStorage({ key, value }: PropType) {

    const [storedValue, setstoredValue] = useState(() => {

        if (typeof window === undefined) return value;
        try {
            const savedValue = window.localStorage.getItem(key)
            return savedValue ? savedValue : value;
        } catch (error) {
            return value
        }
    })

    const setValue = (value: string) => {
        try {

            if (typeof window !== undefined) {
                setstoredValue(value)
                window.localStorage.setItem(key, value)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return [storedValue, setValue] as const; 
}