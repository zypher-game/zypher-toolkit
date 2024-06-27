import { ArrowRightOutlined } from '@ant-design/icons'
import { preStaticUrl } from '@ui/src'
import React, { FC, memo, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
type IProps = {
  isMobile: boolean
}
const Invitation = styled.div<{ isMobile: boolean }>`
  border-radius: 50px;
  background: rgba(71, 255, 26, 0.2);
  padding: 0 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  margin-top: 100px;
  margin-bottom: 64px;
  color: #65edbc;
  font-family: PixeloidSans;
  font-weight: 400;
  font-size: 22px;
  cursor: pointer;
  @media (max-width: 950px) {
    margin-top: 28px;
    margin-bottom: 12px;
    padding: 0 20px;
    font-size: 12px;
    font-size: 14px;
  }
  @media (max-width: 830px) {
    font-size: 12px;
  }
  p {
    padding: 33px 0 33px 200px;
    margin: 0;
    strong {
      font-weight: 600;
    }
    @media (max-width: 950px) {
      padding: 10px 0 10px 70px;
    }
    @media (max-width: 830px) {
      padding: 10px 0 10px 50px;
    }
  }
  img {
    position: absolute;
    top: 30%;
    transform: translateY(-50%);
    left: 50px;
    width: 160px;
    height: 160px;

    @media (max-width: 950px) {
      left: 14px;
      width: 68px;
      height: 68px;
    }
    @media (max-width: 830px) {
      left: 4px;
      width: 58px;
      height: 58px;
    }
  }
`
const GoDiv = styled.div<{ isMobile: boolean }>`
  padding: 12px 20px;
  color: #65edbc;
  background: rgba(71, 255, 26, 0.2);
  border: 1px solid #65edbc;
  border-radius: 28px;
  font-size: 16px;
  margin-left: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  white-space: nowrap;
  gap: 10px;
  @media (max-width: 950px) {
    font-size: 14px;
    padding: 4px 10px;
  }
  @media (max-width: 830px) {
    font-size: 12px;
  }
`
const InvitationWidget: FC<IProps> = memo(({ isMobile }: IProps) => {
  const navigate = useNavigate()
  const handleButtonClick = useCallback(() => {
    window.location.href = '/#/invitation'
    // window.open('https://medium.com/@ZypherGames/upcoming-announcement-44e69204adb1', '_blank')
  }, [navigate])
  return (
    <Invitation onClick={handleButtonClick} isMobile={isMobile}>
      <img decoding="async" loading="lazy" src={preStaticUrl + `/img/home/Invitation_box.png`} />
      <p>
        <strong>Unlock Rewards Together! Invite Friends,</strong> Earn Points, and Win Fantastic Prizes!
      </p>
      {isMobile ? null : (
        <GoDiv isMobile={isMobile}>
          Go <ArrowRightOutlined />
        </GoDiv>
      )}
    </Invitation>
  )
})
export default InvitationWidget
