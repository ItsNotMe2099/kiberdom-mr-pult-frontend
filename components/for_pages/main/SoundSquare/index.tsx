import styles from './index.module.scss'
import classNames from 'classnames'
import Gradient from 'components/for_pages/common/gradient'
import { colors } from 'styles/variables'
import MusicSvg from 'components/svg/MusicSvg'
import { CSSTransition } from 'react-transition-group'
import { useRef } from 'react'

interface Props {
  className?: string
  onClick?: () => void
  isOn: boolean
  loading: boolean
}

export default function SoundSquare({ className, onClick, isOn, loading }: Props) {

  const nodeRef = useRef(null)
  const iconRef = useRef(null)

  return (
    <div onClick={onClick} className={classNames(styles.root, className, {[styles.cursor]: loading})}>
      <Gradient
        isActive={isOn && !loading}
        timeout={500}
        enterClass={styles.itemEnter}
        enterActiveClass={styles.itemEnterActive}
        exitClass={styles.itemExit}
        exitActiveClass={styles.itemExitActive}
        style={`linear-gradient(316.27deg, rgba(130, 0, 241, 0) 39.75%, rgba(130, 0, 241, 0.3) 67.43%, ${colors.purple} 100%)`} />
      <Gradient
        isActive={loading}
        timeout={500}
        enterClass={styles.itemEnter}
        enterActiveClass={styles.itemEnterActive}
        exitClass={styles.itemExit}
        exitActiveClass={styles.itemExitActive}
        style={`linear-gradient(316.27deg, rgba(130, 0, 241, 0) 39.75%, rgba(130, 0, 241, 0.3) 67.43%, ${colors.purple} 100%)`} />
      <CSSTransition
        timeout={500}
        in={!loading}
        nodeRef={nodeRef}
        mountOnEnter
        unmountOnExit
        classNames={{
          enter: styles.itemEnter,
          enterActive: styles.itemEnterActive,
          exit: styles.itemExit,
          exitActive: styles.itemExitActive,
        }}
      >
        <div className={styles.label} >
          фоновая
          музыка
        </div>
      </CSSTransition>
      <CSSTransition
        timeout={500}
        in={!loading}
        nodeRef={iconRef}
        mountOnEnter
        unmountOnExit
        classNames={{
          enter: styles.itemEnter,
          enterActive: styles.itemEnterActive,
          exit: styles.itemExit,
          exitActive: styles.itemExitActive,
        }}
      >
        <div className={styles.icon} ref={iconRef}><MusicSvg isOn={isOn} /></div>
      </CSSTransition>
    </div>
  )
}
