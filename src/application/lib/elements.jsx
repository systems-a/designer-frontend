import { findColumn, findColumnIndex, findRow } from "./layout";

const getPreviousSibling = (activePage, rowId, columnId, componentId) => {
  let value = null;
  let type = null;

  if (rowId) {
    const row = findRow(activePage.rows, rowId);

    let parent = activePage;

    for (let p of row.parents) {
      parent = parent.rows.find((r) => r.id === p);
    }

    const rowParent = JSON.parse(JSON.stringify(parent));
    parent = parent.rows.find((r) => r.id === row.id);

    if (columnId) {
      const column = findColumn(row, columnId);
      const col = parent.columns.find((c) => c.id === column.id);

      if (componentId) {
        let compIndex = col.components.findIndex((co) => co.id === componentId);

        if (compIndex > 0) {
          compIndex -= 1;
          type = 'component';
          value = col.components[compIndex]
        } else {
          type = 'column';
          value = col;
        }
      } else {
        let colIndex = findColumnIndex(row, columnId);

        if (colIndex > 0) {
          colIndex -= 1;
          type = 'column';
          value = parent.columns[colIndex];
        } else {
          type = 'row';
          value = row;
        }
      }
    } else if (componentId) {
      let rowIndex = rowParent.rows.findIndex((r) => r.id === rowId);
      let compIndex = rowParent.rows[rowIndex].components.findIndex((co) => co.id === componentId);

      if (compIndex > 0) {
        compIndex -= 1;
        type = 'component';
        value = rowParent.rows[rowIndex].components[compIndex];
      } else {
        type = 'row';
        value = rowParent;
      }
    } else {
      let rowIndex = rowParent.rows.findIndex((r) => r.id === rowId);

      if (rowIndex > 0) {
        rowIndex -= 1;
        type = 'row';
        value = rowParent.rows[rowIndex];
      }
    }
  } else {
    let componentIndex = activePage.components.findIndex((c) => c.id == componentId);

    if (componentIndex > 0) {
      componentIndex -= 1;
      type = 'component';
      value = activePage.components[componentIndex];
    } else {
      type = 'page';
      value = activePage;
    }
  }

  return { value, type };
}

const getNextSibling = (activePage, rowId, columnId, componentId) => {
  let value = null;
  let type = null;

  if (rowId) {
    let row = findRow(activePage.rows, rowId);

    if (columnId) {
      let columnIndex = findColumnIndex(row, columnId);

      if (componentId) {
        let column = row.columns[columnIndex];
        let componentIndex = column.components.findIndex((c) => c.id == componentId);

        if (componentIndex < column.components.length - 1) {
          componentIndex += 1;
          type = 'component';
          value = column.components[componentIndex];
        }
      } else if (columnIndex < row.columns.length - 1) {
        columnIndex += 1;
        type = 'column';
        value = row.columns[columnIndex];
      } else {
        let column = row.columns[columnIndex];

        if (column.components.length) {
          type = 'component';
          value = column.components[0];
        }
      }
    } else if (componentId) {
      let componentIndex = row.components.findIndex((c) => c.id == componentId);

      if (componentIndex < row.components.length - 1) {
        componentIndex += 1;
        type = 'component';
        value = row.components[componentIndex];
      } else {
        if (row.columns.length) {
          type = 'column';
          value = row.columns[0];
        }
      }
    } else {
      let parent = activePage;

      for (let p of row.parents) {
        parent = parent.rows.find((r) => r.id === p);
      }

      let rowIndex = parent.rows.findIndex((r) => r.id === rowId);

      if (rowIndex < parent.rows.length - 1) {
        rowIndex += 1;
        type = 'row';
        value = parent.rows[rowIndex];
      } else {
        row = parent.rows[rowIndex];

        if (row.components.length) {
          type = 'component';
          value = row.components[0];
        } else if (row.columns.length) {
          type = 'column';
          value = row.columns[0];
        }
      }
    }
  } else {
    let componentIndex = activePage.components.findIndex((c) => c.id == componentId);

    if (componentIndex < activePage.components.length - 1) {
      componentIndex += 1;
      type = 'component';
      value = activePage.components[componentIndex];
    } else {
      type = 'page';
      value = activePage;
    }
  }

  return { value, type };
}

export {
  getNextSibling,
  getPreviousSibling,
}
