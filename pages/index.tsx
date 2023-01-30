import Layout from 'components/for_pages/Layout'
import Demonstration from 'components/for_pages/main/Demonstration'
import SoundSquare from 'components/for_pages/main/SoundSquare'
import Square from 'components/for_pages/main/Square'
import LoginForm from 'components/for_pages/main/Square/Login/Form'
import { useAppContext } from 'context/state'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import { CSSTransition } from 'react-transition-group'
import { colors } from 'styles/variables'
import styles from './index.module.scss'

export default function IndexPage() {

  const [loading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 5000)
  }, [])

  const router = useRouter()

  const appContext = useAppContext()

  const handleSubmitZoom = () => {
    appContext.loginZoom()
    router.push('/logged')
  }

  const handleSubmitTrueConf = () => {
    appContext.loginTrueConf()
    router.push('/logged')
  }

  const [isActiveZoom, setIsActiveZoom] = useState<boolean>(false)
  const [isActiveConf, setIsActiveConf] = useState<boolean>(false)

  const [isOff, setIsOff] = useState<boolean>(true)

  const [isDemonstration, setIsDemonstration] = useState<boolean>(false)

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
    <Layout loading={loading}>
      <div className={styles.root}>
        <Demonstration isActive={isDemonstration} onCancel={() => setIsDemonstration(false)} />
        <CSSTransition
          timeout={2000}
          in={loading}
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
        <Square onClick={() => !isActiveZoom ? setIsActiveZoom(true) : null} className={styles.zoom} color='blue' active={!loading ? !isActiveZoom : !loading} img='/img/logos/zoom.png'>
          <CSSTransition
            timeout={2000}
            in={!loading ? !isActiveZoom : !loading}
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
            in={!loading ? isActiveZoom : !loading}
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
              <LoginForm onSubmit={handleSubmitZoom} onCancel={() => setIsActiveZoom(false)} color={'blue'} />
            </div>
          </CSSTransition>
        </Square>
        <Square onClick={() => !isActiveConf ? setIsActiveConf(true) : null} className={styles.trueconf} color='green' active={!loading ? !isActiveConf : !loading} img='/img/logos/trueconf.svg'>
          <CSSTransition
            timeout={2000}
            in={!loading ? !isActiveConf : !loading}
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
            in={!loading ? isActiveConf : !loading}
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
              <LoginForm onSubmit={handleSubmitTrueConf} onCancel={() => setIsActiveConf(false)} color={'green'} />
            </div>
          </CSSTransition>
        </Square>
        <Square onClick={() => !loading ? setIsDemonstration(true) : null} className={styles.screen} color='purple-left' active={!loading} img='/img/logos/screen.svg'>
          <CSSTransition
            timeout={2000}
            in={!loading}
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
              демонстрация экрана
            </div></CSSTransition>
        </Square>
        {loading ? <Square
          img=''
          className={styles.sound} 
          color='purple-right'
          active={!loading}>
        </Square> :
          <SoundSquare onClick={() => setIsOff(isOff ? false : true)} isOn={!isOff ? true : false} img='/img/logos/sound-off.svg' />}
      </div>
    </Layout>
  )
}
