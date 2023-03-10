import { useAppContext } from 'context/state'
import { OnOffState } from 'data/enum/OnOffState'
import { Platform } from 'data/enum/Platorm'
import { useRef } from 'react'
import { CSSTransition } from 'react-transition-group'
import { colors } from 'styles/variables'
import styles from './index.module.scss'

interface Props {

}

export default function MicSvg({ }: Props) {

  const onRef = useRef(null)
  const offRef = useRef(null)

  const appContext = useAppContext()


  return (
    <>
      <CSSTransition
        timeout={500}
        in={appContext.micState === OnOffState.On}
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
        <svg ref={onRef} width="210" height="210" viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M55.5 34H93V95H55.5V34ZM67.5 46V83H81V46H67.5ZM45 105.5V76.5H33V117.5H69V129H81V117.5H115V76.5H103V105.5H45Z"
            fill={appContext.coreStatus?.platform === Platform.Zoom ? colors.zoom : appContext.coreStatus?.platform === Platform.TrueConf ? colors.trueconf : ''} />
        </svg>

      </CSSTransition>
      <CSSTransition
        timeout={500}
        in={appContext.micState === OnOffState.Off}
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
        <svg ref={offRef} width="210" height="210" viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M44.3723 20.4587L34.6904 27.5483L113.531 135.216L123.213 128.127L115 116.911V76.5H103V100.523L93 86.8668V34H55.5V35.6553L44.3723 20.4587ZM67.5 52.043L81 70.4791V46H67.5V52.043Z" fill="#707070" />
          <path d="M55.5 95V69.6232L74.0823 95H55.5Z" fill="#707070" />
          <path d="M45 105.5H81.771L90.5581 117.5H81V129H69V117.5H33V76.5H45V105.5Z" fill="#707070" />
        </svg>
      </CSSTransition>
    </>
  )
}
