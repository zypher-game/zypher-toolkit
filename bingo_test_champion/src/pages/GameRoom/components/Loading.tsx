import { preStaticUrl } from '@ui/src'
import { Progress } from 'antd'
import React from 'react'

import css from '../index.module.stylus'

interface ILoadingProps {
  percent: number
  isMobile: boolean
}

const Loading: React.FC<ILoadingProps> = ({ percent, isMobile }) => (
  <div className={css.gameHome}>
    <img decoding="async" loading="lazy" className={css.loadTitle} src={preStaticUrl + `/img/bingo/loading-title.png`} />
    <div className={css.progressBox}>
      <div className={css.progress}>
        <Progress
          percent={percent}
          showInfo={false}
          strokeWidth={isMobile ? 14 : 30}
          trailColor={'#8E571E'}
          strokeColor={'linear-gradient(180deg, #F0FF44 3.33%, #50A821 54.69%, #268D05 70.3%, #329A10 87.41%, #4CCE22 100%)'}
        />
      </div>
    </div>
  </div>
)

export default Loading
