import { useEffect, useRef, useState } from 'react'
import styles from './styles.module.css'

import {
  getDefaultPageProperties,
} from './lib/pages';

import DesignMainSection from './Main/Main';
import DesignLeftSection from './Left/Left';
import DesignRightSection from './Right/Right';

function Design() {
  const pageRef = useRef();

  const storedDocument = JSON.parse(localStorage.getItem('document'));

  const [design, setDesign] = useState(storedDocument ? storedDocument : {
    title: 'New document',
    pages: [getDefaultPageProperties()]
  });

  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [currentRowId, setCurrentRowId] = useState(null);
  const [currentColumnParentId, setCurrentColumnParentId] = useState(null);
  const [currentColumnId, setCurrentColumnId] = useState(null);
  const [currentComponentId, setCurrentComponentId] = useState(null);

  const resetSelections = () => {
    document.querySelectorAll(`.${styles['Design__Active_Row']}`).forEach((row) => {
      row.classList.remove(styles['Design__Active_Row']);
    });
    document.querySelectorAll(`.${styles['Design__Active_Column']}`).forEach((column) => {
      column.classList.remove(styles['Design__Active_Column']);
    });
    document.querySelectorAll(`.${styles['Design__Active_Component']}`).forEach((component) => {
      component.classList.remove(styles['Design__Active_Component']);
    });
  }

  const setCurrentColumn = (e, rowId) => {
    e.stopPropagation();

    const columnElement = e.target;

    setCurrentComponentId(null);
    setCurrentColumnId(e.target.id);
    setCurrentColumnParentId(rowId);
    setCurrentRowId(rowId);

    resetSelections();

    columnElement.classList.add(styles['Design__Active_Column'])
  }

  const setCurrentRow = (e) => {
    const rowElement = e.target;

    setCurrentRowId(e.target.id);
    setCurrentColumnId(null);
    setCurrentColumnParentId(null);
    setCurrentComponentId(null);

    resetSelections();

    rowElement.classList.add(styles['Design__Active_Row'])
  }

  const updateDocument = (property, value) => {
     setDesign({
      ...design,
      [property]: value,
    });
  }

  useEffect(() => {
    localStorage.setItem('document', JSON.stringify(design));

    const pageClickEventListener = (e) => {
      if (!(e.target.classList.contains(styles['Design__Active_Row']) ||
        e.target.classList.contains(styles['Design__Active_Column']) ||
        e.target.classList.contains(styles['Design__Active_Component'])
      )) {
        resetSelections();
        setCurrentRowId(null)
        setCurrentColumnId(null);
        setCurrentColumnParentId(null);
        setCurrentComponentId(null);
      }
    }

    document.getElementById('page')?.addEventListener(('click'), pageClickEventListener)

    return () => {
      document.getElementById('page')?.removeEventListener(('click'), pageClickEventListener)
    }
  }, [currentPageIndex, design])

  useEffect(() => {
    setCurrentRowId(null);
    setCurrentColumnId(null);
    setCurrentColumnParentId(null);
    setCurrentComponentId(null);
  }, [currentPageIndex])

  return (
    <div className={styles['Design']} ref={pageRef}>
      <DesignLeftSection
        currentColumnId={currentColumnId}
        currentColumnParentId={currentColumnParentId}
        currentPageIndex={currentPageIndex}
        currentRowId={currentRowId}
        doc={design}
        documentPageRef={pageRef}
        setCurrentColumnId={setCurrentColumnId}
        setCurrentColumnParentId={setCurrentColumnParentId}
        setCurrentComponentId={setCurrentComponentId}
        setCurrentPageIndex={setCurrentPageIndex}
        setCurrentRowId={setCurrentRowId}
        setDoc={setDesign}
        updateDoc={updateDocument}
      />

      <DesignMainSection
        activeComponentClass={styles['Design__Active_Component']}
        currentPageIndex={currentPageIndex}
        doc={design}
        resetSelections={resetSelections}
        setCurrentColumn={setCurrentColumn}
        setCurrentColumnId={setCurrentColumnId}
        setCurrentComponentId={setCurrentComponentId}
        setCurrentRow={setCurrentRow}
        setCurrentRowId={setCurrentRowId}
        setDoc={setDesign}
      />

      <DesignRightSection
        currentComponentId={currentComponentId}
        currentColumnId={currentColumnId}
        currentPageIndex={currentPageIndex}
        currentRowId={currentRowId}
        doc={design}
        setCurrentColumnId={setCurrentColumnId}
        setCurrentComponentId={setCurrentComponentId}
        setCurrentRowId={setCurrentRowId}
        setDoc={setDesign}
      />
    </div>
  )
}

export default Design
