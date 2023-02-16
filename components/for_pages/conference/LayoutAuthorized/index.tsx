import { useAppContext } from 'context/state'
import { Platform } from 'data/enum/Platorm'
import { IParticipant } from 'data/interfaces/IParticipant'
import Footer from './Footer'
import Header from './Header'
import styles from './index.module.scss'

interface Props {
  children?: React.ReactNode
  users: IParticipant[]
}

export default function LayoutAuthorized({ children, users }: Props) {

  const appContext = useAppContext()

  return (
    <div className={styles.root}>
      <Header
        users={users}
        platform={appContext.coreStatus?.platform as Platform} />
      {children}
      <Footer users={users}/>
    </div>
  )
}
