import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatProotcol(protocolNumber: number): string {
  if (!protocolNumber) {
    return ''.padStart(6, '0')
  }
  return String(protocolNumber).padStart(6, '0')
}
