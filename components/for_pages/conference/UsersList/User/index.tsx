import Image from 'next/image'
import styles from './index.module.scss'
import classNames from 'classnames'
import { useAppContext } from 'context/state'
import { colors } from 'styles/variables'
import MicrophoneOnSvg from 'components/svg/MicrophoneOnSvg'
import MicrophoneOffSvg from 'components/svg/MicrophoneOffSvg'
import { useRef, useState } from 'react'
import CameraOnSvg from 'components/svg/CameraOnSvg'
import CameraOffSvg from 'components/svg/CameraOffSvg'
import { CSSTransition } from 'react-transition-group'
import Button from 'components/ui/Button'
import { Platform } from 'data/enum/Platorm'

interface IUser {
  avatar?: string
  name: string
}

interface Props {
  user: IUser
  style?: 'new' | 'old' | 'header'
  onClick?: () => void
}

export default function User({ user, style, onClick }: Props) {

  const getClass = () => {
    return classNames(
      {
        [styles.new]: style === 'new',
        [styles.old]: style === 'old',
        [styles.header]: style === 'header'
      }
    )
  }

  const appContext = useAppContext()

  const [isMicOn, setIsMicOn] = useState<boolean>(true)
  const [isCamOn, setIsCamOn] = useState<boolean>(true)
  const [isDiconnect, setIsDisconnect] = useState<boolean>(false)
  
  const disconnectRef = useRef(null)

  return (
    <div className={classNames(styles.root, getClass())}>
      <div className={styles.main}>
        {user.avatar ?
          <Image className={styles.img} src={user.avatar} alt='' fill />
          :
          <div className={styles.avatar}><Image className={styles.ava} src={'/img/logos/user.svg'} alt='' fill /></div>}
        <div className={styles.name}>{user.name}</div>
      </div>
      {style === 'new' ? <div className={styles.allow} onClick={onClick}
        style={{ backgroundColor: appContext.coreStatus?.platform === Platform.Zoom ? `${colors.zoom}` : `${colors.trueconf}` }}>
        впустить
      </div> : null}
      {style === 'old' ?
        <div className={styles.controls}>
          <div className={styles.microphone}>
            {!appContext.isMuteAll ? <MicrophoneOnSvg className={styles.on} /> : <MicrophoneOffSvg className={styles.off} />}
          </div>
          <div className={styles.camera}>
            {isCamOn ? <CameraOnSvg className={styles.onCam} /> : <CameraOffSvg className={styles.offCam} />}
          </div>
          <div onClick={() => setIsDisconnect(true)}>
            <Image className={styles.close} src={'/img/logos/close.svg'} alt='' fill />
          </div>
        </div> : null}
      <CSSTransition
        timeout={2000}
        in={isDiconnect}
        nodeRef={disconnectRef}
        mountOnEnter
        unmountOnExit
        classNames={{
          enter: styles.itemEnter,
          enterActive: styles.itemEnterActive,
          exit: styles.itemExit,
          exitActive: styles.itemExitActive
        }}
      >
        <div className={styles.btns} ref={disconnectRef}>
          <Button type='submit' color={'gray'} fluid>
            отключить
          </Button>
          <Button onClick={() => setIsDisconnect(false)} color={'red'} fluid>
            отмена
          </Button>
        </div>
      </CSSTransition>
    </div>
  )
}
