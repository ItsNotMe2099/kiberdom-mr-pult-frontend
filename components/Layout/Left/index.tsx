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
      <ScreenControls color='gray' number={2}/>
      <ScreenControls color='gray' number={3}/>
      <ScreenControls color='gray' number={4}/>
    </div>
  )
}
