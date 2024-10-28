import './Partners.styl'

import { isEqual } from 'lodash'
import React, { memo } from 'react'

import { timelinePath } from '../../config/config'
import Title from '../comp/Title'
import PartnerCarousel from './PartnerCarousel'

const partnerList01 = [
  'Property 1=2048 TG',
  'Property 1=43424325',
  'Property 1=Alchemy Pay',
  'Property 1=AssassinsJump',
  'Property 1=Battles for Airdrop',
  'Property 1=BigWhale',
  'Property 1=bingo-1-1',
  'Property 1=bingo-1',
  'Property 1=BitGet Wallet',
  'Property 1=Caldera',
  'Property 1=Chainlink',
  'Property 1=Conduit',
  'Property 1=Crypto Rumble',
  'Property 1=Crypto Shooter',
  'Property 1=DivineCataclysm',
  'Property 1=DOGS Rumble',
  'Property 1=dogsjump',
  'Property 1=Galaxia',
  'Property 1=Galxe',
  'Property 1=Gate Wallet'
]
const partnerList02 = [
  'Property 1=Hypelane',
  'Property 1=Ingonyama',
  'Property 1=LayerZero',
  'Property 1=Linea',
  'Property 1=nil Foundation',
  'Property 1=OKX Wallet',
  'Property 1=Particle Network',
  'Property 1=Poker',
  'Property 1=Polyhedra',
  'Property 1=ProtectTrump',
  'Property 1=RainbowJourney',
  'Property 1=Renzo',
  'Property 1=Risc Zero',
  'Property 1=StakeStone',
  'Property 1=Stick Cat',
  'Property 1=TensumRings_temp',
  'Property 1=Third Web',
  'Property 1=Tokenpocket',
  'Property 1=Wallet Connect'
]

const Partners = memo(() => {
  return (
    <div className={'partner'}>
      <img src={timelinePath + '/fl.png'} className={'partner_p_fl'} />
      <img src={timelinePath + '/fr.png'} className={'partner_p_fr'} />
      <Title label="Our Partners" />
      {[partnerList01, partnerList02].map((list, listIndex) => (
        <PartnerCarousel className={`partners_swiper${listIndex}`} key={listIndex} partners={list} index={listIndex} />
      ))}
      <div className={'partners_bg1'} />
      <div className={'partners_bg2'} />
    </div>
  )
}, isEqual)
export default Partners
