import Image from 'next/image'
import styles from './index.module.scss'
import classNames from 'classnames'
import { colors } from 'styles/variables'
import Gradient from 'components/for_pages/common/gradient'

interface Props {
  icon: string
  title: string
  active: boolean
  color: 'blue' | 'green'
  onClick?: () => void
}

export default function Item({ icon, title, active, color, onClick }: Props) {

  const getColor = (color: 'blue' | 'green') => {
    switch (color) {
      case 'blue':
        return `linear-gradient(0deg, rgba(255, 255, 255, 0) 0%, ${colors.zoom} 50.52%, rgba(255, 255, 255, 0) 100%)`
      case 'green':
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
        style={getColor(color)} />
      <Image className={styles.img} src={icon} alt='' fill />
      <div className={styles.title}>
        {title}
      </div>
    </div>
  )
}
