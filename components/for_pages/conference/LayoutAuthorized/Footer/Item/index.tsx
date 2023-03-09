import Gradient from 'components/for_pages/common/gradient'
import { useAppContext } from 'context/state'
import { Platform } from 'data/enum/Platorm'
import { colors } from 'styles/variables'
import styles from './index.module.scss'

interface Props {
  style?: 'members'
  icon: React.ReactNode
  title: string
  active: boolean
  onClick?: () => void
  platform: Platform
  numberOfUsers?: number
}

export default function Item({ style, icon, active, onClick, platform, title, numberOfUsers }: Props) {


  const getColor = () => {
    switch (platform) {
      case Platform.Zoom:
        return `linear-gradient(180deg, ${colors.zoom} 0%, rgba(11, 91, 253, 0.3) 37.5%, rgba(11, 91, 253, 0) 86.98%)`
      case Platform.TrueConf:
        return `linear-gradient(180deg, ${colors.trueconf} 0%, rgba(1, 151, 167, 0.3) 37.5%, rgba(1, 151, 167, 0) 86.98%)`
    }
  }

  const handleClick = () => {
    onClick ? onClick() : null
  }

  const appContext = useAppContext()

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
      {icon}
      <div className={styles.title}>{title}</div>
      {style === 'members' && numberOfUsers as number > 0  && !appContext.isActiveUsersList ? <div className={styles.number}>{numberOfUsers}</div> : null}
    </div >
  )
}
