import type { DetailedHTMLProps, HTMLAttributes, InputHTMLAttributes, LabelHTMLAttributes } from "react"

export type Props = {
  label: DetailedHTMLProps<LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement>,
  input: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
} & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>

export const ChannelComponent = (props: Props) => (
  <div {...props}>
    <label {...props.label}>Канал:</label>
    <input {...props.input} type="text" />
  </div>
)