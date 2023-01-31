import { useConfContext } from 'context/conference_state'
import { useAppContext } from 'context/state'
import { Platform } from 'data/enum/Platorm'
import { useRef } from 'react'
import { CSSTransition } from 'react-transition-group'
import styles from './index.module.scss'
import Item from './Item'

interface Props {
  isActive: boolean
}

export default function CameraControls({ isActive }: Props) {

  const appContext = useAppContext()
  const confContext = useConfContext()

  const nodeRef = useRef(null)

  return (
    <CSSTransition
      timeout={500}
      in={isActive}
      nodeRef={nodeRef}
      mountOnEnter
      unmountOnExit
      classNames={{
        enter: styles.itemEnter,
        enterActive: styles.itemEnterActive,
        exit: styles.itemExit,
        exitActive: styles.itemExitActive,
      }}
    >
      <div className={styles.root} ref={nodeRef}>
        <Item
          active={confContext.isManualCamera}
          onClick={confContext.handleManualCamera}
          color={appContext.coreStatus?.platform === Platform.Zoom ? 'blue' : 'green'} icon='/img/camera-controls/manual.svg' title='вручную' />
        <Item
          active={confContext.isAutoCamera}
          onClick={confContext.handleAutoCamera}
          color={appContext.coreStatus?.platform === Platform.Zoom ? 'blue' : 'green'} icon='/img/camera-controls/auto.svg' title='автокадрирование' />
        <Item
          active={confContext.isStreamsCamera}
          onClick={confContext.handleStreamsCamera}
          color={appContext.coreStatus?.platform === Platform.Zoom ? 'blue' : 'green'} icon='/img/camera-controls/streams.svg' title='несколько потоков' />
      </div>
    </CSSTransition>
  )
}
