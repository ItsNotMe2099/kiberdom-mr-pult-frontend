import Help from './Help'
import styles from './index.module.scss'

interface Props {

}

export default function Right({ }: Props) {

  return (
    <div className={styles.root}>
      <Help/>
    </div>
  )
}
