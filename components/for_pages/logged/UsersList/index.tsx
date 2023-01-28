import MicrophoneOffSvg from 'components/svg/MicrophoneOffSvg'
import { useConfContext } from 'context/conference_state'
import { useRef } from 'react'
import { CSSTransition } from 'react-transition-group'
import styles from './index.module.scss'
import User from './User'

interface Props {
  isActive: boolean
}

export default function UsersList({ isActive }: Props) {

  const confContext = useConfContext()

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
          {confContext.newUsers.map((i, index) =>
            <User user={i} key={index} style='new' onClick={handleNewUsers} />
          )}
          {confContext.users.map((i, index) =>
            <User user={i} key={index} style='old' />
          )}
        </div>
        <div className={styles.micControl}>
          <MicrophoneOffSvg className={styles.img} />
          <div className={styles.text}>выключить всем микрофон</div>
        </div>
      </div>
    </CSSTransition >
  )
}
