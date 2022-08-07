import { Component, createEffect, createSignal, For } from 'solid-js'
import Dialog from './Dialog'
import Grid from './Grid'
import { GridValues, GridWon, Turn } from './types'
import { isWinner } from './utils'

const initialGridValues: GridValues = ['', '', '', '', '', '', '', '', '']

const App: Component = () => {
  const [turn, setTurn] = createSignal<Turn>('X')
  const [gameIndex, setGameIndex] = createSignal(0)
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
  const onReset = () => {
    setTurn('O')
    setFocus(null)
    setGridValues(initialGridValues)
    setEnd(false)
    setWon([])
  }
  createEffect(() => {
    won().forEach((w) => {
      setGridValues((gridValues) => {
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
      setGameIndex((p) => p + 1)
    }
  })
  return (
    <div class="h-full flex items-center p-3">
      <div class="w-clamped m-auto">
        <div class="mb-3 flex justify-between items-center">
          <span class={`text-lg ${turn() === 'X' && 'underline font-semibold'}`}>Player X</span>
          <span>Game {gameIndex() + 1}</span>
          <span class={`text-lg ${turn() === 'O' && 'underline font-semibold'}`}>Player O</span>
        </div>
        <div class="aspect-square grid grid-cols-3 grid-rows-3 gap-3 items-center">
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
                  gameIndex={gameIndex}
                />
              )
            }}
          </For>
        </div>
      </div>
      {end() && (
        <Dialog onClose={() => null}>
          <div class="flex flex-col gap-3">
            <span>Player {turn()} has won!</span>
            <button
              onClick={onReset}
              class="bg-slate-500 text-white p-1"
            >
              Restart
            </button>
          </div>
        </Dialog>
      )}
    </div>
  )
}

export default App
