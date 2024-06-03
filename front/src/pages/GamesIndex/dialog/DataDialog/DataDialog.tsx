import { DialogContent, DialogOverlay } from '@reach/dialog'
import { DialogClose, IsTablePixelWidget, PixelTable, useIsW768, useRecoilValue, useSetRecoilState } from '@ui/src'
import { isEqual } from 'lodash'
import React, { memo, useCallback } from 'react'

import { useDataInfo } from '../../hook/useDataInfo'
import { dataDialogState } from '../../state/GamesState'
import Data from './Data/Data'
import css from './DataDialog.module.styl'
const DataDialog = memo(() => {
  const { data } = useDataInfo()
  const isModalOpen = useRecoilValue(dataDialogState)
  const setIsModalOpen = useSetRecoilState(dataDialogState)

  const handleCancel = useCallback(() => {
    setIsModalOpen(false)
  }, [])

  return (
    <DialogOverlay className={css.bottom} isOpen={isModalOpen} onDismiss={handleCancel}>
      <DialogContent className={`pixel_DialogContent ${css.dataDialog}`}>
        <IsTablePixelWidget
          width="100%"
          height="100%"
          className={css.table_body}
          backgroundColor="#1D263B"
          header_children={<p className={`modalTitleInnerTitle ${css.title}`}>Data</p>}
          body_children={<Data data={data} />}
          pixel_height={10}
        />
        <DialogClose onClick={handleCancel} />
      </DialogContent>
    </DialogOverlay>
  )
}, isEqual)

export default DataDialog