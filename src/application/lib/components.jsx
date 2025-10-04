import { v4 as UUIDv4 } from "uuid"
import { findColumn, findRow } from "./layout"

import CircleComponent from "../views/Design/Components/Circle/Circle"
import ImageComponent from "../views/Design/Components/Image/Image"
import RectangleComponent from "../views/Design/Components/Rectangle/Rectangle"
import TextComponent from "../views/Design/Components/Text/Text"

import { getCircleProperties } from "./components/circle"
import { getImageProperties } from "./components/image"
import { getRectangleProperties } from "./components/rectangle"
import { getTextProperties } from "./components/text"

const addComponent = (activePage, rowId, columnId, component) => {
  const pageCopy = JSON.parse(JSON.stringify(activePage));
  let parent = pageCopy;

  if (rowId) {
    let row = findRow(activePage.rows, rowId);

    for (let p of row.parents) {
      parent = parent.rows.find((r) => r.id === p);
    }

    row = parent.rows.find((r) => r.id == rowId);

    if (columnId) {
      const column = row.columns.find((c) => c.id == columnId)
      column.components.push(component)
    } else {
      row.components.push(component);
    }
  } else {
    parent.components.push(component)
  }

  return pageCopy;
}

const copyComponent = (activePage, rowId, columnId, componentId) => {
  if (!componentId) return null;
  let value = null;

  if (rowId || columnId) {
    const row = findRow(activePage.rows, rowId);
    if (!row) return null;

    const pageCopy = JSON.parse(JSON.stringify(activePage));
    let parent = pageCopy;

    for (let p of row.parents) {
      parent = parent.rows.find((r) => r.id === p);
    }

    parent = parent.rows.find((r) => r.id === row.id);

    if (columnId) {
      const column = findColumn(row, columnId);
      const col = parent.columns.find((c) => c.id === column.id);
      const comp = col.components.find((co) => co.id === componentId);
      value = comp;
    } else {
      const comp = parent.components.find((co) => co.id === componentId);
      value = comp;
    }
  } else {
    const comp = activePage.components.find((co) => co.id === componentId);
    value = comp;
  }

  return JSON.parse(JSON.stringify(value));
}

const deleteComponent = (activePage, rowId, columnId, componentId) => {
  const pageCopy = JSON.parse(JSON.stringify(activePage));
  let parent = pageCopy;

  if (rowId || columnId) {
    const row = findRow(activePage.rows, rowId)

    for (let p of row.parents) {
      parent = parent.rows.find((r) => r.id === p);
    }

    parent = parent.rows.find((r) => r.id === row.id);

    if (columnId) {
      const column = findColumn(row, columnId);
      const col = parent.columns.find((c) => c.id === column.id);
      col.components = col.components.filter((co) => co.id !== componentId);
    } else {
      parent.components = parent.components.filter((co) => co.id !== componentId);
    }
  } else {
    parent.components = parent.components.filter((co) => co.id !== componentId);
  }

  return pageCopy;
}

const displayComponent = (
  designPageStyles,
  activeDesign,
  rowId,
  columnId,
  component,
  onBlur,
  onContextMenu,
  onContextMenuAction,
  onFocus,
  onKeyDown,
  onMouseDown,
  onMouseUp,
  scaleFactor,
) => {
  const componentProps = {
    columnId,
    component,
    designPageStyles,
    activeDesign,
    onBlurCallback: onBlur,
    onContextMenuCallback: onContextMenu,
    onContextMenuActionCallback: onContextMenuAction,
    onFocusCallback: onFocus,
    onKeyDownCallback: onKeyDown,
    onMouseDownCallback: onMouseDown,
    onMouseUpCallback: onMouseUp,
    rowId,
    scaleFactor,
  }

  if (component.type === 'circle') return <CircleComponent key={component.id} {...componentProps} />
  if (component.type === 'image') return <ImageComponent key={component.id} {...componentProps} />
  if (component.type === 'rectangle') return <RectangleComponent key={component.id} {...componentProps} />
  if (component.type === 'text') return <TextComponent key={component.id} {...componentProps} />
}

const getComponent = (activePage, componentType, componentRowId, columnId, columnParentId) => {
  const pageCopy = JSON.parse(JSON.stringify(activePage));
  let parent = pageCopy;

  if (componentRowId || columnParentId) {
    const rowId = componentRowId || columnParentId;

    let row = findRow(activePage.rows, rowId);

    for (let p of row.parents) {
      parent = parent.rows.find((r) => r.id === p);
    }

    row = parent.rows.find((r) => r.id == rowId);

    if (columnId) {
      const column = row.columns.find((c) => c.id == columnId)
      column.components.push({
        id: UUIDv4(),
        type: componentType,
        properties: getDefaultComponentProperties(componentType),
      })
    } else {
      row.components.push({
        id: UUIDv4(),
        type: componentType,
        properties: getDefaultComponentProperties(componentType),
      });
    }
  } else {
    parent.components.push({
      id: UUIDv4(),
      type: componentType,
      properties: getDefaultComponentProperties(componentType),
    })
  }

  return pageCopy;
}

const getComponentProperty = (activePage, rowId, columnId, componentId, propertyCategory, property) => {
  if (!componentId) return null;
  let value = null;

  if (rowId || columnId) {
    const row = findRow(activePage.rows, rowId);

    const pageCopy = JSON.parse(JSON.stringify(activePage));
    let parent = pageCopy;

    for (let p of row.parents) {
      parent = parent.rows.find((r) => r.id === p);
    }

    parent = parent.rows.find((r) => r.id === row.id);

    if (columnId) {
      const column = findColumn(row, columnId);
      const col = parent.columns.find((c) => c.id === column.id);
      const comp = col.components.find((co) => co.id === componentId);
      value = comp?.properties[propertyCategory].properties[property];
    } else {
      const comp = parent.components.find((co) => co.id === componentId);
      value = comp?.properties[propertyCategory].properties[property];
    }
  } else {
    const comp = activePage.components.find((co) => co.id === componentId);
    value = comp?.properties[propertyCategory].properties[property];
  }

  return value;
}

const getComponentPropertyCategories = (activePage, rowId, columnId, componentId) => {
  let value = {};
  if (!componentId) return value;

  if (rowId || columnId) {
    const row = findRow(activePage.rows, rowId);
    if (!row) return value;

    const pageCopy = JSON.parse(JSON.stringify(activePage));
    let parent = pageCopy;

    for (let p of row.parents) {
      parent = parent.rows.find((r) => r.id === p);
    }

    parent = parent.rows.find((r) => r.id === row.id);

    if (columnId) {
      const column = findColumn(row, columnId);
      const col = parent.columns.find((c) => c.id === column.id);
      const comp = col.components.find((co) => co.id === componentId);
      if (comp) value = comp.properties;
    } else {
      const comp = parent.components.find((co) => co.id === componentId);
      if (comp) value = comp.properties;
    }
  } else {
    const comp = activePage.components.find((co) => co.id == componentId);

    value = comp?.properties || {};
  }

  return value;
}

const getComponentPropertyCategory = (activePage, rowId, columnId, componentId, propertyCategory) => {

  if (!componentId) return null;
  let value = null;

  if (rowId || columnId) {
    const row = findRow(activePage.rows, rowId);
    if (!row) return null;

    const pageCopy = JSON.parse(JSON.stringify(activePage));
    let parent = pageCopy;

    for (let p of row.parents) {
      parent = parent.rows.find((r) => r.id === p);
    }

    parent = parent.rows.find((r) => r.id === row.id);

    if (columnId) {
      const column = findColumn(row, columnId);
      const col = parent.columns.find((c) => c.id === column.id);
      const comp = col.components.find((co) => co.id === componentId);
      value = comp?.properties[propertyCategory];
    } else {
      const comp = parent.components.find((co) => co.id === componentId);
      value = comp?.properties[propertyCategory];
    }
  } else {
    const comp = activePage.components.find((co) => co.id === componentId);
    value = comp?.properties[propertyCategory];
  }

  return value;
}

const getDefaultComponentProperties = (type, initial = {}) => {
  if (type === 'circle') return getCircleProperties(initial);
  if (type === 'image') return getImageProperties(initial);
  if (type === 'rectangle') return getRectangleProperties(initial);
  if (type === 'text') return getTextProperties(initial);
  return {};
}

const updateComponentProperty = (activePage, rowId, columnId, componentId, property, value) => {
  const pageCopy = JSON.parse(JSON.stringify(activePage));
  let parent = pageCopy;

  if (rowId || columnId) {
    const row = findRow(activePage.rows, rowId);

    for (let p of row.parents) {
      parent = parent.rows.find((r) => r.id === p);
    }

    parent = parent.rows.find((r) => r.id === row.id);

    if (columnId) {
      const column = findColumn(row, columnId);
      const col = parent.columns.find((c) => c.id === column.id);
      const comp = col.components.find((co) => co.id === componentId);
      comp.properties[property] = {
        ...comp.properties[property],
        ...value,
      };
    } else {
      const comp = parent.components.find((co) => co.id === componentId);
      comp.properties[property] = {
        ...comp.properties[property],
        ...value,
      };
    }
  } else {
    const comp = pageCopy.components.find((co) => co.id === componentId);
    comp.properties[property] = {
      ...comp.properties[property],
      ...value,
    };
  }

  return pageCopy;
}

export {
  addComponent,
  copyComponent,
  deleteComponent,
  displayComponent,
  getComponent,
  getComponentProperty,
  getComponentPropertyCategories,
  getComponentPropertyCategory,
  updateComponentProperty,
}
