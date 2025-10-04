import {
  deleteComponent,
  getComponentProperty,
  getComponentPropertyCategories,
  getComponentPropertyCategory,
  updateComponentProperty
} from "../../../lib/components";
import { addPageHistoryEntry } from "../../../services/storage/page";

import styles from './styles.module.css'

function ComponentProperties({
  activePage,
  currentComponentId,
  currentColumnId,
  currentRowId,
  design,
  page,
  setPage,
}) {
  return (
    <ul className={styles['NewDocumentRightSection']}>
      <li className={styles['NewDocumentRightSection_Component_Properties__Header']}>
        <input
          className={styles['NewDocumentRightSection__Name']}
          defaultValue={getComponentPropertyCategory(activePage, currentRowId, currentColumnId, currentComponentId, 'name')?.value}
          placeholder="Enter component name"
          onBlur={(e) => {
            let updatedPage = updateComponentProperty(
              activePage,
              currentRowId,
              currentColumnId,
              currentComponentId,
              'name',
              { value: e.target.value }
            )

            updatedPage = addPageHistoryEntry(design.id, page.id, {
              ...updatedPage,
              currentRowId,
              currentColumnId,
              currentComponentId,
            })
            setPage(updatedPage)
          }}
        />

        <button
          onClick={() => {
            let updatedPage = deleteComponent(activePage, currentRowId, currentColumnId, currentComponentId)

            updatedPage = addPageHistoryEntry(design.id, page.id, {
              ...updatedPage,
              currentRowId,
              currentColumnId,
              currentComponentId: null,
            })

            setPage(updatedPage);
          }}
          className={styles['NewDocumentRightSection__Delete_Button']}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M4 7h16M10 11v6M14 11v6M6 7l1 12a2 2 0 002 2h6a2 2 0 002-2l1-12M9 7V5a2 2 0 012-2h2a2 2 0 012 2v2"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </li>

      <ul>
        {
          Object.keys(getComponentPropertyCategories(activePage, currentRowId, currentColumnId, currentComponentId))
            .filter((propertyCategory) => getComponentPropertyCategory(activePage, currentRowId, currentColumnId, currentComponentId, propertyCategory).properties)
            .map((propertyCategory) => (
              <div key={getComponentPropertyCategory(activePage, currentRowId, currentColumnId, currentComponentId, propertyCategory).id}>
                <h3>{getComponentPropertyCategory(activePage, currentRowId, currentColumnId, currentComponentId, propertyCategory).name}</h3>

                {
                  Object.keys(getComponentPropertyCategory(activePage, currentRowId, currentColumnId, currentComponentId, propertyCategory).properties).map((property) => (
                    <li key={getComponentProperty(activePage, currentRowId, currentColumnId, currentComponentId, propertyCategory, property).id}>
                      <div className={styles['NewDocumentRightSection__Three_Column']}>
                        <div
                          style={{ display: 'grid' }}
                          dangerouslySetInnerHTML={{ __html: getComponentProperty(activePage, currentRowId, currentColumnId, currentComponentId, propertyCategory, property).icon }}
                        />

                        <h4>
                          {getComponentProperty(activePage, currentRowId, currentColumnId, currentComponentId, propertyCategory, property).name}
                        </h4>

                        {
                          getComponentProperty(activePage, currentRowId, currentColumnId, currentComponentId, propertyCategory, property).dataType == 'text' && (
                            <input
                              type="text"
                              value={getComponentProperty(activePage, currentRowId, currentColumnId, currentComponentId, propertyCategory, property).value}
                              onChange={
                                (e) => {
                                  let updatedPage = updateComponentProperty(
                                    activePage,
                                    currentRowId,
                                    currentColumnId,
                                    currentComponentId,
                                    propertyCategory,
                                    {
                                      ...getComponentPropertyCategory(activePage, currentRowId, currentColumnId, currentComponentId, propertyCategory),
                                      properties: {
                                        ...getComponentPropertyCategory(activePage, currentRowId, currentColumnId, currentComponentId, propertyCategory).properties,
                                        [property]: {
                                          ...getComponentProperty(activePage, currentRowId, currentColumnId, currentComponentId, propertyCategory, property),
                                          value: e.target.value
                                        }
                                      }
                                    }
                                  )

                                  updatedPage = addPageHistoryEntry(design.id, page.id, {
                                    ...updatedPage,
                                    currentRowId,
                                    currentColumnId,
                                    currentComponentId,
                                  })

                                  setPage(updatedPage);
                                }
                              }
                            />
                          )
                        }

                        {
                          getComponentProperty(activePage, currentRowId, currentColumnId, currentComponentId, propertyCategory, property).dataType == 'number' && (
                            <input
                              type="number"
                              value={getComponentProperty(activePage, currentRowId, currentColumnId, currentComponentId, propertyCategory, property).value}
                              onChange={
                                (e) => {
                                  let updatedPage = updateComponentProperty(
                                    activePage,
                                    currentRowId,
                                    currentColumnId,
                                    currentComponentId,
                                    propertyCategory,
                                    {
                                      ...getComponentPropertyCategory(activePage, currentRowId, currentColumnId, currentComponentId, propertyCategory),
                                      properties: {
                                        ...getComponentPropertyCategory(activePage, currentRowId, currentColumnId, currentComponentId, propertyCategory).properties,
                                        [property]: {
                                          ...getComponentProperty(activePage, currentRowId, currentColumnId, currentComponentId, propertyCategory, property),
                                          value: e.target.value
                                        }
                                      }
                                    }
                                  )

                                  updatedPage = addPageHistoryEntry(design.id, page.id, {
                                    ...updatedPage,
                                    currentRowId,
                                    currentColumnId,
                                    currentComponentId,
                                  })

                                  setPage(updatedPage);
                                }
                              }
                            />
                          )
                        }

                        {
                          getComponentProperty(activePage, currentRowId, currentColumnId, currentComponentId, propertyCategory, property).dataType == 'color' && (
                            <input
                              type="color"
                              value={getComponentProperty(activePage, currentRowId, currentColumnId, currentComponentId, propertyCategory, property).value}
                              onChange={
                                (e) => {
                                  let updatedPage = updateComponentProperty(
                                    activePage,
                                    currentRowId,
                                    currentColumnId,
                                    currentComponentId,
                                    propertyCategory,
                                    {
                                      ...getComponentPropertyCategory(activePage, currentRowId, currentColumnId, currentComponentId, propertyCategory),
                                      properties: {
                                        ...getComponentPropertyCategory(activePage, currentRowId, currentColumnId, currentComponentId, propertyCategory).properties,
                                        [property]: {
                                          ...getComponentProperty(activePage, currentRowId, currentColumnId, currentComponentId, propertyCategory, property),
                                          value: e.target.value
                                        }
                                      }
                                    }
                                  )

                                  updatedPage = addPageHistoryEntry(design.id, page.id, {
                                    ...updatedPage,
                                    currentRowId,
                                    currentColumnId,
                                    currentComponentId,
                                  })

                                  setPage(updatedPage);
                                }
                              }
                            />
                          )
                        }

                        {
                          getComponentProperty(activePage, currentRowId, currentColumnId, currentComponentId, propertyCategory, property).dataType == 'image' && (
                            <input
                              type="text"
                              value={getComponentProperty(activePage, currentRowId, currentColumnId, currentComponentId, propertyCategory, property).value}
                              onChange={
                                (e) => {
                                  let updatedPage = updateComponentProperty(
                                    activePage,
                                    currentRowId,
                                    currentColumnId,
                                    currentComponentId,
                                    propertyCategory,
                                    {
                                      ...getComponentPropertyCategory(activePage, currentRowId, currentColumnId, currentComponentId, propertyCategory),
                                      properties: {
                                        ...getComponentPropertyCategory(activePage, currentRowId, currentColumnId, currentComponentId, propertyCategory).properties,
                                        [property]: {
                                          ...getComponentProperty(activePage, currentRowId, currentColumnId, currentComponentId, propertyCategory, property),
                                          value: e.target.value
                                        }
                                      }
                                    }
                                  )

                                  updatedPage = addPageHistoryEntry(design.id, page.id, {
                                    ...updatedPage,
                                    currentRowId,
                                    currentColumnId,
                                    currentComponentId,
                                  })

                                  setPage(updatedPage);
                                }
                              }
                            />
                          )
                        }
                      </div>
                    </li>
                  ))
                }
              </div>
          ))
        }
      </ul>
    </ul>
  )
}

export default ComponentProperties
