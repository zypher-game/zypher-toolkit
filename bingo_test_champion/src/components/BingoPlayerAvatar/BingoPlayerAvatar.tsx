import { IPlayerAvatar, PlayerAvatar } from '@ui/src'
import { isEqual } from 'lodash'
import React, { memo } from 'react'
const BingoPlayerAvatar = memo((props: IPlayerAvatar) => {
  return <PlayerAvatar {...props} hidePixel={true} />
}, isEqual)
export default BingoPlayerAvatar
