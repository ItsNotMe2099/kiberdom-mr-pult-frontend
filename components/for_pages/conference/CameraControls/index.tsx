import { useAppContext } from 'context/state'
import { CamState } from 'data/enum/CamState'
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
          active={appContext.camOption === CamState.Faces}
          onClick={() => appContext.handleCamOption(CamState.Faces)}
          platform={appContext.coreStatus?.platform as Platform} icon='/img/camera-controls/manual.svg' title='вручную' />
        <Item
          active={appContext.camOption === CamState.Cam1}
          onClick={() => appContext.handleCamOption(CamState.Cam1)}
          platform={appContext.coreStatus?.platform as Platform} icon='/img/camera-controls/auto.svg' title='автокадрирование' />
        <Item
          active={appContext.camOption === CamState.Cam2}
          onClick={() => appContext.handleCamOption(CamState.Cam2)}
          platform={appContext.coreStatus?.platform as Platform} icon='/img/camera-controls/streams.svg' title='несколько потоков' />
      </div>
    </CSSTransition>
  )
}
