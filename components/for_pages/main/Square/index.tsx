import Image from 'next/image'
import styles from './index.module.scss'
import classNames from 'classnames'
import { CSSTransition } from 'react-transition-group'
import { useRef } from 'react'

interface Props {
  degree: number
  color: 'blue' | 'green' | 'purple'
  loading?: boolean
  img: string
  children?: React.ReactNode
  className?: string
  onClick?: () => void
  imgWidth?: 'controls'
}

export default function Square({ degree, color, loading, img, imgWidth, children, className, onClick }: Props) {

  const getColor = (color: 'blue' | 'green' | 'purple', degree: number) => {
    switch (color) {
      case 'blue':
        return `linear-gradient(${degree}deg, #073CA7 20%, #020C24 30%, #000 45%)`
      case 'green':
        return `linear-gradient(${degree}deg, #016E7A 20%, #00191C 30%, #000 45%)`
      case 'purple':
        return `linear-gradient(${degree}deg, #6300B8 20%, #140026 30%, #000 45%)`
    }
  }

  const getImgWidth = () => {
    return classNames({
      [styles.controls]: imgWidth === 'controls',
    })
  }

  const nodeRef = useRef(null)

  return (
    <div onClick={onClick} className={classNames(styles.root, className)}>
      <div className={styles.gradient} style={{ background: getColor(color, degree) }}>
      </div>
      <>{children}</>
      <CSSTransition
        timeout={2000}
        in={!loading}
        nodeRef={nodeRef}
        mountOnEnter
        classNames={{
          enter: styles.itemEnter,
          enterActive: styles.itemEnterActive,
        }}
      >
        <Image className=
          {classNames(styles.img, getImgWidth())} src={img} alt='' fill ref={nodeRef} />
      </CSSTransition>
    </div >
  )
}
