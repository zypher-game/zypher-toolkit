import { ChainId } from '@ui/src'
import { isEqual } from 'lodash'
import React, { memo } from 'react'

import TableV2 from './V2/Table'

const Index = memo(({ chainIdLocal }: { chainIdLocal: ChainId }) => {
  return <TableV2 chainIdLocal={chainIdLocal} />
  // return isTVLEnd ? <TableV2 chainIdLocal={chainIdLocal} /> : <Table chainIdLocal={chainIdLocal} />
}, isEqual)
export default Index
