import MicrophoneOffSvg from 'components/svg/MicrophoneOffSvg'
import { useConfContext } from 'context/conference_state'
import styles from './index.module.scss'
import User from './User'

interface Props {

}

export default function UsersList({ }: Props) {

  const confContext = useConfContext()

  const handleNewUsers = () => {

  }

  return (
    <div className={styles.root}>
      <div className={styles.list}>
        {confContext.newUsers.map((i, index) =>
          <User user={i} key={index} style='new' onClick={handleNewUsers}/>
        )}
        {confContext.users.map((i, index) =>
          <User user={i} key={index} style='old'/>
        )}
      </div>
      <div className={styles.micControl}>
        <MicrophoneOffSvg className={styles.img}/>
        <div className={styles.text}>выключить всем микрофон</div>
      </div>
    </div>
  )
}
