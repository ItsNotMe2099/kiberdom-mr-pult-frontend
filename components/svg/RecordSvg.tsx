import { MutableRefObject } from 'react'

interface Props {
  ref?: MutableRefObject<null>
}

export default function RecordSvg(props: Props) {
  return (
    <svg ref={props.ref} width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M19.1992 61.5998C19.1992 39.0666 37.466 20.7998 59.9992 20.7998C82.5324 20.7998 100.799 39.0666 100.799 61.5998C100.799 84.133 82.5324 102.4 59.9992 102.4C37.466 102.4 19.1992 84.133 19.1992 61.5998ZM59.9992 29.0981C42.049 29.0981 27.4975 43.6496 27.4975 61.5998C27.4975 79.55 42.049 94.1015 59.9992 94.1015C77.9494 94.1015 92.5009 79.55 92.5009 61.5998C92.5009 43.6496 77.9494 29.0981 59.9992 29.0981Z"  />
      <rect x="36.8008" y="38.4004" width="46.4" height="46.4" rx="23.2"  />
    </svg>
  )
}

