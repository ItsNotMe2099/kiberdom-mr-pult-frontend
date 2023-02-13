import Image from 'next/image'
import { useRef } from 'react'
import { CSSTransition } from 'react-transition-group'
import { colors } from 'styles/variables'
import styles from './index.module.scss'
import classNames from 'classnames'

interface Props {
  icon?: string
  color: 'blue' | 'green' | 'purple' | 'yellow'
  isActive: boolean
  text: string
}

export default function Loader({ icon, color, isActive, text }: Props) {


  const getColor = (color: 'blue' | 'green' | 'purple' | 'yellow') => {
    switch (color) {
      case 'blue':
        return `conic-gradient(#000 0deg 110deg, ${colors.zoom}, #000 250deg)`
      case 'green':
        return `conic-gradient(#000 0deg 110deg, ${colors.trueconf}, #000 250deg)`
      case 'purple':
        return `conic-gradient(#000 0deg 110deg, ${colors.purple}, #000 250deg)`
      case 'yellow':
        return `conic-gradient(#000 0deg 110deg, ${colors.yellow}, #000 250deg)`
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
          {icon ? <Image className={classNames(styles.img, {[styles.large]: (color === 'purple' || color ==='yellow')})} src={icon} alt='' fill /> : null}
          <div className={styles.wait}>
            {text}
          </div>
        </div>
      </div>
    </CSSTransition >
  )
}
