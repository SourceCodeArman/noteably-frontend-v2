import Modal, { type ModalProps } from './Modal'

export type SheetSide = NonNullable<ModalProps['side']>

export type SheetProps = Omit<ModalProps, 'variant'>

const Sheet = ({ side = 'right', ...props }: SheetProps) => (
  <Modal {...props} variant="sheet" side={side} />
)

Sheet.displayName = 'Sheet'

export default Sheet
