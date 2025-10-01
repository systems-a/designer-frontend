import {
  getComponent,
} from '../lib/components';

import {
  addColumn,
  addRow
} from '../lib/layout';

import {
  addPage,
  deletePage,
  updatePage
} from '../lib/pages'

import styles from './styles.module.css'

function DesignLeftSection({
  currentColumnId,
  currentColumnParentId,
  currentPageIndex,
  currentRowId,
  doc,
  documentPageRef,
  setCurrentColumnId,
  setCurrentColumnParentId,
  setCurrentComponentId,
  setCurrentPageIndex,
  setCurrentRowId,
  setDoc,
  updateDoc,
}) {
  const currentPage = doc.pages[currentPageIndex];

  return (
    <ul className={styles['NewDocumentLeftSection__Controls']}>
      <li>
        <input
          className={styles['NewDocumentLeftSection__Controls_Title']}
          value={doc.title}
          placeholder="Enter document title"
          onChange={(e) => updateDoc('title', e.target.value)}
        />
      </li>

      <li>
        <button
          className={styles['NewDocumentLeftSection__Controls_Button']}
          onClick={() => setDoc(addPage(doc))}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>

          New page
        </button>
      </li>

      <li>
        <h3>Pages</h3>
      </li>

      <li className={styles['NewDocumentLeftSection__Controls_Pages']}>
        <ul>
          {
            doc.pages.map((page, index) => (
              <li
                className={currentPageIndex == index ? styles['NewDocumentLeftSection__Controls_Pages_Current_Page'] : ''}
                key={page.id}
              >
                <button
                  onClick={() => {
                    setCurrentRowId(null);
                    setCurrentColumnId(null);
                    setCurrentColumnParentId(null);
                    setCurrentComponentId(null);
                    setCurrentPageIndex(index)
                  }}
                >
                  Page {index + 1}
                </button>

                {
                  doc.pages.length > 1 && (
                    <button
                      onClick={() => {
                        setCurrentPageIndex(currentPageIndex - 1 < 0 ? 0 : currentPageIndex - 1);
                        setDoc(deletePage(doc, index))
                      }}
                      className={styles['NewDocumentLeftSection__Controls_Pages_Delete_Button']}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="M4 7h16M10 11v6M14 11v6M6 7l1 12a2 2 0 002 2h6a2 2 0 002-2l1-12M9 7V5a2 2 0 012-2h2a2 2 0 012 2v2"
                              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  )
                }
              </li>
            ))
          }
        </ul>
      </li>

      <li>
        <h3>Auto layout</h3>
      </li>

      <ul className={styles['NewDocumentLeftSection__Controls_Pages_Current_Page_Properties']}>
        <li>
          <div className={styles['NewDocumentLeftSection__Controls_Pages_Current_Page_Properties_Three_Column']}>
            <input type="checkbox" checked={currentPage?.autoLayout} onChange={(e) => setDoc(updatePage(doc, currentPageIndex, 'autoLayout', e.target.checked))} />
            Enable
          </div>
        </li>

        {
          currentPage?.autoLayout && (
            <>
              <li>
                <button
                  className={styles['NewDocumentLeftSection__Controls_Pages_Current_Page_Properties_Button']}
                  onClick={() => setDoc(addRow(doc, currentPageIndex, currentRowId))}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="16" rx="3" ry="3"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                    <line x1="16.5" y1="13.5" x2="16.5" y2="17.5"/>
                    <line x1="14.5" y1="15.5" x2="18.5" y2="15.5"/>
                  </svg>

                  New row
                </button>

                <div />
              </li>

              {
                (currentRowId || currentColumnParentId) && (
                  <li>
                    <button
                      className={styles['NewDocumentLeftSection__Controls_Pages_Current_Page_Properties_Button']}
                      onClick={() => setDoc(addColumn(doc, currentPageIndex, currentColumnParentId || currentRowId))}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect stroke="currentColor" x="3" y="4" width="18" height="16" rx="3" ry="3"/>
                        <line x1="12" y1="4" x2="12" y2="20"/>
                        <line x1="16.5" y1="7.5" x2="16.5" y2="11.5"/>
                        <line x1="14.5" y1="9.5" x2="18.5" y2="9.5"/>
                      </svg>

                      New column
                    </button>
                  </li>
                )
              }
            </>
          )
        }
      </ul>

      <li>
        <h3>Page properties</h3>
      </li>

      <ul className={styles['NewDocumentLeftSection__Controls_Pages_Current_Page_Properties']}>
        <li>
          <div className={styles['NewDocumentLeftSection__Controls_Pages_Current_Page_Properties_Three_Column']}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="4" y1="12" x2="20" y2="12"/>
              <polyline points="8 8 4 12 8 16"/>
              <polyline points="16 8 20 12 16 16"/>
            </svg>

            <h4>
              Width
            </h4>

            <input
              type="number"
              value={currentPage?.width}
              onChange={(e) => setDoc(updatePage(doc, currentPageIndex, 'width', e.target.value))}
              disabled={currentPage?.autoLayout}
            />
          </div>
        </li>

        <li>
          <div className={styles['NewDocumentLeftSection__Controls_Pages_Current_Page_Properties_Three_Column']}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="4" x2="12" y2="20"/>
              <polyline points="8 8 12 4 16 8"/>
              <polyline points="8 16 12 20 16 16"/>
            </svg>

            <h4>
              Height
            </h4>

            <input
              type="number"
              value={currentPage?.height}
              onChange={(e) => setDoc(updatePage(doc, currentPageIndex, 'height', e.target.value))}
              disabled={currentPage?.autoLayout}
            />
          </div>
        </li>

        {
          !currentPage?.autoLayout && (
            <li>
              <div className={styles['NewDocumentLeftSection__Controls_Pages_Current_Page_Properties_Single_Column']}>
                <select onChange={(e) => {
                  setDoc(
                    getComponent(doc, currentPageIndex, e.target.value, currentRowId, currentColumnId, currentColumnParentId)
                  )
                }} value='select'>
                  <option value='select'>Add component</option>
                  <option value="line">Line</option>
                  <option value="circle">Circle</option>
                  <option value="rectangle">Rectangle</option>
                  <option value="text">Text</option>
                  <option value="image">Image</option>
                </select>
              </div>
            </li>
          )
        }

        {
          (currentPage?.autoLayout && (currentColumnId || currentRowId)) && (
            <li>
              <div className={styles['NewDocumentLeftSection__Controls_Pages_Current_Page_Properties_Single_Column']}>
                <select onChange={(e) => {
                  setDoc(
                    getComponent(doc, currentPageIndex, e.target.value, currentRowId, currentColumnId, currentColumnParentId)
                  )
                }} value='select'>
                  <option value='select'>Add component</option>
                  <option value="line">Line</option>
                  <option value="circle">Circle</option>
                  <option value="rectangle">Rectangle</option>
                  <option value="text">Text</option>
                  <option value="image">Image</option>
                </select>
              </div>
            </li>
          )
        }



        <li>
          <button
            className={styles['NewDocumentLeftSection__Controls_Pages_Current_Page_Properties_Button']}
            onClick={() => {
              documentPageRef.current.requestFullscreen()
            }}
          >
            <div />
            Toggle fullscreen
          </button>

          <div />
        </li>
      </ul>
    </ul>
  )
}

export default DesignLeftSection;
