import { useAppContext } from 'context/state'
import Image from 'next/image'
import styles from './index.module.scss'

interface Props {
  color: 'blue' | 'green'
  icon: string
}

export default function Header({ color, icon }: Props) {

  const appContext = useAppContext()

  const getColor = (color: 'blue' | 'green') => {
    switch (color) {
      case 'blue':
        return `radial-gradient(94.35% 142.17% at 50% -0.4%, #0B5BFC 0%, rgba(255, 255, 255, 0) 40.48%)`
      case 'green':
        return `radial-gradient(94.35% 142.17% at 50% -0.4%, #0197A7 0%, rgba(255, 255, 255, 0) 40.48%)`
    }
  }

  return (
    <div className={styles.root} style={{ background: getColor(color) }}>
      <Image className={styles.img} src={icon} alt='' fill />
      <div className={styles.bottom}>
        <div className={styles.id}>
          ID {appContext.user?.id} 
        </div>
        <div className={styles.separator}>
          •
        </div>
        <div className={styles.time}>
          00:45
        </div>
      </div>
    </div>
  )
}
