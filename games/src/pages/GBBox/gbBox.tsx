import { preStaticUrl } from '@ui/src'
import { Col, Row } from 'antd'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import css from './gbBox.module.stylus'

interface IProps {
  className?: boolean
}

const Content = styled.div`
  margin: 40px auto;
  width: 1389px;
  padding: 0 40px;
  /* @media screen and (min-width: 1600px) {
    margin: 40px auto;
  } */
`

export default (props: IProps): React.ReactElement | null => {
  return (
    <>
      <Content>
        <Row gutter={34} align={'top'}>
          <Col flex={'528px'}>
            <img decoding="async" loading="lazy" src={preStaticUrl + '/img/profile/card.png'} width={'100%'} alt="" />
          </Col>

          <Col flex="814px">
            <div className={css.profileBox}>
              <div className={css.content}>
                <div className={css.title}>{`What are zBingo Genesis Blind Boxes?`}</div>
                <div className={css.text}>
                  {`The Genesis Blind Box is a special reward for the OG Zypher Game community members. In zBingo V1, Blind Box holders can enjoy more daily $Gold Point airdrops than other players. Each Blind Box conceals either $Gold Points or a Zynizens NFT, waiting for its grand revelation at zBingo V2's launch.`}
                </div>
                <div className={css.title}>{`How to get the Genesis Blind Box？`}</div>
                <div className={css.text}>
                  {`During the Beta Era (starting from July 11th), each time you claim BINGO you can mint a “zBingo Genesis Blind Box’’. And there's no limit to how many you can obtain! But take note: Blind Boxes earned on different networks follow different rules and aren't interchangeable.`}
                  <a href="/bingo" style={{ color: '#65EDBC' }} target="_blank" rel="noreferrer">{` Start the Game!`}</a>
                </div>
                <div className={css.title}>{`What are $Gold Points?`}</div>
                <div className={css.text}>
                  {`$Gold Points serve as the scoring unit for bookkeeping on the Zypher games platform. $Gold Points will be officially introduced in zBingo V1. Players can exchange Ether for Gold Points on supported networks like Linea and Arbitrum. It’s important to note that $Gold Points are not transferable to another address.`}
                </div>
                <div className={css.title}>{`What is Zyphorian NFT?`}</div>
                <div className={css.text}>
                  {`Born from the creative forces of Zyphoria, these Zynizens represent the genesis series of Zyphorian NFTs and come in five distinct roles, each comprising three levels of rarity. These pioneering figures are more than just virtual 721 tokens; they’re a symbol of community, strategy, and adventure. By acquiring different series of these NFTs, players can unlock in-game benefits and enhancements across various Zypher games like zBingo and zAce. Get ready to meet the Zynizens, the first Zyphorians, when they are officially introduced in zBingo v2, opening a new chapter in the Zypher Games saga.`}
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Content>
    </>
  )
}
