import './ActiveChooseHunter.styl'

import { preStaticUrl } from '@UI/src/'
import { ActivePixelButtonColor, ActivePixelCard } from '@UI/src/'
import React, { memo, useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import sleep from '@/utils/sleep'

import ActiveComp from '../../components/ActiveComp/ActiveComp'
import HeroImageLoader from '../../components/ImageLoader/HeroImageLoader'
import LoadingButton from '../../components/LoadingSvg/LoadingButton'
import { tvlPath } from '../../hooks/activeHooks'
import { useToPath } from '../../hooks/useToPath'
import { ITvlHero } from '../../state/activeState'
import css from './ActiveChooseHunter.module.styl'
const hero = [
  {
    avatar: preStaticUrl + '/img/tvl/hero/Ivan_Avatar.png',
    keyValue: ITvlHero.Ivan,
    attribute: 'A warrior from the north',
    characteristic: 'Level: L1, L2, L3',
    detail:
      "Ivan, was once the captain of a border town's guard, known for his bravery and strength. After his village was destroyed by a mysterious creature, he swore to seek formidable power for revenge. He heard about the legend of GP, believing it to be the key to gaining the strength he sought."
  },
  {
    keyValue: ITvlHero.Liana,
    attribute: 'A priestess from the southern holy lands',
    characteristic: 'Level: L1, L2, L3',
    detail:
      'Liana, possesses healing and protective powers. Her mission is to find the GP, a mystical item said to bring divine revelations and cure any illness, to save her people from a plague.'
  },
  {
    keyValue: ITvlHero.Celus,
    attribute: 'A mage from the central lands',
    characteristic: 'Level: L1, L2, L3',
    detail:
      "Celus, has the ability to control natural elements. He yearns to find the GP because it is rumored to contain the universe's secrets and could greatly enhance his magical powers, helping him reach the pinnacle of his abilities."
  },
  {
    keyValue: ITvlHero.Yueling,
    attribute: 'A fighter from the east',
    characteristic: 'Level: L1, L2, L3',
    detail:
      'Yueling, is renowned for his speed and skill. Her village suffered unjust treatment, and she hopes to change their fate and bring glory and justice to her people by obtaining the GP and its supreme power.'
  },
  {
    keyValue: ITvlHero.Agil,
    attribute: 'A rogue from the western cities',
    characteristic: 'Level: L1, L2, L3',
    detail:
      'Agil, survives with her agility and stealth. His interest in the GP is purely for wealth and the desire for freedom. He believes that possessing the GP will allow him to escape his past life and start a new carefree life.'
  }
]
const ActiveChooseHunter = memo(() => {
  const navigate = useNavigate()
  const [heroKey, setHeroKey] = useState(0)
  const { toSetHero } = useToPath()
  const [isHeroLoading, setIsHeroLoading] = useState(false)
  const heroClikHandle = useCallback(index => {
    setHeroKey(index)
  }, [])
  const heroConfirmHandle = useCallback(async () => {
    setIsHeroLoading(true)
    await sleep(2)
    setIsHeroLoading(false)
    toSetHero(hero[heroKey].keyValue)
    navigate(tvlPath[0])
  }, [heroKey])

  return (
    <ActiveComp>
      <div className={css.bg}>
        <h2>
          Please choose your<i>Zypher Points Hunter!</i>
        </h2>
        <p className={css.textGrey}>Once you’ve chosen your avatar, you can start inviting team members!</p>
        <div className={css.inner}>
          <ul className={css.fl}>
            {hero.map((v, index) => (
              <LiItem
                on={index === heroKey}
                keyValue={v.keyValue}
                key={v.keyValue}
                characteristic={v.characteristic}
                attribute={v.attribute}
                onClick={() => heroClikHandle(index)}
              />
            ))}
          </ul>
          <div className={css.inner_inner}>
            <HeroImageLoader heroKey={hero[heroKey].keyValue} level={'1'} />
          </div>
          <div className={css.fr}>
            <ActivePixelCard className="hunter_kkk_border" pixel_height={4} backgroundColor="#1D263B" borderColor="#3A4254">
              <ActivePixelCard
                className="hunter_kkk_title"
                width="calc(100% - 8px)"
                height="48px"
                pixel_height={4}
                backgroundColor="#FF5EAA"
                borderColor="#9c3666"
              >
                <h3>Hunter Introduction</h3>
              </ActivePixelCard>
              <p>{hero[heroKey].detail}</p>
            </ActivePixelCard>
            <ActivePixelButtonColor pixel_height={5} width="100%" height="52px" onClick={heroConfirmHandle}>
              <p>Confirm</p>
              <LoadingButton isLoading={isHeroLoading} />
            </ActivePixelButtonColor>
          </div>
        </div>
      </div>
    </ActiveComp>
  )
})
const LiItem = memo(
  ({
    on,
    keyValue,
    attribute,
    characteristic,
    onClick
  }: {
    on: boolean
    keyValue: string
    characteristic: string
    attribute: string
    onClick: any
  }) => {
    return (
      <li className={`hero_liItem ${on ? 'hero_liItem_on' : ''}`} onClick={onClick}>
        <ActivePixelCard
          className="hero_li"
          width={on ? '306px' : '256px'}
          height={on ? '96px' : '88px'}
          pixel_height={4}
          backgroundColor={on ? '#FFD02B' : '#1D263B'}
        >
          <ActivePixelCard
            className="hero_li_avatar"
            width={on ? '116px' : '88px'}
            height={on ? '112px' : '88px'}
            pixel_height={4}
            backgroundColor={on ? '#FFD584' : '#62A1FF'}
          >
            <img src={preStaticUrl + '/img/tvl/hero/' + keyValue + '_Avatar.png'} alt={keyValue} className="hero_liItem_avatar" />
          </ActivePixelCard>
          <div className="hero_text_fr">
            <h3>{keyValue}</h3>
            <p>{attribute}</p>
            <p>{characteristic}</p>
          </div>
        </ActivePixelCard>
      </li>
    )
  }
)
export default ActiveChooseHunter
