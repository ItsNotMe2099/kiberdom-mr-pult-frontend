import { useAppContext } from 'context/state'
import { Platform } from 'data/enum/Platorm'
import Image from 'next/image'
import { colors } from 'styles/variables'
import User from '../../UsersList/User'
import styles from './index.module.scss'

interface Props {
  color: 'blue' | 'green'
  icon: string
}

export default function Header({ color, icon }: Props) {

  const appContext = useAppContext()

  const getColor = (color: 'blue' | 'green') => {
    switch (color) {
      case 'blue':
        return `radial-gradient(94.35% 142.17% at 50% -0.4%, ${colors.zoom} 0%, rgba(255, 255, 255, 0) 40.48%)`
      case 'green':
        return `radial-gradient(94.35% 142.17% at 50% -0.4%, ${colors.trueconf} 0%, rgba(255, 255, 255, 0) 40.48%)`
    }
  }

  return (
    <div className={styles.root} style={{ background: getColor(color) }}>
      {appContext.newUsers.length === 1 && !appContext.isActiveUsersList ? <User onClick={appContext.handleActiveUsersListMenu}
        user={appContext.newUsers[0]}
        style='header' /> : null}
      {appContext.newUsers.length > 1 && !appContext.isActiveUsersList ?
        <div className={styles.allow} onClick={appContext.handleActiveUsersListMenu}
          style={{ backgroundColor: appContext.coreStatus?.platform === Platform.Zoom ? `${colors.zoom}` : `${colors.trueconf}` }}>
          {`впустить новых участников (+${appContext.newUsers.length})`}
        </div> : null}
      <Image className={styles.img} src={icon} alt='' fill />
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
