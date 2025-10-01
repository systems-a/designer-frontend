import { Outlet } from 'react-router-dom';
import Header from '../../components/Header/Header';
import styles from './styles.module.css';

function Homepage() {
  return (
    <div className={styles['Homepage']}>
      <Header />

      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default Homepage
