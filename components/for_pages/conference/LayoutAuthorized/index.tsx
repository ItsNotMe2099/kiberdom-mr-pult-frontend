import { useAppContext } from 'context/state'
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
        color={appContext.isZoom ? 'blue' : 'green'}
        icon={appContext.isTrueConf ? '/img/logos/trueconf.svg' : '/img/logos/zoom.png'} />
      {children}
      <Footer />
    </div>
  )
}
