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

export default function Volume({ }: Props) {

  const appContext = useAppContext()

  const handleItemClick = (index?: number) => {
    if (index !== undefined) {
      appContext.updateVolumeLevel((index + 1) * 10)
      /*if(appContext.volumeLevel === 10 && index === 0){
        appContext.updateVolumeLevel(0)
      }*/
    }
  }

  const isOthersControlsActive = () => {
    if(appContext.isClimateActive || appContext.isHelpActive || appContext.isLightActive){
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
    {classNames(styles.root, {[styles.rootActive]: appContext.isVolumeActive, [styles.mini]: isOthersControlsActive() === true})}>
      {!appContext.isVolumeActive ? <div className={styles.title}>
        звук
      </div> : null}
      <div className={styles.volume} onClick={appContext.handleVolumeActive}>
        <div className={styles.items}>
          {items.map((i, index) =>
            <Item index={index} key={index} level={(index + 1) * 10} />)}
        </div>
        {!appContext.isVolumeActive ? <Image src='/img/right-menu/sound.svg' fill alt='' /> : null}
      </div>
    </div>
  )
}
