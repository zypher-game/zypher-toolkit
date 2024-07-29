import { preStaticUrl, useSetRecoilState } from '@zypher-game/toolkit/ui'
import { isEqual } from 'lodash'
import React, { memo } from 'react'

import { bingoRuleDialogState } from '@/pages/state/state'

import BingoRulesDialog from '../dialog/bingoRules/bingoRules'

const QuestionIcon = memo(() => {
  const setIsModalOpen = useSetRecoilState(bingoRuleDialogState)
  return (
    <>
      <img src={preStaticUrl + `/img/bingo/question.svg`} alt="" onClick={() => setIsModalOpen(true)} />
      <BingoRulesDialog />
    </>
  )
}, isEqual)
export default QuestionIcon
