import styles from './styles.module.css'

function Loader({
  color,
  size,
}) {
  return (
    <div
      className={styles['Loader']}
      style={{
        borderColor: color ? '#fff' : '',
        borderBottomColor: 'transparent',
        fontSize: size,
      }}
    />
  )
}

export default Loader
