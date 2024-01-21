'use client'

import { FaCheckCircle, FaInfoCircle, FaTimesCircle } from 'react-icons/fa'
import { toast } from 'sonner'

import { ToastVariant } from '@/lib/types/toast.types'

interface ToastProps {
  type: ToastVariant
  message: string
  description?: string
}

export function useToast() {
  const showToast = ({ type, message, description }: ToastProps) => {
    const icon = {
      success: <FaCheckCircle />,
      error: <FaTimesCircle />,
      info: <FaInfoCircle />,
    }

    toast(message, {
      duration: 2500,
      description,
      icon: icon[type],
      position: 'top-right',
      className: `toast-message toast-${type}`,
    })
  }

  return {
    showToast,
  }
}
