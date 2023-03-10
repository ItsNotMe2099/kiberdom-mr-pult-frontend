interface Props {
  className?: string
}

export default function InviteSvg(props: Props) {
  return (
    <svg className={props.className} width="120" height="120" viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M94 43.75C94 54.2434 85.4934 62.75 75 62.75C64.5066 62.75 56 54.2434 56 43.75C56 33.2566 64.5066 24.75 75 24.75C85.4934 24.75 94 33.2566 94 43.75ZM84 43.75C84 48.7206 79.9706 52.75 75 52.75C70.0294 52.75 66 48.7206 66 43.75C66 38.7794 70.0294 34.75 75 34.75C79.9706 34.75 84 38.7794 84 43.75Z" />
      <path d="M101.75 86.5V77.5H48.25V114.5H75V124.5H38.25V67.5H111.75V86.5H101.75Z" />
      <path d="M95.5 107.25V93.25H105.5V107.25H119.5V117.25H105.5V131.25H95.5V117.25H81.5V107.25H95.5Z" />
    </svg>
  )
}

