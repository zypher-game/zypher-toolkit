type GenerateRulesType = {
  cols: number
  rows: number
  minNum: number
  maxNum: number
}

export type CardNumberType = {
  col: number
  row: number
  num: number
}

export type CardNumbersType = CardNumberType[]

export default function generateCardNumbers(rules: GenerateRulesType): CardNumbersType {
  const { cols, rows, minNum, maxNum } = rules
  const length = maxNum - minNum + 1
  const availableNumbers = new Array(length).fill('').map((_, idx) => idx + 1)
  let currentRow = 1
  let currentCol = 1
  const numberOfSpace = cols * rows
  const cardNumbers: CardNumbersType = []
  for (let idx = 0; idx < numberOfSpace; idx++) {
    const position = Math.floor(Math.random() * availableNumbers.length)
    cardNumbers.push({
      col: currentCol,
      row: currentRow,
      num: availableNumbers.splice(position, 1)[0]
    })
    currentCol = currentCol === cols ? 1 : currentCol + 1
    currentRow = currentCol === 1 ? currentRow + 1 : currentRow
  }
  return cardNumbers
}
