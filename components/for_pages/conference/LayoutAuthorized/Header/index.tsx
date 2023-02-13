import { useAppContext } from 'context/state'
import { Platform } from 'data/enum/Platorm'
import { IParticipant } from 'data/interfaces/IParticipant'
import Image from 'next/image'
import { colors } from 'styles/variables'
import User from '../../UsersList/User'
import styles from './index.module.scss'

interface Props {
  platform: Platform
  newUsers: IParticipant[]
}

export default function Header({ platform, newUsers }: Props) {

  const appContext = useAppContext()

  const getColor = () => {
    switch (platform) {
      case Platform.Zoom:
        return `radial-gradient(94.35% 142.17% at 50% -0.4%, ${colors.zoom} 0%, rgba(255, 255, 255, 0) 40.48%)`
      case Platform.TrueConf:
        return `radial-gradient(94.35% 142.17% at 50% -0.4%, ${colors.trueconf} 0%, rgba(255, 255, 255, 0) 40.48%)`
    }
  }

  const getIcon = () => {
    switch (platform) {
      case Platform.Zoom:
        return '/img/logos/zoom.png'
      case Platform.TrueConf:
        return '/img/logos/trueconf.svg'
    }
  }

  const getAllowColor = () => {
    switch (platform) {
      case Platform.Zoom:
        return `${colors.zoom}`
      case Platform.TrueConf:
        return `${colors.trueconf}`
    }
  }

  return (
    <div className={styles.root} style={{ background: getColor() }}>
      {newUsers.length === 1 && !appContext.isActiveUsersList ? <User onClick={appContext.handleActiveUsersListMenu}
        user={newUsers[0]}
        style='header' /> : null}
      {/*appContext.newUsers.length > 1 && !appContext.isActiveUsersList ?
        <div className={styles.allow} onClick={appContext.handleActiveUsersListMenu}
          style={{ backgroundColor: getAllowColor()}}>
          {`впустить новых участников (+${newUsers.length})`}
  </div> : null*/}
      <Image className={styles.img} src={getIcon() as string} alt='' fill />
      <div className={styles.bottom}>
        <div className={styles.id}>
          ID {appContext.user?.id}
        </div>
        <div className={styles.separator}>
          •
        </div>
        <div className={styles.time}>
          00:45
        </div>
      </div>
    </div>
  )
}
