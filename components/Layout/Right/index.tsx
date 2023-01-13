import Help from './Help'
import styles from './index.module.scss'
import Sound from './Sound'

interface Props {

}

export default function Right({ }: Props) {

  return (
    <div className={styles.root}>
      <Sound/>
      <Help/>
    </div>
  )
}
