import Image from 'next/image'
import styles from './index.module.scss'
import { colors } from 'styles/variables'
import Gradient from 'components/for_pages/common/gradient'
import { Platform } from 'data/enum/Platorm'

interface Props {
  icon: string
  title: string
  active: boolean
  platform: Platform
  onClick?: () => void
}

export default function Item({ icon, title, active, platform, onClick }: Props) {

  const getColor = () => {
    switch (platform) {
      case Platform.Zoom:
        return `linear-gradient(0deg, rgba(255, 255, 255, 0) 0%, ${colors.zoom} 50.52%, rgba(255, 255, 255, 0) 100%)`
      case Platform.TrueConf:
        return `linear-gradient(0deg, rgba(255, 255, 255, 0) 0%, ${colors.trueconf} 50.52%, rgba(255, 255, 255, 0) 100%)`
    }
  }

  const handleClick = () => {
    onClick ? onClick() : null
  }

  return (
    <div className={styles.root} onClick={handleClick}>
      <Gradient
        isActive={active}
        timeout={500}
        enterClass={styles.itemEnter}
        enterActiveClass={styles.itemEnterActive}
        exitClass={styles.itemExit}
        exitActiveClass={styles.itemExitActive}
        style={getColor() as string} />
      <Image className={styles.img} src={icon} alt='' fill />
      <div className={styles.title}>
        {title}
      </div>
    </div>
  )
}
