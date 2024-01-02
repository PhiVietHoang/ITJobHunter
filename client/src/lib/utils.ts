import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function arrayToText(array: string[]) {
    return array.join('; ')
}

export function textToArray(text: string) {
    return text.split(';').map((item) => item.trim())
}
