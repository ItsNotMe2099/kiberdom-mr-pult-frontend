import Cam1Svg from 'components/svg/CamOptions/Cam1Svg'
import Cam2Svg from 'components/svg/CamOptions/Cam2Svg'
import FacesSvg from 'components/svg/CamOptions/FacesSvg'
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
          platform={appContext.coreStatus?.platform as Platform} icon={<FacesSvg className={styles.icon} color='#FFF' />} title='участники' />
        <Item
          active={appContext.camOption === CamState.Cam1}
          onClick={() => appContext.handleCamOption(CamState.Cam1)}
          platform={appContext.coreStatus?.platform as Platform} icon={<Cam1Svg className={styles.icon} color='#FFF' />} title='камера 1' />
        <Item
          active={appContext.camOption === CamState.Cam2}
          onClick={() => appContext.handleCamOption(CamState.Cam2)}
          platform={appContext.coreStatus?.platform as Platform} icon={<Cam2Svg className={styles.icon} color='#FFF' />} title='камера 2' />
      </div>
    </CSSTransition>
  )
}
