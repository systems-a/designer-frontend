import { getRowComponents } from '../lib/layout';
import { getPageComponents } from '../lib/pages';

import styles from './styles.module.css'
import {
  deleteComponent,
  getComponentProperty,
  updateComponentProperty
} from '../lib/components';

function NewDesignMainSection({
  activeComponentClass,
  currentPageIndex,
  doc,
  resetSelections,
  setCurrentColumn,
  setCurrentColumnId,
  setCurrentComponentId,
  setCurrentRow,
  setCurrentRowId,
  setDoc,
}) {
  const page = doc.pages[currentPageIndex];

  const onComponentBlur = (e) => {
    e.stopPropagation();
  }

  const onComponentFocus = (e, componentId, columnId, rowId) => {
    e.stopPropagation();

    setCurrentColumnId(columnId);
    setCurrentRowId(rowId);
    setCurrentComponentId(componentId);

    resetSelections();

    e.target.classList.add(activeComponentClass);
  }

  const onComponentKeydown = (e, componentId, columnId, rowId) => {
    e.preventDefault();

    const top = parseInt(getComponentProperty(doc, currentPageIndex, rowId, columnId, componentId, 'top').value);
    const left = parseInt(getComponentProperty(doc, currentPageIndex, rowId, columnId, componentId, 'left').value);

    const height = parseInt(getComponentProperty(doc, currentPageIndex, rowId, columnId, componentId, 'height')?.value);
    const width = parseInt(getComponentProperty(doc, currentPageIndex, rowId, columnId, componentId, 'width')?.value);
    const radius = parseInt(getComponentProperty(doc, currentPageIndex, rowId, columnId, componentId, 'radius')?.value);

    const multiplier = e.ctrlKey ? 12 : 1;
    const action = e.shiftKey ? 'resize' : 'move';

    let value = {}

    let verticalProperty = action == 'move' ? 'top' : 'height';
    let horizontalProperty = action == 'move' ? 'left' : 'width';

    if (radius >= 0) {
      verticalProperty = action == 'move' ? 'top' : 'radius';
      horizontalProperty = action == 'move' ? 'left' : 'radius';
    }

    switch(e.key) {
      case 'ArrowUp':
        if (verticalProperty == 'top') {
          value = { value: top - 1 * multiplier }
        } else if (verticalProperty == 'height') {
          if (height > 0)
          value = { value: height - 1 * multiplier}
        } else if (verticalProperty == 'radius') {
          if (radius > 0)
          value = { value: radius - 1 * multiplier}
        }

        setDoc(
          updateComponentProperty(
            doc,
            currentPageIndex,
            rowId,
            columnId,
            componentId,
            verticalProperty,
            value,
          )
        );
        break;
      case 'ArrowDown':
        if (verticalProperty == 'top') {
          value = { value: top + 1 * multiplier }
        } else if (verticalProperty == 'height') {
          value = { value: height + 1 * multiplier}
        } else if (verticalProperty == 'radius') {
          value = { value: radius + 1 * multiplier}
        }

        setDoc(
          updateComponentProperty(
            doc,
            currentPageIndex,
            rowId,
            columnId,
            componentId,
            verticalProperty,
            value,
          )
        );
        break;
      case 'ArrowLeft':
        if (horizontalProperty == 'left') {
          value = { value: left - 1 * multiplier }
        } else if (horizontalProperty == 'width') {
          if (width > 0)
          value = { value: width - 1 * multiplier }
        } else if (horizontalProperty == 'radius') {
          if (radius > 0)
          value = { value: radius - 1 * multiplier }
        }

        setDoc(
          updateComponentProperty(
            doc,
            currentPageIndex,
            rowId,
            columnId,
            componentId,
            horizontalProperty,
            value,
          )
        );
        break;
      case 'ArrowRight':
        if (horizontalProperty == 'left') {
          value = { value: left + 1 * multiplier }
        } else if (horizontalProperty == 'width') {
          value = { value: width + 1 * multiplier }
        } else if (horizontalProperty == 'radius') {
          value = { value: radius + 1 * multiplier }
        }

        setDoc(
          updateComponentProperty(
            doc,
            currentPageIndex,
            rowId,
            columnId,
            componentId,
            horizontalProperty,
            value,
          )
        );
        break;
      case 'Delete':
        setCurrentComponentId(null);
        setDoc(
          deleteComponent(
            doc,
            currentPageIndex,
            rowId,
            columnId,
            componentId,
          )
        )
        break;
    }
  }

  return (
    <div className={styles['NewDocumentDesignSection__Pages']}>
      <div className={styles['NewDocumentDesignSection__Container']} id="pageContainer">
        {
          page ? (
            <div
              className={styles['NewDocumentDesignSection__Page']}
              style={{
                width: page.autoLayout ? 'max-content' : `${page.width / 12}em`,
                height: page.autoLayout ? 'max-content' : `${page.height / 12}em`
              }}
              id="page"
            >
              {
                page.autoLayout ?
                  getRowComponents(doc, setDoc, currentPageIndex, page.rows, onComponentBlur, onComponentFocus, onComponentKeydown, setCurrentRow, setCurrentColumn, styles)
                  : getPageComponents(doc, setDoc, currentPageIndex, onComponentBlur, onComponentFocus, onComponentKeydown)
              }
            </div>
          ) : null
        }
      </div>
    </div>
  )
}

export default NewDesignMainSection
