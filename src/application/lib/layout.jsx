import { v4 as UUIDv4 } from "uuid";
import { displayComponent } from "./components";

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
      value: 8,
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
    width: {
      id: UUIDv4(),
      name: 'Width',
      value: '',
      dataType: 'text',
    },
    height: {
      id: UUIDv4(),
      name: 'Height',
      value: 'auto',
      dataType: 'text',
    },
  },
  rows: [],
  columns: [],
  components: []
});

const addColumn = (activePage, rowId) => {
  const page = activePage;

  if (!rowId) return;
  const row = findRow(page.rows, rowId);

  const pageCopy = JSON.parse(JSON.stringify(page));
  let parent = pageCopy;

  for (let p of row.parents) {
    parent = parent.rows.find((r) => r.id === p);
  }

  parent.rows.find((r) => r.id === rowId).columns.push(getNewColumnProperties());

  return ({
    columns: pageCopy.columns,
    rows: pageCopy.rows,
  });
}

const addRow = (activePage, rowId) => {
  const page = activePage;

  if (rowId) {
    const row = findRow(page.rows, rowId);

    const pageCopy = JSON.parse(JSON.stringify(page));
    let parent = pageCopy;

    for (let p of row.parents) {
      parent = parent.rows.find((r) => r.id === p);
    }

    parent.rows.find((r) => r.id === rowId).rows.push(getNewRowProperties());

    return pageCopy.rows;
  } else return [
    ...page.rows,
    getNewRowProperties(),
  ]
}

const deleteColumn = (activePage, rowId, columnId) => {
  const page = activePage;
  const row = findRow(page.rows, rowId)

  const column = findColumn(row, columnId);

  const pageCopy = JSON.parse(JSON.stringify(page));
  let parent = pageCopy;

  for (let p of row.parents) {
    parent = parent.rows.find((r) => r.id === p);
  }

  parent = parent.rows.find((r) => r.id === row.id);

  parent.columns = parent.columns.filter((c) => c.id !== column.id)

  return pageCopy;
}

const deleteRow = (activePage, rowId) => {
  const row = findRow(activePage.rows, rowId);

  const pageCopy = JSON.parse(JSON.stringify(activePage));
  let parent = pageCopy;

  for (let p of row.parents) {
    parent = parent.rows.find((r) => r.id === p);
  }

  parent.rows = parent.rows.filter((r) => r.id !== rowId);

  return pageCopy;
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

const findColumnIndex = (row, columnId) => {
  let found = row.columns.findIndex((c) => c.id === columnId);
  if (found !== -1) {
    return found;
  }

  for (let row of row.rows) {
    if (row.rows?.length) {
      return findColumnIndex(row, columnId);
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

const getColumnProperty = (activePage, rowId, columnId, property) => {
  if (!columnId) return null;
  let value = null;

  const row = findRow(activePage.rows, rowId);

  const pageCopy = JSON.parse(JSON.stringify(activePage));
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

const getColumnPropertyList = (activePage, rowId, columnId) => {
  let value = {};
  if (!columnId || !rowId) return value;

  const row = findRow(activePage.rows, rowId);
  if (!row) return value;

  const pageCopy = JSON.parse(JSON.stringify(activePage));
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
  activePage,
  currentColumnId,
  currentComponentId,
  designPageStyles,
  activeDesign,
  gridVisible,
  rows,
  onComponentBlur,
  onComponentContextMenu,
  onComponentContextMenuAction,
  onComponentFocus,
  onComponentKeydown,
  onComponentMouseDown,
  onComponentMouseUp,
  onColumnKeydown,
  onRowKeydown,
  scaleFactor,
  setCurrentRow,
  setCurrentColumn,
) => {
  if (rows) return (
    <>
      {
        rows.map((row, index) => (
          <div
            key={row.id}
            id={row.id}
            tabIndex={index}
            className={designPageStyles['NewDocumentDesignSection__Row']}
            onFocus={(e) => setCurrentRow(e, row.id)}
            onKeyDown={(e) => onRowKeydown(e, row.id, currentColumnId, currentComponentId)}
            style={{
              borderWidth: gridVisible ? '0.2em' : 0,
              gap: `${getRowProperty(activePage, row.id, 'gap')?.value / scaleFactor}em`,
              height: parseInt(getRowProperty(activePage, row.id, 'height')?.value) ? `${getRowProperty(activePage, row.id, 'height')?.value / scaleFactor}em` : getRowProperty(activePage, row.id, 'height')?.value,
              padding: `${getRowProperty(activePage, row.id, 'padding')?.value / scaleFactor}em`,
              width: parseInt(getRowProperty(activePage, row.id, 'width')?.value) ? `${getRowProperty(activePage, row.id, 'width')?.value / scaleFactor}em` : getRowProperty(activePage, row.id, 'width')?.value,
            }}
          >
            {
              (row.components.length > 0) && (
                <div
                  style={{
                    gap: `${getRowProperty(activePage, row.id, 'gap')?.value / scaleFactor}em`,
                  }}
                  className={designPageStyles['NewDocumentDesignSection__Row_Components']}
                >
                  {
                    row.components.map((component) => (
                      <div
                        key={component.id}
                      >
                        {
                          displayComponent(
                            designPageStyles,
                            activeDesign,
                            row.id,
                            null,
                            component,
                            (e) => {
                              onComponentBlur(e)
                            },
                            (e) => {
                              onComponentContextMenu(e, component.id, null, row.id)
                            },
                            (componentId, columnId, rowId, action) => {
                              onComponentContextMenuAction(componentId, columnId, rowId, action)
                            },
                            (e) => {
                              onComponentFocus(e, component.id, null, row.id)
                            },
                            (e) => {
                              onComponentKeydown(e, component.id, null, row.id)
                            },
                            (e) => {
                              onComponentMouseDown(e, component.id, null, row.id)
                            },
                            (e) => {
                              onComponentMouseUp(e, component.id, null, row.id)
                            },
                            scaleFactor,
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
                  className={designPageStyles['NewDocumentDesignSection__Row_Columns']}
                  style={{
                    gap: `${getRowProperty(activePage, row.id, 'gap')?.value / scaleFactor}em`,
                  }}
                >
                  {
                    row.columns.map((column) => (
                      <div
                        className={designPageStyles['NewDocumentDesignSection__Column']}
                        id={column.id}
                        key={column.id}
                        onFocus={(e) => setCurrentColumn(e, row.id)}
                        onKeyDown={(e) => onColumnKeydown(e, column.id, row.id, currentComponentId)}
                        style={{
                          borderWidth: gridVisible ? '0.2em' : 0,
                          padding: `${getColumnProperty(activePage, row.id, column.id, 'padding')?.value / scaleFactor}em`,
                        }}
                        tabIndex={index}
                      >
                        {
                          (column.components.length > 0) && (
                            <div
                              style={{
                                gap: `${getColumnProperty(activePage, row.id, column.id, 'gap')?.value / scaleFactor}em`,
                              }}
                              className={designPageStyles['NewDocumentDesignSection__Row_Components']}
                            >
                              {
                                column.components.map((component) => (
                                  <div
                                    key={component.id}
                                  >
                                    {
                                      displayComponent(
                                        designPageStyles,
                                        activeDesign,
                                        row.id,
                                        column.id,
                                        component,
                                        (e) => {
                                          onComponentBlur(e)
                                        },
                                        (e) => {
                                          onComponentContextMenu(e, component.id, null, row.id)
                                        },
                                        (componentId, columnId, rowId, action) => {
                                          onComponentContextMenuAction(componentId, columnId, rowId, action)
                                        },
                                        (e) => {
                                          onComponentFocus(e, component.id, column.id, row.id)
                                        },
                                        (e) => {
                                          onComponentKeydown(e, component.id, column.id, row.id)
                                        },
                                        (e) => {
                                          onComponentMouseDown(e, component.id, column.id, row.id)
                                        },
                                        (e) => {
                                          onComponentMouseUp(e, component.id, column.id, row.id)
                                        },
                                        scaleFactor,
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

const getRowProperty = (activePage, rowId, property) => {
  if (!rowId) return null;

  const row = findRow(activePage.rows, rowId);
  return row.properties ? row.properties[property] : null;
}

const getRowPropertyList = (activePage, rowId) => {
  if (!rowId) return null;

  const row = findRow(activePage.rows, rowId);
  if (!row) return {};

  return row.properties ? row.properties : {};
}

const updateColumnProperty = (activePage, rowId, columnId, property, value) => {
  if (!rowId || !columnId) return activePage;

  const pageCopy = JSON.parse(JSON.stringify(activePage));
  let parent = pageCopy;

  const row = findRow(activePage.rows, rowId);

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

  return pageCopy;
}

const updateRowProperty = (activePage, rowId, property, value) => {
  if (!rowId) return activePage;
  const row = findRow(activePage.rows, rowId);

  row.properties[property] = {
    ...row.properties[property],
    ...value,
  };

  return ({
    ...activePage,
    rows: activePage.rows.map(
      (r) => (r.id === rowId ? row : r)
    )
  });
}

export {
  addColumn,
  addRow,
  deleteColumn,
  deleteRow,
  findColumn,
  findColumnIndex,
  findRow,
  getColumnProperty,
  getColumnPropertyList,
  getRowComponents,
  getRowProperty,
  getRowPropertyList,
  updateColumnProperty,
  updateRowProperty,
}
