import Image from 'next/image'
import styles from './index.module.scss'

interface Props {
  icon: string
  color: 'blue' | 'green'
}

export default function Loader({ icon, color }: Props) {

  const getColor = (color: 'blue' | 'green' | 'purple') => {
    switch (color) {
      case 'blue':
        return `radial-gradient(80.68% 121.56% at 50% 100%, #0B5BFC 0%, rgba(255, 255, 255, 0) 46.14%)`
      case 'green':
        return `radial-gradient(80.68% 121.56% at 50% 100%, #0197A7 0%, rgba(255, 255, 255, 0) 46.14%)`
    }
  }

  return (
    <div className={styles.root} style={{background: getColor(color) }}>
      <Image className={styles.img} src={icon} alt='' fill />
      <div className={styles.wait}>
        запускаю, подождите...
      </div>
    </div>
  )
}
