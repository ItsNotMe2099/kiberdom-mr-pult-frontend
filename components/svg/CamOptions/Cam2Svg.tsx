interface Props {
  className?: string
  color: string
}

export default function Cam2Svg(props: Props) {
  return (
    <svg className={props.className} width="150" height="150" viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M125 25H112V15H135V38H125V25ZM38 125H25L25 112H15L15 135H38V125ZM25 25L25 38H15V15H38V25L25 25ZM125 112V125H112V135H135V112H125Z" fill={props.color} />
      <path fill-rule="evenodd" clip-rule="evenodd" d="M66 53.75H15V96.75H66V53.75ZM25 86.75V63.75H56V86.75H25Z" fill={props.color} />
      <path fill-rule="evenodd" clip-rule="evenodd" d="M74 48.75H135V101.75H74V48.75ZM101.687 89.7417L124.513 66.4579L117 59L101.687 74.7161L93.5126 66.359L86 73.8168L101.687 89.7417Z" fill={props.color} />
    </svg>
  )
}

Cam2Svg.defaultProps = {
  color: '#707070'
}

