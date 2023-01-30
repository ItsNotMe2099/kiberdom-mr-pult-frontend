import Image from 'next/image'
import styles from './index.module.scss'
import classNames from 'classnames'
import { CSSTransition } from 'react-transition-group'
import { useRef } from 'react'
import { colors } from 'styles/variables'

interface Props {
  color: 'blue' | 'green' | 'purple-left' | 'purple-right'
  active?: boolean
  img: string
  children?: React.ReactNode
  className?: string
  onClick?: () => void
  imgWidth?: 'controls'
  loader?: boolean
}

export default function Square({ loader, color, active, img, imgWidth, children, className, onClick }: Props) {

  const getColor = (color: 'blue' | 'green' | 'purple-left' | 'purple-right') => {
    switch (color) {
      case 'blue':
        return `linear-gradient(136.27deg, rgba(11, 91, 253, 0) 41.98%, rgba(11, 91, 253, 0.3) 69.36%, ${colors.zoom} 100.25%)`
      case 'green':
        return `linear-gradient(223.73deg, rgba(1, 151, 167, 0) 42.72%, rgba(1, 151, 167, 0.3) 69.64%, ${colors.trueconf} 100%)`
      case 'purple-left':
        return `linear-gradient(43.73deg, rgba(130, 0, 241, 0) 44.44%, rgba(130, 0, 241, 0.3) 70.44%, ${colors.purple} 99.75%)`
      case 'purple-right':
        return `linear-gradient(316.27deg, rgba(130, 0, 241, 0) 39.75%, rgba(130, 0, 241, 0.3) 67.43%, ${colors.purple} 100%)`
    }
  }

  const getImgWidth = () => {
    return classNames({
      [styles.controls]: imgWidth === 'controls',
    })
  }

  const nodeRef = useRef(null)

  return (
    <div onClick={onClick} className={classNames(styles.root, className, {[styles.cursor]: loader})}>
      <div className={styles.gradient} style={{ background: getColor(color) }}>
      </div>
      {!loader ?
        <>
          <>{children}</>
          <CSSTransition
            timeout={2000}
            in={active}
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
            <Image className=
              {classNames(styles.img, getImgWidth())} src={img} alt='' fill ref={nodeRef} />
          </CSSTransition></> : null}
    </div >
  )
}
