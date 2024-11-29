'use client'

import 'react-quill/dist/quill.snow.css'

import dynamic from 'next/dynamic'

export default dynamic(() => import('react-quill'), {
  ssr: false,
})
