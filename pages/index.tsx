import Layout from 'components/for_pages/Layout'
import SoundSquare from 'components/for_pages/main/SoundSquare'
import Square from 'components/for_pages/main/Square'
import Login from 'components/for_pages/main/Square/Login'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
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

  return (
    <Layout loading={loading}>
      <div className={styles.root}>
        {loading ? <Image className={styles.img} src='/img/logo.svg' fill alt='' /> : null}
        <Square onClick={() => !isActiveZoom ? setIsActiveZoom(true) : null} className={styles.zoom} degree={-45} color='blue' loading={loading} img='/img/logos/zoom.png'>
          {!isActiveZoom ? <div className={styles.label}>
            старт zoom
          </div>
            :
            <Login onCancel={() => setIsActiveZoom(false)} degree={-45} color='blue' icon='/img/logos/zoom.png' onSubmit={handleSubmitZoom} />}
        </Square>
        <Square onClick={() => !isActiveConf ? setIsActiveConf(true) : null} className={styles.trueconf} degree={45} color='green' loading={loading} img='/img/logos/trueconf.svg'>
          {!isActiveConf ? <div className={styles.label}>
            cтарт trueconf
          </div>
            :
            <Login onCancel={() => setIsActiveConf(false)} degree={45} color='green' icon='/img/logos/trueconf.svg'
              onSubmit={handleSubmitTrueConf} />}
        </Square>
        <Square className={styles.screen} degree={225} color='purple' loading={loading} img='/img/logos/screen.svg'>
          <div className={styles.label}>
            демонстрация
            экрана
          </div>
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
