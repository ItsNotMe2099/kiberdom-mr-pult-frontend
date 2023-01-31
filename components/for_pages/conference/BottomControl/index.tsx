import Gradient from 'components/for_pages/common/gradient'
import styles from './index.module.scss'

interface Props {
  img: React.ReactNode
  title: string
  onClick: () => void
  isActive: boolean
  style: string
}

export default function BottomControl({ img, title, onClick, isActive, style }: Props) {

  return (
    <div onClick={onClick} className={styles.root}>
      <Gradient
        isActive={isActive}
        timeout={500}
        enterClass={styles.itemEnter}
        enterActiveClass={styles.itemEnterActive}
        exitClass={styles.itemExit}
        exitActiveClass={styles.itemExitActive}
        style={style} />
      {img}
      <div className={styles.title}>
        {title}
      </div>
    </div>
  )
}
