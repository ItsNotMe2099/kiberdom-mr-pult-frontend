import Image from 'next/image'
import styles from './index.module.scss'
import classNames from 'classnames'
import { useAppContext } from 'context/state'
import { useEffect, useState } from 'react'

interface Props {

}

export default function Help({ }: Props) {

  const appContext = useAppContext()

  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (appContext.isHelpActive) {
      const newTimer = setTimeout(() => {
        appContext.handleHelpActive()
      }, 5000)
      setTimer(newTimer)
    }
  }, [appContext.isHelpActive])

  const handleItemClick = () => {
    if (timer) {
      clearTimeout(timer)
    }
    const newTimer = setTimeout(() => {
      appContext.handleHelpActive()
    }, 5000)
    setTimer(newTimer)
  }

  const isOthersControlsActive = () => {
    if (appContext.isVolumeActive || appContext.isLightActive || appContext.isVolumeActive) {
      return true
    }
    return false
  }

  return (
    <div className={classNames(styles.root, { [styles.rootActive]: appContext.isHelpActive })}>
      {!appContext.isHelpActive ? <><div className={styles.title}>
        помощь
      </div>
        <div className=
          {classNames(styles.help, {
            [styles.minimized]: isOthersControlsActive() === true,
            [styles.minimizedAlt]: appContext.isClimateActive
          })}>
          <div className={styles.gradient} onClick={() => !appContext.isHelpActive ? appContext.handleHelpActive() : null}></div>
          <Image src='/img/right-menu/help.svg' fill alt='' />
        </div></> :
        <>
          <div className={styles.call} onClick={handleItemClick}>
            <div className={styles.gradient}></div>
            <div className={styles.text}>перейти
              в<br /> меню
              бара</div>
          </div>
          <div className={styles.call} onClick={handleItemClick}>
            <div className={styles.gradient}></div>
            <div className={styles.text}>
              позвать<br /> админи-<br />стратора
            </div>
          </div>
        </>
      }
    </div>
  )
}
