import { useConfContext } from 'context/conference_state'
import { useAppContext } from 'context/state'
import { MicrophoneState } from 'data/enum/MicrophoneState'
import { Platform } from 'data/enum/Platorm'
import { useRef } from 'react'
import { CSSTransition } from 'react-transition-group'
import { colors } from 'styles/variables'
import styles from './index.module.scss'

interface Props {
  
}

export default function MicSvg({  }: Props) {

  const onRef = useRef(null)
  const offRef = useRef(null)

  const appContext = useAppContext()
  const confContext = useConfContext()

  return (
    <>
      <CSSTransition
        timeout={500}
        in={confContext.isMicOn === MicrophoneState.On}
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
        <svg ref={onRef} width="115" height="134" viewBox="0 0 115 134" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M31.7002 0.600098H84.2002V86.0001H31.7002V0.600098ZM48.5002 17.4001V69.2001H67.4002V17.4001H48.5002ZM17.0002 100.7V60.1001H0.200195V117.5H50.6002V133.6H67.4002V117.5H115V60.1001H98.2002V100.7H17.0002Z" fill={appContext.coreStatus?.platform === Platform.Zoom ? colors.zoom : appContext.coreStatus?.platform === Platform.TrueConf ? colors.trueconf : ''} />
        </svg>
      </CSSTransition>
      <CSSTransition
        timeout={500}
        in={confContext.isMicOn === MicrophoneState.Off || confContext.isMicOn === null}
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
        <svg ref={offRef} width="127" height="162" viewBox="0 0 127 162" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M16.1214 0.642334L2.5668 10.5677L112.943 161.303L126.498 151.377L115 135.675V79.1001H98.2002V112.733L84.2002 93.6137V19.6001H31.7002V21.9175L16.1214 0.642334ZM48.5002 44.8602L67.4002 70.6709V36.4001H48.5002V44.8602Z" fill="#707070" />
          <path d="M31.7002 105V69.4726L57.7155 105H31.7002Z" fill="#707070" />
          <path d="M17.0002 119.7H68.4796L80.7815 136.5H67.4002V152.6H50.6002V136.5H0.200195V79.1001H17.0002V119.7Z" fill="#707070" />
        </svg>



      </CSSTransition>
    </>
  )
}
