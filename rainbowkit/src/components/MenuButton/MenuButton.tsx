import React from 'react'

import { touchableStyles } from '../../css/touchableStyles'
import { isMobile } from '../../utils/isMobile'
import { Box } from '../Box/Box'
import * as styles from './MenuButton.css'

type Props = {
  children?: React.ReactNode
  onClick?: React.MouseEventHandler<HTMLElement> | undefined
  currentlySelected?: boolean
  testId?: string
  disabled?: boolean
}

export const MenuButton = React.forwardRef(
  ({ children, currentlySelected = false, onClick, testId, disabled, ...urlProps }: Props, ref: React.Ref<HTMLElement>) => {
    const mobile = isMobile()
    return (
      <Box
        as="button"
        borderRadius="menuButton"
        disabled={disabled ?? false}
        display="flex"
        onClick={onClick}
        ref={ref}
        testId={testId}
        type="button"
        marginLeft="20"
        marginRight="20"
        marginTop="8"
        marginBottom="8"
      >
        <Box
          borderRadius="menuButton"
          className={[mobile ? styles.unsetBackgroundOnHover : undefined, !currentlySelected && touchableStyles({ active: 'shrink' })]}
          transition="default"
          width="full"
          padding="16"
          {...(currentlySelected
            ? {
                // background: 'accentColor',
                borderColor: 'accentColor',
                borderStyle: 'solid',
                borderWidth: '1',
                boxShadow: 'selectedOption',
                color: 'accentColorForeground'
              }
            : {
                background: { hover: 'menuItemBackground' },
                color: 'modalText',
                transition: 'default',

                borderColor: 'selectedOptionBorder',
                borderStyle: 'solid',
                borderWidth: '1'
              })}
          {...urlProps}
        >
          {children}
        </Box>
      </Box>
    )
  }
)

MenuButton.displayName = 'MenuButton'
