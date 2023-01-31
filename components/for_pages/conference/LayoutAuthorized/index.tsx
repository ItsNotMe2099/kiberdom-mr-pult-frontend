import { useAppContext } from 'context/state'
import { Platform } from 'data/enum/Platorm'
import Footer from './Footer'
import Header from './Header'
import styles from './index.module.scss'

interface Props {
  children?: React.ReactNode
}

export default function LayoutAuthorized({ children }: Props) {

  const appContext = useAppContext()

  return (
    <div className={styles.root}>
      <Header
        color={appContext.coreStatus?.platform === Platform.Zoom ? 'blue' : 'green'}
        icon={appContext.coreStatus?.platform === Platform.TrueConf ? '/img/logos/trueconf.svg' : '/img/logos/zoom.png'} />
      {children}
      <Footer />
    </div>
  )
}
