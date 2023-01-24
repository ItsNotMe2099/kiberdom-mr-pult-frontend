import Image from 'next/image'
import styles from './index.module.scss'
import classNames from 'classnames'
import { colors } from 'styles/variables'

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
        return active ? `linear-gradient(0deg, rgba(255, 255, 255, 0) 0%, ${colors.zoom} 50.52%, rgba(255, 255, 255, 0) 100%)` : ''
      case 'green':
        return active ? `linear-gradient(0deg, rgba(255, 255, 255, 0) 0%, ${colors.trueconf} 50.52%, rgba(255, 255, 255, 0) 100%)` : ''
    }
  }

  const handleClick = () => {
    onClick ? onClick() : null
  }

  return (
    <div className={styles.root} style={{ background: getColor(color) }} onClick={handleClick}>
      <Image className={styles.img} src={icon} alt='' fill />
      <div className={styles.title}>
        {title}
      </div>
    </div>
  )
}
