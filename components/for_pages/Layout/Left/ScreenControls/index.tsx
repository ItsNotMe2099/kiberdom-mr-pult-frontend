import styles from './index.module.scss'
import classNames from 'classnames'
import ScreenDemonstrateSvg from 'components/svg/ScreenDemonstrateSvg'
import NoScreenDemonstrateSvg from 'components/svg/NoScreenDemonstrateSvg'
import { ReactElement, useState } from 'react'

interface IOption {
  img: ReactElement<SVGElement>
  label: string
}

interface Props {
  color: 'blue' | 'green' | 'gray'
  options?: IOption[]
  number: number
}

export default function ScreenControls({ color, options, number }: Props) {

  const getColor = (color: 'blue' | 'green' | 'gray', last?: boolean, number?: boolean, bottom?: boolean, option?: boolean) => {
    switch (color) {
      case 'blue':
        if (last) {
          return 'linear-gradient(90deg, rgba(255, 255, 255, 0) 17.71%, rgba(255, 255, 255, 0.4) 100%)'
        }
        else if (number) {
          return 'linear-gradient(90deg, rgba(10,80,222,1) 0%, rgba(8,67,186,1) 30%, rgba(4,33,93,1) 100%)'
        }
        else if (bottom) {
          return 'linear-gradient(90deg, rgba(5,38,107,1) 0%, rgba(1,7,20,1) 40%, rgba(0,0,0,1) 100%)'
        }
        else if (option) {
          return 'linear-gradient(90deg, rgba(162,171,190,1) 0%, rgba(97,111,138,1) 20%, rgba(0,0,0,1) 100%)'
        }
        else {
          return 'linear-gradient(90deg, rgba(4,33,93,1) 0%, rgba(130,138,155,1) 80%, rgba(86,93,108,1) 100%)'
        }
      case 'green':
        if (last) {
          return 'linear-gradient(90deg, rgba(255, 255, 255, 0) 17.71%, rgba(255, 255, 255, 0.4) 100%'
        }
        else if (number) {
          return 'linear-gradient(90deg, rgba(1,113,125,1) 0%, rgba(86,155,162,1) 50%, rgba(1,77,85,1) 100%)'
        }
        else if (bottom) {
          return 'linear-gradient(90deg, rgba(0,76,84,1) 0%, rgba(0,1,1,1) 55%, rgba(0,0,0,1) 100%)'
        }
        else if (option) {
          return 'linear-gradient(90deg, rgba(145,173,175,1) 0%, rgba(111,125,127,1) 50%, rgba(2,2,2,1) 100%)'
        }
        else {
          return 'linear-gradient(90deg, rgba(0,68,75,1) 0%, rgba(124,142,145,1) 55%, rgba(86,99,101,1) 100%)'
        }
      case 'gray':
        if (last) {
          return 'linear-gradient(90deg, rgba(255, 255, 255, 0) 17.71%, rgba(255, 255, 255, 0.4) 100%'
        }
        else if (number) {
          return 'linear-gradient(90deg, rgba(140,140,140,1) 0%, rgba(87,87,87,1) 83%, rgba(83,83,83,1) 100%)'
        }
        else if (bottom) {
          return 'linear-gradient(180deg, rgba(50,50,50,1) 0%, rgba(27,27,27,1) 30%, rgba(0,0,0,1) 100%)'
        }
        else if (option) {
          return 'linear-gradient(90deg, rgba(185,185,185,1) 0%, rgba(185,185,185,1) 50%, rgba(40,40,40,1) 100%)'
        }
        else {
          return 'linear-gradient(90deg, rgba(81,81,81,1) 0%, rgba(97,97,97,1) 35%, rgba(134,134,134,1) 100%)'
        }
    }
  }

  const [isDemonstrate, SetIsDemonstrate] = useState<boolean>(false)

  return (
    <div className={styles.root}>
      <div className={styles.top}>
        <div className={styles.number} style={isDemonstrate ? { background: getColor(color, false, true) } : {}}>
          {number}
        </div>
        <div className={classNames(styles.demonstrate, { [styles.active]: isDemonstrate })} style={isDemonstrate ? { background: getColor(color) } : {}} onClick={() => SetIsDemonstrate(true)}>
          <ScreenDemonstrateSvg />
        </div>
        <div className={classNames(styles.noDemonstrate, { [styles.active]: !isDemonstrate })} style={!isDemonstrate ? { background: getColor(color, true) } : {}} onClick={() => SetIsDemonstrate(false)}>
          <NoScreenDemonstrateSvg />
        </div>
      </div>
      <div className={styles.bottom} style={isDemonstrate ? { background: getColor(color, false, false, true) } : {}}>
        {options?.map((i, index) =>
          <div
            className={classNames(styles.option, { [styles.active]: isDemonstrate && index !== options.length - 1 })}
            style={isDemonstrate && index === 0 ? { background: getColor(color, false, false, false, true) } : {}} key={i.label}>
            {i.img}
            <div className={styles.text}>{i.label}</div>
          </div>
        )}
      </div>
    </div>
  )
}
