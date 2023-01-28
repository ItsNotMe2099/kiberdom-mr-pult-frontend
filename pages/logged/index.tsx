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
import MicrophoneOffSvg from 'components/svg/MicrophoneOffSvg'
import CameraOffSvg from 'components/svg/CameraOffSvg'
import UsersList from 'components/for_pages/logged/UsersList'
import { colors } from 'styles/variables'

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
      <div className={classNames(styles.root, { [styles.loaded]: !loading })}>
        <Loader
          isActive={loading}
          color={appContext.isTrueConf ? 'green' : 'blue'}
          icon={appContext.isTrueConf ? '/img/logos/trueconf.svg' : '/img/logos/zoom.png'} />
        <LayoutAuthorized>
          <div className={styles.wrapper}>
            {confContext.isActiveUsersList ? <UsersList /> : null}
            <div className={styles.main}>
              <ScreenDemonstration />
              <div className={styles.bottom}>
                <BottomControl
                  style=
                  {`linear-gradient(43.73deg, rgba(11, 91, 252, 0) 44.44%, rgba(11, 91, 252, 0.3) 70.44%, ${appContext.isZoom ? colors.zoom : colors.trueconf} 99.75%)`}
                  isActive={confContext.isMicOn} onClick={confContext.handleMicrophone}
                  img={<MicrophoneOffSvg className={styles.svg} />} title='микрофон' />
                <CameraControls isActive={confContext.isActiveCameraMenu} />
                <BottomControl
                  style=
                  {`linear-gradient(316.27deg, rgba(11, 91, 252, 0) 39.75%, rgba(11, 91, 252, 0.3) 67.43%, ${appContext.isZoom ? colors.zoom : colors.trueconf} 100%)`}
                  isActive={confContext.isCamOn} onClick={confContext.handleCamera}
                  img={<CameraOffSvg className={styles.svg} />} title='камера' />
              </div>
            </div>
          </div>
        </LayoutAuthorized>
      </div>
    </Layout>
  )
}
