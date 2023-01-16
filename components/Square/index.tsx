import Image from 'next/image'
import styles from './index.module.scss'
import classNames from 'classnames'
import { useState } from 'react'

interface Props {
  degree: number
  color: 'blue' | 'green' | 'purple'
  loading?: boolean
  img: string
  controls?: boolean
  children?: React.ReactNode
  className?: string
  active?: boolean
  onClick?: () => void
}

export default function Square({ degree, color, loading, img, controls, children, className, active, onClick }: Props) {

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

  const [isActive, setIsActive] = useState<boolean>(false)

  return (
    <div onClick={onClick} className={classNames(styles.root, className, {[styles.active]: (active || isActive)})}>
      {(active || isActive) ? <div className={styles.gradient} style={{ background: getColor(color, degree) }}>
      </div> : null}
      {!loading ?
        <>{children}</>
        : null}
      {!loading ? <Image className={classNames(styles.img, { [styles.controls]: controls })} src={img} alt='' fill /> : null}
    </div>
  )
}

Square.defaultProps = {
  active: true,
}
