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

export default function Climate({ }: Props) {
  const appContext = useAppContext()
  const timerRef  = useRef<NodeJS.Timeout | null>(null)


  const handleOpen = () => {
    if (appContext.rightMode === RightSideControl.Climate) {
      appContext.hideRightMode(RightSideControl.Climate)
      return
    }
    appContext.setRightMode(RightSideControl.Climate)
    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }
    timerRef.current = setTimeout(() => {
      console.log('Hide1')
      appContext.hideRightMode(RightSideControl.Climate)
    }, 5000)
  }

  const handleItemClick = (e: any, index?: number) => {
    e.preventDefault()
    e.stopPropagation()
    if (index !== undefined) {
      appContext.updateClimateLevel(index + 20)
        if(timerRef.current){
          clearTimeout(  timerRef.current)
        }
        timerRef.current =  setTimeout(() => {
          appContext.hideRightMode(RightSideControl.Climate)
        }, 5000)
    }
  }

  const isActive = appContext.rightMode === RightSideControl.Climate
  const Item = ({ level, index }: ItemProps) => {
    return (
      <div onClick={(e) => isActive ? handleItemClick(e,index) : null}
        className={classNames(styles.item, {
          [styles.active]: level && level <= appContext.climateLevel,
          [styles.opened]: isActive,
          [styles.minimized]: appContext.rightMode != null && !isActive
        })}>
        {isActive ? `+${level}°` : null}
        <div className={styles.gradient}></div>
      </div>
    )
  }

  const array = Array(8)

  const items = array.fill(<Item />)

  return (
    <div className=
    {classNames(styles.root, {[styles.rootActive]: isActive, [styles.mini]: appContext.rightMode != null && !isActive})}>
      {isActive ? <div className={styles.title}>
        климат
      </div> : null}
      <div className={styles.climate} onClick={handleOpen}>
        <div className={styles.items}>
          {items.map((i, index) =>
            <Item index={index} key={index} level={index + 20} />)}
        </div>
        {!isActive ? <Image src='/img/right-menu/climate.svg' fill alt='' /> : null}
      </div>
    </div>
  )
}
