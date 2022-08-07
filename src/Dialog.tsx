import { Component, JSX } from 'solid-js'

interface DialogProps {
  onClose: () => void
  children: JSX.Element
}

const Dialog: Component<DialogProps> = (props: DialogProps) => {
  return (
    <div
      class="fixed z-20 left-0 top-0 w-full h-full overflow-auto bg-black bg-opacity-90 flex p-2 justify-center items-center"
      onClick={props.onClose}
    >
      <div class="bg-white p-4">{props.children}</div>
    </div>
  )
}

export default Dialog
