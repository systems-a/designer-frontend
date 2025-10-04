import { v4 as UUIDv4 } from 'uuid';
import { displayComponent } from "./components";

const getPageComponents = (
  activePage,
  designPageStyles,
  activeDesign,
  scaleFactor,
  onComponentBlur,
  onComponentContextMenu,
  onComponentContextMenuAction,
  onComponentFocus,
  onComponentKeydown,
  onComponentMouseDown,
  onComponentMouseUp,
) => {
  return activePage.components.map((component) => {
    return displayComponent(
      designPageStyles,
      activeDesign,
      null,
      null,
      component,
      (e) => onComponentBlur(e),
      (e) => onComponentContextMenu(e),
      (componentId, columnId, rowId, action) => {
        onComponentContextMenuAction(componentId, columnId, rowId, action)
      },
      (e) => onComponentFocus(e, component.id, null, null),
      (e) => onComponentKeydown(e, component.id, null, null),
      (e) => onComponentMouseDown(e, component.id, null, null),
      (e) => onComponentMouseUp(e, component.id, null, null),
      scaleFactor,
    )
  })
}

const updatePage = (activePage, property, value) => {
  return ({
    ...activePage,
    [property]: value
  });
}

const getPageProperties = (title, pageNumber) => ({
  autoLayout: false,
  columns: [],
  components: [],
  currentColumnId: null,
  currentColumnParentId: null,
  currentComponentId: null,
  currentRowId: null,
  gap: 8,
  gridVisible: true,
  height: 400,
  id: UUIDv4(),
  paddingBottom: 8,
  paddingLeft: 8,
  paddingRight: 8,
  paddingTop: 8,
  pageNumber,
  rows: [],
  title,
  width: 700,
})

export {
  getPageProperties,
  getPageComponents,
  updatePage,
}
