import { v4 as UUIDv4 } from "uuid";
import { updatePage } from "./pages";
import { displayComponent } from "./components";

const factor = 12;

const getNewColumnProperties = () => ({
  id: UUIDv4(),
  properties: {
    padding: {
      id: UUIDv4(),
      name: 'Padding',
      value: 8,
      dataType: 'number',
    },
    gap: {
      id: UUIDv4(),
      name: 'Gap',
      value: 0,
      dataType: 'number',
    },
  },
  rows: [],
  columns: [],
  components: []
})

const getNewRowProperties = () => ({
  id: UUIDv4(),
  properties: {
    padding: {
      id: UUIDv4(),
      name: 'Padding',
      value: 8,
      dataType: 'number',
    },
    gap: {
      id: UUIDv4(),
      name: 'Gap',
      value: 8,
      dataType: 'number',
    },
  },
  rows: [],
  columns: [],
  components: []
});

const addColumn = (doc, pageIndex, rowId) => {
  const page = doc.pages[pageIndex];

  if (!rowId) return;
  const row = findRow(page.rows, rowId);

  const pageCopy = JSON.parse(JSON.stringify(page));
  let parent = pageCopy;

  for (let p of row.parents) {
    parent = parent.rows.find((r) => r.id === p);
  }

  parent.rows.find((r) => r.id === rowId).columns.push(getNewColumnProperties());

  return ({
    ...doc,
    pages: doc.pages.map(
      (p, i) => (i === pageIndex ? pageCopy : p))
  });
}

const addRow = (doc, pageIndex, rowId) => {
  const page = doc.pages[pageIndex];

  if (rowId) {
    const row = findRow(page.rows, rowId);

    const pageCopy = JSON.parse(JSON.stringify(page));
    let parent = pageCopy;

    for (let p of row.parents) {
      parent = parent.rows.find((r) => r.id === p);
    }

    parent.rows.find((r) => r.id === rowId).rows.push(getNewRowProperties());

    return ({
      ...doc,
      pages: doc.pages.map(
        (p, i) => (i === pageIndex ? pageCopy : p))
    });
  } else return updatePage(doc, pageIndex, 'rows',
    [
      ...page.rows,
      getNewRowProperties(),
    ]
  )
}

const deleteColumn = (doc, pageIndex, rowId, columnId) => {
  const page = doc.pages[pageIndex];
  const row = findRow(page.rows, rowId)

  const column = findColumn(row, columnId);

  const pageCopy = JSON.parse(JSON.stringify(page));
  let parent = pageCopy;

  for (let p of row.parents) {
    parent = parent.rows.find((r) => r.id === p);
  }

  parent = parent.rows.find((r) => r.id === row.id);

  parent.columns = parent.columns.filter((c) => c.id !== column.id)

  return ({
    ...doc,
    pages: doc.pages.map(
      (p, i) => (i === pageIndex ? pageCopy : p))
  });
}

const deleteRow = (doc, pageIndex, rowId) => {
  const page = doc.pages[pageIndex];
  const row = findRow(page.rows, rowId);

  const pageCopy = JSON.parse(JSON.stringify(page));
  let parent = pageCopy;

  for (let p of row.parents) {
    parent = parent.rows.find((r) => r.id === p);
  }

  parent.rows = parent.rows.filter((r) => r.id !== rowId);

  return ({
    ...doc,
    pages: doc.pages.map(
      (p, i) => (i === pageIndex ? pageCopy : p))
  });
}

const findColumn = (row, columnId, parents = []) => {
  let found = row.columns.find((c) => c.id === columnId);
  if (found) {
    found.parents = parents;
    return found;
  }

  for (let row of row.rows) {
    if (row.rows?.length) {
      return findColumn(row, columnId, [...parents, row.id]);
    }
  }
  return found;
}

const findRow = (rows, rowId, parents = []) => {
  let found = rows.find((r) => r.id === rowId);
  if (found) {
    found.parents = parents;
    return found;
  }

  for (let row of rows) {
    if (row.rows?.length) {
      return findRow(row.rows, rowId, [...parents, row.id]);
    }
  }
  return found;
}

const getColumnProperty = (doc, pageIndex, rowId, columnId, property) => {
  const page = doc.pages[pageIndex];

  if (!columnId) return null;
  let value = null;

  const row = findRow(page.rows, rowId);

  const pageCopy = JSON.parse(JSON.stringify(page));
  let parent = pageCopy;

  for (let p of row.parents) {
    parent = parent.rows.find((r) => r.id === p);
  }

  parent = parent.rows.find((r) => r.id === row.id);

  const column = findColumn(row, columnId);
  const col = parent.columns.find((c) => c.id === column.id);
  value = col?.properties[property];

  return value;
}

const getColumnPropertyList = (doc, pageIndex, rowId, columnId) => {
  const page = doc.pages[pageIndex];

  let value = {};
  if (!columnId) return value;

  const row = findRow(page.rows, rowId);

  const pageCopy = JSON.parse(JSON.stringify(page));
  let parent = pageCopy;

  for (let p of row.parents) {
    parent = parent.rows.find((r) => r.id === p);
  }

  parent = parent.rows.find((r) => r.id === row.id);

  const column = findColumn(row, columnId);
  const col = parent.columns.find((c) => c.id === column.id);
  value = col?.properties;

  return value;
}

const getRowComponents = (
  doc,
  setDoc,
  pageIndex,
  rows,
  onComponentBlur,
  onComponentFocus,
  onComponentKeydown,
  setCurrentRow,
  setCurrentColumn,
  styles,
) => {
  if (rows) return (
    <>
      {
        rows.map((row, index) => (
          <div
            key={row.id}
            id={row.id}
            tabIndex={index}
            className={styles['NewDocumentDesignSection__Row']}
            onFocus={(e) => setCurrentRow(e, row.id)}
            style={{
              padding: `${getRowProperty(doc, pageIndex, row.id, 'padding')?.value / factor}em`,
              height: `${getRowProperty(doc, pageIndex, row.id, 'height')?.value / factor}em`,
              gap: `${getRowProperty(doc, pageIndex, row.id, 'gap')?.value / factor}em`,
            }}
          >
            {
              (row.components.length > 0) && (
                <div className={styles['NewDocumentDesignSection__Row_Components']}>
                  {
                    row.components.map((component) => (
                      <div
                        key={component.id}
                        id={component.id}
                      >
                        {
                          displayComponent(
                            doc,
                            setDoc,
                            pageIndex,
                            row.id,
                            null,
                            component,
                            (e) => {
                              onComponentBlur(e)
                            },
                            (e) => {
                              onComponentFocus(e, component.id, null, row.id)
                            },
                            (e) => {
                              onComponentKeydown(e, component.id, null, row.id)
                            },
                          )
                        }
                      </div>
                    ))
                  }
                </div>
              )
            }

            {
              (row.columns.length > 0) && (
                <div
                  className={styles['NewDocumentDesignSection__Row_Columns']}
                  style={{
                    gap: `${getRowProperty(doc, pageIndex, row.id, 'gap')?.value / factor}em`,
                  }}
                >
                  {
                    row.columns.map((column) => (
                      <div
                        className={styles['NewDocumentDesignSection__Column']}
                        id={column.id}
                        key={column.id}
                        onFocus={(e) => setCurrentColumn(e, row.id)}
                        style={{
                          padding: `${getColumnProperty(doc, pageIndex, row.id, column.id, 'padding')?.value / factor}em`,
                          height: `${getColumnProperty(doc, pageIndex, row.id, column.id, 'height')?.value / factor}em`,
                          gap: `${getColumnProperty(doc, pageIndex, row.id, column.id, 'gap')?.value / factor}em`,
                        }}
                        tabIndex={index}
                      >
                        {
                          (column.components.length > 0) && (
                            <div className={styles['NewDocumentDesignSection__Row_Components']}>
                              {
                                column.components.map((component) => (
                                  <div
                                    key={component.id}
                                    id={component.id}
                                  >
                                    {
                                      displayComponent(
                                        doc,
                                        setDoc,
                                        pageIndex,
                                        row.id,
                                        column.id,
                                        component,
                                        (e) => {
                                          onComponentBlur(e)
                                        },
                                        (e) => {
                                          onComponentFocus(e, component.id, column.id, row.id)
                                        },
                                        (e) => {
                                          onComponentKeydown(e, component.id, column.id, row.id)
                                        },
                                      )
                                    }

                                  </div>
                                ))
                              }
                            </div>
                          )
                        }
                      </div>
                    ))
                  }
                </div>
              )
            }

            {
              getRowComponents(row.rows)
            }
          </div>
        ))
      }
    </>
  )
}

const getRowProperty = (doc, pageIndex, rowId, property) => {
  const page = doc.pages[pageIndex];

  if (!rowId) return null;

  const row = findRow(page.rows, rowId);
  return row.properties ? row.properties[property] : null;
}

const getRowPropertyList = (doc, pageIndex, rowId) => {
  const page = doc.pages[pageIndex];

  if (!rowId) return null;

  const row = findRow(page.rows, rowId);
  console.log(pageIndex)
  return row.properties ? row.properties : {};
}

const updateColumnProperty = (doc, pageIndex, rowId, columnId, property, value) => {
  if (!rowId || !columnId) return doc;
  const page = doc.pages[pageIndex];

  const pageCopy = JSON.parse(JSON.stringify(page));
  let parent = pageCopy;

  const row = findRow(page.rows, rowId);

  for (let p of row.parents) {
    parent = parent.rows.find((r) => r.id === p);
  }

  parent = parent.rows.find((r) => r.id === row.id);

  const column = findColumn(row, columnId);
  const col = parent.columns.find((c) => c.id === column.id);
  col.properties[property] = {
    ...col.properties[property],
    ...value,
  };

  return ({
    ...doc,
    pages: doc.pages.map(
      (p, i) => (i === pageIndex ? pageCopy : p)
    )
  });
}

const updateRowProperty = (doc, pageIndex, rowId, property, value) => {
  if (!rowId) return doc;
  const page = doc.pages[pageIndex];

  const row = findRow(page.rows, rowId);

  row.properties[property] = {
    ...row.properties[property],
    ...value,
  };

  return ({
    ...doc,
    pages: doc.pages.map(
      (p, i) => (i === pageIndex ? page : p)
    )
  });
}

export {
  addColumn,
  addRow,
  deleteColumn,
  deleteRow,
  findColumn,
  findRow,
  getColumnProperty,
  getColumnPropertyList,
  getRowComponents,
  getRowProperty,
  getRowPropertyList,
  updateColumnProperty,
  updateRowProperty,
}
