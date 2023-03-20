import {useAppContext} from 'context/state'
import Image from 'next/image'
import styles from './index.module.scss'
import classNames from 'classnames'
import {useRef} from 'react'
import {RightSideControl} from 'data/enum/RightSideControl'

interface Props {

}

interface ItemProps {
  level?: number
  index?: number
}

export default function Light({}: Props) {

  const appContext = useAppContext()

  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const isActive = appContext.rightMode === RightSideControl.Light

  const handleOpen = () => {
    if (appContext.rightMode === RightSideControl.Light) {
      appContext.hideRightMode(RightSideControl.Light)
      return
    }
    appContext.setRightMode(RightSideControl.Light)
    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }
    timerRef.current = setTimeout(() => {
      console.log('Hide1')
      appContext.hideRightMode(RightSideControl.Light)
    }, 5000)
  }


  const handleItemUpZoneClick = (e: any, index?: number) => {
    e.preventDefault()
    e.stopPropagation()
    if (index !== undefined) {
      appContext.updateLightLevelUpZone(index + 1)
      if (index === 0 && appContext.lightLevelUp === 1) {
        appContext.updateLightLevelUpZone(0)
      }

    }
    if (timerRef.current) {
      console.log('ClearTimout')
      clearTimeout(timerRef.current)
    }
    timerRef.current = setTimeout(() => {
      appContext.hideRightMode(RightSideControl.Light)
    }, 5000)
  }

  const handleItemDownZoneClick = (e: any, index?: number) => {
    e.preventDefault()
    e.stopPropagation()
    if (index !== undefined) {
      appContext.updateLightLevelDownZone(index + 1)
      if (index === 0 && appContext.lightLevelDown === 1) {
        appContext.updateLightLevelDownZone(0)
      }
    }
    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }
    timerRef.current = setTimeout(() => {
      console.log('Hide3')
      appContext.hideRightMode(RightSideControl.Light)
    }, 5000)

  }


  const ItemUp = ({level, index}: ItemProps) => {
    return (
      <div onClick={(e ) => isActive ? handleItemUpZoneClick(e, index) : null}
           className={classNames(styles.item, {
             [styles.active]: level && level <= appContext.lightLevelUp,
             [styles.opened]: isActive,
             [styles.minimized]: appContext.rightMode != null && !isActive
           })}>
        {isActive ? level : null}
      </div>
    )
  }

  const ItemDown = ({level, index}: ItemProps) => {
    return (
      <div onClick={(e) => isActive ? handleItemDownZoneClick(e, index) : null}
           className={classNames(styles.item, styles.itemDown, {
             [styles.active]: level && level <= appContext.lightLevelDown,
             [styles.opened]: isActive,
             [styles.minimized]: appContext.rightMode != null && !isActive
           })}>
        {isActive ? level : null}
      </div>
    )
  }

  const array = Array(4)
  const arrayDown = Array(4)

  const itemsUp = array.fill(<ItemUp/>)
  const itemsDown = arrayDown.fill(<ItemDown/>)

  return (
    <div className=
           {classNames(styles.root, {
             [styles.rootActive]: isActive,
             [styles.mini]: appContext.rightMode != null && !isActive
           })}>
      {!isActive ? <div className={styles.title}>
        свет
      </div> : null}
      <div className={styles.light} onClick={handleOpen}>
        <div className={styles.items}>
          {itemsUp.slice(isActive ? 0 : 1).map((i, index) =>
            <ItemUp index={index} key={index} level={index + (isActive ? 1 : 2)}/>)}
        </div>
        {!isActive ?
          <div className={styles.decorative}>
            {itemsUp.slice(0, 1).map((i, index) =>
              <ItemUp index={index} key={index} level={index + 1}/>)}
            {itemsDown.slice(0, 1).map((i, index) =>
              <ItemDown index={index} key={index} level={index + 1}/>)}
          </div> :
          <div className={styles.zones}>
            две зоны
          </div>
        }
        <div className={styles.itemsDown}>
          {itemsDown.slice(isActive ? 0 : 1).map((i, index) =>
            <ItemDown index={index} key={index} level={index + (isActive ? 1 : 2)}/>)}
        </div>
        {!isActive ? <Image src='/img/right-menu/light.svg' fill alt=''/> : null}
      </div>
    </div>
  )
}
