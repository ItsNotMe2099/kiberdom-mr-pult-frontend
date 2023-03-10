import { useRef } from 'react'
import { CSSTransition } from 'react-transition-group'
import styles from './index.module.scss'

interface Props {
  isOn: boolean
}

export default function MusicSvg({ isOn }: Props) {

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
        <svg ref={onRef} width="230" height="230" viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M52 44L131 15.7736V120H86V75L119.82 75V50.4486L63 68.8382V137H18V92H52V44ZM119.82 86H97V109H119.82V86ZM119.82 39.1706L63 58.827V51.0257L119.82 31.2797V39.1706ZM52 103V126H29V103H52Z" fill="#8200F1" />
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
        <svg ref={offRef} width="230" height="230" viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M21.9996 29.5458L29.5455 21.9999L51.3293 43.7837L130.492 16.2734V122.946L142 134.5L134.454 142.046L21.9996 29.5458ZM119.82 112.274V85.6714H97.9434V90.3978L119.82 112.274ZM87.2719 79.7262L73.7459 66.2003L119.82 50.4484V74.9999H87.2719V79.7262ZM119.82 39.1705V31.2796L59.7133 52.1677L65.3413 57.7957L119.82 39.1705ZM52.5894 92.6079V76.067L63.2609 86.7387V136.895H18.4404V92.6079H52.5894ZM52.5894 103.279H29.112V126.223H52.5894V103.279Z" fill="#707070" />
        </svg>


      </CSSTransition>
    </>
  )
}
