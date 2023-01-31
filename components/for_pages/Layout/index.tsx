import { useAppContext } from 'context/state'
import { Platform } from 'data/enum/Platorm'
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
      <Left loading={loading} isZoom={appContext.coreStatus?.platform === Platform.Zoom}
        isTrueConf={appContext.coreStatus?.platform === Platform.TrueConf} />
      {children}
      <Right loading={loading} />
    </div>
  )
}
