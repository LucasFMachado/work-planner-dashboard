'use client'

import { motion } from 'framer-motion'

export function Loading() {
  return (
    <div className="h-full flex justify-center">
      <div className="p-4 rounded-md">
        <div className="flex justify-center">
          <>
            <motion.span
              className="w-4 h-4 my-8 mx-2 bg-blue-600 rounded-full"
              animate={{
                y: [0, -20, 0],
                opacity: [1, 0],
                transition: { duration: 0.9, repeat: Infinity },
              }}
            />
            <motion.span
              className="w-4 h-4 my-8 mx-2 bg-blue-600 rounded-full"
              animate={{
                y: [0, -20, 0],
                opacity: [1, 0],
                transition: { duration: 0.9, repeat: Infinity, delay: 0.2 },
              }}
            />
            <motion.span
              className="w-4 h-4 my-8 mx-2 bg-blue-600 rounded-full"
              animate={{
                y: [0, -20, 0],
                opacity: [1, 0],
                transition: { duration: 0.9, repeat: Infinity, delay: 0.4 },
              }}
            />
          </>
        </div>
      </div>
    </div>
  )
}
