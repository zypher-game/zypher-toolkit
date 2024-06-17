export function moveItemToMiddle<T extends { userId: string }>(array: T[], targetId: string): T[] {
  const itemToMove = array.find(item => item.userId === targetId)
  if (!itemToMove) {
    return array
  }

  const middleIndex = Math.floor((array.length - 1) / 2)

  const index = array.indexOf(itemToMove)
  array.splice(index, 1)
  array.splice(middleIndex, 0, itemToMove)
  return array
}
