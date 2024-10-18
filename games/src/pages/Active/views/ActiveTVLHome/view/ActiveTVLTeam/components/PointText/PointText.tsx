import React, { memo } from 'react'
const PointText = memo(({ className }: { className: string }) => {
  return <p className={className}>Earn more points and improve your ranking by staking additional assets or inviting friends!</p>
})
export default PointText
