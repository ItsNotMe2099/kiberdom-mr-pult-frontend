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
        <svg ref={onRef} width="230" height="230" viewBox="0 0 113 122" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M34 29L113 0.77356V105H68V60L101.82 60V35.4486L45 53.8382V122H0V77H34V29ZM101.82 71H79V94H101.82V71ZM101.82 24.1706L45 43.827V36.0257L101.82 16.2797V24.1706ZM34 88V111H11V88H34Z" fill="#8200F1" />
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
        <svg ref={offRef} width="230" height="230" viewBox="0 0 124 127" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M3.99959 13.5458L11.5455 5.99988L33.3293 27.7837L112.492 0.273438V106.946L124 118.5L116.454 126.046L3.99959 13.5458ZM101.82 96.2744V69.6714H79.9434V74.3978L101.82 96.2744ZM69.2719 63.7262L55.7459 50.2003L101.82 34.4484V58.9999H69.2719V63.7262ZM101.82 23.1705V15.2796L41.7133 36.1677L47.3413 41.7957L101.82 23.1705ZM34.5894 76.6079V60.067L45.2609 70.7387V120.895H0.44043V76.6079H34.5894ZM34.5894 87.2795H11.112V110.223H34.5894V87.2795Z" fill="#707070" />
        </svg>

      </CSSTransition>
    </>
  )
}
