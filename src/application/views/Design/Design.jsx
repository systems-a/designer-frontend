import { useEffect, useRef, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import styles from './styles.module.css'

import DesignMainSection from './Main/Main';
import DesignLeftSection from './Left/Left';
import DesignRightSection from './Right/Right';
import Header from '../../components/Header/Header';

import { addDesignHistoryEntry, getDesign } from '../../services/storage/design';
import { addPageHistoryEntry, getPage } from '../../services/storage/page';

function Design() {
  const pageRef = useRef();
  const navigate = useNavigate();

  const { designId, pageId } = useParams();

  const [design, setDesign] = useState(getDesign(designId));
  const [activeDesign, setActiveDesign] = useState(design?.history[design?.currentHistoryEntryIndex]);
  const [page, setPage] = useState(getPage(designId, pageId));
  const [activePage, setActivePage] = useState(page?.history[page?.currentHistoryEntryIndex]);

  const [currentRowId, setCurrentRowId] = useState(activePage ? activePage.currentRowId : null);
  const [currentColumnParentId, setCurrentColumnParentId] = useState(activePage ? activePage.currentColumnParentId : null);
  const [currentColumnId, setCurrentColumnId] = useState(activePage ? activePage.currentColumnId : null);
  const [currentComponentId, setCurrentComponentId] = useState(activePage ? activePage.currentComponentId : null);

  const resetSelections = (row = true, column = true, component = true) => {
    if (row) document.querySelectorAll(`.${styles['Design__Active_Row']}`).forEach((row) => {
      row.classList.remove(styles['Design__Active_Row']);
    });
    if (column) document.querySelectorAll(`.${styles['Design__Active_Column']}`).forEach((column) => {
      column.classList.remove(styles['Design__Active_Column']);
    });
    if (component) document.querySelectorAll(`.${styles['Design__Active_Component']}`).forEach((component) => {
      component.classList.remove(styles['Design__Active_Component']);
    });
  }

  const setCurrentColumn = (e, rowId) => {
    e.stopPropagation();

    const columnElement = e.target;

    const updatedPage = addPageHistoryEntry(design.id, page.id, {
      currentComponentId: null,
      currentColumnId: e.target.id,
      currentColumnParentId: rowId,
      currentRowId: rowId,
    })

    setPage(updatedPage);

    resetSelections();

    columnElement.classList.add(styles['Design__Active_Column'])
  }

  const setCurrentRow = (e) => {
    const rowElement = e.target;

    const updatedPage = addPageHistoryEntry(design.id, page.id, {
      currentComponentId: null,
      currentColumnId: null,
      currentColumnParentId: null,
      currentRowId: e.target.id,
    })

    setPage(updatedPage);

    resetSelections();

    rowElement.classList.add(styles['Design__Active_Row'])
  }

  useEffect(() => {
    if (!currentComponentId && !currentColumnId && !currentColumnParentId && !currentRowId) {
      document.getElementById('page')?.focus();
    }

    const pageClickEventListener = (e) => {
      if (!(e.target.classList.contains(styles['Design__Active_Row'])
        || e.target.classList.contains(styles['Design__Active_Column'])
        || e.target.classList.contains(styles['Design__Active_Component'])
        || e.target.classList.contains(styles['Design__Context_Menu'])
      )) {
        const updatedPage = addPageHistoryEntry(design.id, page.id, {
          currentComponentId: null,
          currentColumnId: null,
          currentColumnParentId: null,
          currentRowId: null,
        })

        setPage(updatedPage);
        resetSelections();
      }
    }

    document.getElementById('page')?.addEventListener(('click'), pageClickEventListener)

    return () => {
      document.getElementById('page')?.removeEventListener(('click'), pageClickEventListener)
    }
  }, [
    design,
    page,
    currentColumnId,
    currentColumnParentId,
    currentComponentId,
    currentRowId,
  ])

  useEffect(() => {
    if (!design || !page) return;

    setActivePage(page.history[page.currentHistoryEntryIndex]);

    navigate(`/design/${design.id}/pages/${page.id}`);
  }, [design, page, pageId, navigate])

  useEffect(() => {
    if (currentComponentId) document.getElementById(currentComponentId)?.focus();
    else if (currentColumnId) {
      document.getElementById(currentColumnId)?.focus();
    } else if (currentRowId) {
      document.getElementById(currentRowId)?.focus();
    } else {
      pageRef.current?.focus();
    }
  }, [currentComponentId, currentColumnId, currentRowId])

  useEffect(() => {
    setPage(getPage(designId, pageId))

    // Record page navigation in design history
    setDesign(addDesignHistoryEntry(designId, {
      currentPageId: pageId,
    }))
  }, [designId, pageId])

  useEffect(() => {
    if (!activePage) return;
    setCurrentComponentId(activePage.currentComponentId);
    setCurrentColumnParentId(activePage.currentColumnParentId);
    setCurrentColumnId(activePage.currentColumnId);
    setCurrentRowId(activePage.currentRowId);
  }, [activePage]);

  if (!activeDesign || !activePage) return <Navigate to="/" />

  return (
    <div className={styles['Design']} ref={pageRef}>
      <Header />

      <main>
        <DesignLeftSection
          activeDesign={activeDesign}
          activePage={activePage}
          currentColumnId={currentColumnId}
          currentColumnParentId={currentColumnParentId}
          currentComponentId={currentComponentId}
          currentRowId={currentRowId}
          design={design}
          page={page}
          setCurrentColumnId={setCurrentColumnId}
          setCurrentColumnParentId={setCurrentColumnParentId}
          setCurrentComponentId={setCurrentComponentId}
          setCurrentRowId={setCurrentRowId}
          setActiveDesign={setActiveDesign}
          setActivePage={setActivePage}
          setDesign={setDesign}
          setPage={setPage}
        />

        <DesignMainSection
          activeComponentClass={styles['Design__Active_Component']}
          activeDesign={activeDesign}
          activePage={activePage}
          currentColumnId={currentColumnId}
          currentColumnParentId={currentColumnParentId}
          currentComponentId={currentComponentId}
          currentRowId={currentRowId}
          design={design}
          page={page}
          resetSelections={resetSelections}
          setCurrentColumn={setCurrentColumn}
          setCurrentColumnId={setCurrentColumnId}
          setCurrentColumnParentId={setCurrentColumnParentId}
          setCurrentComponentId={setCurrentComponentId}
          setCurrentRow={setCurrentRow}
          setCurrentRowId={setCurrentRowId}
          setActiveDesign={setActiveDesign}
          setActivePage={setActivePage}
          setDesign={setDesign}
          setPage={setPage}
        />

        <DesignRightSection
          activeDesign={activeDesign}
          activePage={activePage}
          currentComponentId={currentComponentId}
          currentColumnId={currentColumnId}
          currentRowId={currentRowId}
          design={design}
          page={page}
          setCurrentColumnId={setCurrentColumnId}
          setCurrentComponentId={setCurrentComponentId}
          setCurrentRowId={setCurrentRowId}
          setPage={setPage}
        />
      </main>
    </div>
  )
}

export default Design
