import {
  deleteColumn,
  getColumnProperty,
  getColumnPropertyList,
  updateColumnProperty
} from '../lib/layout';

import styles from './styles.module.css'

function ColumnProperties({
  currentColumnId,
  currentPageIndex,
  currentRowId,
  doc,
  setCurrentColumnId,
  setDoc,
}) {
  return (
    <ul className={styles['NewDocumentRightSection']}>
      <li className={styles['NewDocumentRightSection__Header']}>
        <h3>Column</h3>

        <button
          onClick={() => {
            setDoc(deleteColumn(doc, currentPageIndex, currentRowId, currentColumnId));
            setCurrentColumnId(null);
          }}
          className={styles['NewDocumentRightSection__Delete_Button']}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M4 7h16M10 11v6M14 11v6M6 7l1 12a2 2 0 002 2h6a2 2 0 002-2l1-12M9 7V5a2 2 0 012-2h2a2 2 0 012 2v2"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </li>

      {
        Object.keys(getColumnPropertyList(doc, currentPageIndex, currentRowId, currentColumnId))
          .filter((property) => getColumnProperty(doc, currentPageIndex, currentRowId, currentColumnId, property).name)
          .map((property) => (
            <li key={getColumnProperty(doc, currentPageIndex, currentRowId, currentColumnId, property).id}>
              <div className={styles['NewDocumentRightSection__Three_Column']}>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="4" y1="12" x2="20" y2="12"/>
                  <polyline points="8 8 4 12 8 16"/>
                  <polyline points="16 8 20 12 16 16"/>
                </svg>

                <h4>
                  {getColumnProperty(doc, currentPageIndex, currentRowId, currentColumnId, property).name}
                </h4>

                <input
                  type={getColumnProperty(doc, currentPageIndex, currentRowId, currentColumnId, property).dataType}
                  value={getColumnProperty(doc, currentPageIndex, currentRowId, currentColumnId, property).value}
                  onChange={
                    (e) => setDoc(updateColumnProperty(
                      doc,
                      currentPageIndex,
                      currentRowId,
                      currentColumnId,
                      property,
                      { value: e.target.value }
                    ))}
                />
              </div>
            </li>
        ))
      }
    </ul>
  )
}

export default ColumnProperties
