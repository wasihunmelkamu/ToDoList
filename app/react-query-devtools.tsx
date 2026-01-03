'use client'

import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

export default function ReactQueryDevtoolsWrapper() {
  return <ReactQueryDevtools initialIsOpen={false} />
}
