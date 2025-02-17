interface Props {
  className?: string
}

export default function CameraOffSvg(props: Props) {
  return (
    <svg className={props.className} width="210" height="210" viewBox="0 0 210 210" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M131.23 119.35V113.718L168.711 127.57V84.496L131.23 104.866V61.6593H73.5389L131.23 119.35ZM150.706 138.826L187.94 176.06L176.061 187.94L22.0605 33.9397L33.9399 22.0603L56.7389 44.8593H148.03V76.6151L185.511 56.2448V151.689L150.706 138.826Z" />
      <path fill-rule="evenodd" clip-rule="evenodd" d="M21 60.2H37.8V149.8H126V166.6H21V60.2Z" />
    </svg>

  )
}

