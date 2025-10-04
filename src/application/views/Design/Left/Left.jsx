import { Link } from 'react-router-dom';

import {
  getComponent,
} from '../../../lib/components';

import {
  addColumn,
  addRow
} from '../../../lib/layout';

import {
  addDesignHistoryEntry,
  getDesign,
} from '../../../services/storage/design';

import {
  addPageHistoryEntry,
  deletePage,
} from '../../../services/storage/page';

import styles from './styles.module.css'
import { createNewPage, getPage } from '../../../services/storage/page';

function DesignLeftSection({
  activeDesign,
  activePage,
  currentColumnId,
  currentColumnParentId,
  currentComponentId,
  currentRowId,
  design,
  page,
  setCurrentColumnId,
  setCurrentColumnParentId,
  setCurrentComponentId,
  setCurrentRowId,
  setActiveDesign,
  setDesign,
  setPage,
}) {
  return (
    <ul className={styles['NewDocumentLeftSection__Controls']}>
      <li>
        <input
          className={styles['NewDocumentLeftSection__Controls_Title']}
          defaultValue={activeDesign.title}
          placeholder="Untitled design"
          onBlur={(e) => {
            const updatedDesign = addDesignHistoryEntry(design.id, { title: e.target.value })
            setDesign(updatedDesign);
          }}
        />
      </li>

      <li>
        <button
          className={styles['NewDocumentLeftSection__Controls_Button']}
          onClick={() => {
            const newPageId = createNewPage(design.id);

            const updatedDesign = getDesign(design.id);
            const newPage = getPage(design.id, newPageId);

            setDesign(updatedDesign);
            setActiveDesign(updatedDesign.history[updatedDesign.currentHistoryEntryIndex]);

            setPage(newPage);
          }}
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
            activeDesign.pages.map((p) => (
              <li
                className={p.id == page.id ? styles['NewDocumentLeftSection__Controls_Pages_Current_Page'] : ''}
                key={p.id}
              >
                <Link to={`/design/${design.id}/pages/${p.id}`}>
                  {p.title}
                </Link>

                {
                  activeDesign.pages.length > 1 && (
                    <button
                      onClick={() => {
                        setCurrentComponentId(null);
                        setCurrentColumnId(null);
                        setCurrentColumnParentId(null);
                        setCurrentRowId(null);

                        const data = deletePage(design.id, p.id);

                        setDesign(data.updatedDesign);
                        setActiveDesign(data.updatedDesign.history[data.updatedDesign.currentHistoryEntryIndex]);

                        const updatedPage = getPage(design.id, data.updatedCurrentPageId);

                        setPage(updatedPage);
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
        <h3>Auto Layout</h3>
      </li>

      <ul className={styles['NewDocumentLeftSection__Controls_Pages_Current_Page_Properties']}>
        <li>
          <div className={styles['NewDocumentLeftSection__Controls_Pages_Current_Page_Properties_Three_Column']}>
            <input
              type="checkbox"
              checked={activePage?.autoLayout}
              onChange={(e) => {
                const updatedPage = addPageHistoryEntry(
                  design.id,
                  page.id,
                  {
                    autoLayout: e.target.checked,
                    currentComponentId: null,
                    currentColumnId: null,
                    currentColumnParentId: null,
                    currentRowId: null,
                  }
                )

                setPage(updatedPage);
              }}
            />
            Enable
          </div>
        </li>

        {
          activePage?.autoLayout && (
            <>
              <li>
                <div className={styles['NewDocumentLeftSection__Controls_Pages_Current_Page_Properties_Three_Column']}>
                  <input
                    type="checkbox"
                    checked={activePage?.gridVisible}
                    onChange={(e) => {
                      const updatedPage = addPageHistoryEntry(design.id, page.id, {
                        gridVisible: e.target.checked,
                        currentComponentId,
                        currentColumnId,
                        currentColumnParentId,
                        currentRowId,
                      })

                      setPage(updatedPage);
                    }}
                  />
                  Show grid
                </div>
              </li>
              <li>
                <div className={styles['NewDocumentLeftSection__Controls_Pages_Current_Page_Properties_Three_Column']}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="4" y1="12" x2="20" y2="12"/>
                    <polyline points="8 8 4 12 8 16"/>
                    <polyline points="16 8 20 12 16 16"/>
                  </svg>

                  <h4>
                    Gap
                  </h4>

                  <input
                    type="number"
                    value={activePage?.gap}
                    onChange={(e) => {
                      if (e.target.value.trim() == '') e.target.value = 0;
                      const updatedPage = addPageHistoryEntry(design.id, page.id, {
                        gap: parseInt(e.target.value),
                        currentComponentId,
                        currentColumnId,
                        currentColumnParentId,
                        currentRowId,
                      })

                      setPage(updatedPage);
                    }}
                  />
                </div>
              </li>

              <li>
                <button
                  className={styles['NewDocumentLeftSection__Controls_Pages_Current_Page_Properties_Button']}
                  onClick={() => {
                    const updatedPage = addPageHistoryEntry(design.id, page.id, {
                      rows: addRow(activePage, currentRowId),
                      currentComponentId,
                      currentColumnId,
                      currentColumnParentId,
                      currentRowId,
                    })

                    setPage(updatedPage);
                  }}
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
                      onClick={() => {
                        const updatedPage = addPageHistoryEntry(design.id, page.id, {
                          columns: addColumn(activePage, currentRowId).columns,
                          rows: addColumn(activePage, currentRowId).rows,
                          currentComponentId,
                          currentColumnId,
                          currentColumnParentId,
                          currentRowId,
                        })

                        setPage(updatedPage);
                      }}
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

              <li>
                <h3>Padding</h3>
              </li>

              <li>
                <div className={styles['NewDocumentLeftSection__Controls_Pages_Current_Page_Properties_Three_Column']}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="4" y1="12" x2="20" y2="12"/>
                    <polyline points="8 8 4 12 8 16"/>
                    <polyline points="16 8 20 12 16 16"/>
                  </svg>

                  <h4>
                    Top
                  </h4>

                  <input
                    type="number"
                    value={activePage?.paddingTop}
                    onChange={(e) => {
                      if (e.target.value.trim() == '') e.target.value = 0;
                      const updatedPage = addPageHistoryEntry(design.id, page.id, {
                        paddingTop: parseInt(e.target.value),
                        currentComponentId,
                        currentColumnId,
                        currentColumnParentId,
                        currentRowId,
                      })

                      setPage(updatedPage);
                    }}
                  />
                </div>
              </li>

              <li>
                <div className={styles['NewDocumentLeftSection__Controls_Pages_Current_Page_Properties_Three_Column']}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="4" y1="12" x2="20" y2="12"/>
                    <polyline points="8 8 4 12 8 16"/>
                    <polyline points="16 8 20 12 16 16"/>
                  </svg>

                  <h4>
                    Right
                  </h4>

                  <input
                    type="number"
                    value={activePage?.paddingRight}
                    onChange={(e) => {
                      if (e.target.value.trim() == '') e.target.value = 0;
                      const updatedPage = addPageHistoryEntry(design.id, page.id, {
                        paddingRight: parseInt(e.target.value),
                        currentComponentId,
                        currentColumnId,
                        currentColumnParentId,
                        currentRowId,
                      })

                      setPage(updatedPage);
                    }}
                  />
                </div>
              </li>

              <li>
                <div className={styles['NewDocumentLeftSection__Controls_Pages_Current_Page_Properties_Three_Column']}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="4" y1="12" x2="20" y2="12"/>
                    <polyline points="8 8 4 12 8 16"/>
                    <polyline points="16 8 20 12 16 16"/>
                  </svg>

                  <h4>
                    Left
                  </h4>

                  <input
                    type="number"
                    value={activePage?.paddingLeft}
                    onChange={(e) => {
                      if (e.target.value.trim() == '') e.target.value = 0;
                      const updatedPage = addPageHistoryEntry(design.id, page.id, {
                        paddingLeft: parseInt(e.target.value),
                        currentComponentId,
                        currentColumnId,
                        currentColumnParentId,
                        currentRowId,
                      })

                      setPage(updatedPage);
                    }}
                  />
                </div>
              </li>

              <li>
                <div className={styles['NewDocumentLeftSection__Controls_Pages_Current_Page_Properties_Three_Column']}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="4" y1="12" x2="20" y2="12"/>
                    <polyline points="8 8 4 12 8 16"/>
                    <polyline points="16 8 20 12 16 16"/>
                  </svg>

                  <h4>
                    Bottom
                  </h4>

                  <input
                    type="number"
                    value={activePage?.paddingBottom}
                    onChange={(e) => {
                      if (e.target.value.trim() == '') e.target.value = 0;
                      const updatedPage = addPageHistoryEntry(design.id, page.id, {
                        paddingBottom: parseInt(e.target.value),
                        currentComponentId,
                        currentColumnId,
                        currentColumnParentId,
                        currentRowId,
                      })

                      setPage(updatedPage);
                    }}
                  />
                </div>
              </li>
            </>
          )
        }
      </ul>

      <ul className={styles['NewDocumentLeftSection__Controls_Pages_Current_Page_Properties']}>
        {
          !activePage?.autoLayout && (
            <>
              <li>
                <h3>Dimensions</h3>
              </li>
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
                    value={activePage?.width}
                    onChange={(e) => {
                      if (e.target.value.trim() == '') e.target.value = 0;
                      const updatedPage = addPageHistoryEntry(design.id, page.id, {
                        width: parseInt(e.target.value),
                        currentComponentId,
                        currentColumnId,
                        currentColumnParentId,
                        currentRowId,
                      })

                      setPage(updatedPage);
                    }}
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
                    value={activePage?.height}
                    onChange={(e) => {
                      if (e.target.value.trim() == '') e.target.value = 0;
                      const updatedPage = addPageHistoryEntry(design.id, page.id, {
                        height: parseInt(e.target.value),
                        currentComponentId,
                        currentColumnId,
                        currentColumnParentId,
                        currentRowId,
                      })

                      setPage(updatedPage);
                    }}
                  />
                </div>
              </li>

              <li>
                <h3>Design Components</h3>
              </li>

              <li>
                <div className={styles['NewDocumentLeftSection__Controls_Pages_Current_Page_Properties_Three_Column']}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <circle cx="12" cy="12" r="8"/>
                  </svg>

                  <h4>
                    Circle
                  </h4>

                  <button
                    className={styles['NewDocumentLeftSection__Controls_Pages_Current_Page_Add_Component_Button']}
                    onClick={() => {
                      let updatedPage = getComponent(activePage, 'circle', null, null, null)
                      updatedPage = addPageHistoryEntry(design.id, page.id, {
                        ...updatedPage,
                        currentComponentId,
                        currentColumnId,
                        currentColumnParentId,
                        currentRowId,
                      })

                      setPage(updatedPage);
                    }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              </li>

              <li>
                <div className={styles['NewDocumentLeftSection__Controls_Pages_Current_Page_Properties_Three_Column']}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <line x1="4" y1="12" x2="20" y2="12"/>
                  </svg>

                  <h4>
                    Line
                  </h4>

                  <button
                    className={styles['NewDocumentLeftSection__Controls_Pages_Current_Page_Add_Component_Button']}
                    onClick={() => {
                      let updatedPage = getComponent(activePage, 'line', null, null, null)
                      updatedPage = addPageHistoryEntry(design.id, page.id, {
                        ...updatedPage,
                        currentComponentId,
                        currentColumnId,
                        currentColumnParentId,
                        currentRowId,
                      })

                      setPage(updatedPage);
                    }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              </li>

              <li>
                <div className={styles['NewDocumentLeftSection__Controls_Pages_Current_Page_Properties_Three_Column']}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <rect x="4" y="6" width="16" height="12"/>
                  </svg>

                  <h4>
                    Rectangle
                  </h4>

                  <button
                    className={styles['NewDocumentLeftSection__Controls_Pages_Current_Page_Add_Component_Button']}
                    onClick={() => {
                      let updatedPage = getComponent(activePage, 'rectangle', null, null, null)
                      updatedPage = addPageHistoryEntry(design.id, page.id, {
                        ...updatedPage,
                        currentComponentId,
                        currentColumnId,
                        currentColumnParentId,
                        currentRowId,
                      })

                      setPage(updatedPage);
                    }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              </li>

              <li>
                <div className={styles['NewDocumentLeftSection__Controls_Pages_Current_Page_Properties_Three_Column']}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 6h16"/>
                    <path d="M12 6v12"/>
                  </svg>

                  <h4>
                    Text
                  </h4>

                  <button
                    className={styles['NewDocumentLeftSection__Controls_Pages_Current_Page_Add_Component_Button']}
                    onClick={() => {
                      let updatedPage = getComponent(activePage, 'text', null, null, null)
                      updatedPage = addPageHistoryEntry(design.id, page.id, {
                        ...updatedPage,
                        currentComponentId,
                        currentColumnId,
                        currentColumnParentId,
                        currentRowId,
                      })

                      setPage(updatedPage);
                    }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              </li>

              <li>
                <div className={styles['NewDocumentLeftSection__Controls_Pages_Current_Page_Properties_Three_Column']}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="5" width="18" height="14" rx="2" ry="2"/>
                    <circle cx="8.5" cy="10.5" r="1.5"/>
                    <path d="M21 18l-4-4a2 2 0 0 0-2.8 0l-5.2 5h12z"/>
                  </svg>

                  <h4>
                    Image
                  </h4>

                  <button
                    className={styles['NewDocumentLeftSection__Controls_Pages_Current_Page_Add_Component_Button']}
                    onClick={() => {
                      let updatedPage = getComponent(activePage, 'image', null, null, null)
                      updatedPage = addPageHistoryEntry(design.id, page.id, {
                        ...updatedPage,
                        currentComponentId,
                        currentColumnId,
                        currentColumnParentId,
                        currentRowId,
                      })

                      setPage(updatedPage);
                    }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              </li>
            </>
          )
        }

        {
          (activePage?.autoLayout && (currentColumnId || currentRowId)) && (
            <>
              <li>
                <h3>Design Components</h3>
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
                    Circle
                  </h4>

                  <button
                    className={styles['NewDocumentLeftSection__Controls_Pages_Current_Page_Add_Component_Button']}
                    onClick={() => {
                      let updatedPage = getComponent(activePage, 'circle', currentRowId, currentColumnId, currentColumnParentId)
                      updatedPage = addPageHistoryEntry(design.id, page.id, {
                        ...updatedPage,
                        currentComponentId,
                        currentColumnId,
                        currentColumnParentId,
                        currentRowId,
                      })

                      setPage(updatedPage);
                    }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
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
                    Line
                  </h4>

                  <button
                    className={styles['NewDocumentLeftSection__Controls_Pages_Current_Page_Add_Component_Button']}
                    onClick={() => {
                      let updatedPage = getComponent(activePage, 'line', currentRowId, currentColumnId, currentColumnParentId)
                      updatedPage = addPageHistoryEntry(design.id, page.id, {
                        ...updatedPage,
                        currentComponentId,
                        currentColumnId,
                        currentColumnParentId,
                        currentRowId,
                      })

                      setPage(updatedPage);
                    }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
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
                    Rectangle
                  </h4>

                  <button
                    className={styles['NewDocumentLeftSection__Controls_Pages_Current_Page_Add_Component_Button']}
                    onClick={() => {
                      let updatedPage = getComponent(activePage, 'rectangle', currentRowId, currentColumnId, currentColumnParentId)
                      updatedPage = addPageHistoryEntry(design.id, page.id, {
                        ...updatedPage,
                        currentComponentId,
                        currentColumnId,
                        currentColumnParentId,
                        currentRowId,
                      })

                      setPage(updatedPage);
                    }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
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
                    Text
                  </h4>

                  <button
                    className={styles['NewDocumentLeftSection__Controls_Pages_Current_Page_Add_Component_Button']}
                    onClick={() => {
                      let updatedPage = getComponent(activePage, 'text', currentRowId, currentColumnId, currentColumnParentId)
                      updatedPage = addPageHistoryEntry(design.id, page.id, {
                        ...updatedPage,
                        currentComponentId,
                        currentColumnId,
                        currentColumnParentId,
                        currentRowId,
                      })

                      setPage(updatedPage);
                    }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
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
                    Image
                  </h4>

                  <button
                    className={styles['NewDocumentLeftSection__Controls_Pages_Current_Page_Add_Component_Button']}
                    onClick={() => {
                      let updatedPage = getComponent(activePage, 'image', currentRowId, currentColumnId, currentColumnParentId)
                      updatedPage = addPageHistoryEntry(design.id, page.id, {
                        ...updatedPage,
                        currentComponentId,
                        currentColumnId,
                        currentColumnParentId,
                        currentRowId,
                      })

                      setPage(updatedPage);
                    }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              </li>
            </>
          )
        }
      </ul>
    </ul>
  )
}

export default DesignLeftSection;
