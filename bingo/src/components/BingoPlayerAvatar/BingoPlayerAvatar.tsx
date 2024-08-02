import { IPlayerAvatar, PlayerAvatar } from '@ui/src'
import React, { memo } from 'react'
const BingoPlayerAvatar = memo((props: IPlayerAvatar) => {
  return <PlayerAvatar {...props} hidePixel={true} />
})
export default BingoPlayerAvatar
