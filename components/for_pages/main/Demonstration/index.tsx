import Image from 'next/image'
import { useRef, useState } from 'react'
import { CSSTransition } from 'react-transition-group'
import styles from './index.module.scss'
import classNames from 'classnames'
import { IWiFi } from 'data/interfaces/IWiFi'

interface Props {
  isActive: boolean
  onCancel: () => void
  wifi: IWiFi | null
}

export default function Demonstration({ isActive, onCancel, wifi }: Props) {

  const nodeRef = useRef(null)

  const [device, setDevice] = useState<string>('apple')

  const getImg = (device: string) => {
    switch (device) {
      case 'apple':
        return '/img/screen-demonstration/apple.png'
      case 'win':
        return '/img/screen-demonstration/win.png'
      case 'android':
        return '/img/screen-demonstration/android.png'
      default:
        return ''
    }
  }

  return (
    <CSSTransition
      timeout={2000}
      in={isActive}
      nodeRef={nodeRef}
      mountOnEnter
      unmountOnExit
      classNames={{
        enter: styles.itemEnter,
        enterActive: styles.itemEnterActive,
        exit: styles.itemExit,
        exitActive: styles.itemExitActive,
      }}
    >
      <div className={styles.root} ref={nodeRef}>
        <div className={styles.screen}><Image className=
          {styles.img} src={'/img/logos/screen.svg'} alt='' fill /></div>
        <div className={styles.container}>
          <div className={styles.wrapper}>
            <div className={styles.top}>
              <div className={styles.withQr}>
                <div className={styles.left}>
                  <div className={styles.text}>
                    для демонстрации<br/> подключитесь к wifi
                  </div>
                  <div className={styles.field}>
                    <span>сеть</span><span>{wifi?.ssid}</span>
                  </div>
                  <div className={styles.field}>
                    <span>пароль</span><span>{wifi?.password}</span>
                  </div>
                </div>
                <div className={styles.right}>
                  <Image className={styles.qr} src={wifi ? wifi.qr : '/img/dev/qr-jesus.png'} alt='' fill />
                </div>
              </div>
              <div className={styles.devices}>
                <div className={styles.use}>
                  использовать устройство
                </div>
                <div className={styles.list}>
                  <div onClick={() => setDevice('apple')}
                    className={classNames(styles.device, { [styles.active]: device === 'apple' })}>
                    apple
                  </div>
                  <div onClick={() => setDevice('win')}
                    className={classNames(styles.device, { [styles.active]: device === 'win' })}>
                    windows
                  </div>
                  <div onClick={() => setDevice('android')}
                    className={classNames(styles.device, { [styles.active]: device === 'android' })}>
                    android
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.imgWrapper}>
              <Image className={styles.instruction} src={getImg(device)} alt='' fill />
              {device !== 'win' ?
                <div className={styles.tip}>
                  * room name—переговорная 1
                </div>
                : null}
            </div>
          </div>
          <div className={styles.title} onClick={onCancel}>
            завершить демонстрацию
          </div>
        </div>
      </div>
    </CSSTransition >
  )
}
