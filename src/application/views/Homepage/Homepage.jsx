import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header';
import styles from './styles.module.css';

function Homepage() {
  return (
    <div className={styles['Homepage']}>
      <Header />

      <main>
        <section className={styles['Homepage__Hero']}>
          <img src="/logo.png" />
          <h1>designer</h1>
          <p>by systemsa</p>

          {/* <input
            placeholder="What do you want to design today?"
          /> */}
        </section>

        <section className={styles['Homepage__Design_Options']}>
          <ul>
            <li>
              <Link to="/design">
                <div className={styles['Homepage__Design_Options_White']} />
                <h2>Empty design</h2>
                <p>Create a new design from scratch</p>
              </Link>
            </li>
          </ul>
        </section>
      </main>
    </div>
  )
}

export default Homepage
