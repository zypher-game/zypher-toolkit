import { preStaticUrl, useActiveWeb3React, useRecoilValue, useSetRecoilState, walletModalOpenState } from '@ui/src'
import { Button } from 'antd'
import BigNumber from 'bignumber.js'
import { isEqual } from 'lodash'
import React, { memo, useCallback, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

import Icon from '@/assets/iconsLocal'
import copy from '@/utils/copy'
import { toBingoHref } from '@/utils/toBingoHref'

import { AccountInfo, accountInfoState, invitationRuleDialogState } from '../state/invitationState'
import InvitationData from './invitationData'
import css from './invitationHeader.module.stylus'
import RuleDialog from './RuleDialog'
import ShareComponent from './shareComponent'
const InvitationHeader = memo(({ isMobile }: { isMobile: boolean }) => {
  const accountInfo = useRecoilValue<AccountInfo>(accountInfoState)
  const navigate = useNavigate()
  const { account, chainId } = useActiveWeb3React()
  const setIsModalOpen = useSetRecoilState(invitationRuleDialogState)
  const setDialogOpen = useSetRecoilState(walletModalOpenState)

  const ruleModalClick = useCallback(() => {
    setIsModalOpen(true)
  }, [])
  const loginClick = useCallback(() => {
    setDialogOpen(true)
  }, [])
  const toPath = useCallback(() => {
    toBingoHref({ navigate })
  }, [navigate])
  const renderText = useMemo(() => {
    if (account) {
      if (!new BigNumber(accountInfo.total).isEqualTo(0)) {
        return window.location.origin + '?share=' + account
      }
    }
    return 'Generated after playing a game'
  }, [account, accountInfo.total, chainId])

  const twitterShareLink = useMemo(() => {
    if (account && !new BigNumber(accountInfo.total).isEqualTo(0)) {
      // 获取要分享的标题、内容、链接和图片 URL
      // url:要分享的链接
      // via:关联账户
      // hashtags:标签集 #
      // text:描述内容
      const title01 = '🔥 Get set for an exhilarating journey! 🙌 Join me at Zypher Games with my exclusive invitation link'
      const title02 = 'unlock mystery boxes and 🥕Gold Points! Let us start this thrilling adventure together! @Zypher_Games'
      const url = renderText
      // const imageUrl = window.location.origin + '/img/invitation/header_bg.png'
      // const imageUrl = 'https://pbs.twimg.com/media/F2mBCdGbMAAqnSb?format=jpg&name=small'
      // const relatedAccounts = 'account1,account2' // 相关账号
      // const viaAccount = 'Zypher_Games' // 来源账号
      // &via=${viaAccount}&related=${relatedAccounts}
      // &hashtags=myhashtag
      // &media=${encodeURIComponent(imageUrl)}
      const myhashtag = 'web3game'
      const tweetText = `${title01} ${url} ${title02}`
      const encodedTweetText = encodeURIComponent(tweetText)
      return `https://twitter.com/intent/tweet?text=${encodedTweetText}&hashtags=${myhashtag}`
    }
    return ''
  }, [account, accountInfo.total])

  const btnRender = useMemo(() => {
    if (account) {
      if (new BigNumber(accountInfo.total).isEqualTo(0)) {
        return (
          <Button className={css.btn} onClick={toPath}>
            Play
          </Button>
        )
      }
      return (
        <div className={css.flflfr}>
          <span onClick={() => copy(renderText)}>
            <Icon name="copy_invi" />
          </span>
          <ShareComponent url={twitterShareLink}>
            <Icon name="share_invi" />
          </ShareComponent>
          {/* <a href={twitterShareLink} target="_blank" rel="noreferrer">
              <Icon name="link" />
            </a> */}
        </div>
      )
    } else {
      return (
        <Button className={css.btn} onClick={loginClick}>
          Play
        </Button>
      )
    }
  }, [account, accountInfo.total])

  return (
    <>
      <div className={css.header}>
        <div className={css.fl}>
          <h1 className={css.title}>Loyalty Points Tournament</h1>
          <p className={css.txt}>Refer, Play, and Earn in the Loyalty Points Tournament!</p>
          <div className={css.info}>
            <div className={css.flfl}>
              <div className={css.flflfl}>
                <Icon name="link02" className={css.link02} />
                <p className={css.linkP}>{renderText}</p>
              </div>
              {btnRender}
            </div>
            <div className={css.flfr} onClick={ruleModalClick}>
              <p className={css.flfrp}>Rule</p>
              <Icon name="question" className={css.question} />
              <RuleDialog />
            </div>
          </div>
        </div>
        {isMobile && <InvitationData active={!!account} {...accountInfo} />}
        <div className={css.fr}>
          <img className={css.img} src={preStaticUrl + `/img/invitation/header_bg.png`} title="invitation" />
        </div>
      </div>
      {!isMobile && <InvitationData active={!!account} {...accountInfo} />}
    </>
  )
}, isEqual)
export default InvitationHeader
