// AudioManager.js
import { useRecoilState } from '@zypher-game/toolkit/ui'
import { preStaticUrl } from '@zypher-game/toolkit/ui'
import { Howl } from 'howler'
import { useCallback, useEffect } from 'react'
import React from 'react'

import { SoundOn } from '../pages/state/state'

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
}
// - `"granted"`：表示已授予音频权限。
// - `"denied"`：表示已拒绝音频权限。
// - `"prompt"`：表示需要向用户询问音频权限。
const constraints = {
  audio: true,
  video: false
}

export function useAudioPermission() {
  const [isAudioPermitted, setIsAudioPermitted] = React.useState<boolean>(false)

  //
  // functions
  //
  const requestAudioPermission = () => {
    navigator.permissions
      .query({ name: 'microphone' })
      .then(status => {
        if (status.state === 'prompt') {
          promptAudioPermission()
        } else {
          setIsAudioPermitted(isPermitted(status.state))
        }

        status.onchange = () => {
          if (status.state === 'prompt') {
            promptAudioPermission()
          } else {
            setIsAudioPermitted(isPermitted(status.state))
          }
        }
      })
      .catch(e => {
        console.log(e)
      })
  }

  function promptAudioPermission() {
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then(res => console.log({ res }))
      .catch(err => {
        console.log({ err })
        console.log('denied')
      })
  }

  const isPermitted = useCallback((state: PermissionState): boolean => state === 'granted', [])

  return { requestAudioPermission, isAudioPermitted }
}
export const useAudio = () => {
  const [isSoundOn, setIsSoundOn] = useRecoilState(SoundOn)
  const { requestAudioPermission, isAudioPermitted } = useAudioPermission() // "granted" "denied" "prompt"
  useEffect(() => {
    if (isSoundOn && !isAudioPermitted) {
      requestAudioPermission()
      setIsSoundOn(0)
    }
  }, [])
  useEffect(() => {
    if (isSoundOn) {
      soundEffects['backgroundSound'].play()
    }
    return () => {
      for (const id in soundEffects) {
        soundEffects[id].stop()
      }
    }
  }, [isSoundOn])
}
const useAudioManager = () => {
  const [isSoundOn, setIsSoundOn] = useRecoilState(SoundOn)
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
