import { Link, useLocation } from 'react-router-dom';
import styles from './styles.module.css';

function Header() {
  const {
    pathname,
  } = useLocation();

  return (
    <header className={styles['Header']}>
      <div className={styles['Header__Top']}>
        <div className={styles['Header__Logo']}>
          <h2>designer</h2>
        </div>
      </div>

      <nav>
        <ul>
          <li>
            <Link to="/design" className={pathname.indexOf('/design') > -1 ? styles['Header__Active_Link'] : ''}>
              New
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
