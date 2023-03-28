import Image from 'next/image'
import styles from './index.module.scss'
import classNames from 'classnames'
import {useAppContext} from 'context/state'
import {useEffect, useRef, useState} from 'react'
import CoreRepository from 'data/repositories/CoreRepository'
import {SnackbarType} from 'types/enums'
import {RightSideControl} from 'data/enum/RightSideControl'

interface Props {

}

export default function Help({ }: Props) {

  const appContext = useAppContext()
  const timerRef  = useRef<NodeJS.Timeout | null>(null)

  const isActive = appContext.rightMode === RightSideControl.Help
  const [adminCalledTimer, setAdminCalledTimer] = useState<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (appContext.rightMode === RightSideControl.Help) {
      if(timerRef.current){
        clearTimeout(  timerRef.current)
      }
      timerRef.current = setTimeout(() => {
        appContext.hideRightMode(RightSideControl.Help)
      }, 5000)
    }
  }, [appContext.rightMode])

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
      appContext.hideRightMode(RightSideControl.Help)
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

  const handleMenu = () => {
    handleItemClick()
    appContext.showIframe()
  }


  return (
    <div className={classNames(styles.root, { [styles.rootActive]: isActive })}>
      {!isActive ? <><div className={styles.title}>
        забота
      </div>
        <div className=
          {classNames(styles.help, {
            [styles.minimized]: appContext.rightMode != null && appContext.rightMode !== RightSideControl.Help,
            [styles.minimizedAlt]: appContext.rightMode === RightSideControl.Climate
          })}>
          <div className={styles.gradient} onClick={() => appContext.setRightMode(RightSideControl.Help)}></div>
          <Image src='/img/right-menu/help.svg' fill alt='' />
        </div></> :
        <>
          <div className={styles.call} onClick={handleMenu}>
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
