// declare module '@ui/src' {
//   export * from '@ui/ui'
// }
declare global {
  interface Window {
    env: string
    isGames: boolean
  }
}

import 'react'
declare module 'react' {
  interface ImgHTMLAttributes<T> extends React.HTMLAttributes<T> {
    fetchPriority?: 'high' | 'low' | 'auto'
  }
}
