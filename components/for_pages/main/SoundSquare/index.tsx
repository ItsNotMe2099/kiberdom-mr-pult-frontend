import Image from 'next/image'
import styles from './index.module.scss'
import classNames from 'classnames'
import { useRef } from 'react'
import Gradient from 'components/for_pages/common/gradient'
import { colors } from 'styles/variables'

interface Props {
  img: string
  className?: string
  onClick?: () => void
  isOn: boolean
}

export default function SoundSquare({ img, className, onClick, isOn }: Props) {

  return (
    <div onClick={onClick} className={classNames(styles.root, className)}>
      <Gradient
        isActive={isOn}
        timeout={500}
        enterClass={styles.itemEnter}
        enterActiveClass={styles.itemEnterActive}
        exitClass={styles.itemExit}
        exitActiveClass={styles.itemExitActive}
        style={`linear-gradient(316.27deg, rgba(130, 0, 241, 0) 39.75%, rgba(130, 0, 241, 0.3) 67.43%, ${colors.purple} 100%)`} />
      <div className={styles.label}>
        фоновая
        музыка
      </div>
      <Image className=
        {styles.img} src={img} alt='' fill />
    </div>
  )
}
