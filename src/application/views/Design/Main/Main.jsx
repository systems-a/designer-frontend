import { useState } from 'react';
import { v4 as UUIDv4 } from 'uuid';
import { deleteColumn, deleteRow, getRowComponents, getRowProperty, updateRowProperty } from '../../../lib/layout';
import { getPageComponents } from '../../../lib/pages';

import styles from './styles.module.css'
import {
  addComponent,
  copyComponent,
  deleteComponent,
  getComponentProperty,
  getComponentPropertyCategory,
  updateComponentProperty
} from '../../../lib/components';
import { getNextSibling, getPreviousSibling } from '../../../lib/elements';
import { addPageHistoryEntry, redoPageChanges, undoPageChanges } from '../../../services/storage/page';

function NewDesignMainSection({
  activeComponentClass,
  activeDesign,
  activePage,
  currentColumnId,
  currentColumnParentId,
  currentComponentId,
  currentRowId,
  design,
  page,
  resetSelections,
  setCurrentColumnId,
  setCurrentColumn,
  setCurrentColumnParentId,
  setCurrentComponentId,
  setCurrentRow,
  setCurrentRowId,
  setPage,
}) {
  const [selectedComponentId, setSelectedComponentId] = useState(null);
  const [selectedComponentRowId, setSelectedComponentRowId] = useState(null);
  const [selectedComponentColumnId, setSelectedComponentColumnId] = useState(null);
  const [componentMouseCoordinateX, setComponentMouseCoordinateX] = useState(null);
  const [componentMouseCoordinateY, setComponentMouseCoordinateY] = useState(null);

  const scaleFactor = 10;

  const onColumnKeydown = (e, columnId, rowId, currentComponentId) => {
    e.preventDefault();
    if (currentComponentId) return;

    switch(e.key) {
      case 'Delete': {
        setCurrentColumnId(null);
        setCurrentColumnParentId(null);
        setCurrentRowId(rowId);
        setCurrentComponentId(null);

        let updatedPage =
          deleteColumn(
            activePage,
            rowId,
            columnId
          )

        updatedPage = addPageHistoryEntry(design.id, page.id, {
          ...updatedPage,
          currentComponentId: null,
          currentColumnId: null,
          currentColumnParentId: null,
          currentRowId: rowId,
        })

        setPage(updatedPage);
        break;
      }
      case 'Escape':
        setCurrentColumnId(null);

        if (!rowId) {
          document.getElementById('page').click();
          resetSelections();
        }
        break;
      case 'Tab':
        if (e.shiftKey) {
          const previousSibling = getPreviousSibling(activePage, rowId, columnId);

          switch (previousSibling.type) {
            case 'row':
              setCurrentColumnId(null);
              setCurrentColumnParentId(null);
              setCurrentRowId(previousSibling.value.id);
              break;
            case 'column':
              setCurrentColumnId(previousSibling.value.id);
              break;
          }
        } else {
          const nextSibling = getNextSibling(activePage, rowId, columnId);

          switch (nextSibling.type) {
            case 'component':
              setCurrentComponentId(nextSibling.value.id)
              break;
            case 'column':
              setCurrentColumnId(nextSibling.value.id);
              break;
          }
        }
        break;
    }
  }

  const onComponentBlur = (e) => {
    e.stopPropagation();
  }

  const onComponentContextMenuAction = (componentId, columnId, rowId, action) => {
    switch (action) {
      case 'bringToFront': {
        const zIndex = getComponentProperty(activePage, rowId, columnId, componentId, 'position', 'zIndex').value;

        let updatedPage = updateComponentProperty(
          activePage,
          rowId,
          columnId,
          componentId,
          'position',
          {
            ...getComponentPropertyCategory(activePage, rowId, columnId, componentId, 'position'),
            properties: {
              ...getComponentPropertyCategory(activePage, rowId, columnId, componentId, 'position').properties,
              zIndex: {
                ...getComponentProperty(activePage, rowId, columnId, componentId, 'position', 'zIndex'),
                value: zIndex ? (parseInt(zIndex) || 0) + 1 : 0
              }
            }
          }
        );

        updatedPage = addPageHistoryEntry(design.id, page.id, {
          ...updatedPage,
          currentComponentId,
          currentColumnId,
          currentColumnParentId,
          currentRowId,
        })

        setPage(updatedPage);
        break;
      }
      case 'copy': {
        const component = copyComponent(activePage, rowId, columnId, componentId);
        component.id = UUIDv4();
        break;
      }
      case 'delete': {
        let updatedPage = deleteComponent(activePage, rowId, columnId, componentId);

        updatedPage = addPageHistoryEntry(design.id, page.id, {
          ...updatedPage,
          currentComponentId: null,
          currentColumnId,
          currentColumnParentId,
          currentRowId,
        })

        setPage(updatedPage);
        break;
      }
      case 'duplicate': {
        const component = copyComponent(activePage, rowId, columnId, componentId);
        component.id = UUIDv4();

        if (!(rowId || columnId)) {
          component.properties.position.properties.left.value += 16;
          component.properties.position.properties.top.value += 16;
        }

        let updatedPage = addComponent(activePage, rowId, columnId, component);

        updatedPage = addPageHistoryEntry(design.id, page.id, {
          ...updatedPage,
          currentComponentId: component.id,
          currentColumnId,
          currentColumnParentId,
          currentRowId,
        })

        setPage(updatedPage);
        break;
      }
      case 'sendToBack': {
        const zIndex = getComponentProperty(activePage, rowId, columnId, componentId, 'position', 'zIndex').value;

        let updatedPage = updateComponentProperty(
          activePage,
          rowId,
          columnId,
          componentId,
          'position',
          {
            ...getComponentPropertyCategory(activePage, rowId, columnId, componentId, 'position'),
            properties: {
              ...getComponentPropertyCategory(activePage, rowId, columnId, componentId, 'position').properties,
              zIndex: {
                ...getComponentProperty(activePage, rowId, columnId, componentId, 'position', 'zIndex'),
                value: zIndex ? (parseInt(zIndex) || 0) - 1 : 0
              }
            }
          }
        );

        updatedPage = addPageHistoryEntry(design.id, page.id, {
          ...updatedPage,
          currentComponentId,
          currentColumnId,
          currentColumnParentId,
          currentRowId,
        })

        setPage(updatedPage);
        break;
      }
    }
  }

  const onComponentContextMenu = (e) => {
    e.stopPropagation();
  }

  const onComponentFocus = (e, componentId, columnId, rowId) => {
    e.stopPropagation();

    if (page.currentHistoryEntryIndex + 1 == page.history.length) {
      const updatedPage = addPageHistoryEntry(design.id, page.id, {
        currentComponentId: componentId,
        currentColumnId: columnId,
        currentColumnParentId: currentColumnParentId,
        currentRowId: rowId,
      })

      setPage(updatedPage);
    }

    resetSelections();

    e.target.classList.add(activeComponentClass);
  }

  const onComponentKeydown = (e, componentId, columnId, rowId) => {
    e.preventDefault();

    const top = parseInt(getComponentProperty(activePage, rowId, columnId, componentId, 'position', 'top').value);
    const left = parseInt(getComponentProperty(activePage, rowId, columnId, componentId, 'position', 'left').value);

    const height = parseInt(getComponentProperty(activePage, rowId, columnId, componentId, 'dimensions', 'height')?.value);
    const width = parseInt(getComponentProperty(activePage, rowId, columnId, componentId, 'dimensions', 'width')?.value);
    const radius = parseInt(getComponentProperty(activePage, rowId, columnId, componentId, 'dimensions', 'radius')?.value);

    const multiplier = e.ctrlKey ? 12 : 1;
    const action = e.shiftKey ? 'resize' : 'move';

    let value = null;

    let verticalPropertyCategory = action == 'move' ? 'position' : 'dimensions';
    let horizontalPropertyCategory = action == 'move' ? 'position' : 'dimensions';

    let verticalProperty = action == 'move' ? 'top' : 'height';
    let horizontalProperty = action == 'move' ? 'left' : 'width';

    if (radius >= 0) {
      verticalProperty = action == 'move' ? 'top' : 'radius';
      horizontalProperty = action == 'move' ? 'left' : 'radius';
    }

    switch(e.key) {
      case 'ArrowUp': {
        if (verticalProperty == 'top') {
          value = top - 1 * multiplier
        } else if (verticalProperty == 'height') {
          if ((height - 1 * multiplier) > 0)
            value = height - 1 * multiplier
          else value = height
        } else if (verticalProperty == 'radius') {
          if ((radius - 1 * multiplier) > 0)
            value = radius - 1 * multiplier
          else value = radius
        }

        let updatedPage =
          updateComponentProperty(
            activePage,
            rowId,
            columnId,
            componentId,
            verticalPropertyCategory,
            {
              ...getComponentPropertyCategory(activePage, rowId, columnId, componentId, verticalPropertyCategory),
              properties: {
                ...getComponentPropertyCategory(activePage, rowId, columnId, componentId, verticalPropertyCategory).properties,
                [verticalProperty]: {
                  ...getComponentProperty(activePage, rowId, columnId, componentId, verticalPropertyCategory, verticalProperty),
                  value,
                }
              }
            }
          )

          updatedPage = addPageHistoryEntry(design.id, page.id, {
            ...updatedPage,
            currentComponentId,
            currentColumnId,
            currentColumnParentId,
            currentRowId,
          })

          setPage(updatedPage);
        break;
      }

      case 'ArrowDown': {
        if (verticalProperty == 'top') {
          value = top + 1 * multiplier
        } else if (verticalProperty == 'height') {
          value = height + 1 * multiplier
        } else if (verticalProperty == 'radius') {
          value = radius + 1 * multiplier
        }

        let updatedPage =
          updateComponentProperty(
            activePage,
            rowId,
            columnId,
            componentId,
            verticalPropertyCategory,
            {
              ...getComponentPropertyCategory(activePage, rowId, columnId, componentId, verticalPropertyCategory),
              properties: {
                ...getComponentPropertyCategory(activePage, rowId, columnId, componentId, verticalPropertyCategory).properties,
                [verticalProperty]: {
                  ...getComponentProperty(activePage, rowId, columnId, componentId, verticalPropertyCategory, verticalProperty),
                  value,
                }
              }
            }
          )

          updatedPage = addPageHistoryEntry(design.id, page.id, {
            ...updatedPage,
            currentComponentId,
            currentColumnId,
            currentColumnParentId,
            currentRowId,
          })

          setPage(updatedPage);
          break;
      }

      case 'ArrowLeft': {
        if (horizontalProperty == 'left') {
          value = left - 1 * multiplier
        } else if (horizontalProperty == 'width') {
          if ((width - 1 * multiplier) > 0)
            value = width - 1 * multiplier
          else value = width
        } else if (horizontalProperty == 'radius') {
          if ((radius - 1 * multiplier) > 0)
            value = radius - 1 * multiplier
          else value = radius
        }

        let updatedPage =
          updateComponentProperty(
            activePage,
            rowId,
            columnId,
            componentId,
            horizontalPropertyCategory,
            {
              ...getComponentPropertyCategory(activePage, rowId, columnId, componentId, horizontalPropertyCategory),
              properties: {
                ...getComponentPropertyCategory(activePage, rowId, columnId, componentId, horizontalPropertyCategory).properties,
                [horizontalProperty]: {
                  ...getComponentProperty(activePage, rowId, columnId, componentId, horizontalPropertyCategory, horizontalProperty),
                  value,
                }
              }
            }
          )

        updatedPage = addPageHistoryEntry(design.id, page.id, {
          ...updatedPage,
          currentComponentId,
          currentColumnId,
          currentColumnParentId,
          currentRowId,
        })

        setPage(updatedPage);
        break;
      }

      case 'ArrowRight': {
        if (horizontalProperty == 'left') {
          value = left + 1 * multiplier
        } else if (horizontalProperty == 'width') {
          value = width + 1 * multiplier
        } else if (horizontalProperty == 'radius') {
          value = radius + 1 * multiplier
        }

        let updatedPage =
          updateComponentProperty(
            activePage,
            rowId,
            columnId,
            componentId,
            horizontalPropertyCategory,
            {
              ...getComponentPropertyCategory(activePage, rowId, columnId, componentId, horizontalPropertyCategory),
              properties: {
                ...getComponentPropertyCategory(activePage, rowId, columnId, componentId, horizontalPropertyCategory).properties,
                [horizontalProperty]: {
                  ...getComponentProperty(activePage, rowId, columnId, componentId, horizontalPropertyCategory, horizontalProperty),
                  value,
                }
              }
            }
          )

        updatedPage = addPageHistoryEntry(design.id, page.id, {
          ...updatedPage,
          currentComponentId,
          currentColumnId,
          currentColumnParentId,
          currentRowId,
        })

        setPage(updatedPage);
        break;
      }

      case 'D':
      case 'd': {
        if (e.ctrlKey) {
          const component = copyComponent(activePage, rowId, columnId, componentId);
          component.id = UUIDv4();

          if (!(rowId || columnId)) {
            component.properties.position.properties.left.value += 16;
            component.properties.position.properties.top.value += 16;
          }

          let updatedPage = addComponent(activePage, rowId, columnId, component);
          updatedPage = addPageHistoryEntry(design.id, page.id, {
            ...updatedPage,
            currentComponentId: component.id,
            currentColumnId,
            currentColumnParentId,
            currentRowId,
          })

          setPage(updatedPage);
        }
        break;
      }
      case 'Delete': {
        setCurrentComponentId(null);

        let updatedPage = deleteComponent(
          activePage,
          rowId,
          columnId,
          componentId,
        )

        updatedPage = addPageHistoryEntry(design.id, page.id, {
          ...updatedPage,
          currentComponentId: null,
          currentColumnId,
          currentColumnParentId,
          currentRowId,
        })

        setPage(updatedPage);

        break;
      }
      case 'Escape': {
        if (!columnId && !rowId) {
          document.getElementById('page').click();
          resetSelections();
        }

        const updatedPage = addPageHistoryEntry(design.id, page.id, {
          currentComponentId: null,
          currentColumnId,
          currentColumnParentId,
          currentRowId,
        })

        setPage(updatedPage);
        break;
      }
      case 'Tab':
        if (e.shiftKey) {
          const previousSibling = getPreviousSibling(activePage, rowId, columnId,componentId);

          switch (previousSibling.type) {
            case 'row':
              setCurrentComponentId(null);
              break;
            case 'column':
              setCurrentComponentId(null);
              setCurrentColumnId(previousSibling.value.id)
              break;
            case 'component':
              setCurrentComponentId(previousSibling.value.id)
              break;
          }
        } else {
          const nextSibling = getNextSibling(activePage, rowId, columnId, componentId);

          switch (nextSibling.type) {
            case 'column':
              setCurrentComponentId(null);
              setCurrentColumnId(nextSibling.value.id);
              break;
            case 'component':
              setCurrentComponentId(nextSibling.value.id)
              break;
          }
        }
        break;
    }
  }

  const onComponentMouseDown = (e, componentId, columnId, rowId) => {
    if (e.button == 0) {
      if (columnId || rowId) return;

      const page = document.getElementById('page')

      let x = e.pageX - page.offsetLeft + page.parentNode.scrollLeft;
      let y = e.pageY - page.offsetTop + page.parentNode.scrollTop;

      const componentX = getComponentProperty(activePage, rowId, columnId, componentId, 'position', 'left').value
      const componentY = getComponentProperty(activePage, rowId, columnId, componentId, 'position', 'top').value

      setComponentMouseCoordinateX(x - componentX);
      setComponentMouseCoordinateY(y - componentY);

      setSelectedComponentId(componentId);
      setSelectedComponentRowId(rowId);
      setSelectedComponentColumnId(columnId);
    }
  }

  const onComponentMouseUp = () => {
    setSelectedComponentId(null);
    setSelectedComponentRowId(null);
    setSelectedComponentColumnId(null);
  }

  const onPageKeyDown = (e) => {
    e.preventDefault();

    switch (e.key) {
      case 'c':
      case 'C': {
        if (e.ctrlKey) {
          console.log('copy')
        }
        break;
      }
      case 'r':
      case 'R':
        if (e.ctrlKey) {
          window.location.reload();
        }
        break;
      case 'v':
      case 'V': {
        if (e.ctrlKey) {
          console.log('paste')
        }
        break;
      }
      case 'y':
      case 'Y': {
        if (e.ctrlKey) {
          setPage(redoPageChanges(design.id, page.id))
        }
        break;
      }
      case 'z':
      case 'Z': {
        if (e.ctrlKey) {
          setPage(undoPageChanges(design.id, page.id))
        }
        break;
      }
    }
  }

  const onPageMouseMove = (e) => {
    const pageElement = document.getElementById('page')

    let x = e.pageX - pageElement.offsetLeft + pageElement.parentNode.scrollLeft;
    let y = e.pageY - pageElement.offsetTop + pageElement.parentNode.scrollTop;

    if (selectedComponentId) {
      const newComponentLeft = x - componentMouseCoordinateX;
      const newComponentTop = y - componentMouseCoordinateY;

      let updatedPage =
        updateComponentProperty(
          activePage,
          selectedComponentRowId,
          selectedComponentColumnId,
          selectedComponentId,
          'position',
          {
            ...getComponentPropertyCategory(activePage, selectedComponentRowId, selectedComponentColumnId, selectedComponentId, 'position'),
            properties: {
              ...getComponentPropertyCategory(activePage, selectedComponentRowId, selectedComponentColumnId, selectedComponentId, 'position').properties,
              top: {
                ...getComponentProperty(activePage, selectedComponentRowId, selectedComponentColumnId, selectedComponentId, 'position', 'top'),
                value: newComponentTop,
              },
              left: {
                ...getComponentProperty(activePage, selectedComponentRowId, selectedComponentColumnId, selectedComponentId, 'position', 'left'),
                value: newComponentLeft,
              },
            }
          }
        );

      updatedPage = addPageHistoryEntry(design.id, page.id, {
        ...updatedPage,
        currentComponentId,
        currentColumnId,
        currentColumnParentId,
        currentRowId,
      })

      setPage(updatedPage);
    }
  }

  const onPageMouseUp = () => {
    setSelectedComponentId(null);
    setSelectedComponentRowId(null);
    setSelectedComponentColumnId(null);
  }

  const onRowKeydown = (e, rowId, columnId, currentComponentId) => {
    e.preventDefault();
    if (columnId || currentComponentId) return;

    const height = parseInt(getRowProperty(activePage, rowId, 'height')?.value) || 0;
    const width = parseInt(getRowProperty(activePage, rowId, 'width')?.value) || 0;

    const multiplier = e.ctrlKey ? 12 : 1;

    let value = 0;

    switch(e.key) {
      case 'ArrowUp': {
        if (height > 0)
        value = height - 1 * multiplier

        let updatedPage =
          updateRowProperty(
            activePage,
            rowId,
            'height',
            { value }
          )

          updatedPage = addPageHistoryEntry(design.id, page.id, {
            ...updatedPage,
            currentComponentId,
            currentColumnId,
            currentColumnParentId,
            currentRowId,
          })

          setPage(updatedPage);
          break;
        }
      case 'ArrowDown': {
        value = height + 1 * multiplier

        let updatedPage =
          updateRowProperty(
            activePage,
            rowId,
            'height',
            { value }
          )

        updatedPage = addPageHistoryEntry(design.id, page.id, {
          ...updatedPage,
          currentComponentId,
          currentColumnId,
          currentColumnParentId,
          currentRowId,
        })

        setPage(updatedPage);
        break;
      }
      case 'ArrowLeft': {
        if (width > 0)
        value = width - 1 * multiplier

        let updatedPage =
          updateRowProperty(
            activePage,
            rowId,
            'width',
            { value }
          )

        updatedPage = addPageHistoryEntry(design.id, page.id, {
          ...updatedPage,
          currentComponentId,
          currentColumnId,
          currentColumnParentId,
          currentRowId,
        })

        setPage(updatedPage);
        break;
      }
      case 'ArrowRight': {
        value = width + 1 * multiplier

        let updatedPage =
          updateRowProperty(
            activePage,
            rowId,
            'width',
            { value }
          )

        updatedPage = addPageHistoryEntry(design.id, page.id, {
          ...updatedPage,
          currentComponentId,
          currentColumnId,
          currentColumnParentId,
          currentRowId,
        })

        setPage(updatedPage);
        break;
      }
      case 'Delete': {
        setCurrentRowId(null);

        let updatedPage = deleteRow(
          activePage,
          rowId,
        )

        updatedPage = addPageHistoryEntry(design.id, page.id, {
          ...updatedPage,
          currentComponentId: null,
          currentColumnId: null,
          currentColumnParentId: null,
          currentRowId: null,
        })

        setPage(updatedPage);
        break;
      }
      case 'Escape':
        setCurrentRowId(null);
        document.getElementById('page').click();
        resetSelections();
        break;
      case 'Tab':
        if (e.shiftKey) {
          const previousSibling = getPreviousSibling(activePage, rowId);

          switch (previousSibling.type) {
            case 'row':
              setCurrentRowId(previousSibling.value.id);
              break;
          }
        } else {
          const nextSibling = getNextSibling(activePage, rowId);

          switch (nextSibling.type) {
            case 'column':
              setCurrentColumnId(nextSibling.value.id);
              setCurrentComponentId(null);
              break;
            case 'component':
              setCurrentComponentId(nextSibling.value.id);
              break;
            case 'row':
              setCurrentRowId(nextSibling.value.id);
              break;
          }
        }
        break;
    }
  }

  return (
    <div className={styles['NewDocumentDesignSection__Pages']}>
      {
        <div
          className={styles['NewDocumentDesignSection__Page']}
          id="page"
          onKeyDown={onPageKeyDown}
          onMouseMove={onPageMouseMove}
          onMouseUp={onPageMouseUp}
          tabIndex={0}
          style={{
            gap: activePage.gap,
            height: activePage.autoLayout ? 'max-content' : `${activePage.height / scaleFactor}em`,
            paddingBottom: activePage.paddingBottom,
            paddingLeft: activePage.paddingLeft,
            paddingRight: activePage.paddingRight,
            paddingTop: activePage.paddingTop,
            width: activePage.autoLayout ? 'max-content' : `${activePage.width / scaleFactor}em`,
          }}
        >
          {
            activePage.autoLayout ?
              getRowComponents(
                activePage,
                currentColumnId,
                currentComponentId,
                styles,
                activeDesign,
                activePage.gridVisible,
                activePage.rows,
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
              )
              : getPageComponents(
                activePage,
                styles,
                activeDesign,
                scaleFactor,
                onComponentBlur,
                onComponentContextMenu,
                onComponentContextMenuAction,
                onComponentFocus,
                onComponentKeydown,
                onComponentMouseDown,
                onComponentMouseUp,
              )
          }
        </div>
      }
    </div>
  )
}

export default NewDesignMainSection
