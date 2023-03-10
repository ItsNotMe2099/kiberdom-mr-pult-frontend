import { useRef } from 'react'
import { CSSTransition } from 'react-transition-group'
import styles from './index.module.scss'

interface Props {
  isOn: boolean
  className?: string
}

export default function Members2Svg({ isOn, className }: Props) {

  const onRef = useRef(null)
  const offRef = useRef(null)

  return (
    <>
      <CSSTransition
        timeout={500}
        in={isOn}
        nodeRef={onRef}
        mountOnEnter
        unmountOnExit
        classNames={{
          enter: styles.itemEnter,
          enterActive: styles.itemEnterActive,
          exit: styles.itemExit,
          exitActive: styles.itemExitActive,
        }}
      >
        <svg className={className} width="120" height="120" viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M90.8806 24L98 31.1361L54.2387 75L98 118.864L90.8806 126L40 75L90.8806 24Z" />
        </svg>
      </CSSTransition>
      <CSSTransition
        timeout={500}
        in={!isOn}
        nodeRef={offRef}
        mountOnEnter
        unmountOnExit
        classNames={{
          enter: styles.itemEnter,
          enterActive: styles.itemEnterActive,
          exit: styles.itemExit,
          exitActive: styles.itemExitActive,
        }}
      >
        <svg className={className} width="120" height="120" viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M93.5 43C93.5 53.4934 84.9934 62 74.5 62C64.0066 62 55.5 53.4934 55.5 43C55.5 32.5066 64.0066 24 74.5 24C84.9934 24 93.5 32.5066 93.5 43ZM83.5 43C83.5 47.9706 79.4706 52 74.5 52C69.5294 52 65.5 47.9706 65.5 43C65.5 38.0294 69.5294 34 74.5 34C79.4706 34 83.5 38.0294 83.5 43Z" />
          <path fill-rule="evenodd" clip-rule="evenodd" d="M42 66.75H107V127.75H42V66.75ZM52 117.75V76.75H97V117.75H52Z" />
          <path d="M114.5 114.75V104.75H129V77.25H114.5V67.25H139V114.75H114.5Z" />
          <path fill-rule="evenodd" clip-rule="evenodd" d="M118.25 62.5C126.12 62.5 132.5 56.1201 132.5 48.25C132.5 40.3799 126.12 34 118.25 34C110.38 34 104 40.3799 104 48.25C104 56.1201 110.38 62.5 118.25 62.5ZM118.25 52.5C120.597 52.5 122.5 50.5972 122.5 48.25C122.5 45.9028 120.597 44 118.25 44C115.903 44 114 45.9028 114 48.25C114 50.5972 115.903 52.5 118.25 52.5Z" />
          <path d="M34.5 115V105H20V77.5H34.5V67.5H10V115H34.5Z" />
          <path fill-rule="evenodd" clip-rule="evenodd" d="M30.75 62.75C22.8799 62.75 16.5 56.3701 16.5 48.5C16.5 40.6299 22.8799 34.25 30.75 34.25C38.6201 34.25 45 40.6299 45 48.5C45 56.3701 38.6201 62.75 30.75 62.75ZM30.75 52.75C28.4028 52.75 26.5 50.8472 26.5 48.5C26.5 46.1528 28.4028 44.25 30.75 44.25C33.0972 44.25 35 46.1528 35 48.5C35 50.8472 33.0972 52.75 30.75 52.75Z" />
        </svg>


      </CSSTransition>
    </>
  )
}
