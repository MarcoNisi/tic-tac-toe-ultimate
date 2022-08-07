import type { Component } from 'solid-js'
import { CellValue } from './types'

interface CellProps {
  value: CellValue
  winningCell: boolean
  disabled: boolean
  onClick: () => void
}

const Cell: Component<CellProps> = (props) => {
  return (
    <button
      class={`flex items-center justify-center border-black border ${props.winningCell && 'bg-red-300'} text-black active:text-white ${
        !props.disabled && 'hover:bg-slate-500'
      }`}
      onClick={props.onClick}
    >
      <span class="text-4xl">{props.value}</span>
    </button>
  )
}

export default Cell
