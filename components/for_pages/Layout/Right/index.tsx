import { useAppContext } from 'context/state'
import Climate from './Climate'
import Help from './Help'
import styles from './index.module.scss'
import Light from './Light'
import Sound from './Sound'
import classNames from 'classnames'

interface Props {

}

export default function Right({ }: Props) {

  const appContext = useAppContext()

  const getRootClass = () => {
    return classNames(
      {
        [styles.start]: appContext.isSoundActive || appContext.isClimateActive
      }
    )
  }

  return (
    <div className={classNames(styles.root, getRootClass())}>
      <Sound/>
      <Light/>
      <Climate/>
      <Help/>
    </div>
  )
}
