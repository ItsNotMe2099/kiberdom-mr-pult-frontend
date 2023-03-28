interface Props {
  className?: string
  color: string
}

export default function Cam1Svg(props: Props) {
  return (
    <svg className={props.className} width="150" height="150" viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M125 25H112V15H135V38H125V25ZM38 125H25L25 112H15L15 135H38V125ZM25 25L25 38H15V15H38V25L25 25ZM125 112V125H112V135H135V112H125Z" fill={props.color} />
      <path fill-rule="evenodd" clip-rule="evenodd" d="M53.5 69C61.5081 69 68 62.5081 68 54.5C68 46.4919 61.5081 40 53.5 40C45.4919 40 39 46.4919 39 54.5C39 62.5081 45.4919 69 53.5 69ZM58 54.5C58 56.9853 55.9853 59 53.5 59C51.0147 59 49 56.9853 49 54.5C49 52.0147 51.0147 50 53.5 50C55.9853 50 58 52.0147 58 54.5Z" fill={props.color} />
      <path fill-rule="evenodd" clip-rule="evenodd" d="M34 74H72V111H34V74ZM44 84V101H62V84H44Z" fill={props.color} />
      <path fill-rule="evenodd" clip-rule="evenodd" d="M97.5 69C105.508 69 112 62.5081 112 54.5C112 46.4919 105.508 40 97.5 40C89.4919 40 83 46.4919 83 54.5C83 62.5081 89.4919 69 97.5 69ZM102 54.5C102 56.9853 99.9853 59 97.5 59C95.0147 59 93 56.9853 93 54.5C93 52.0147 95.0147 50 97.5 50C99.9853 50 102 52.0147 102 54.5Z" fill={props.color} />
      <path fill-rule="evenodd" clip-rule="evenodd" d="M78 74H116V111H78V74ZM88 84V101H106V84H88Z" fill={props.color} />
    </svg>
  )
}

Cam1Svg.defaultProps = {
  color: '#707070'
}

