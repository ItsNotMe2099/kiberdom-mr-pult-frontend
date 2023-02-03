import Loader from 'components/for_pages/common/loader'
import Layout from 'components/for_pages/Layout'
import Demonstration from 'components/for_pages/main/Demonstration'
import SoundSquare from 'components/for_pages/main/SoundSquare'
import Square from 'components/for_pages/main/Square'
import LoginForm from 'components/for_pages/main/Square/Login/Form'
import { useAppContext } from 'context/state'
import { Platform } from 'data/enum/Platorm'
import { IWiFi } from 'data/interfaces/IWiFi'
import ConferenceRepository from 'data/repositories/ConferenceRepository'
import Image from 'next/image'
import { useRef, useState } from 'react'
import { CSSTransition } from 'react-transition-group'
import { colors } from 'styles/variables'
import { SnackbarType } from 'types/enums'
import styles from './index.module.scss'

export default function IndexPage() {

  const appContext = useAppContext()

  const [isActiveZoom, setIsActiveZoom] = useState<boolean>(false)
  const [isActiveConf, setIsActiveConf] = useState<boolean>(false)

  const [isOff, setIsOff] = useState<boolean>(true)

  const [isDemonstration, setIsDemonstration] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [data, setData] = useState<IWiFi | null>(null)

  const handleScreenDemo = async () => {
    setLoading(true)
    try {
      await ConferenceRepository.setScreenDemonstrationState('start').then(i => setData(i.wifi ?? null))
      setIsDemonstration(true)
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

  const getColor = (color: 'blue' | 'green') => {
    switch (color) {
      case 'blue':
        return `linear-gradient(136.27deg, rgba(11, 91, 253, 0) 41.98%, rgba(11, 91, 253, 0.3) 69.36%, ${colors.zoom} 100.25%)`
      case 'green':
        return `linear-gradient(223.73deg, rgba(1, 151, 167, 0) 42.72%, rgba(1, 151, 167, 0.3) 69.64%, ${colors.trueconf} 100%)`
    }
  }

  const logoRef = useRef(null)

  const zoomLabelRef = useRef(null)
  const trueLabelRef = useRef(null)
  const demLabelRef = useRef(null)
  const zoomLogin = useRef(null)
  const trueConfLogin = useRef(null)

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
        <Demonstration wifi={data} isActive={isDemonstration && !loading} onCancel={handleScreenDemoCancel} />
        <CSSTransition
          timeout={500}
          in={appContext.initialLoading}
          nodeRef={logoRef}
          mountOnEnter
          unmountOnExit
          classNames={{
            enter: styles.itemEnter,
            enterActive: styles.itemEnterActive,
            exit: styles.itemExit,
            exitActive: styles.itemExitActive,
          }}
        >
          <Image ref={logoRef} className={styles.img} src='/img/logo.svg' fill alt='' />
        </CSSTransition>
        <Square
          onClick={() => !isActiveZoom ? setIsActiveZoom(true) : null}
          className={styles.zoom}
          color='blue'
          active={!appContext.initialLoading ? !isActiveZoom : !appContext.initialLoading}
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
              старт zoom
            </div></CSSTransition>
          <CSSTransition
            timeout={2000}
            in={!appContext.initialLoading ? isActiveZoom : !appContext.initialLoading}
            nodeRef={zoomLogin}
            mountOnEnter
            unmountOnExit
            classNames={{
              enter: styles.loginEnter,
              enterActive: styles.loginEnterActive,
              exit: styles.loginExit,
              exitActive: styles.loginExitActive,
            }}
          >
            <div className={styles.login} ref={zoomLogin}>
              <div className={styles.gradient} style={{ background: getColor('blue') }}></div>
              <Image className={styles.imgLogin} src={'/img/logos/zoom.png'} alt='' fill />
              <LoginForm
                platform={Platform.Zoom}
                onCancel={() => setIsActiveZoom(false)}
                color={'blue'} />
            </div>
          </CSSTransition>
        </Square>
        <Square onClick={() => !isActiveConf ? setIsActiveConf(true) : null}
          className={styles.trueconf} color='green'
          active={!appContext.initialLoading ? !isActiveConf : !appContext.initialLoading}
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
              cтарт trueconf
            </div></CSSTransition>
          <CSSTransition
            timeout={2000}
            in={!appContext.initialLoading ? isActiveConf : !appContext.initialLoading}
            nodeRef={trueConfLogin}
            mountOnEnter
            unmountOnExit
            classNames={{
              enter: styles.loginEnter,
              enterActive: styles.loginEnterActive,
              exit: styles.loginExit,
              exitActive: styles.loginExitActive,
            }}
          >
            <div className={styles.login} ref={trueConfLogin}>
              <div className={styles.gradient} style={{ background: getColor('green') }}></div>
              <Image className={styles.imgLogin} src={'/img/logos/trueconf.svg'} alt='' fill />
              <LoginForm
                platform={Platform.TrueConf}
                onCancel={() => setIsActiveConf(false)} color={'green'} />
            </div>
          </CSSTransition>
        </Square>
        <Square
          onClick={() => !appContext.initialLoading ? handleScreenDemo() : null}
          className={styles.screen} color='purple-left'
          active={!appContext.initialLoading}
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
          onClick={() => setIsOff(isOff ? false : true)}
          isOn={!isOff ? true : false} />
      </div>
    </Layout>
  )
}
