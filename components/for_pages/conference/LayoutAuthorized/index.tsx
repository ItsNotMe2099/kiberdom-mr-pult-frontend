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
        platform={appContext.coreStatus?.platform as Platform} />
      {children}
      <Footer />
    </div>
  )
}
