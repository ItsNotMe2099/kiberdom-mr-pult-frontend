import Image from 'next/image'
import styles from './index.module.scss'
import classNames from 'classnames'
import { useAppContext } from 'context/state'

interface Props {

}

export default function Help({ }: Props) {

  const appContext = useAppContext()

  const isOthersControlsActive = () => {
    if (appContext.isSoundActive || appContext.isLightActive) {
      return true
    }
    return false
  }

  return (
    <div className={styles.root}>
      {!appContext.isHelpActive ? <><div className={styles.title}>
        помощь
      </div>
        <div className=
          {classNames(styles.help, {
            [styles.minimized]: isOthersControlsActive() === true,
            [styles.minimizedAlt]: appContext.isClimateActive
          })}>
          <div className={styles.gradient} onClick={appContext.handleHelpActive}></div>
          <Image src='/img/right-menu/help.svg' fill alt='' />
        </div></> :
        <div>
          <div className={styles.call}>
            <div className={styles.gradient}></div>
            <div className={styles.text}>перейти
              в меню
              бара</div>
          </div>
          <div className={styles.call}>
            <div className={styles.gradient}></div>
            <div className={styles.text}>
              позвать админи-стратора
            </div>
          </div>
        </div>
      }
    </div>
  )
}
