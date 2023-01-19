import { useAppContext } from 'context/state'
import styles from './index.module.scss'
import Left from './Left'
import Right from './Right'

interface Props {
  children?: React.ReactNode
  loading: boolean
}

export default function Layout({ children, loading }: Props) {

  const appContext = useAppContext()

  return (
    <div className={styles.root}>
      {!loading ? <Left isZoom={appContext.isZoom} isTrueConf={appContext.isTrueConf}/> : null}
        {children}
      {!loading ? <Right /> : null}
    </div>
  )
}
