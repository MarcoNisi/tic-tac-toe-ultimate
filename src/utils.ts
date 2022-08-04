import { Coordinate, GridValues, Player, WinningData } from './types'

const sameValues = (values: GridValues, startX: number, startY: number, dx: number, dy: number): Player | false => {
  const rowLength = Math.sqrt(values.length)
  const firstValue = values[startX * rowLength + startY]
  if (firstValue === '') return false
  for (let i = 0; i < rowLength; i++) {
    let x = startX + dx * i
    let y = startY + dy * i
    if (values[x * rowLength + y] !== firstValue) return false
  }
  return firstValue
}

export const isWinner = (values: GridValues): WinningData | null => {
  const rowLength = Math.sqrt(values.length)
  for (let x = 0; x < rowLength; x++) {
    let value = sameValues(values, x, 0, 0, 1)
    if (value) {
      return {
        player: value,
        from: `row-${x}` as WinningData['from'],
      }
    }
  }
  for (let y = 0; y < rowLength; y++) {
    let value = sameValues(values, 0, y, 1, 0)
    if (value) {
      return {
        player: value,
        from: `col-${y}` as WinningData['from'],
      }
    }
  }
  let leftDiagonal = sameValues(values, 0, 0, 1, 1)
  if (leftDiagonal) {
    return {
      player: leftDiagonal,
      from: 'diagonal-0',
    }
  }
  let rightDiagonal = sameValues(values, 2, 0, -1, 1)
  if (rightDiagonal) {
    return {
      player: rightDiagonal,
      from: 'diagonal-1',
    }
  }
  return null
}

export const isAWinningCell = (index: number, winningDataFrom: WinningData['from'], rowLength: number) => {
  const coordinate: Coordinate = [Math.floor(index / rowLength), index % rowLength]

  if (winningDataFrom === 'col-0' && coordinate[1] === 0) return true 
  if (winningDataFrom === 'col-1' && coordinate[1] === 1) return true 
  if (winningDataFrom === 'col-2' && coordinate[1] === 2) return true 

  if (winningDataFrom === 'row-0' && coordinate[0] === 0) return true 
  if (winningDataFrom === 'row-1' && coordinate[0] === 1) return true 
  if (winningDataFrom === 'row-2' && coordinate[0] === 2) return true 

  if (winningDataFrom === 'diagonal-0' && coordinate[0] === coordinate[1]) return true 
  if (winningDataFrom === 'diagonal-1' && (coordinate[0] + coordinate[1]) === rowLength - 1) return true

  return false
}