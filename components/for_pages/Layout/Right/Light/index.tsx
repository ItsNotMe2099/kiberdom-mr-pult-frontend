import { useAppContext } from 'context/state'
import Image from 'next/image'
import styles from './index.module.scss'
import classNames from 'classnames'

interface Props {

}

interface ItemProps {
  level?: number
  index?: number
}

export default function Light({ }: Props) {

  const appContext = useAppContext()

  const handleItemUpZoneClick = (index?: number) => {
    if (index !== undefined) {
      appContext.updateLightLevelUpZone(index + 1)
    }
  }

  const handleItemDownZoneClick = (index?: number) => {
    if (index !== undefined) {
      appContext.updateLightLevelDownZone(index + 1)
    }
  }

  const isOthersControlsActive = () => {
    if (appContext.isSoundActive || appContext.isHelpActive || appContext.isLightActive) {
      return true
    }
    return false
  }

  const ItemUp = ({ level, index }: ItemProps) => {
    return (
      <div onClick={() => appContext.isSoundActive ? handleItemUpZoneClick(index) : null}
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
      <div onClick={() => appContext.isSoundActive ? handleItemDownZoneClick(index) : null}
        className={classNames(styles.item, {
          [styles.active]: level && level <= appContext.lightLevelDown,
          [styles.opened]: appContext.isLightActive,
          [styles.minimized]: isOthersControlsActive() === true
        })}>
        {appContext.isLightActive ? level : null}
      </div>
    )
  }

  const array = Array(3)
  const arrayDown = Array(3)

  const itemsUp = array.fill(<ItemUp />)
  const itemsDown = arrayDown.fill(<ItemDown />)

  return (
    <div className=
      {classNames(styles.root, { [styles.rootActive]: appContext.isLightActive, [styles.mini]: isOthersControlsActive() === true })}>
      {!appContext.isLightActive ? <div className={styles.title}>
        свет
      </div> : null}
      <div className={styles.sound} onClick={appContext.handleLightActive}>
        <div className={styles.items}>
          {itemsUp.map((i, index) =>
            <ItemUp index={index} key={index} level={index + 1} />)}
          {itemsDown.map((i, index) =>
            <ItemDown index={index} key={index} level={index + 1} />)}
        </div>
        {!appContext.isLightActive ? <Image src='/img/right-menu/light.svg' fill alt='' /> : null}
      </div>
    </div>
  )
}
