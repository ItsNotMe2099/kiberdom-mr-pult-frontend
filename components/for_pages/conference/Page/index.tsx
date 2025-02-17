import Layout from 'components/for_pages/Layout'
import LayoutAuthorized from 'components/for_pages/conference/LayoutAuthorized'
//import Loader from 'components/for_pages/common/loader'
import { useAppContext } from 'context/state'
import styles from './index.module.scss'
import classNames from 'classnames'
import ScreenDemonstration from 'components/for_pages/conference/ScreenDemonstration'
import BottomControl from 'components/for_pages/conference/BottomControl'
import CameraControls from 'components/for_pages/conference/CameraControls'
import UsersList from 'components/for_pages/conference/UsersList'
import { colors } from 'styles/variables'
import EmailForm from 'components/for_pages/conference/EmailForm'
import MicSvg from 'components/svg/MicSvg'
import CamSvg from 'components/svg/CamSvg'
import { Platform } from 'data/enum/Platorm'
import { useEffect, useState } from 'react'
import ParticipantRepository from 'data/repositories/ParticipantsRepository'
import { IParticipant } from 'data/interfaces/IParticipant'
import { OnOffState } from 'data/enum/OnOffState'
import useInterval from 'use-interval'
import Iframe from 'components/for_pages/common/Iframe'

export default function ConferencePage() {

  const appContext = useAppContext()

  const [users, setUsers] = useState<IParticipant[]>([])

  const fetchUsers = async () => {
    const users = await ParticipantRepository.fetch()
    setUsers(users)
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const handleMuteAll = async () => {
    await ParticipantRepository.muteAudioAll()
    await fetchUsers()
  }

  const handleFetchAgain = async () => {
    await fetchUsers()
  }

  useInterval(() => {
    fetchUsers()
  }, 5000)



  return (
    <Layout loading={false}>
      <div className={classNames(styles.root, { [styles.loaded]: !appContext.initialLoading })}>
        <EmailForm style={appContext.isEmailFormInvite ? 'invite' : 'send'} isActive={appContext.isEmailFormActive} />
        {/*<Loader
          text='запускаю, подождите...'
          isActive={appContext.initialLoading}
          color={appContext.coreStatus?.platform === Platform.TrueConf ? 'green' : 'blue'}
  icon={appContext.coreStatus?.platform === Platform.TrueConf ? '/img/logos/trueconf.svg' : '/img/logos/zoom.png'} />*/}
        <Iframe />
        <LayoutAuthorized users={users}>
          <div className={styles.wrapper}>
            <UsersList
              isActive={appContext.isActiveUsersList}
              users={users}
              onMuteAll={handleMuteAll}
              onAdmit={handleFetchAgain}
              onExpel={handleFetchAgain}
              onMute={handleFetchAgain}
            />
            <div className={styles.main}>
              <ScreenDemonstration />
              <div className={styles.bottom}>
                <BottomControl
                  style=
                  {appContext.coreStatus?.platform === Platform.Zoom ? `linear-gradient(43.73deg, rgba(11, 91, 252, 0) 44.44%, rgba(11, 91, 252, 0.3) 70.44%, ${colors.zoom} 99.75%)` :
                    `linear-gradient(43.73deg, rgba(1, 151, 167, 0) 44.44%, rgba(1, 151, 167, 0.3) 70.44%, ${colors.trueconf} 99.75%)`
                  }
                  isActive={appContext.micState === OnOffState.On} onClick={appContext.handleMicrophone}
                  img={<MicSvg />} title='микрофон' />
                <CameraControls isActive={appContext.isActiveCameraMenu} />
                <BottomControl
                  style=
                  {appContext.coreStatus?.platform === Platform.Zoom ? `linear-gradient(316.27deg, rgba(11, 91, 252, 0) 39.75%, rgba(11, 91, 252, 0.3) 67.43%, ${colors.zoom} 100%)` :
                    `linear-gradient(316.27deg, rgba(1, 151, 167, 0) 39.75%, rgba(1, 151, 167, 0.3) 67.43%, ${colors.trueconf} 100%)`
                  }
                  isActive={appContext.camState === OnOffState.On} onClick={appContext.handleCamera}
                  img={<CamSvg />} title='камера' />
              </div>
            </div>
          </div>
        </LayoutAuthorized>
      </div>
    </Layout>
  )
}
