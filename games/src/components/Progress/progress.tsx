import classnames from 'classnames'
import React from 'react'

import css from './progress.module.stylus'

interface IProps {
    value: number
    className?: string
    baseColor?: string
    activeColor?: string
}

export default (props: IProps): React.ReactElement => {
    const { className, value, baseColor, activeColor } = props
    const width = value >= 100 ? 100 : value
    return (
        <div className={classnames(css.progress, className)} style={baseColor ? { background: baseColor } : {}}>
            <div
                className={classnames(css.bar, { [css.normal]: width < 60, [css.forewarned]: width >= 60 && width <= 80, [css.warning]: width > 80 })}
                style={activeColor ? { background: activeColor, width: `${width}%` } : { width: `${width}%` }}
            />
        </div>
    )
}
