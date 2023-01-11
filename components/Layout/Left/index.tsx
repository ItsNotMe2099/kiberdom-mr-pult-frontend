import styles from './index.module.scss'
import ScreenControls from './ScreenControls'

interface Props {
  
}

export default function Left({}: Props) {

  return (
    <div className={styles.root}>
      <div className={styles.title}>
        ЭКРАНЫ
      </div>
      <ScreenControls color='gray' number={1}/>
    </div>
  )
}
