import { ChainId } from '@ui/src'
import { isEqual } from 'lodash'
import React, { memo } from 'react'

import { isTVLEnd } from '@/pages/Active/state/activeState'

import Table from './V1/Table'
import TableV2 from './V2/Table'

const Index = memo(({ chainIdLocal }: { chainIdLocal: ChainId }) => {
  return isTVLEnd ? <TableV2 chainIdLocal={chainIdLocal} /> : <Table chainIdLocal={chainIdLocal} />
}, isEqual)
export default Index
