import { useAppContext } from 'context/state'
import Image from 'next/image'
import { useState } from 'react'
import styles from './index.module.scss'
import classNames from 'classnames'

interface Props {

}

interface ItemProps {
  level?: number
  index?: number
}

export default function Sound({ }: Props) {

  const [isActive, setIsActive] = useState<boolean>(false)

  const handleClick = () => {
    setIsActive(true)
    setTimeout(() => {
      setIsActive(false)
    }, 5000)
  }

  const handleItemClick = (index?: number) => {
    if (index !== undefined) {
      appContext.updateSoundLevel((index + 1) * 10)
    }
  }

  const Item = ({ level, index }: ItemProps) => {
    return (
      <div onClick={() => isActive ? handleItemClick(index) : null}
        className={classNames(styles.item, {
          [styles.active]: level && level <= appContext.soundLevel,
          [styles.opened]: isActive 
        })}>
        {isActive ? level : null}
      </div>
    )
  }

  const array = Array(10)

  const items = array.fill(<Item />)

  const appContext = useAppContext()

  return (
    <div className={styles.root}>
      {!isActive ? <div className={styles.title}>
        звук
      </div> : null}
      <div className={styles.sound} onClick={handleClick}>
        <div className={styles.items}>
          {items.map((i, index) =>
            <Item index={index} key={index} level={(index + 1) * 10} />)}
        </div>
        {!isActive ? <Image src='/img/right-menu/sound.svg' fill alt='' /> : null}
      </div>
    </div>
  )
}
