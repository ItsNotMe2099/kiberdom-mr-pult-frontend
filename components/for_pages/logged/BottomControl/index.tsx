import Image from 'next/image'
import styles from './index.module.scss'

interface Props {
  img: React.ReactNode
  title: string
}

export default function BottomControl({ img, title }: Props) {

  return (
    <div className={styles.root}>
      {img}
      <div className={styles.title}>
        {title}
      </div>
    </div>
  )
}
