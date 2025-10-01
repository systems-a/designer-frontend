import { Link } from 'react-router-dom';
import styles from './styles.module.css';

function Header() {
  return (
    <header className={styles['Header']}>
      <Link to="/" className={styles['Header__Logo']}>
        <h2>designer</h2>
        <p>by systemsa</p>
      </Link>
    </header>
  )
}

export default Header
