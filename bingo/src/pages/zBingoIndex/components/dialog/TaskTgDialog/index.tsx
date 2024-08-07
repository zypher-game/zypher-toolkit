import { DialogContent, DialogOverlay } from '@reach/dialog'
import {
  getShortenAddress,
  GlobalVar,
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
  useContractReads,
  useIsW768,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
  useTelegramAccountInit,
  useTonAddress,
  useTonConnectUI,
  useTonWalletProofMounted,
  WebAppData
} from '@ui/src'
import { Button } from 'antd'
import classNames from 'classnames'
import { isEqual } from 'lodash'
import React, { memo, useCallback, useMemo, useRef, useState } from 'react'

import { NumberRun } from '@/components/NumberRun'
import { useToastMessage } from '@/hooks/useToastMessage'
import { DialogTaskListState } from '@/pages/state/state'
import { setErrorToast } from '@/utils/Error/setErrorToast'

import css from './index.module.stylus'

const shareText = `Dive into the addictive world of 2048! Slide those numbered tiles and merge them to reach the elusive 2048 tile. It’s simple to play but hard to master. Can you beat my high score? Click the link and let’s find out! 🎮✨

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
  const isModalOpen = useRecoilValue(DialogTaskListState)
  const [ui] = useTonConnectUI()
  const setIsModalOpen = useSetRecoilState(DialogTaskListState)

  const proof = useTonWalletProofMounted()
  const [userInfo, _userInfo] = useRecoilState(TelegramUserInfoState)
  useTelegramAccountInit(userInfo, _userInfo)
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
    return { lastLoginAt: isToday(userInfo.lastLoginAt), last256At: isToday(userInfo.last256At), lastShareAt: isToday(userInfo.lastShareAt) }
  }, [userInfo])

  const DailyTaskSubmit = async (name: string) => {
    if (loading) {
      return
    }
    _loading(true)
    try {
      const res = await httpPost<TelegramUserInfoDto>(`${TG_BOT_URL}/task/daily/claim`, { WebAppData, name })
      if (res.code) {
        setErrorToast(res.msg)
        return
      }
      console.log(userInfo, res.data)
      _userInfo(res.data)
    } finally {
      _loading(false)
    }
  }

  const OnceTaskChecked = useMemo(() => {
    if (!userInfo) {
      return undefined
    }
    const total = BigInt(userInfo.onceTask)
    const isChecked = (key: keyof typeof OnceTask) => {
      const val = OnceTask[key]
      if (!val) {
        return false
      }
      // eslint-disable-next-line no-bitwise
      return (total & val.key) > 0n
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
        await sleep(5000)
      } else if (name === 'Retweet1') {
        window.Telegram.WebApp.openLink(TaskReweet1, { try_instant_view: true })
        await sleep(5000)
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
      console.log(userInfo, res.data)
      _userInfo(res.data)
    } finally {
      _loading(false)
    }
  }
  return (
    <>
      <DialogOverlay isOpen={isModalOpen} onDismiss={handleCancel} className={css.bg}>
        <DialogContent className={css.taskBg}>
          <img src={preStaticUrl + `/img/bingo/close.png`} alt="close" className={css.close} onClick={handleCancel} />
          <div className={css.title}>Task List</div>
          <div className={css.taskInnerBg}>
            <div className={css.taskInner}>
              <div className={css.total}>
                <div>My Points:</div>
                <img src={preStaticUrl + '/img/bingo/tg_point.png'} width={40} />
                <NumberRun from={0} to={pointAll} fixed={0} duration={3000} />
              </div>
              <div className={css.tasks}>
                <div className={css.name}>Daily Tasks</div>
                <TaskItemCpt name="Daily check-in" des="+10" checked={DailyStatus?.lastLoginAt} action={() => DailyTaskSubmit('lastLoginAt')} />
                <TaskItemCpt
                  name="Daily share"
                  des="+10"
                  checked={DailyStatus?.lastShareAt}
                  all
                  action={async () => {
                    window.Telegram?.WebApp?.openTelegramLink(
                      `https://t.me/share/url?url=${encodeURIComponent(
                        `${TaskTelegramBot}?start=${Number(userInfo?.id).toString(16)}`
                      )}&text=${encodeURIComponent(shareText)}`
                    )
                    if (DailyStatus?.lastShareAt) {
                      return
                    }
                    await sleep(5000)
                    return DailyTaskSubmit('lastShareAt')
                  }}
                />
                <TaskItemCpt
                  name="Reach 256 at a time"
                  des="+30"
                  checked={DailyStatus?.last256At}
                  action={async () => {
                    if (!userInfo?.evmWallet) {
                      return DailyTaskSubmit('last256At')
                    }
                    setErrorToast('Not meeting the conditions')
                  }}
                />
                <div className={css.name}>Basic Tasks</div>
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
                  name="Follow x of @Zypher_Network"
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
        <div className={css.name}>{props.name}</div>
        <div className={css.des}>
          <img src={preStaticUrl + '/img/bingo/tg_point.png'} width={40} />
          {props.des}
        </div>
      </div>
      <div className={css.action}>
        <Button className={css.btn} onClick={props.action}>
          {props.btn ?? 'Go'}
        </Button>
      </div>
    </div>
  )
}
export default TaskTgDialog
