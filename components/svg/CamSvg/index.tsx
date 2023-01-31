import { useConfContext } from 'context/conference_state'
import { useAppContext } from 'context/state'
import { CameraState } from 'data/enum/CameraState'
import { Platform } from 'data/enum/Platorm'
import { useRef } from 'react'
import { CSSTransition } from 'react-transition-group'
import { colors } from 'styles/variables'
import styles from './index.module.scss'

interface Props {
  
}

export default function CamSvg({  }: Props) {

  const onRef = useRef(null)
  const offRef = useRef(null)

  const appContext = useAppContext()
  const confContext = useConfContext()

  return (
    <>
      <CSSTransition
        timeout={500}
        in={confContext.isCamOn === CameraState.On}
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
        <svg ref={onRef} width="165" height="123" viewBox="0 0 165 123" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M110.229 75.3501V69.718L147.711 83.5699V40.4959L110.229 60.8662V17.6591H16.8V105.8H110.229V75.3501ZM126.7 122.6V122.6H0V17.6V16.2V0.859131H127.029V32.615L164.511 12.2446V107.689L127.029 93.2V122.6H126.7Z" fill={appContext.coreStatus?.platform === Platform.Zoom ? colors.zoom : appContext.coreStatus?.platform === Platform.TrueConf ? colors.trueconf : ''} />
        </svg>

      </CSSTransition>
      <CSSTransition
        timeout={500}
        in={confContext.isCamOn === CameraState.Off}
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
        <svg ref={offRef} width="167" height="166" viewBox="0 0 167 166" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M110.23 97.3502V91.7182L147.711 105.57V62.496L110.23 82.8664V39.6593H52.5389L110.23 97.3502ZM129.706 116.826L166.94 154.06L155.061 165.94L1.06055 11.9397L12.9399 0.0603027L35.7389 22.8593H127.03V54.6151L164.511 34.2448V129.689L129.706 116.826Z" fill="#707070" />
          <path fill-rule="evenodd" clip-rule="evenodd" d="M0 38.2H16.8V127.8H105V144.6H0V38.2Z" fill="#707070" />
        </svg>


      </CSSTransition>
    </>
  )
}
