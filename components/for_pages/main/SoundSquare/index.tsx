import Image from 'next/image'
import styles from './index.module.scss'
import classNames from 'classnames'
import { useRef } from 'react'
import { Transition } from 'react-transition-group'

interface Props {
  img: string
  children?: React.ReactNode
  className?: string
  onClick?: () => void
  isOn?: boolean
}

export default function SoundSquare({ img, children, className, onClick, isOn }: Props) {

  const nodeRef = useRef(null)

  console.log('isON', isOn)

  return (
    <Transition nodeRef={nodeRef} in={isOn} timeout={1000}>
      {status =>
      <div ref={nodeRef} onClick={onClick} className={classNames(styles.root, className)}>
        <div className={styles.label}>
          фоновая
          музыка
        </div>
        <Image className=
          {styles.img} src={img} alt='' fill />
      </div>}
    </Transition>
  )
}
