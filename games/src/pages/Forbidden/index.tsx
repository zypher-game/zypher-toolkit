import React from 'react'
import styled from 'styled-components'

import Bg from './error-bg.svg'
import Icon from './icon.svg'
import Rabbit from './rabbit403.png'

const Content = styled.div`
  background-color: #1649ff;
  height: 100vh;
  background-repeat: repeat;
  background-image: url(${Bg});
  display: flex;
  justify-content: center;
  align-items: center;
  p {
    color: #fff;
    font-family: PixeloidSans;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 36px;
    &::before {
      content: '';
      background-image: url(${Icon});
      display: block;
      background-repeat: no-repeat;
      background-position: center;
      float: left;
      line-height: 36px;
      width: 17px;
      height: 36px;
      margin-right: 12px;
    }
  }
  .image {
    text-align: center;
  }
`

const Forbidden = () => {
  return (
    <Content>
      <div>
        <div className="image">
          <img decoding="async" loading="lazy" src={Rabbit} alt="Rabbit" />
        </div>
        <p>Zypher Games is unable to provide service in your country/region.</p>
        <p> Zypher Games 는 귀하의 국가/지역에서 서비스를 제공할 수 없습니다.</p>
        <p> Zypher Games は、お住まいの国/地域ではサービスを提供できません。</p>
        <p> Zypher Games 無法向您所在的國家/地區提供服務。</p>
        <p> Zypher Games ไม่สามารถให้บริการในประเทศ/ภูมิภาคของคุณได้</p>
      </div>
    </Content>
  )
}

export default Forbidden
