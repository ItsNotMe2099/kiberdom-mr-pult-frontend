import Image from 'next/image'
import styles from './index.module.scss'

interface Props {
  img: string
  title: string
}

export default function BottomControl({ img, title }: Props) {

  return (
    <div className={styles.root}>
      <Image className={styles.img} src={img} alt='' fill/>
      <div className={styles.title}>
        {title}
      </div>
    </div>
  )
}
