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
}

export default function UsersList({ isActive, users }: Props) {

  const appContext = useAppContext()

  const handleNewUsers = () => {

  }

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
          {users.map((i, index) =>
            <User user={i} key={index} style='new' onClick={handleNewUsers} />
          )}
          {users.map((i, index) =>
            <User user={i} key={index} style='old' />
          )}
        </div>
        <div className={styles.micControl} onClick={() => appContext.isMuteAll ? null : appContext.handleMuteAll()}>
          <MicrophoneOffSvg className={styles.img} />
          <div className={styles.text}>выключить всем микрофон</div>
        </div>
      </div>
    </CSSTransition >
  )
}
