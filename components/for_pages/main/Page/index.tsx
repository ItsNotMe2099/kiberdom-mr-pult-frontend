import Loader from 'components/for_pages/common/loader'
import Layout from 'components/for_pages/Layout'
import Demonstration from 'components/for_pages/main/Demonstration'
import SoundSquare from 'components/for_pages/main/SoundSquare'
import Square from 'components/for_pages/main/Square'
import LoginForm from 'components/for_pages/main/Square/Login/Form'
import { useAppContext } from 'context/state'
import { OnOffState } from 'data/enum/OnOffState'
import { Platform } from 'data/enum/Platorm'
import { IWiFi } from 'data/interfaces/IWiFi'
import ConferenceRepository from 'data/repositories/ConferenceRepository'
//import { useEffect } from 'react'
import { useRef, useState } from 'react'
import { CSSTransition } from 'react-transition-group'
import { SnackbarType } from 'types/enums'
import styles from './index.module.scss'

export default function MainPage() {

  const appContext = useAppContext()

  const [isActiveZoom, setIsActiveZoom] = useState<boolean>(false)
  const [isActiveConf, setIsActiveConf] = useState<boolean>(false)

  const [isDemonstration, setIsDemonstration] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [data, setData] = useState<IWiFi | null>(null)

  const handleScreenDemo = async () => {
    setLoading(true)
    try {
      await ConferenceRepository.setScreenDemonstrationState('start').then(i => setData(i.wifi ?? null))
      setIsDemonstration(true)
      if (isActiveConf) {
        setIsActiveConf(false)
      }
      else if (isActiveZoom) {
        setIsActiveZoom(false)
      }
    }
    catch (error: any) {
      let errorMessage = error.toString()
      // extract the error message from the error object
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message
      }
      appContext.showSnackbar(errorMessage, SnackbarType.error)
    }
    setLoading(false)
  }

  const handleScreenDemoCancel = async () => {
    setLoading(true)
    try {
      await ConferenceRepository.setScreenDemonstrationState('stop')
      setIsDemonstration(false)
    }
    catch (error: any) {
      let errorMessage = error.toString()
      // extract the error message from the error object
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message
      }
      appContext.showSnackbar(errorMessage, SnackbarType.error)
    }
    setLoading(false)
  }

  const zoomLabelRef = useRef(null)
  const trueLabelRef = useRef(null)
  const demLabelRef = useRef(null)

  const handleActiveZoom = () => {
    !isActiveZoom ? setIsActiveZoom(true) : null
    setIsActiveConf(false)
  }

  const handleActiveConf = () => {
    !isActiveConf ? setIsActiveConf(true) : null
    setIsActiveZoom(false)
  }

  /*useEffect(() => {
    document.documentElement.requestFullscreen().catch((error) => {
      let errorMessage = error.toString()
      // extract the error message from the error object
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message
      }
      appContext.showSnackbar(errorMessage, SnackbarType.error)
    })
  }, [])*/

  return (
    <Layout loading={appContext.initialLoading}>
      <div className={styles.root}>
        <Loader
          text='подождите...'
          isActive={loading}
          color={'purple'} />
        <Loader
          text='запускаю, подождите...'
          isActive={appContext.loginLoading}
          color={isActiveZoom ? 'blue' : isActiveConf ? 'green' : 'purple'}
          icon={isActiveConf ? '/img/logos/trueconf.svg' : isActiveZoom ? '/img/logos/zoom.png' : ''}
        />
        <Loader className={styles.init} isActive={appContext.initialLoading} initial />
        <Demonstration wifi={data} isActive={isDemonstration && !loading} onCancel={handleScreenDemoCancel} />
        <Square
          onClick={handleActiveZoom}
          className={styles.zoom}
          color='blue'
          active={!appContext.initialLoading ? !isActiveZoom : !appContext.initialLoading}
          activeFake={!appContext.initialLoading}
          img='/img/logos/zoom.png'>
          <CSSTransition
            timeout={500}
            in={!appContext.initialLoading ? !isActiveZoom : !appContext.initialLoading}
            nodeRef={zoomLabelRef}
            mountOnEnter
            unmountOnExit
            classNames={{
              enter: styles.itemEnter,
              enterActive: styles.itemEnterActive,
              exit: styles.itemExit,
              exitActive: styles.itemExitActive,
            }}
          >
            <div className={styles.label} ref={zoomLabelRef}>
              старт<br /> zoom
            </div></CSSTransition>
          <LoginForm
            image='/img/logos/zoom.png'
            timeOut={() => setIsActiveZoom(false)}
            active={!appContext.initialLoading ? isActiveZoom : !appContext.initialLoading}
            platform={Platform.Zoom}
            onCancel={() => setIsActiveZoom(false)}
            color={'blue'} />
        </Square>
        <Square onClick={handleActiveConf}
          className={styles.trueconf} color='green'
          active={!appContext.initialLoading ? !isActiveConf : !appContext.initialLoading}
          activeFake={!appContext.initialLoading}
          img='/img/logos/trueconf.svg'>
          <CSSTransition
            timeout={500}
            in={!appContext.initialLoading ? !isActiveConf : !appContext.initialLoading}
            nodeRef={trueLabelRef}
            mountOnEnter
            unmountOnExit
            classNames={{
              enter: styles.itemEnter,
              enterActive: styles.itemEnterActive,
              exit: styles.itemExit,
              exitActive: styles.itemExitActive,
            }}
          >
            <div className={styles.label} ref={trueLabelRef}>
              cтарт<br /> trueconf
            </div></CSSTransition>
          <LoginForm
            timeOut={() => setIsActiveConf(false)}
            image='/img/logos/trueconf.svg'
            active={!appContext.initialLoading ? isActiveConf : !appContext.initialLoading}
            platform={Platform.TrueConf}
            onCancel={() => setIsActiveConf(false)} color={'green'} />
        </Square>
        <Square
          onClick={() => !appContext.initialLoading ? handleScreenDemo() : null}
          className={styles.screen} color='purple-left'
          active={!appContext.initialLoading}
          activeFake={!appContext.initialLoading}
          img='/img/logos/screen.svg'>
          <CSSTransition
            timeout={500}
            in={!appContext.initialLoading}
            nodeRef={demLabelRef}
            mountOnEnter
            classNames={{
              enter: styles.itemEnter,
              enterActive: styles.itemEnterActive,
              exit: styles.itemExit,
              exitActive: styles.itemExitActive,
            }}
          >
            <div className={styles.label} ref={demLabelRef}>
              демонстрация<br /> экрана
            </div></CSSTransition>
        </Square>
        <SoundSquare
          loading={appContext.initialLoading}
          onClick={appContext.handleBgMusic}
          isOn={appContext.bgMusicState === OnOffState.On ? true : false} />
      </div>
    </Layout>
  )
}
