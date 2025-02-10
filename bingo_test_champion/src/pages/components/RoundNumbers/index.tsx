import { preStaticUrl } from '@ui/src'
import React, { useEffect, useState } from 'react'
import styled, { keyframes } from 'styled-components'

import css from './index.module.stylus'

interface IRoundNumbers {
  numbers: Map<number, number>
  address?: string
  length?: number
  round?: number
  onTimesUp: () => void
}

const NumberWrap = styled.div`
  width: 80px;
  height: 83px;
  background: linear-gradient(180deg, #fff5e8 0%, #fbe7ce 100%);
  box-shadow: 0px 0px 3px #5f3204, inset 0px -1px 1px #c69452, inset 0px 1px 2px #ffffff;
  border-radius: 19px;
  position: absolute;
  top: 0;
  /* transition: 1s; */
`
const NumberContent = styled.div`
  border: 1.5px dashed #ad6c2b;
  box-shadow: inset 0.2px 0px 1px #4a2525;
  border-radius: 15px;
  display: flex;
  width: 70px;
  height: 73px;
  align-items: center;
  justify-content: center;
  margin: 5px;
  color: #804700;
  span {
    width: 70px;
    height: 73px;
    text-align: center;
    line-height: 73px;
  }
`

const rotateAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`
const LatticeIcon = styled.img`
  animation: ${rotateAnimation} 1s linear infinite;
`

const Box = ({ index, round, children, list }: any) => {
  const [subscript, setsubscript] = useState(index)
  const [leftPosition, setLeftPosition] = useState(index === 0 ? -92 : 92 * (index - 1))
  // const [leftPosition, setLeftPosition] = useState(92 * index)
  const [backPosition, setBackPosition] = useState(92 * 7)

  // const [nodes, setNodes] = useState([])
  // const addNode = () => {
  //   const newNode = <div key={nodes.length}>新节点 {nodes.length + 1}</div>
  //   setNodes(prevNodes => [newNode, ...prevNodes])
  // }
  useEffect(() => {
    if (leftPosition >= backPosition) {
      setsubscript(index - 1)
      setLeftPosition(-92)
    } else {
      setLeftPosition(prevPosition => prevPosition + 92)
    }
  }, [round])

  return (
    <NumberWrap
      style={{
        left: leftPosition,
        transition: leftPosition === -92 ? '0s' : '1s'
      }}
    >
      <NumberContent>
        {leftPosition === 0 && (
          <>
            {list[0] === 'loadding' ? (
              <span
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <LatticeIcon src={preStaticUrl + '/img/loading.svg'} />
              </span>
            ) : (
              <span
                style={
                  list[0] === 'pass'
                    ? { fontSize: '20px' }
                    : {
                        fontSize: '48px',
                        height: '80px'
                      }
                }
              >
                {list[0]}
              </span>
            )}
          </>
        )}
        {leftPosition === 92 * 1 && <span style={list[1] === 'pass' ? { fontSize: '20px' } : { fontSize: '48px', height: '80px' }}>{list[1]}</span>}
        {leftPosition === 92 * 2 && <span style={list[2] === 'pass' ? { fontSize: '20px' } : { fontSize: '48px', height: '80px' }}>{list[2]}</span>}
        {leftPosition === 92 * 3 && <span style={list[3] === 'pass' ? { fontSize: '20px' } : { fontSize: '48px', height: '80px' }}>{list[3]}</span>}
        {leftPosition === 92 * 4 && <span style={list[4] === 'pass' ? { fontSize: '20px' } : { fontSize: '48px', height: '80px' }}>{list[4]}</span>}
        {leftPosition === 92 * 5 && <span style={list[5] === 'pass' ? { fontSize: '20px' } : { fontSize: '48px', height: '80px' }}>{list[5]}</span>}
        {leftPosition === 92 * 6 && <span style={list[6] === 'pass' ? { fontSize: '20px' } : { fontSize: '48px', height: '80px' }}>{list[6]}</span>}
        {leftPosition === 92 * 7 && <span style={list[7] === 'pass' ? { fontSize: '20px' } : { fontSize: '48px', height: '80px' }}>{list[7]}</span>}
      </NumberContent>
    </NumberWrap>
  )
}

const RoundNumbers: React.FC<IRoundNumbers> = ({ address, numbers, round, onTimesUp }) => {
  const [initNumber, setInitNumber] = useState(['', '', '', '', '', '', '', '', ''])

  useEffect(() => {
    if (round) {
      const first = numbers.get(round) || 'loadding'
      const arr = new Array(round - 1).fill('?')
      arr.forEach((item, index) => {
        arr[index] = numbers.get(round - index - 1) || 'pass'
      })

      setInitNumber(list => {
        const newArr = [first, ...arr, '', '', '', '', '', '', '', '', ''].slice(0, 9)
        return newArr
      })
    }
  }, [round, numbers])

  return (
    <div className={css.roundNumbers}>
      {initNumber.map((item, index) => (
        <Box key={index} index={index} round={round} list={initNumber}>
          <span>{initNumber[index]}</span>
        </Box>
      ))}
    </div>
  )
}

export default RoundNumbers
