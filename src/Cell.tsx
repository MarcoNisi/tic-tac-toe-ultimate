import type { Component } from 'solid-js'
import { CellValue } from './types'

interface CellProps {
  value: CellValue
  winningCell: boolean
  onClick: () => void
}

const Cell: Component<CellProps> = ({ value, winningCell, onClick }) => {
  return (
    <button
      class={`flex items-center justify-center border-black border ${
        winningCell && 'bg-red-300'
      } text-black active:bg-slate-400 active:text-white`}
      onClick={onClick}
    >
      <span class="text-4xl">{value}</span>
    </button>
  )
}

export default Cell
