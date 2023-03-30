import Loader from 'components/for_pages/common/loader'
import ConferencePage from 'components/for_pages/conference/Page'
import MainPage from 'components/for_pages/main/Page'
import { useAppContext } from 'context/state'
import styles from './index.module.scss'

export default function IndexPage() {

  const appContext = useAppContext()

  console.log('appContext.isActiveZoom', appContext.isActiveZoom)

  return (
    <div className={styles.root}>
      <Loader
        text='запускаю, подождите...'
        isActive={appContext.loginLoading}
        color={appContext.isActiveZoom ? 'blue' : appContext.isActiveConf ? 'green' : 'purple'}
        icon={appContext.isActiveConf ? '/img/logos/trueconf.svg' : appContext.isActiveZoom ? '/img/logos/zoom.png' : ''}
      />
      {appContext.coreStatus?.conference.started ? <ConferencePage /> : <MainPage />}
    </div>
  )
}
