import { LngNs, useCustomTranslation, useIsW768 } from '@ui/src'
import { Col, Row } from 'antd'
import React from 'react'
import styled from 'styled-components'

import InputValue from './inputValue'

const Wrapper = styled.div<{ isMobile: boolean }>`
  border-radius: ${({ isMobile }) => (isMobile ? '8px' : '24px')};
  background: #fde8c8;
  padding: ${({ isMobile }) => (isMobile ? '15px' : '24px')};
  font-family: Poppins;
  color: #613c17;
  font-size: ${({ isMobile }) => (isMobile ? '12px' : '16px')};
  line-height: 24px;
  height: 100%;

  .rules-header span {
    color: #db5f16;
    font-weight: 700;
  }
  .rules-text {
    padding-top: 10px;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    @media (max-width: 768px) {
      font-weight: 400;
      font-size: 12px;
      line-height: 18px;
    }
  }
  .rules-title {
    font-weight: 700;
    color: #613c17;
    font-family: Poppins;
    font-size: 16px;
    line-height: 24px;
    margin: 0;
    @media (max-width: 768px) {
      font-size: 12px;
      font-weight: 600;
      line-height: 24px;
    }
  }
  .rules-example {
    padding-top: 16px;
  }
`
const RulseWrapper = styled(Wrapper)`
  height: ${({ isMobile }) => (isMobile ? '256px' : '100%')};
  overflow: auto;
  /* 自定义滚动条样式（仅在Webkit浏览器中有效） */
  &::-webkit-scrollbar {
    width: 4px;
    display: block;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(143, 72, 0, 0.5); /* 滚动条拖动块的颜色 */
    border-radius: 8px; /* 滚动条拖动块的圆角 */
  }
`

const BingoRules = styled.div`
  color: #613c17;
  font-family: Lemon;
  font-size: 20px;
  @media (max-width: 768px) {
    font-size: 14px;
  }
`
const GameRules: React.FC = () => {
  const { t } = useCustomTranslation([LngNs.zBingo])
  const isMobile = useIsW768()
  // const setIsModalOpen = useSetRecoilState(videoDialogState)
  return (
    <>
      {/* <VideoDialog /> */}
      <Row gutter={[14, 14]} style={!isMobile ? { paddingTop: '60px' } : {}}>
        <Col span={isMobile ? 24 : 16}>
          <Row justify={'space-between'} align={'middle'}>
            <Col flex={'auto'}>
              <BingoRules>{t('Bingo Rules')}</BingoRules>
            </Col>
            {/* <Col>
              <Row align="middle" onClick={() => setIsModalOpen(true)}>
                <Tutorial>Tutorial?</Tutorial>
                <Icon name="play" />
              </Row>
            </Col> */}
          </Row>
        </Col>
        <Col span={isMobile ? 24 : 16} order={2}>
          <RulseWrapper isMobile={isMobile}>
            <div className="rules-header">
              <h3 className="rules-title">
                {t('BingoRules01')}
                <span>2-5</span>
              </h3>

              <h3 className="rules-title">
                {t('BingoRules0201')}
                <span>{t('BingoRules0202')}</span>
              </h3>
              <h3 className="rules-title">
                {t('BingoRules0301')} <span>{t('BingoRules0302')}</span>
              </h3>
            </div>
            <div className="rules-example">
              <h3 className="rules-title">{t('rulesExampletext1')}</h3>
              <p className="rules-text">{t('rulesExampletext2')}</p>
              <p className="rules-text">{t('rulesExampletext3')}</p>
              <p className="rules-text">{t('rulesExampletext4')}</p>
            </div>
          </RulseWrapper>
        </Col>
        <Col span={isMobile ? 24 : 8} order={isMobile ? 1 : 3}>
          <Wrapper isMobile={isMobile}>
            <InputValue />
          </Wrapper>
        </Col>
      </Row>
    </>
  )
}

export default GameRules
