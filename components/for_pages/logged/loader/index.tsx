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
        return `conic-gradient(#000 0deg 110deg, #0B5BFC, #000 250deg)`
      case 'green':
        return `conic-gradient(#000 0deg 110deg, #0197A7, #000 250deg)`
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
