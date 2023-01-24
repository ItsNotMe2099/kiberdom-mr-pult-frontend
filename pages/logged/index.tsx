import Layout from 'components/for_pages/Layout'
import LayoutAuthorized from 'components/for_pages/logged/LayoutAuthorized'
import Loader from 'components/for_pages/logged/loader'
import { useAppContext } from 'context/state'
import { useEffect, useState } from 'react'
import styles from './index.module.scss'
import classNames from 'classnames'
import ScreenDemonstration from 'components/for_pages/logged/ScreenDemonstration'
import BottomControl from 'components/for_pages/logged/BottomControl'
import { useConfContext } from 'context/conference_state'
import CameraControls from 'components/for_pages/logged/CameraControls'

export default function LoggedPage() {

  const [loading, setIsLoading] = useState<boolean>(true)

  const appContext = useAppContext()
  const confContext = useConfContext()

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 5000)
  }, [])

  return (
    <Layout loading={false}>
      <div className={classNames(styles.root, {[styles.loaded]: !loading})}>
        {loading ?
          <Loader
            color={appContext.isTrueConf ? 'green' : 'blue'}
            icon={appContext.isTrueConf ? '/img/logos/trueconf.svg' : '/img/logos/zoom.png'} />
          :
          <LayoutAuthorized>
            <ScreenDemonstration/>
            <div className={styles.bottom}>
              <BottomControl img={'/img/logos/microphone-off.svg'} title='микрофон'/>
              {confContext.isActiveCameraMenu ? <CameraControls/> : null}
              <BottomControl img={'/img/logos/camera-off.svg'} title='камера'/>
            </div>
          </LayoutAuthorized>}
      </div>
    </Layout>
  )
}
