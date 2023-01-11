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

  const getColor = (color: 'blue' | 'green' | 'gray', last?: boolean, number?: boolean, bottom?: boolean) => {
    switch (color) {
      case 'blue':
        return `linear-gradient(90deg, rgba(255, 255, 255, 0) 17.71%, rgba(255, 255, 255, 0.4) 100%)`
      case 'green':
        return `linear-gradient(90deg, rgba(255, 255, 255, 0) 17.71%, rgba(255, 255, 255, 0.4) 100%)`
      case 'gray':
        if(last){
          return `linear-gradient(90deg, rgba(255, 255, 255, 0) 17.71%, rgba(255, 255, 255, 0.4) 100%`
        }
        else if(number){
          return `linear-gradient(90deg, rgba(140,140,140,1) 0%, rgba(87,87,87,1) 83%, rgba(83,83,83,1) 100%)`
        }
        else if(bottom){
          return `linear-gradient(90deg, rgba(50,50,50,1) 0%, rgba(27,27,27,1) 30%, rgba(0,0,0,1) 100%)`
        }
        else{
          return `linear-gradient(90deg, rgba(81,81,81,1) 0%, rgba(97,97,97,1) 35%, rgba(134,134,134,1) 100%)`
        }
    }
  }

  const [isDemonstrate, SetIsDemonstrate] = useState<boolean>(false)

  return (
    <div className={styles.root}>
      <div className={styles.top}>
        <div className={styles.number} style={isDemonstrate ? {background: getColor(color, false, true)} : {}}>
          {number}
        </div>
        <div className={classNames(styles.demonstrate, {[styles.active]: isDemonstrate})} style={isDemonstrate ? {background: getColor(color)} : {}} onClick={() => SetIsDemonstrate(true)}>
          <ScreenDemonstrateSvg/>
        </div>
        <div className={classNames(styles.noDemonstrate, {[styles.active]: !isDemonstrate})} style={!isDemonstrate ? {background: getColor(color, true)} : {}} onClick={() => SetIsDemonstrate(false)}>
          <NoScreenDemonstrateSvg/>
        </div>
      </div>
      <div className={styles.bottom} style={isDemonstrate ? {background: getColor(color, false, false, true)} : {}}>

      </div>
    </div>
  )
}
