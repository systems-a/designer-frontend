import { v4 as UUIDv4 } from "uuid"
import { findColumn, findRow } from "./layout"

import CircleComponent from "../Components/Circle/Circle"
import ImageComponent from "../Components/Image/Image"
import RectangleComponent from "../Components/Rectangle/Rectangle"
import TextComponent from "../Components/Text/Text"

const circleProperties = {
  name: {
    id: UUIDv4(),
    dataType: 'text',
    value: 'Circle component',
  },
  radius: {
    id: UUIDv4(),
    name: 'Radius',
    dataType: 'number',
    value: 20,
  },
  fill: {
    id: UUIDv4(),
    name: 'Fill Color',
    dataType: 'color',
    value: '#aaaaaa',
  },
  left: {
    id: UUIDv4(),
    name: 'Position X',
    dataType: 'number',
    value: 0,
  },
  top: {
    id: UUIDv4(),
    name: 'Position Y',
    dataType: 'number',
    value: 0,
  },
  zIndex: {
    id: UUIDv4(),
    name: 'Position Z',
    dataType: 'number',
    value: 1,
  },
  strokeWidth: {
    id: UUIDv4(),
    name: 'Stroke Width',
    dataType: 'number',
    value: 0,
  },
  strokeColor: {
    id: UUIDv4(),
    name: 'Stroke Color',
    dataType: 'color',
    value: '#000000',
  },
  shadow: {
    id: UUIDv4(),
    name: 'Shadow',
    dataType: 'boolean',
    value: false,
  },
  shadowColor: {
    id: UUIDv4(),
    name: 'Shadow Color',
    dataType: 'color',
    value: '#000000',
  },
  shadowBlur: {
    id: UUIDv4(),
    name: 'Shadow Blur',
    dataType: 'number',
    value: 5,
  },
  shadowSpread: {
    id: UUIDv4(),
    name: 'Shadow Spread',
    dataType: 'number',
    value: 2,
  },
  shadowOffsetX: {
    id: UUIDv4(),
    name: 'Shadow Offset X',
    dataType: 'number',
    value: 3,
  },
  shadowOffsetY: {
    id: UUIDv4(),
    name: 'Shadow Offset Y',
    dataType: 'number',
    value: 3,
  },
  opacity: {
    id: UUIDv4(),
    name: 'Opacity',
    dataType: 'number',
    value: 1,
  },
}

const imageProperties = {
  name: {
    id: UUIDv4(),
    dataType: 'text',
    value: 'Image component',
  },
  width: {
    id: UUIDv4(),
    name: 'Width',
    dataType: 'number',
    value: 500,
  },
  height: {
    id: UUIDv4(),
    name: 'Height',
    dataType: 'number',
    value: 250,
  },
  imageFit: {
    id: UUIDv4(),
    name: 'Image Fit',
    dataType: 'text',
    value: 'cover',
  },
  paddingTop: {
    id: UUIDv4(),
    name: 'Top Padding',
    dataType: 'number',
    value: 0,
  },
  paddingRight: {
    id: UUIDv4(),
    name: 'Right Padding',
    dataType: 'number',
    value: 0,
  },
  paddingBottom: {
    id: UUIDv4(),
    name: 'Bottom Padding',
    dataType: 'number',
    value: 0,
  },
  paddingLeft: {
    id: UUIDv4(),
    name: 'Left Padding',
    dataType: 'number',
    value: 0,
  },
  src: {
    id: UUIDv4(),
    name: 'Image Source',
    dataType: 'image',
    value: '/placeholder.jpg',
  },
  fill: {
    id: UUIDv4(),
    name: 'Fill Color',
    dataType: 'color',
    value: 'transparent',
  },
  left: {
    id: UUIDv4(),
    name: 'Position X',
    dataType: 'number',
    value: 0,
  },
  top: {
    id: UUIDv4(),
    name: 'Position Y',
    dataType: 'number',
    value: 0,
  },
  zIndex: {
    id: UUIDv4(),
    name: 'Position Z',
    dataType: 'number',
    value: 1,
  },
  opacity: {
    id: UUIDv4(),
    name: 'Opacity',
    dataType: 'number',
    value: 1,
  },
  strokeWidth: {
    id: UUIDv4(),
    name: 'Stroke Width',
    dataType: 'number',
    value: 0,
  },
  strokeColor: {
    id: UUIDv4(),
    name: 'Stroke Color',
    dataType: 'color',
    value: '#000000',
  },
  shadowColor: {
    id: UUIDv4(),
    name: 'Shadow Color',
    dataType: 'color',
    value: '#000000',
  },
  shadowBlur: {
    id: UUIDv4(),
    name: 'Shadow Blur',
    dataType: 'number',
    value: 0,
  },
  shadowSpread: {
    id: UUIDv4(),
    name: 'Shadow Spread',
    dataType: 'number',
    value: 2,
  },
  shadowOffsetX: {
    id: UUIDv4(),
    name: 'Shadow Offset X',
    dataType: 'number',
    value: 0,
  },
  shadowOffsetY: {
    id: UUIDv4(),
    name: 'Shadow Offset Y',
    dataType: 'number',
    value: 0,
  },
}

const rectangleProperties = {
  name: {
    id: UUIDv4(),
    dataType: 'text',
    value: 'Rectangle component',
  },
  width: {
    id: UUIDv4(),
    name: 'Width',
    dataType: 'number',
    value: 20,
  },
  height: {
    id: UUIDv4(),
    name: 'Height',
    dataType: 'number',
    value: 20,
  },
  fill: {
    id: UUIDv4(),
    name: 'Fill Color',
    dataType: 'color',
    value: '#aaaaaa',
  },
  left: {
    id: UUIDv4(),
    name: 'Position X',
    dataType: 'number',
    value: 0,
  },
  top: {
    id: UUIDv4(),
    name: 'Position Y',
    dataType: 'number',
    value: 0,
  },
  zIndex: {
    id: UUIDv4(),
    name: 'Position Z',
    dataType: 'number',
    value: 1,
  },
  strokeWidth: {
    id: UUIDv4(),
    name: 'Stroke Width',
    dataType: 'number',
    value: 0,
  },
  strokeColor: {
    id: UUIDv4(),
    name: 'Stroke Color',
    dataType: 'color',
    value: '#000000',
  },
  shadow: {
    id: UUIDv4(),
    name: 'Shadow',
    dataType: 'boolean',
    value: false,
  },
  shadowColor: {
    id: UUIDv4(),
    name: 'Shadow Color',
    dataType: 'color',
    value: '#000000',
  },
  shadowBlur: {
    id: UUIDv4(),
    name: 'Shadow Blur',
    dataType: 'number',
    value: 5,
  },
  shadowSpread: {
    id: UUIDv4(),
    name: 'Shadow Spread',
    dataType: 'number',
    value: 2,
  },
  shadowOffsetX: {
    id: UUIDv4(),
    name: 'Shadow Offset X',
    dataType: 'number',
    value: 3,
  },
  shadowOffsetY: {
    id: UUIDv4(),
    name: 'Shadow Offset Y',
    dataType: 'number',
    value: 3,
  },
  opacity: {
    id: UUIDv4(),
    name: 'Opacity',
    dataType: 'number',
    value: 1,
  },
}

const textProperties = {
  name: {
    id: UUIDv4(),
    dataType: 'text',
    value: 'Text component',
  },
  width: {
    id: UUIDv4(),
    name: 'Width',
    dataType: 'text',
    value: '100%',
  },
  height: {
    id: UUIDv4(),
    name: 'Height',
    dataType: 'text',
    value: 'max-content',
  },
  paddingTop: {
    id: UUIDv4(),
    name: 'Top Padding',
    dataType: 'number',
    value: 8,
  },
  paddingRight: {
    id: UUIDv4(),
    name: 'Right Padding',
    dataType: 'number',
    value: 8,
  },
  paddingBottom: {
    id: UUIDv4(),
    name: 'Bottom Padding',
    dataType: 'number',
    value: 8,
  },
  paddingLeft: {
    id: UUIDv4(),
    name: 'Left Padding',
    dataType: 'number',
    value: 8,
  },
  textContent: {
    id: UUIDv4(),
    dataType: 'text',
    value: 'Lorem ipsum',
  },
  color: {
    id: UUIDv4(),
    name: 'Text Color',
    dataType: 'color',
    value: '#222222',
  },
  fill: {
    id: UUIDv4(),
    name: 'Fill Color',
    dataType: 'color',
    value: 'transparent',
  },
  left: {
    id: UUIDv4(),
    name: 'Position X',
    dataType: 'number',
    value: 0,
  },
  top: {
    id: UUIDv4(),
    name: 'Position Y',
    dataType: 'number',
    value: 0,
  },
  zIndex: {
    id: UUIDv4(),
    name: 'Position Z',
    dataType: 'number',
    value: 1,
  },
  opacity: {
    id: UUIDv4(),
    name: 'Opacity',
    dataType: 'number',
    value: 1,
  },
  strokeWidth: {
    id: UUIDv4(),
    name: 'Stroke Width',
    dataType: 'number',
    value: 0,
  },
  strokeColor: {
    id: UUIDv4(),
    name: 'Stroke Color',
    dataType: 'color',
    value: '#000000',
  },
  shadowColor: {
    id: UUIDv4(),
    name: 'Shadow Color',
    dataType: 'color',
    value: '#000000',
  },
  shadowBlur: {
    id: UUIDv4(),
    name: 'Shadow Blur',
    dataType: 'number',
    value: 0,
  },
  shadowSpread: {
    id: UUIDv4(),
    name: 'Shadow Spread',
    dataType: 'number',
    value: 2,
  },
  shadowOffsetX: {
    id: UUIDv4(),
    name: 'Shadow Offset X',
    dataType: 'number',
    value: 0,
  },
  shadowOffsetY: {
    id: UUIDv4(),
    name: 'Shadow Offset Y',
    dataType: 'number',
    value: 0,
  },
  textShadowWidth: {
    id: UUIDv4(),
    name: 'Text Shadow Width',
    dataType: 'number',
    value: 0,
  },
  textShadowHorizontalOffset: {
    id: UUIDv4(),
    name: 'Text Shadow Horizontal Offset',
    dataType: 'number',
    value: 0,
  },
  textShadowVerticalOffset: {
    id: UUIDv4(),
    name: 'Text Shadow Vertical Offset',
    dataType: 'number',
    value: 0,
  },
  textShadowColor: {
    id: UUIDv4(),
    name: 'Text Shadow Color',
    dataType: 'color',
    value: '#000000',
  },
}

const deleteComponent = (doc, pageIndex, rowId, columnId, componentId) => {
  const page = doc.pages[pageIndex];

  const pageCopy = JSON.parse(JSON.stringify(page));
  let parent = pageCopy;

  if (rowId || columnId) {
    const row = findRow(page.rows, rowId)

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

  return ({
    ...doc,
    pages: doc.pages.map(
      (p, i) => (i === pageIndex ? pageCopy : p))
  });
}

const displayComponent = (doc, setDoc, pageIndex, rowId, columnId, component, onBlur, onFocus, onKeydown) => {
  const componentProps = {
    columnId,
    component,
    doc,
    onBlurCallback: onBlur,
    onFocusCallback: onFocus,
    onKeydownCallback: onKeydown,
    pageIndex,
    rowId,
    setDoc,
  }

  if (component.type === 'circle') return <CircleComponent key={component.id} {...componentProps} />
  if (component.type === 'image') return <ImageComponent key={component.id} {...componentProps} />
  if (component.type === 'rectangle') return <RectangleComponent key={component.id} {...componentProps} />
  if (component.type === 'text') return <TextComponent key={component.id} {...componentProps} />
}

const getComponent = (doc, pageIndex, componentType, componentRowId, columnId, columnParentId) => {
  const pageCopy = JSON.parse(JSON.stringify(doc.pages[pageIndex]));
  let parent = pageCopy;

  if (componentRowId || columnParentId) {
    const rowId = componentRowId || columnParentId;

    let row = findRow(doc.pages[pageIndex].rows, rowId);

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

  return ({
    ...doc,
    pages: doc.pages.map(
      (p, i) => (i === pageIndex ? pageCopy : p))
  });
}

const getComponentProperty = (doc, pageIndex, rowId, columnId, componentId, property) => {
  const page = doc.pages[pageIndex];

  if (!componentId) return null;
  let value = null;

  if (rowId || columnId) {
    const row = findRow(page.rows, rowId);

    const pageCopy = JSON.parse(JSON.stringify(page));
    let parent = pageCopy;

    for (let p of row.parents) {
      parent = parent.rows.find((r) => r.id === p);
    }

    parent = parent.rows.find((r) => r.id === row.id);

    if (columnId) {
      const column = findColumn(row, columnId);
      const col = parent.columns.find((c) => c.id === column.id);
      const comp = col.components.find((co) => co.id === componentId);
      value = comp?.properties[property];
    } else {
      const comp = parent.components.find((co) => co.id === componentId);
      value = comp?.properties[property];
    }
  } else {
    const comp = page.components.find((co) => co.id === componentId);
    value = comp?.properties[property];
  }

  return value;
}

const getComponentPropertyList = (doc, pageIndex, rowId, columnId, componentId) => {
  const page = doc.pages[pageIndex];

  let value = {};
  if (!componentId) return value;

  if (rowId || columnId) {
    const row = findRow(page.rows, rowId);

    const pageCopy = JSON.parse(JSON.stringify(page));
    let parent = pageCopy;

    for (let p of row.parents) {
      parent = parent.rows.find((r) => r.id === p);
    }

    parent = parent.rows.find((r) => r.id === row.id);

    if (columnId) {
      const column = findColumn(row, columnId);
      const col = parent.columns.find((c) => c.id === column.id);
      const comp = col.components.find((co) => co.id === componentId);
      value = comp?.properties;
    } else {
      const comp = parent.components.find((co) => co.id === componentId);
      value = comp?.properties;
    }
  } else {
    const comp = page.components.find((co) => co.id === componentId);
    value = comp?.properties;
  }

  return value;
}

const getDefaultComponentProperties = (type) => {
  if (type === 'circle') return circleProperties;
  if (type === 'image') return imageProperties;
  if (type === 'rectangle') return rectangleProperties;
  if (type === 'text') return textProperties;
  return {};
}

const updateComponentProperty = (doc, pageIndex, rowId, columnId, componentId, property, value) => {
  const page = doc.pages[pageIndex];

  const pageCopy = JSON.parse(JSON.stringify(page));
  let parent = pageCopy;

  if (rowId || columnId) {
    const row = findRow(page.rows, rowId);

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

  return ({
    ...doc,
    pages: doc.pages.map(
      (p, i) => (i === pageIndex ? pageCopy : p)
    )
  });
}

export {
  circleProperties,
  imageProperties,
  rectangleProperties,
  textProperties,

  deleteComponent,
  displayComponent,
  getComponent,
  getComponentProperty,
  getComponentPropertyList,
  updateComponentProperty,
}
