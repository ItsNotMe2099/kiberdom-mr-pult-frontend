import Layout from 'components/Layout'
import Square from 'components/Square'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import styles from './index.module.scss'

export default function IndexPage() {

  const [loading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 5000)
  }, [])

  return (
    <Layout loading={loading}>
      <div className={styles.root}>
        {loading ? <Image className={styles.img} src='/img/logo.svg' fill alt='' /> : null}
        <Square className={styles.zoom} degree={-45} color='blue' loading={loading} img='/img/logos/zoom.png'>
          <div className={styles.label}>
            старт zoom
          </div>
        </Square>
        <Square className={styles.trueconf} degree={45} color='green' loading={loading} img='/img/logos/trueconf.svg'>
          <div className={styles.label}>
            cтарт trueconf
          </div>
        </Square>
        <Square className={styles.screen} degree={225} controls color='purple' loading={loading} img='/img/logos/screen.svg'>
          <div className={styles.label}>
            демонстрация
            экрана
          </div>
        </Square>
        <Square active={loading ? true : false} className={styles.sound} degree={-225} color='purple' loading={loading} img='/img/logos/zoom.png'>
          <div className={styles.label}>
            фоновая
            музыка
          </div>
        </Square>
      </div>
    </Layout>
  )
}
