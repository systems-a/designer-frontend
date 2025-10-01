import {
  deleteComponent,
  getComponentProperty,
  getComponentPropertyList,
  updateComponentProperty
} from "../lib/components";

import styles from './styles.module.css'

function ComponentProperties({
  currentComponentId,
  currentColumnId,
  currentPageIndex,
  currentRowId,
  doc,
  setCurrentComponentId,
  setDoc,
}) {
  return (
    <ul className={styles['NewDocumentRightSection']}>
      <li className={styles['NewDocumentRightSection__Header']}>
        <input
          className={styles['NewDocumentRightSection__Name']}
          value={getComponentProperty(doc, currentPageIndex, currentRowId, currentColumnId, currentComponentId, 'name').value}
          placeholder="Enter component name"
          onChange={(e) =>
            setDoc(updateComponentProperty(
              doc,
              currentPageIndex,
              currentRowId,
              currentColumnId,
              currentComponentId,
              'name',
              { value: e.target.value }
            )
          )}
        />

        <button
          onClick={() => {
            setDoc(deleteComponent(doc, currentPageIndex, currentRowId, currentColumnId, currentComponentId))
            setCurrentComponentId(null);
          }}
          className={styles['NewDocumentRightSection__Delete_Button']}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M4 7h16M10 11v6M14 11v6M6 7l1 12a2 2 0 002 2h6a2 2 0 002-2l1-12M9 7V5a2 2 0 012-2h2a2 2 0 012 2v2"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </li>

      <li>
        <h3>Properties</h3>
      </li>

      <ul>
        {
          Object.keys(getComponentPropertyList(doc, currentPageIndex, currentRowId, currentColumnId, currentComponentId))
            .filter((property) => getComponentProperty(doc, currentPageIndex, currentRowId, currentColumnId, currentComponentId, property).name)
            .map((property) => (
              <li key={getComponentProperty(doc, currentPageIndex, currentRowId, currentColumnId, currentComponentId, property).id}>
                <div className={styles['NewDocumentRightSection__Three_Column']}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="4" y1="12" x2="20" y2="12"/>
                    <polyline points="8 8 4 12 8 16"/>
                    <polyline points="16 8 20 12 16 16"/>
                  </svg>

                  <h4>
                    {getComponentProperty(doc, currentPageIndex, currentRowId, currentColumnId, currentComponentId, property).name}
                  </h4>

                  <input
                    type={getComponentProperty(doc, currentPageIndex, currentRowId, currentColumnId, currentComponentId, property).dataType}
                    value={getComponentProperty(doc, currentPageIndex, currentRowId, currentColumnId, currentComponentId, property).value}
                    onChange={
                      (e) => setDoc(updateComponentProperty(
                        doc,
                        currentPageIndex,
                        currentRowId,
                        currentColumnId,
                        currentComponentId,
                        property,
                        { value: e.target.value }
                      ))}
                  />
                </div>
              </li>
          ))
        }
      </ul>
    </ul>
  )
}

export default ComponentProperties
