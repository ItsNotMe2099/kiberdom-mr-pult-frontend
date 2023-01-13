import Image from 'next/image'
import { useState } from 'react'
import styles from './index.module.scss'

interface Props {

}

export default function Help({ }: Props) {

  const [isActive, setIsActive] = useState<boolean>(false)

  const handleClick = () => {
    setIsActive(true)
    setTimeout(() => {
      setIsActive(false)
    }, 5000)
  }

  return (
    <div className={styles.root}>
      {!isActive ? <><div className={styles.title}>
        помощь
      </div>
      <div className={styles.help}>
        <div className={styles.gradient} onClick={handleClick}></div>
        <Image src='/img/right-menu/help.svg' fill alt='' />
      </div></> :
        <div>
          <div className={styles.help}>
            <div className={styles.gradient}></div>
            <div className={styles.text}>перейти
              в меню
              бара</div>
          </div>
          <div className={styles.help}>
            <div className={styles.gradient}></div>
            <div className={styles.text}>
            позвать админи-стратора
            </div>
          </div>
        </div>
      }
    </div>
  )
}
