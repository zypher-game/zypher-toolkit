import { isEqual } from 'lodash'
import React, { memo } from 'react'

const DivWrap = memo(({ className, showDiv, children }: { className?: string; showDiv: boolean; children: React.ReactNode }) => {
  return showDiv ? <div className={className}> {children}</div> : <>{children}</>
}, isEqual)
export default DivWrap
