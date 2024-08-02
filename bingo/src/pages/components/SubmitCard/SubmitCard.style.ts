import styled from 'styled-components'

export const SubmitCardEle = styled.div`
  display: flex;
  max-width: 472px;
  padding: 20px;
  text-align: center;
  margin: 0 auto;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const ViewCard = styled.div`
  color: #59b407;

  font-size: 12px;
  padding: 20px;
  cursor: pointer;
`

export const Tip = styled.div`
  color: #62380c;
  opacity: 0.6;
  font-size: 12px;
  padding-top: 10px;
`

export const BoxWrap = styled.div`
  position: relative;
  width: 536px;
  padding-bottom: 24px;
`

export const CardBack = styled.div<{ isMobile: boolean }>`
  cursor: pointer;
  width: 350px;
  padding: 34px 84px;
  padding-left: ${({ isMobile }) => isMobile && '25px'};
  padding-bottom: ${({ isMobile }) => isMobile && '0px'};
  font-size: 16px;
  color: #613c17;
`
export const BingoCardView = styled.div<{ isMobile: boolean }>`
  width: ${({ isMobile }) => (isMobile ? '294px' : '356px')};
  height: ${({ isMobile }) => (isMobile ? '329px' : '399px')};
  padding: ${({ isMobile }) => (isMobile ? '15px' : '20px')};
  margin-top: 15px;
`

export const AmountValue = styled.div<{ isMobile: boolean; checked: boolean }>`
  color: ${({ checked }) => (checked ? '#FFF0CF' : '#db5f16')};

  line-height: ${({ isMobile }) => (isMobile ? '20px' : '28px')};
  font-size: ${({ isMobile }) => (isMobile ? '16px' : '30px')};
`
export const Title = styled.div`
  color: #62380c;
  text-align: center;
  font-weight: 600;
  font-size: 16px;
  padding-top: 15px;
  padding-bottom: 15px;
`

export const FlexCenter = styled.div<{ isMobile: boolean }>`
  width: 100%;
  display: flex;
  justify-content: ${({ isMobile }) => (isMobile ? 'center' : 'left')};
`
export const CheckableTag = styled.div<{ isMobile: boolean; checked: boolean }>`
  width: ${({ isMobile }) => (isMobile ? ' 89px' : '168px')};
  height: ${({ isMobile }) => (isMobile ? ' 32px' : '51px')};
  cursor: pointer;
  border-radius: 25.5px;
  background: ${({ checked }) => (checked ? '#6E310C' : 'rgba(219, 95, 22, 0.07)')};
  display: flex;
  align-items: center;
  justify-content: center;
`
