import { useAppContext } from 'context/state'
import { OnOffState } from 'data/enum/OnOffState'
import { Platform } from 'data/enum/Platorm'
import { useRef } from 'react'
import { CSSTransition } from 'react-transition-group'
import { colors } from 'styles/variables'
import styles from './index.module.scss'

interface Props {

}

export default function CamSvg({ }: Props) {

  const onRef = useRef(null)
  const offRef = useRef(null)

  const appContext = useAppContext()

  return (
    <>
      <CSSTransition
        timeout={500}
        in={appContext.camState === OnOffState.On}
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
        <svg width="210" height="210" viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M93.7352 85.2501V81.2272L120.508 91.1213V60.3542L93.7352 74.9044V44.0422H27V107H93.7352V85.2501ZM105.5 119V119H15V44V43V32.0422H105.735V54.725L132.508 40.1747V108.349L105.735 98V119H105.5Z"
            fill={appContext.coreStatus?.platform === Platform.Zoom ? colors.zoom : appContext.coreStatus?.platform === Platform.TrueConf ? colors.trueconf : ''} />
        </svg>


      </CSSTransition>
      <CSSTransition
        timeout={500}
        in={appContext.camState === OnOffState.Off}
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
        <svg width="210" height="210" viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M93.7359 85.2501V81.2272L120.508 91.1214V60.3542L93.7359 74.9045V44.0423H52.5281L93.7359 85.2501ZM107.647 99.1617L134.243 125.757L125.758 134.243L15.7578 24.2426L24.2431 15.7573L40.5281 32.0423H105.736V54.7251L132.508 40.1748V108.349L107.647 99.1617Z" fill="#707070" />
          <path fill-rule="evenodd" clip-rule="evenodd" d="M15 43H27V107H90V119H15V43Z" fill="#707070" />
        </svg>
      </CSSTransition>
    </>
  )
}
