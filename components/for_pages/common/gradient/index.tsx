import { Ref, useRef } from 'react'
import { CSSTransition } from 'react-transition-group'
import styles from './index.module.scss'
import classNames from 'classnames'

interface Props {
  isActive: boolean
  style: string
  className?: string
  timeout: number
  enterClass: string
  enterActiveClass: string
  exitClass: string
  exitActiveClass: string
}

export default function Gradient({ isActive, style, className, timeout,
   enterActiveClass, enterClass, exitClass, exitActiveClass }: Props) {

  const nodeRef = useRef(null)

  return (
      <CSSTransition
        timeout={timeout}
        in={isActive}
        nodeRef={nodeRef}
        mountOnEnter
        unmountOnExit
        classNames={{
          enter: enterClass,
          enterActive: enterActiveClass,
          exit: exitClass,
          exitActive: exitActiveClass
        }}
      >
        <div className={classNames(styles.gradient, className)} ref={nodeRef} style={{background: style}}>
          
        </div>
      </CSSTransition>
  )
}

Gradient.defaultProps = {
  timeout: 200,
  enterClass: styles.itemEnter,
  enterActiveClass: styles.itemEnterActive,
  exitClass: styles.itemExit,
  exitActiveClass: styles.itemExitActive,
}

