import { Component, createSignal } from 'solid-js'
import Grid from './Grid'
import { Turn } from './types'

const TicTacToe: Component = () => {
  const [turn, setTurn] = createSignal<Turn>('X')
  const onChangeTurn = () => {
    if (turn() === 'O') setTurn('X')
    else setTurn('O')
  }
  return (
    <div class="w-64 h-64 border-black border-2">
      <Grid onChangeTurn={onChangeTurn} turn={turn} focused={false}/>
    </div>
  )
}

export default TicTacToe
