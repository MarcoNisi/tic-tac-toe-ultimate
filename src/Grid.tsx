import { Accessor, Component, createEffect, createSignal, For } from 'solid-js'
import Cell from './Cell'
import { CellValue, GridValues, Player, Turn, WinningData } from './types'
import { isAWinningCell, isWinner } from './utils'

interface CellProps {
  turn: Accessor<Turn>
  gameIndex: Accessor<number>
  onChangeTurn: (i: number) => void
  disabled?: boolean
  focused?: boolean
  won?: Player
  onWon?: (player: Player) => void
}

interface LocalValues {
  value: CellValue
  isWinning: boolean
}

const startingValues: LocalValues[] = Array.from({ length: 9 }).map(() => ({
  isWinning: false,
  value: '',
}))

const Grid: Component<CellProps> = (props) => {
  const [localValues, setLocalValues] = createSignal<LocalValues[]>(startingValues)
  const rowLength = Math.sqrt(localValues().length)
  const [won, setWon] = createSignal<WinningData | null>(null)
  const onClick = (i: number) => {
    if (localValues().at(i).value === '' && !props.disabled && !won()) {
      setLocalValues((prev) => {
        const newValues = prev.slice()
        newValues[i] = {
          ...newValues[i],
          value: props.turn(),
        }
        return newValues
      })
      props.onChangeTurn(i)
    }
  }
  createEffect(() => {
    if (!won()) {
      const winner = isWinner(localValues().map((v) => v.value) as GridValues)
      if (winner) {
        setWon(winner)
        if (props.onWon) {
          props.onWon(props.turn())
        }
      }
    }
  })
  createEffect(() => {
    if (won()) {
      setLocalValues((prev) => {
        const newValues = prev.map((localValue, i) => ({ ...localValue, isWinning: isAWinningCell(i, won().from, rowLength) }))
        return newValues
      })
    }
  })
  createEffect(() => {
    if (props.gameIndex()) {
      setLocalValues(startingValues)
      setWon(null)
    }
  })
  return (
    <div
      class={`grid overflow-hidden relative grid-cols-3 grid-rows-3 border border-black w-full h-full ${props.focused && 'bg-slate-400'} ${
        props.disabled && 'bg-slate-100'
      }`}
    >
      <For each={localValues()}>
        {(localValue, i) => {
          return <Cell value={localValue.value} onClick={() => onClick(i())} disabled={props.disabled} winningCell={localValue.isWinning} />
        }}
      </For>
      {props.won && (
        <div class="absolute w-full h-full bg-slate-400 flex justify-center items-center">
          <span class="text-red-400 text-8xl md:text-12xl">{props.won}</span>
        </div>
      )}
    </div>
  )
}

export default Grid
