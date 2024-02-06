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

interface Params {
  [key: string]: string | string[]
}

export function handlePagePath(params: Params, path: string): string {
  if (params._id) {
    return `${path.split('/')[path.split('/').length - 2]} / Update`
  }
  if (path.split('/').pop() === 'create') {
    return `${path.split('/')[path.split('/').length - 2]} / Create`
  }
  return `${path.split('/').pop()}`
}
