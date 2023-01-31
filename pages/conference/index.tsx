import Layout from 'components/for_pages/Layout'
import LayoutAuthorized from 'components/for_pages/conference/LayoutAuthorized'
import Loader from 'components/for_pages/conference/loader'
import { useAppContext } from 'context/state'
import { useEffect, useState } from 'react'
import styles from './index.module.scss'
import classNames from 'classnames'
import ScreenDemonstration from 'components/for_pages/conference/ScreenDemonstration'
import BottomControl from 'components/for_pages/conference/BottomControl'
import { useConfContext } from 'context/conference_state'
import CameraControls from 'components/for_pages/conference/CameraControls'
import UsersList from 'components/for_pages/conference/UsersList'
import { colors } from 'styles/variables'
import EmailForm from 'components/for_pages/conference/EmailForm'
import MicSvg from 'components/svg/MicSvg'
import CamSvg from 'components/svg/CamSvg'

export default function ConferencePage() {

  const [loading, setIsLoading] = useState<boolean>(true)

  const appContext = useAppContext()
  const confContext = useConfContext()

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }, [])

  return (
    <Layout loading={false}>
      <div className={classNames(styles.root, { [styles.loaded]: !loading })}>
        <EmailForm style={confContext.isEmailFormInvite ? 'invite' : 'send'} isActive={confContext.isEmailFormActive} />
        <Loader
          isActive={loading}
          color={appContext.isTrueConf ? 'green' : 'blue'}
          icon={appContext.isTrueConf ? '/img/logos/trueconf.svg' : '/img/logos/zoom.png'} />
        <LayoutAuthorized>
          <div className={styles.wrapper}>
            <UsersList isActive={confContext.isActiveUsersList} />
            <div className={styles.main}>
              <ScreenDemonstration />
              <div className={styles.bottom}>
                <BottomControl
                  style=
                  {appContext.isZoom ? `linear-gradient(43.73deg, rgba(11, 91, 252, 0) 44.44%, rgba(11, 91, 252, 0.3) 70.44%, ${colors.zoom} 99.75%)` :
                    `linear-gradient(43.73deg, rgba(1, 151, 167, 0) 44.44%, rgba(1, 151, 167, 0.3) 70.44%, ${colors.trueconf} 99.75%)`
                  }
                  isActive={confContext.isMicOn} onClick={confContext.handleMicrophone}
                  img={<MicSvg isOn={confContext.isMicOn} />} title='микрофон' />
                <CameraControls isActive={confContext.isActiveCameraMenu} />
                <BottomControl
                  style=
                  {appContext.isZoom ? `linear-gradient(316.27deg, rgba(11, 91, 252, 0) 39.75%, rgba(11, 91, 252, 0.3) 67.43%, ${colors.zoom} 100%)` :
                    `linear-gradient(316.27deg, rgba(1, 151, 167, 0) 39.75%, rgba(1, 151, 167, 0.3) 67.43%, ${colors.trueconf} 100%)`
                  }
                  isActive={confContext.isCamOn} onClick={confContext.handleCamera}
                  img={<CamSvg isOn={confContext.isCamOn} />} title='камера' />
              </div>
            </div>
          </div>
        </LayoutAuthorized>
      </div>
    </Layout>
  )
}
