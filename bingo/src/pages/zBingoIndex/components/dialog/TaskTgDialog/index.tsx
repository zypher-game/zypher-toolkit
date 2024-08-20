import { DialogContent, DialogOverlay } from '@reach/dialog'
import {
  getShortenAddress,
  httpPost,
  preStaticUrl,
  sleep,
  TaskFollowZypher,
  TaskJoinTelegramGroup,
  TaskReweet1,
  TaskTelegramBot,
  TelegramUserInfoDto,
  TelegramUserInfoState,
  TG_BOT_URL,
  toUserFriendlyAddress,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
  useTelegramAccountInit,
  useTonConnectUI,
  useTonWalletProofMounted,
  useWebAppData
} from '@ui/src'
import classNames from 'classnames'
import { isEqual } from 'lodash'
import React, { memo, useCallback, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { NumberRun } from '@/components/NumberRun'
import { useChainIdParams } from '@/hooks/useChainIdParams'
import { ButtonPrimary } from '@/pages/components/Button'
import TgPointImg from '@/pages/components/TgPointImg/TgPointImg'
import { DialogTaskListState } from '@/pages/state/state'
import { setErrorToast } from '@/utils/Error/setErrorToast'
import { toBingoPlayHref } from '@/utils/toBingoHref'

import css from './index.module.stylus'

const shareText = `Dive into the addictive world of Bingo! Slide those numbered tiles and merge them to reach the elusive Bingo tile. It’s simple to play but hard to master. Can you beat my high score? Click the link and let’s find out! 🎮✨

Feel free to tweak it as you like! 😊`
export const OnceTask = {
  ConnectWallet: { key: 1n, value: 100n },
  JoinTelegram: { key: 2n, value: 100n },
  FollowZypherTwitter: { key: 4n, value: 50n },
  Retweet1: { key: 8n, value: 50n },
  TelegramPremium: { key: 16n, value: 100n },
  // 初始化账号， 计算账号的初始积分
  Init: { key: 16n, value: 0n }
}

const TaskTgDialog = memo(() => {
  const navigate = useNavigate()
  const chainIdParams = useChainIdParams()
  const WebAppData = useWebAppData()
  const isModalOpen = useRecoilValue(DialogTaskListState)
  const [ui] = useTonConnectUI()
  const setIsModalOpen = useSetRecoilState(DialogTaskListState)

  const proof = useTonWalletProofMounted()
  const [userInfo, _userInfo] = useRecoilState(TelegramUserInfoState)
  useTelegramAccountInit(userInfo, _userInfo, setIsModalOpen)
  const [loading, _loading] = useState(false)

  const handleCancel = useCallback(() => {
    setIsModalOpen(false)
  }, [])
  const star = useMemo(() => {
    const value = userInfo?.star
    if (!value) {
      return 0
    }
    return Number(value)
  }, [userInfo])
  const pointAll = useMemo(() => {
    const web2 = BigInt(star)
    return Number(web2)
  }, [star])
  const DailyStatus = useMemo(() => {
    if (!userInfo) {
      return undefined
    }
    const now = new Date()
    const isToday = (target: string) => {
      const time = new Date(target)
      if (now.getFullYear() !== time.getFullYear()) {
        return false
      }
      if (now.getMonth() !== time.getMonth()) {
        return false
      }
      if (now.getDate() !== time.getDate()) {
        return false
      }
      return true
    }
    return {
      lastLoginAt: isToday(userInfo.lastLoginAt),
      lastBingoAt: isToday(userInfo.lastBingoAt),
      bingoAt: isToday(userInfo.bingoAt),
      lastShareAt: isToday(userInfo.lastShareAt)
    }
  }, [userInfo])

  const DailyTaskSubmit = async (name: string) => {
    if (loading) {
      return
    }
    _loading(true)
    try {
      console.log('dddd0000')
      const res = await httpPost<TelegramUserInfoDto>(`${TG_BOT_URL}/task/daily/claim`, { WebAppData, name })
      console.log('dddd0000', res)
      if (res.code) {
        setErrorToast(res.msg)
        return
      }
      _userInfo(res.data)
    } finally {
      _loading(false)
    }
  }

  const OnceTaskChecked = useMemo(() => {
    if (!userInfo) {
      return undefined
    }
    const isChecked = (key: keyof typeof OnceTask) => {
      const val = OnceTask[key]
      if (!val) {
        return false
      }
      const list = userInfo.onceTask.split(',')
      // eslint-disable-next-line no-bitwise
      return list.includes(`${val.key}`)
    }
    return Object.keys(OnceTask).reduce((sum, current: any) => {
      sum[current as keyof typeof OnceTask] = isChecked(current)
      return sum
    }, {} as Record<keyof typeof OnceTask, boolean>)
  }, [userInfo])

  const OnceTaskSubmit = async (name: string) => {
    if (loading) {
      return
    }
    _loading(true)
    try {
      const reqDto: any = { WebAppData, name }
      if (name === 'ConnectWallet') {
        if (!ui.account) {
          return ui.openModal()
        }
        if (!proof) {
          if (ui.account) {
            await ui.disconnect()
          }
          return ui.openModal()
        }
        reqDto.data = {
          proof: { ...proof.proof, state_init: ui.account.walletStateInit },
          address: ui.account.address,
          public_key: ui.account.publicKey
        }
      } else if (name === 'FollowZypherTwitter') {
        window.Telegram.WebApp.openLink(TaskFollowZypher, { try_instant_view: true })
        await sleep(2)
      } else if (name === 'Retweet1') {
        window.Telegram.WebApp.openLink(TaskReweet1, { try_instant_view: true })
        await sleep(2)
      }
      const res = await httpPost<TelegramUserInfoDto>(`${TG_BOT_URL}/task/claim`, reqDto)
      if (res.code) {
        if (name === 'JoinTelegram' && res.code === 403 && res.msg === 'Not joined the group') {
          window.Telegram.WebApp.openTelegramLink(TaskJoinTelegramGroup)
          return
        }
        setErrorToast(res.msg)
        return
      }
      _userInfo(res.data)
    } finally {
      _loading(false)
    }
  }
  return (
    <>
      <DialogOverlay isOpen={isModalOpen} onDismiss={handleCancel} className={css.bg}>
        <DialogContent className={css.taskBg}>
          <img decoding="async" loading="lazy" src={preStaticUrl + `/img/bingo/close.png`} alt="close" className={css.close} onClick={handleCancel} />
          <div className={css.title}>Task List</div>
          <div className={css.taskInnerBg}>
            <div className={css.taskInner}>
              <div className={css.total}>
                <p className={css.text}>Total points:</p>
                <div className={css.flex}>
                  <TgPointImg className={css.pointImg} />
                  <p className={css.num}>
                    <NumberRun from={0} to={pointAll} fixed={0} duration={3000} />
                  </p>
                </div>
              </div>
              <div className={css.tasks}>
                <h2 className={css.name}>Daily Tasks</h2>
                <TaskItemCpt name="Daily check-in" des="+10" checked={DailyStatus?.lastLoginAt} action={() => DailyTaskSubmit('lastLoginAt')} />
                <TaskItemCpt
                  name="Daily share"
                  des="+10"
                  checked={DailyStatus?.lastShareAt}
                  all
                  action={async () => {
                    // https://t.me/zyphernetwork
                    window.Telegram?.WebApp?.openTelegramLink(
                      `https://t.me/share/url?url=${encodeURIComponent(
                        `${TaskTelegramBot}?start=${Number(userInfo?.id).toString(16)}`
                      )}&text=${encodeURIComponent(shareText)}`
                    )
                    if (DailyStatus?.lastShareAt) {
                      return
                    }
                    await sleep(2)
                    return DailyTaskSubmit('lastShareAt')
                  }}
                />
                <TaskItemCpt
                  name="Win a game"
                  des="+30"
                  checked={DailyStatus?.lastBingoAt}
                  btn={DailyStatus?.bingoAt ? 'Get' : 'Go'}
                  action={async () => {
                    if (userInfo?.evmWallet) {
                      console.log({ userInfo: userInfo?.evmWallet })
                      if (!DailyStatus?.bingoAt) {
                        setIsModalOpen(false)
                        toBingoPlayHref({
                          chainIdParams,
                          navigate
                        })
                      } else {
                        return DailyTaskSubmit('lastBingoAt')
                      }
                    }
                    // setErrorToast('Not meeting the conditions')
                  }}
                />
                <h2 className={css.name}>Basic Tasks</h2>
                <TaskItemCpt
                  name={`Connect Wallet${userInfo?.tonWallet ? `(${getShortenAddress(toUserFriendlyAddress(userInfo?.tonWallet), 4, 4)})` : ''}`}
                  des="+100"
                  checked={OnceTaskChecked?.ConnectWallet}
                  all
                  btn={OnceTaskChecked?.ConnectWallet ? 'Change' : 'Go'}
                  action={async () => {
                    if (OnceTaskChecked?.ConnectWallet && ui.connected) {
                      await ui.disconnect()
                    }
                    return OnceTaskSubmit('ConnectWallet')
                  }}
                />
                <TaskItemCpt
                  name="Join Telegram group"
                  des="+100"
                  checked={OnceTaskChecked?.JoinTelegram}
                  action={() => OnceTaskSubmit('JoinTelegram')}
                />
                <TaskItemCpt
                  name="Telegram Premium"
                  des="+100"
                  checked={OnceTaskChecked?.TelegramPremium}
                  action={() => OnceTaskSubmit('TelegramPremium')}
                />
                <TaskItemCpt
                  name="Follow X of @Zypher_Network"
                  des="+50"
                  checked={OnceTaskChecked?.FollowZypherTwitter}
                  action={() => OnceTaskSubmit('FollowZypherTwitter')}
                />
                <TaskItemCpt name="Retweet" des="+50" checked={OnceTaskChecked?.Retweet1} action={() => OnceTaskSubmit('Retweet1')} />
              </div>
            </div>
          </div>
        </DialogContent>
      </DialogOverlay>
    </>
  )
}, isEqual)

const TaskItemCpt: React.FC<{
  name: React.ReactNode
  des: React.ReactNode
  action: any
  btn?: string
  all?: boolean
  checked?: boolean
}> = props => {
  return (
    <div className={classNames(css.list, { [css.checked]: props.checked, [css.all]: props.all })}>
      <div className={css.left}>
        <h3 className={css.name}>{props.name}</h3>
        <div className={css.des}>
          {props.des}
          <TgPointImg className={css.pointImg} />
        </div>
      </div>
      <div className={css.action}>
        {props.checked ? (
          <img decoding="async" loading="lazy" src={preStaticUrl + '/img/bingo/check.png'} width={24} />
        ) : (
          <ButtonPrimary className={css.btn} onClick={props.action}>
            {props.btn ?? 'Go'}
          </ButtonPrimary>
        )}
      </div>
    </div>
  )
}
export default TaskTgDialog
