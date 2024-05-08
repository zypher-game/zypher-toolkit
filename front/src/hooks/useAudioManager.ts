// AudioManager.js
import { useRecoilState } from '@ui/src'
import { preStaticUrl } from '@ui/src'
import { Howl } from 'howler'
import { useEffect, useState } from 'react'

import { SoundOn } from '../pages/Bingo/state'

const soundEffects = {
  buttonClick: new Howl({
    src: [preStaticUrl + '/audio/play.mp3']
  }),
  backgroundSound: new Howl({
    src: [preStaticUrl + '/audio/backgroundMusic.mp3'],
    loop: true,
    volume: 0.4
  }),
  win: new Howl({
    src: [preStaticUrl + '/audio/win.mp3']
  }),
  fail: new Howl({
    src: [preStaticUrl + '/audio/fail.mp3']
  }),
  turn: new Howl({
    src: [preStaticUrl + '/audio/turnTo.mp3']
  })
  // 添加更多游戏音效
}

const useAudioManager = () => {
  const [isSoundOn, setIsSoundOn] = useRecoilState(SoundOn)

  useEffect(() => {
    if (isSoundOn) {
      soundEffects['backgroundSound'].play()
    }
    return () => {
      // 清理函数，可以在组件卸载时停止音效
      for (const id in soundEffects) {
        soundEffects[id].stop()
      }
      //   soundEffects['backgroundSound'].stop()
    }
  }, [isSoundOn])

  const backgroundMusic = () => {
    if (isSoundOn) {
      soundEffects['backgroundSound'].play()
    }
  }

  const colseBackgroundMusic = () => {
    // if (isSoundOn) {
    soundEffects['backgroundSound'].stop()
    // }
  }

  const buttonClickSound = () => {
    if (isSoundOn) {
      soundEffects['buttonClick'].play()
    }
  }

  const toggleMusic = () => {
    if (isSoundOn) {
      setIsSoundOn(0)
    } else {
      setIsSoundOn(1)
    }
  }
  const turnSound = () => {
    if (isSoundOn) {
      soundEffects['turn'].play()
    }
  }

  const playWinSound = () => {
    if (isSoundOn) {
      soundEffects['win'].play()
    }
  }

  const playLoseSound = () => {
    if (isSoundOn) {
      soundEffects['fail'].play()
    }
  }

  return { toggleMusic, isSoundOn, turnSound, playWinSound, playLoseSound, backgroundMusic, colseBackgroundMusic, buttonClickSound }
}

export default useAudioManager
