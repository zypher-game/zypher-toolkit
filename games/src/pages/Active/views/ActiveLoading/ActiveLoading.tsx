import { isEqual } from 'lodash'
import React, { memo } from 'react'

import ActiveComp from '../../components/ActiveComp/ActiveComp'

const ActiveLoading = memo(() => {
  return (
    <ActiveComp>
      <></>
    </ActiveComp>
  )
}, isEqual)
export default ActiveLoading
