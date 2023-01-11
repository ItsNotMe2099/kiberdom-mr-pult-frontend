import styles from './index.module.scss'
import classNames from 'classnames'
import ScreenDemonstrateSvg from 'components/svg/ScreenDemonstrateSvg'
import NoScreenDemonstrateSvg from 'components/svg/NoScreenDemonstrateSvg'
import { useState } from 'react'

interface IOption {
  img: string
  label: string
}

interface Props {
  color: 'blue' | 'green' | 'gray'
  options?: IOption[]
  number: number
}

export default function ScreenControls({color, options, number}: Props) {

  const getColor = (color: 'blue' | 'green' | 'gray') => {
    switch (color) {
      case 'blue':
        return `linear-gradient(90deg, rgba(255, 255, 255, 0) 17.71%, rgba(255, 255, 255, 0.4) 100%)`
      case 'green':
        return `linear-gradient(90deg, rgba(255, 255, 255, 0) 17.71%, rgba(255, 255, 255, 0.4) 100%)`
      case 'gray':
        return `linear-gradient(90deg, rgba(255, 255, 255, 0) 17.71%, rgba(255, 255, 255, 0.4) 100%)`
    }
  }

  const [isDemonstrate, SetIsDemonstrate] = useState<boolean>(false)

  return (
    <div className={styles.root}>
      <div className={styles.top}>
        <div className={styles.number} style={isDemonstrate ? {background: getColor(color)} : {}}>
          {number}
        </div>
        <div className={styles.demonstrate} style={isDemonstrate ? {background: getColor(color)} : {}} onClick={() => SetIsDemonstrate(true)}>
          <ScreenDemonstrateSvg/>
        </div>
        <div className={styles.noDemonstrate} style={!isDemonstrate ? {background: getColor(color)} : {}} onClick={() => SetIsDemonstrate(false)}>
          <NoScreenDemonstrateSvg/>
        </div>
      </div>
    </div>
  )
}
