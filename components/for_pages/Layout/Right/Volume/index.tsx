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

export default function Volume({ }: Props) {

  const appContext = useAppContext()

  const timerRef  = useRef<NodeJS.Timeout | null>(null)


  useEffect(() => {
    if (appContext.isVolumeActive) {
      if(  timerRef.current){
        clearTimeout(  timerRef.current)
      }
      timerRef.current = setTimeout(() => {
        appContext.handleVolumeActive()
      }, 5000)
    }
  }, [appContext.isVolumeActive])

  const handleItemClick = (index?: number) => {
    if (index !== undefined) {
      appContext.updateVolumeLevel((index + 1) * 10)

      if(  timerRef.current){
        clearTimeout(  timerRef.current)
      }
      timerRef.current = setTimeout(() => {
        appContext.handleVolumeActive()
      }, 5000)
    }
  }

  const isOthersControlsActive = () => {
    if (appContext.isClimateActive || appContext.isHelpActive || appContext.isLightActive) {
      return true
    }
    return false
  }

  const Item = ({ level, index }: ItemProps) => {
    return (
      <div onClick={() => appContext.isVolumeActive ? handleItemClick(index) : null}
        className={classNames(styles.item, {
          [styles.active]: level && level <= appContext.volumeLevel,
          [styles.opened]: appContext.isVolumeActive,
          [styles.minimized]: isOthersControlsActive() === true
        })}>
        {appContext.isVolumeActive ? level : null}
      </div>
    )
  }

  const array = Array(10)

  const items = array.fill(<Item />)

  return (
    <div className=
      {classNames(styles.root, { [styles.rootActive]: appContext.isVolumeActive, [styles.mini]: isOthersControlsActive() === true })}>
      {!appContext.isVolumeActive ? <div className={styles.title}>
        звук
      </div> : null}
      <div className={styles.volume} onClick={() => !appContext.isVolumeActive ? appContext.handleVolumeActive() : null}>
        <div className={styles.items}>
          {items.map((i, index) =>
            <Item index={index} key={index} level={(index + 1) * 10} />)}
        </div>
        {!appContext.isVolumeActive ? <Image src='/img/right-menu/sound.svg' fill alt='' /> : null}
      </div>
    </div>
  )
}
