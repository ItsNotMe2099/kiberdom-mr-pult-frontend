import Image from 'next/image'
import { useRef } from 'react'
import { CSSTransition } from 'react-transition-group'
import { colors } from 'styles/variables'
import styles from './index.module.scss'

interface Props {
  icon: string
  color: 'blue' | 'green'
  isActive: boolean
}

export default function Loader({ icon, color, isActive }: Props) {


  const getColor = (color: 'blue' | 'green') => {
    switch (color) {
      case 'blue':
        return `conic-gradient(#000 0deg 110deg, ${colors.zoom}, #000 250deg)`
      case 'green':
        return `conic-gradient(#000 0deg 110deg, ${colors.trueconf}, #000 250deg)`
    }
  }

  const nodeRef = useRef(null)

  return (
    <CSSTransition
      timeout={1000}
      in={isActive}
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
      <div className={styles.root} ref={nodeRef}>
        <div className={styles.container} style={{ background: getColor(color) }}>
          <Image className={styles.img} src={icon} alt='' fill />
          <div className={styles.wait}>
            запускаю, подождите...
          </div>
        </div>
      </div>
    </CSSTransition >
  )
}
