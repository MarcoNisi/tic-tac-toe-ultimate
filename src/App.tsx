import { Component, createEffect, createSignal, For } from 'solid-js'
import Grid from './Grid'
import { GridValues, GridWon, Turn } from './types'
import { isWinner } from './utils'

const initialGridValues: GridValues = [
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  ''
]

const App: Component = () => {
  const [turn, setTurn] = createSignal<Turn>('X')
  const [won, setWon] = createSignal<GridWon[]>([])
  const [focus, setFocus] = createSignal<number | null>(null)
  const [gridValues, setGridValues] = createSignal(initialGridValues)
  const [end, setEnd] = createSignal(false)
  const onChangeTurn = (i: number) => {
    if (turn() === 'O') {
      setTurn('X')
    } else {
      setTurn('O')
    }
    if (won().find((w) => w.index === i)) {
      setFocus(null)
    } else {
      setFocus(i)
    }
  }
  const isDisabled = (focus: null | number, i: number) => {
    return (focus !== null && focus !== i) || end()
  }
  const isWon = (gridWon: GridWon[], i: number) => {
    return gridWon.find((w) => w.index === i)?.player
  }
  createEffect(() => {
    won().forEach(w => {
      setGridValues(gridValues => {
        const newGridValues = gridValues.slice()
        newGridValues[w.index] = w.player
        return newGridValues as GridValues
      })
    })
  })
  createEffect(() => {
    const winner = isWinner(gridValues())
    if (winner) {
      setEnd(true)
    }
  })
  return (
    <div class="h-full flex items-center p-3">
      <div class="w-clamped m-auto aspect-square grid grid-cols-3 grid-rows-3 gap-3 items-center">
        <For each={Array.from({ length: 9 })}>
          {(_, i) => {
            return (
              <Grid
                onChangeTurn={onChangeTurn}
                onWon={(player) =>
                  setWon((p) =>
                    p.concat({
                      index: i(),
                      player,
                    })
                  )
                }
                turn={turn}
                focused={focus() === i()}
                disabled={isDisabled(focus(), i())}
                won={isWon(won(), i())}
              />
            )
          }}
        </For>
      </div>
    </div>
  )
}

export default App
