import { Link, useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import styles from './styles.module.css';

import {
  getDesign,
  indexDesigns,
  initializeEmptyDesign,
} from '../../services/storage/design';

function Homepage() {
  const designs = indexDesigns();
  const navigate = useNavigate();

  return (
    <div className={styles['Homepage']}>
      <Header />

      <main>
        <section className={styles['Homepage__Left']}>
          <h2>All designs</h2>
          <ul>
            {designs?.map((designId) => {
              const design = getDesign(designId)
              const currentDesignHistoryEntry = design.history[design.currentHistoryEntryIndex];

              return (
                <li key={designId}>
                  <Link to={`design/${designId}/pages/${currentDesignHistoryEntry.currentPageId}`}>
                    {currentDesignHistoryEntry.title}
                  </Link>
                </li>
              )
            })}
          </ul>
        </section>

        <section className={styles['Homepage__Right']}>
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
                <button onClick={() => navigate(`/design/${initializeEmptyDesign().url}`)}>
                  <div className={styles['Homepage__Design_Options_White']} />
                  <h2>Empty design</h2>
                  <p>Create a new design from scratch</p>
                </button>
              </li>
            </ul>
          </section>

        </section>
      </main>
    </div>
  )
}

export default Homepage
