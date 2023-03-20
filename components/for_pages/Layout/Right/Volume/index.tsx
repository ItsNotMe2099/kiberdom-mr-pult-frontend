import {useAppContext} from 'context/state'
import Image from 'next/image'
import styles from './index.module.scss'
import classNames from 'classnames'
import { useRef} from 'react'
import {RightSideControl} from 'data/enum/RightSideControl'

interface Props {

}

interface ItemProps {
  level?: number
  index?: number
}

export default function Volume({ }: Props) {

  const appContext = useAppContext()

  const timerRef  = useRef<NodeJS.Timeout | null>(null)
  const isActive = appContext.rightMode === RightSideControl.Volume



  const handleOpen = () => {
    if (appContext.rightMode === RightSideControl.Volume) {
      appContext.hideRightMode(RightSideControl.Volume)
      return
    }
    appContext.setRightMode(RightSideControl.Volume)
    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }
    timerRef.current = setTimeout(() => {
      console.log('Hide1')
      appContext.hideRightMode(RightSideControl.Volume)
    }, 5000)
  }


  const handleItemClick = (e: any, index?: number) => {
    e.preventDefault()
    e.stopPropagation()
    if (index !== undefined) {
      appContext.updateVolumeLevel((index + 1) * 10)

      if(  timerRef.current){
        clearTimeout(  timerRef.current)
      }
      timerRef.current = setTimeout(() => {
        appContext.hideRightMode(RightSideControl.Volume)
      }, 5000)
    }
  }


  const Item = ({ level, index }: ItemProps) => {
    return (
      <div onClick={(e) => isActive ? handleItemClick(e, index) : null}
        className={classNames(styles.item, {
          [styles.active]: level && level <= appContext.volumeLevel,
          [styles.opened]: isActive,
          [styles.minimized]: appContext.rightMode != null && !isActive
        })}>
        {isActive ? level : null}
      </div>
    )
  }

  const array = Array(10)

  const items = array.fill(<Item />)

  return (
    <div className=
      {classNames(styles.root, { [styles.rootActive]: isActive, [styles.mini]: appContext.rightMode != null && !isActive })}>
      {!isActive ? <div className={styles.title}>
        звук
      </div> : null}
      <div className={styles.volume} onClick={handleOpen}>
        <div className={styles.items}>
          {items.map((i, index) =>
            <Item index={index} key={index} level={(index + 1) * 10} />)}
        </div>
        {!isActive ? <Image src='/img/right-menu/sound.svg' fill alt='' /> : null}
      </div>
    </div>
  )
}
