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
import { IParticipant } from 'data/interfaces/IParticipant'
import { ParticipantAudioState } from 'data/enum/ParticipantAudioState'
import ParticipantRepository from 'data/repositories/ParticipantsRepository'

interface Props {
  user: IParticipant
  style?: 'new' | 'old'
  onClick?: () => void
  onAdmit?: () => void
  onExpel?: () => void
  onMute?: () => void
}

export default function User({ user, style, onClick, onExpel, onMute, onAdmit }: Props) {

  const getClass = () => {
    return classNames(
      {
        [styles.new]: style === 'new',
        [styles.old]: style === 'old',
      }
    )
  }

  const appContext = useAppContext()

  const [isCamOn, setIsCamOn] = useState<boolean>(true)
  const [isDiconnect, setIsDisconnect] = useState<boolean>(false)

  const disconnectRef = useRef(null)

  const handleMuteAudioForUser = async (id: number | string) => {
    await ParticipantRepository.muteAudioParticipant(id)
    onMute ? onMute() : null
  }

  const handleAdmitUser = async (id: number | string) => {
    await ParticipantRepository.acceptParticipant(id)
    onAdmit ? onAdmit() : null
  }

  const handleExpelUser = async (id: number | string) => {
    await ParticipantRepository.deleteParticipant(id)
    onExpel ? onExpel() : null
  }

  console.log('user.audio_status?.state',user.audio_status_state)

  return (
    <div className={classNames(styles.root, getClass())} onClick={onClick}>
      <div className={styles.main}>
        {user.avatar_url ?
          <img className={styles.img} src={user.avatar_url} alt='' />
          :
          <div className={styles.avatar}><Image className={styles.ava} src={'/img/logos/user.svg'} alt='' fill /></div>}
        <div className={styles.name}>{user.user_name}</div>
      </div>
      {style === 'new' ? <div className={styles.allow} onClick={() => user.user_id && handleAdmitUser(user.user_id)}
        style={{ backgroundColor: appContext.coreStatus?.platform === Platform.Zoom ? `${colors.zoom}` : `${colors.trueconf}` }}>
        впустить
      </div> : null}
      {style === 'old' ?
        <div className={styles.controls}>
          <div className={styles.microphone}
            onClick={() =>
              user.audio_status_state === ParticipantAudioState.Unmuted && user.user_id ?
                handleMuteAudioForUser(user.user_id)
                : null}>
            {user.audio_status_state ===
              ParticipantAudioState.Unmuted ?
              <MicrophoneOnSvg className={styles.on} />
              : <MicrophoneOffSvg className={styles.off} />}
          </div>
          <div className={styles.camera}>
            {isCamOn ? <CameraOnSvg className={styles.onCam} /> : <CameraOffSvg className={styles.offCam} />}
          </div>
          <div onClick={() => setIsDisconnect(true)} className={styles.closeWrap}>
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
          <Button onClick={() => user.user_id && handleExpelUser(user.user_id)} color={'gray'} fluid>
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
