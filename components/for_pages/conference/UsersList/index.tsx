import MicrophoneOffSvg from 'components/svg/MicrophoneOffSvg'
import { useAppContext } from 'context/state'
import { IParticipant } from 'data/interfaces/IParticipant'
import { useRef } from 'react'
import { CSSTransition } from 'react-transition-group'
import styles from './index.module.scss'
import User from './User'

interface Props {
  isActive: boolean
  users: IParticipant[]
  onMuteAll: () => void
  onAdmit?: () => void
  onExpel?: () => void
  onMute?: () => void
}

export default function UsersList({ isActive, users, onMuteAll, onAdmit, onExpel, onMute }: Props) {

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
        <div className={styles.list}>
          {users.filter(i => i.is_in_waiting_room === true).map((i, index) =>
            <User user={i} key={index} style='new' onAdmit={onAdmit} />
          )}
          {users.filter(i => i.is_in_waiting_room === false).map((i, index) =>
            <User user={i} key={index} style='old' onExpel={onExpel} onMute={onMute}/>
          )}
        </div>
        <div className={styles.micControl} onClick={onMuteAll}>
          <MicrophoneOffSvg className={styles.img} />
          <div className={styles.text}>выключить всем микрофон</div>
        </div>
      </div>
    </CSSTransition >
  )
}
