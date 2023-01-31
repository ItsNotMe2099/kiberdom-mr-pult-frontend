import Layout from 'components/for_pages/Layout'
import LayoutAuthorized from 'components/for_pages/conference/LayoutAuthorized'
import Loader from 'components/for_pages/conference/loader'
import { useAppContext } from 'context/state'
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
import { Platform } from 'data/enum/Platorm'
import { MicrophoneState } from 'data/enum/MicrophoneState'
import { CameraState } from 'data/enum/CameraState'

export default function ConferencePage() {

  const appContext = useAppContext()
  const confContext = useConfContext()

  return (
    <Layout loading={false}>
      <div className={classNames(styles.root, { [styles.loaded]: !appContext.initialLoading })}>
        <EmailForm style={confContext.isEmailFormInvite ? 'invite' : 'send'} isActive={confContext.isEmailFormActive} />
        <Loader
          isActive={appContext.initialLoading}
          color={appContext.coreStatus?.platform === Platform.TrueConf ? 'green' : 'blue'}
          icon={appContext.coreStatus?.platform === Platform.TrueConf ? '/img/logos/trueconf.svg' : '/img/logos/zoom.png'} />
        <LayoutAuthorized>
          <div className={styles.wrapper}>
            <UsersList isActive={confContext.isActiveUsersList} />
            <div className={styles.main}>
              <ScreenDemonstration />
              <div className={styles.bottom}>
                <BottomControl
                  style=
                  {appContext.coreStatus?.platform === Platform.Zoom ? `linear-gradient(43.73deg, rgba(11, 91, 252, 0) 44.44%, rgba(11, 91, 252, 0.3) 70.44%, ${colors.zoom} 99.75%)` :
                    `linear-gradient(43.73deg, rgba(1, 151, 167, 0) 44.44%, rgba(1, 151, 167, 0.3) 70.44%, ${colors.trueconf} 99.75%)`
                  }
                  isActive={confContext.isMicOn === MicrophoneState.On} onClick={confContext.handleMicrophone}
                  img={<MicSvg />} title='микрофон' />
                <CameraControls isActive={confContext.isActiveCameraMenu} />
                <BottomControl
                  style=
                  {appContext.coreStatus?.platform === Platform.Zoom ? `linear-gradient(316.27deg, rgba(11, 91, 252, 0) 39.75%, rgba(11, 91, 252, 0.3) 67.43%, ${colors.zoom} 100%)` :
                    `linear-gradient(316.27deg, rgba(1, 151, 167, 0) 39.75%, rgba(1, 151, 167, 0.3) 67.43%, ${colors.trueconf} 100%)`
                  }
                  isActive={confContext.isCamOn === CameraState.On} onClick={confContext.handleCamera}
                  img={<CamSvg />} title='камера' />
              </div>
            </div>
          </div>
        </LayoutAuthorized>
      </div>
    </Layout>
  )
}
