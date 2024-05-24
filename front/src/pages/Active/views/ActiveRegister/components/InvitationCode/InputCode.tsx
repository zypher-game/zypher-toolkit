import { ActivePixelCard, useActiveWeb3React } from '@ui/src'
import React, { ChangeEventHandler, memo, useCallback, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'

import { CODELENGTH, getLinkPre, LinkPre } from '@/pages/Active/constants/activeConstants'
import { useActiveData } from '@/pages/Active/hooks/useActiveData'
import { useCodeCheckCall } from '@/pages/Active/hooks/useDataCall'
import { getHrefCode } from '@/pages/Active/utils/getHrefParams'

import css from './InputCode.module.styl'

interface SingleCharInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
  onChange: (char: string) => void
  value: string
  forwardedRef?: (ref: HTMLInputElement | null) => void
}

const SingleCharInput: React.FC<SingleCharInputProps> = memo(({ onChange, value, forwardedRef, ...otherProps }: SingleCharInputProps) => {
  const handleChange: ChangeEventHandler<HTMLInputElement> = event => {
    // 限制只输入一个字符
    const inputValue = event.target.value
    if (inputValue.length > 0 && /^[A-Za-z0-9]$/.test(inputValue)) {
      onChange(inputValue.toUpperCase().charAt(0))
    }
  }

  return (
    <ActivePixelCard className={css.single_char_input_border} pixel_height={6} backgroundColor="#1D263B">
      <input className={css.single_char_input} type="text" maxLength={1} value={value} onChange={handleChange} ref={forwardedRef} {...otherProps} />
    </ActivePixelCard>
  )
})
type IProps = {
  setCodeStr: React.Dispatch<React.SetStateAction<string>>
}
const InputCode = memo(({ setCodeStr }: IProps) => {
  const [code, setCode] = useState<(string | undefined)[]>([])
  const inputsRef = useRef<(HTMLInputElement | null)[]>(new Array(CODELENGTH).fill(null))
  const { code: codeFromParams } = useParams()
  const { codeCheck } = useCodeCheckCall()
  const { setActiveData } = useActiveData()
  const { account, chainId } = useActiveWeb3React()
  const initializeCode = useCallback(
    async (value: string) => {
      const trimmedValue = value.trim().replace('-', '')
      const initialCode = trimmedValue.split('', CODELENGTH)
      const currentLength = initialCode.length

      if (currentLength >= 1 && currentLength <= CODELENGTH) {
        setCode(initialCode)

        if (currentLength < CODELENGTH) {
          const nextInput = inputsRef.current[currentLength]
          if (nextInput) {
            nextInput.focus()
          }
        } else if (currentLength === CODELENGTH) {
          if (chainId) {
            const link = LinkPre[initialCode[0]]
            if (trimmedValue[0] === link.label) {
              const check = await codeCheck(trimmedValue)
              if (check) {
                setActiveData(pre => {
                  return pre.signedFalse
                    ? pre
                    : {
                        ...pre,
                        invitationCode: trimmedValue
                      }
                })
              } else {
                inputsRef.current.forEach(input => {
                  if (input) {
                    input.blur()
                  }
                })
              }
            }
          }
        }
      }
    },
    [setActiveData, chainId]
  )

  useEffect(() => {
    const _code = getHrefCode()
    const __code = codeFromParams ? codeFromParams : _code
    if (__code) {
      initializeCode(__code)
    }
  }, [account, chainId])
  useEffect(() => {
    const arr = code.every(e => !!e)
    if (code.length === CODELENGTH && arr) {
      setCodeStr(code.join(''))
    }
  }, [JSON.stringify(code)])
  const handleInputChange = useCallback(
    (char: string, i: number): void => {
      const index = code.length >= i ? i : code.length
      const updatedCode = [...code]
      updatedCode[index] = char
      setCode(updatedCode)

      if (index < CODELENGTH - 1 && updatedCode[index]) {
        const nextInput = inputsRef.current[index + 1]
        if (nextInput) {
          nextInput.focus()
        }
      }
    },
    [JSON.stringify(code)]
  )
  const handlePaste = useCallback(
    (event: React.ClipboardEvent<HTMLInputElement>) => {
      const clipboardData = event.clipboardData || (window as any).clipboardData
      const pastedText = clipboardData.getData('text')
      initializeCode(pastedText)
      event.preventDefault()
    },
    [initializeCode]
  )

  const handleInputKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>, index: number): void => {
      if (event.key === 'Backspace') {
        const i = code[index] ? index : index - 1
        const updatedCode = [...code]
        for (let k = i; k < updatedCode.length; k++) {
          updatedCode[k] = undefined
        }
        setCode(updatedCode)
        if (index > 0) {
          const prevInput = inputsRef.current[i]
          if (prevInput) {
            prevInput.focus()
          }
        }
      }
    },
    [JSON.stringify(code)]
  )

  return (
    <div className={css.verification_code_container}>
      {[...Array(CODELENGTH)].map((_, i) => (
        <>
          <SingleCharInput
            key={i}
            onChange={val => handleInputChange(val, i)}
            value={code[i] || ''}
            forwardedRef={ref => (inputsRef.current[i] = ref)}
            onKeyDown={event => handleInputKeyDown(event, i)}
            onPaste={handlePaste}
          />
          {i === 0 ? <div className={css.line} key={i + 'dd'} /> : null}
        </>
      ))}
    </div>
  )
})

export default InputCode
