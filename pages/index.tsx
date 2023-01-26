import Layout from 'components/for_pages/Layout'
import SoundSquare from 'components/for_pages/main/SoundSquare'
import Square from 'components/for_pages/main/Square'
import Login from 'components/for_pages/main/Square/Login'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import { CSSTransition } from 'react-transition-group'
import styles from './index.module.scss'

export default function IndexPage() {

  const [loading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 5000)
  }, [])

  const router = useRouter()

  const handleSubmitZoom = () => {
    router.push('/logged')
  }

  const handleSubmitTrueConf = () => {
    router.push('/logged')
  }

  const [isActiveZoom, setIsActiveZoom] = useState<boolean>(false)
  const [isActiveConf, setIsActiveConf] = useState<boolean>(false)

  const [isOff, setIsOff] = useState<boolean>(true)

  console.log('isActiveZoom', isActiveZoom)

  const logoRef = useRef(null)

  const zoomLabelRef = useRef(null)
  const trueLabelRef = useRef(null)
  const demLabelRef = useRef(null)

  return (
    <Layout loading={loading}>
      <div className={styles.root}>
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
        <Square onClick={() => !isActiveZoom ? setIsActiveZoom(true) : null} className={styles.zoom} degree={-45} color='blue' loading={loading} img='/img/logos/zoom.png'>
          <CSSTransition
            timeout={2000}
            in={!loading}
            nodeRef={zoomLabelRef}
            mountOnEnter
            classNames={{
              enter: styles.itemEnter,
              enterActive: styles.itemEnterActive,
            }}
          >
            <div className={styles.label} ref={zoomLabelRef}>
              старт zoom
            </div></CSSTransition>
          <Login
            onCancel={() => setIsActiveZoom(false)}
            isActive={isActiveZoom}
            degree={-45}
            color='blue'
            icon='/img/logos/zoom.png'
            onSubmit={handleSubmitZoom} />
        </Square>
        <Square onClick={() => !isActiveConf ? setIsActiveConf(true) : null} className={styles.trueconf} degree={45} color='green' loading={loading} img='/img/logos/trueconf.svg'>
          <CSSTransition
            timeout={2000}
            in={!loading}
            nodeRef={trueLabelRef}
            mountOnEnter
            classNames={{
              enter: styles.itemEnter,
              enterActive: styles.itemEnterActive,
            }}
          >
            <div className={styles.label} ref={trueLabelRef}>
              cтарт trueconf
            </div></CSSTransition>
          <Login isActive={isActiveConf} onCancel={() => setIsActiveConf(false)} degree={45} color='green' icon='/img/logos/trueconf.svg'
            onSubmit={handleSubmitTrueConf} />
        </Square>
        <Square className={styles.screen} degree={225} color='purple' loading={loading} img='/img/logos/screen.svg'>
          <CSSTransition
            timeout={2000}
            in={!loading}
            nodeRef={demLabelRef}
            mountOnEnter
            classNames={{
              enter: styles.itemEnter,
              enterActive: styles.itemEnterActive,
            }}
          >
            <div className={styles.label} ref={demLabelRef}>
              демонстрация экрана
            </div></CSSTransition>
        </Square>
        {loading ? <Square
          img=''
          className={styles.sound} degree={-225}
          color='purple'
          loading={loading}>
        </Square> :
          <SoundSquare onClick={() => setIsOff(isOff ? false : true)} isOn={!isOff ? true : false} img='/img/logos/sound-off.svg' />}
      </div>
    </Layout>
  )
}
