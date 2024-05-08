import './FrPixelBorder.styl'

import { ActivePixelCard } from '@ui/src'
import React, { memo } from 'react'
const FrPixelBorder = memo(({ children }: { children: React.ReactNode }) => {
  return (
    <ActivePixelCard className="tvlFrPixelBorder" pixel_height={6} backgroundColor="#1D263B">
      {children}
    </ActivePixelCard>
  )
})
export default FrPixelBorder
