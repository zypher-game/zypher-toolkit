import { IGameList, preStaticUrl } from '@UI/src/'
import { List } from 'antd'
import { isEqual } from 'lodash'
import React, { memo, useState } from 'react'
import styled from 'styled-components'

import { NotDataWithLoading } from '@/components/NoData'

import BingoWrap from '../bingoItem'
import ProfileTab from '../tab'
import css from './NFTs.module.stylus'
type INFTsProp = {
  nftTab: number
  setNftTab: React.Dispatch<React.SetStateAction<number>>
  bingoList: IGameList[] | undefined
  bingoListLoading: boolean
  bingoGamesLoading: boolean
  listLoading: boolean
  list: string[]
  z2048List: string[] | undefined
  z2048ListLoading: boolean
}
const CardTokenId = styled.div`
  color: #65edbc;
  font-size: 16px;
  padding: 20px;
  top: 0;
  left: 0;
  position: absolute;
`
const NFTs = memo((props: INFTsProp) => {
  const { z2048List, z2048ListLoading, bingoList, bingoListLoading, bingoGamesLoading, listLoading, list, nftTab, setNftTab } = props
  return (
    <div className={css.nft}>
      <ProfileTab
        type="lineBorder"
        className={css.tab}
        tab={nftTab}
        setTab={setNftTab}
        list={['2048NFT', 'Bingo Card', 'zBox']}
        showImg={true}
        source={[preStaticUrl + '/img/profile/2048NFT.png', preStaticUrl + '/img/profile/BingoCard.png', preStaticUrl + '/img/profile/zBox.png']}
      />
      {nftTab === 0 ? (
        <List
          grid={{
            gutter: 20,
            xs: 2,
            sm: 2,
            md: 2,
            lg: 3,
            xl: 4,
            xxl: 5
          }}
          locale={{ emptyText: <NotDataWithLoading loading={z2048ListLoading} /> }}
          dataSource={z2048List}
          renderItem={(item, index) => (
            <List.Item>
              <img src={item} width={'100%'} />
            </List.Item>
          )}
        />
      ) : nftTab === 1 ? (
        !bingoList || !bingoList.length ? (
          <NotDataWithLoading loading={bingoListLoading || bingoGamesLoading} />
        ) : (
          <BingoWrap gameList={bingoList} />
        )
      ) : (
        <List
          grid={{
            gutter: 20,
            xs: 2,
            sm: 2,
            md: 2,
            lg: 3,
            xl: 4,
            xxl: 5
          }}
          locale={{ emptyText: <NotDataWithLoading loading={listLoading} /> }}
          dataSource={list}
          renderItem={(item, index) => (
            <List.Item>
              <div className={css.item} key={index}>
                <img src={preStaticUrl + '/img/profile/card.png'} width={'100%'} />
                <CardTokenId>#{item}</CardTokenId>
              </div>
            </List.Item>
          )}
        />
      )}
    </div>
  )
}, isEqual)
export default NFTs
