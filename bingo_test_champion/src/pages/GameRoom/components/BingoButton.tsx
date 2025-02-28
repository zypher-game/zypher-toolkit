import { LoadingOutlined } from '@ant-design/icons'
import { Space } from 'antd'
import React from 'react'

import { ButtonPrimary } from '@/pages/components/Button'

interface BingoButtonProps {
  isMobile: boolean
  pending: boolean
  disabled: boolean
  onClick: () => void
}

const BingoButton: React.FC<BingoButtonProps> = ({ isMobile, pending, disabled, onClick }) => (
  <ButtonPrimary
    style={{ height: isMobile ? '53px' : '70px', flex: isMobile ? undefined : 1 }}
    width={isMobile ? '128px' : undefined}
    borderWidth={'5px'}
    borderColor="#FFD58F"
    disabled={disabled}
    onClick={onClick}
  >
    <Space size={10}>
      <span
        style={{
          fontSize: isMobile ? '20px' : '32px',
          color: '#E2E2E2',
          fontFamily: 'lemon'
        }}
      >
        BINGO
      </span>
      {pending && <LoadingOutlined />}
    </Space>
  </ButtonPrimary>
)

export default BingoButton
