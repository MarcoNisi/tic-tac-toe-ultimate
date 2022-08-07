export type Turn = 'X' | 'O'
export type Player = Turn
export type CellValue = Turn | ''
export type GridValues = [CellValue, CellValue, CellValue, CellValue, CellValue, CellValue, CellValue, CellValue, CellValue]
export type Coordinate = [number, number]
export interface WinningData {
  player: Player
  from: 'row-0' | 'row-1' | 'row-2' | 'col-0' | 'col-1' | 'col-2' | 'diagonal-0' | 'diagonal-1'
}
export interface GridWon {
  index: number
  player: Player
}
export interface LocalValues {
  value: CellValue
  isWinning: boolean
}