import { useAppContext } from 'context/state'
import Image from 'next/image'
import styles from './index.module.scss'
import classNames from 'classnames'
import { useEffect, useState } from 'react'

interface Props {

}

interface ItemProps {
  level?: number
  index?: number
}

export default function Light({ }: Props) {

  const appContext = useAppContext()

  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null)

  /*useEffect(() => {
    if (appContext.isLightActive) {
      const newTimer = setTimeout(() => {
        appContext.handleLightActive()
      }, 5000)
      setTimer(newTimer)
    }
  }, [appContext.isLightActive])*/


  const handleItemUpZoneClick = (index?: number) => {
    if (index !== undefined) {
      appContext.updateLightLevelUpZone(index + 1)
      if (index === 0 && appContext.lightLevelUp === 1) {
        appContext.updateLightLevelUpZone(0)
      }
      /*if (timer) {
        clearTimeout(timer)
      }
      const newTimer = setTimeout(() => {
        appContext.handleLightActive()
      }, 5000)
      setTimer(newTimer)*/
    }
  }

  const handleItemDownZoneClick = (index?: number) => {
    if (index !== undefined) {
      appContext.updateLightLevelDownZone(index + 1)
      if (index === 0 && appContext.lightLevelDown === 1) {
        appContext.updateLightLevelDownZone(0)
      }
    }
    /*if (timer) {
      clearTimeout(timer)
    }
    const newTimer = setTimeout(() => {
      appContext.handleLightActive()
    }, 5000)
    setTimer(newTimer)*/
  }

  const isOthersControlsActive = () => {
    if (appContext.isVolumeActive || appContext.isHelpActive || appContext.isClimateActive) {
      return true
    }
    return false
  }

  const ItemUp = ({ level, index }: ItemProps) => {
    return (
      <div onClick={() => appContext.isLightActive ? handleItemUpZoneClick(index) : null}
        className={classNames(styles.item, {
          [styles.active]: level && level <= appContext.lightLevelUp,
          [styles.opened]: appContext.isLightActive,
          [styles.minimized]: isOthersControlsActive() === true
        })}>
        {appContext.isLightActive ? level : null}
      </div>
    )
  }

  const ItemDown = ({ level, index }: ItemProps) => {
    return (
      <div onClick={() => appContext.isLightActive ? handleItemDownZoneClick(index) : null}
        className={classNames(styles.item, styles.itemDown, {
          [styles.active]: level && level <= appContext.lightLevelDown,
          [styles.opened]: appContext.isLightActive,
          [styles.minimized]: isOthersControlsActive() === true
        })}>
        {appContext.isLightActive ? level : null}
      </div>
    )
  }

  const array = Array(4)
  const arrayDown = Array(4)

  const itemsUp = array.fill(<ItemUp />)
  const itemsDown = arrayDown.fill(<ItemDown />)

  return (
    <div className=
      {classNames(styles.root, { [styles.rootActive]: appContext.isLightActive, [styles.mini]: isOthersControlsActive() === true })}>
      {!appContext.isLightActive ? <div className={styles.title}>
        свет
      </div> : null}
      <div className={styles.light} onClick={() => !appContext.isLightActive ? appContext.handleLightActive() : null}>
        <div className={styles.items}>
          {itemsUp.slice(appContext.isLightActive ? 0 : 1).map((i, index) =>
            <ItemUp index={index} key={index} level={index + (appContext.isLightActive ? 1 : 2)} />)}
        </div>
        {!appContext.isLightActive ?
          <div className={styles.decorative}>
            {itemsUp.slice(0, 1).map((i, index) =>
              <ItemUp index={index} key={index} level={index + 1} />)}
            {itemsDown.slice(0, 1).map((i, index) =>
              <ItemDown index={index} key={index} level={index + 1} />)}
          </div> :
          <div className={styles.zones}>
            две зоны
          </div>
        }
        <div className={styles.itemsDown}>
          {itemsDown.slice(appContext.isLightActive ? 0 : 1).map((i, index) =>
            <ItemDown index={index} key={index} level={index + (appContext.isLightActive ? 1 : 2)} />)}
        </div>
        {!appContext.isLightActive ? <Image src='/img/right-menu/light.svg' fill alt='' /> : null}
      </div>
    </div>
  )
}
