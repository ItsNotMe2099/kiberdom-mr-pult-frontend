import Image from 'next/image'
import styles from './index.module.scss'
import classNames from 'classnames'
import { useAppContext } from 'context/state'
import {useEffect, useRef, useState} from 'react'
import CoreRepository from 'data/repositories/CoreRepository'
import { SnackbarType } from 'types/enums'

interface Props {

}

export default function Help({ }: Props) {

  const appContext = useAppContext()
  const timerRef  = useRef<NodeJS.Timeout | null>(null)


  const [adminCalledTimer, setAdminCalledTimer] = useState<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (appContext.isHelpActive) {
      if(timerRef.current){
        clearTimeout(  timerRef.current)
      }
      timerRef.current = setTimeout(() => {
        appContext.handleHelpActive()
      }, 5000)
    }
  }, [appContext.isHelpActive])

  useEffect(() => {
    if (appContext.adminCalled) {
      const newTimer = setTimeout(() => {
        appContext.handleAdminCalled()
      }, 3000)
      setAdminCalledTimer(newTimer)
    }
  }, [appContext.adminCalled])

  const handleItemClick = () => {
    if(timerRef.current){
      clearTimeout(  timerRef.current)
    }
    timerRef.current = setTimeout(() => {
      appContext.handleHelpActive()
    }, 5000)
  }

  const handleCallAdmin = async () => {
    handleItemClick()
    try {
      await CoreRepository.callCareService()
      appContext.handleAdminCalled()
    }
    catch (error: any) {
      let errorMessage = error.toString()
      // extract the error message from the error object
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message
      }
      appContext.showSnackbar(errorMessage, SnackbarType.error)
    }
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
        забота
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
          <div className={styles.call} onClick={handleCallAdmin}>
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
