import { CardNumbersType } from './generateCardNumbers'

const defaultRow = 5
export default function getBingoLines(selectedNumbers: number[], cardNumbers: CardNumbersType) {
  const cols: { [key: number]: number[] } = {}
  const rows: { [key: number]: number[] } = {}
  const diagonals: number[][] = [[], []]
  for (const selectedNumber of selectedNumbers) {
    const { col, row } = cardNumbers.find(cardNumber => cardNumber.num === selectedNumber) || {}
    if (!col || !row) continue

    if (!cols[col]) cols[col] = []
    if (!rows[row]) rows[row] = []
    cols[col].push(selectedNumber)
    rows[row].push(selectedNumber)
    if (col === row) {
      diagonals[0].push(selectedNumber)
    }
    if (col + row === defaultRow + 1) {
      diagonals[1].push(selectedNumber)
    }
  }
  return diagonals
    .concat(Object.values(cols))
    .concat(Object.values(rows))
    .filter(nums => nums.length >= defaultRow)
}
