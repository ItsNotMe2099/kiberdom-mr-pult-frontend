import { useAppContext } from 'context/state'
import Image from 'next/image'
import styles from './index.module.scss'
import classNames from 'classnames'
import {useEffect, useRef} from 'react'

interface Props {

}

interface ItemProps {
  level?: number
  index?: number
}

export default function Climate({ }: Props) {
  const appContext = useAppContext()
  const timerRef  = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (appContext.isClimateActive) {
      if(timerRef.current){
        clearTimeout(  timerRef.current)
      }
      timerRef.current =  setTimeout(() => {
        appContext.handleClimateActive()
      }, 5000)
    }
  }, [appContext.isClimateActive])

  const handleItemClick = (index?: number) => {
    if (index !== undefined) {
      appContext.updateClimateLevel(index + 20)
        if(timerRef.current){
          clearTimeout(  timerRef.current)
        }
        timerRef.current =  setTimeout(() => {
          appContext.handleClimateActive()
        }, 5000)
    }
  }

  const isOthersControlsActive = () => {
    if(appContext.isVolumeActive || appContext.isHelpActive || appContext.isLightActive){
      return true
    }
    return false
  }

  const Item = ({ level, index }: ItemProps) => {
    return (
      <div onClick={() => appContext.isClimateActive ? handleItemClick(index) : null}
        className={classNames(styles.item, {
          [styles.active]: level && level <= appContext.climateLevel,
          [styles.opened]: appContext.isClimateActive,
          [styles.minimized]: isOthersControlsActive() === true
        })}>
        {appContext.isClimateActive ? `+${level}°` : null}
        <div className={styles.gradient}></div>
      </div>
    )
  }

  const array = Array(8)

  const items = array.fill(<Item />)

  return (
    <div className=
    {classNames(styles.root, {[styles.rootActive]: appContext.isClimateActive, [styles.mini]: isOthersControlsActive() === true})}>
      {!appContext.isClimateActive ? <div className={styles.title}>
        климат
      </div> : null}
      <div className={styles.climate} onClick={() => !appContext.isClimateActive ? appContext.handleClimateActive() : null}>
        <div className={styles.items}>
          {items.map((i, index) =>
            <Item index={index} key={index} level={index + 20} />)}
        </div>
        {!appContext.isClimateActive ? <Image src='/img/right-menu/climate.svg' fill alt='' /> : null}
      </div>
    </div>
  )
}
