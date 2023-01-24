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

export default function Sound({ }: Props) {

  const appContext = useAppContext()

  const handleItemClick = (index?: number) => {
    if (index !== undefined) {
      appContext.updateSoundLevel((index + 1) * 10)
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
      <div onClick={() => appContext.isSoundActive ? handleItemClick(index) : null}
        className={classNames(styles.item, {
          [styles.active]: level && level <= appContext.soundLevel,
          [styles.opened]: appContext.isSoundActive,
          [styles.minimized]: isOthersControlsActive() === true
        })}>
        {appContext.isSoundActive ? level : null}
      </div>
    )
  }

  const array = Array(10)

  const items = array.fill(<Item />)

  return (
    <div className=
    {classNames(styles.root, {[styles.rootActive]: appContext.isSoundActive, [styles.mini]: isOthersControlsActive() === true})}>
      {!appContext.isSoundActive ? <div className={styles.title}>
        звук
      </div> : null}
      <div className={styles.sound} onClick={appContext.handleSoundActive}>
        <div className={styles.items}>
          {items.map((i, index) =>
            <Item index={index} key={index} level={(index + 1) * 10} />)}
        </div>
        {!appContext.isSoundActive ? <Image src='/img/right-menu/sound.svg' fill alt='' /> : null}
      </div>
    </div>
  )
}
