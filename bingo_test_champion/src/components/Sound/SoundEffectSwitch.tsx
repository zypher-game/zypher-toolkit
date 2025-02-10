import { useRecoilState } from '@ui/src'
import { preStaticUrl } from '@ui/src'
import { isEqual } from 'lodash'
import React, { memo, useCallback } from 'react'
import styled from 'styled-components'

import { SoundOn } from '@/pages/state/state'

const Switch = styled.div`
  cursor: pointer;
  img {
    width: 32px;
    height: 32px;
  }
`

const SoundEffectSwitch = memo(() => {
  const [isSoundOn, setIsSoundOn] = useRecoilState(SoundOn)
  const toggleMusic = useCallback(() => {
    if (isSoundOn === 1) {
      setIsSoundOn(0)
    } else {
      setIsSoundOn(1)
    }
  }, [isSoundOn])
  return (
    <Switch onClick={toggleMusic}>
      {isSoundOn ? (
        <img decoding="async" loading="lazy" src={preStaticUrl + `/audio/close.png`} alt="" />
      ) : (
        <img decoding="async" loading="lazy" src={preStaticUrl + `/audio/open.png`} alt="" />
      )}
    </Switch>
  )
}, isEqual)

export default SoundEffectSwitch
