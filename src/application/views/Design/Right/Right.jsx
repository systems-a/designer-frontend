import RowProperties from './RowProperties';
import ColumnProperties from './ColumnProperties';
import ComponentProperties from './ComponentProperties';

function NewDocumentRightSection({
  activeDesign,
  activePage,
  currentComponentId,
  currentColumnId,
  currentRowId,
  design,
  page,
  setCurrentColumnId,
  setCurrentComponentId,
  setCurrentRowId,
  setPage,
}) {
  if (currentComponentId) return (
    <ComponentProperties
      activeDesign={activeDesign}
      activePage={activePage}
      currentComponentId={currentComponentId}
      currentColumnId={currentColumnId}
      currentRowId={currentRowId}
      design={design}
      page={page}
      setCurrentComponentId={setCurrentComponentId}
      setPage={setPage}
    />
  )

  if (currentColumnId) return (
    <ColumnProperties
      activeDesign={activeDesign}
      activePage={activePage}
      currentColumnId={currentColumnId}
      currentRowId={currentRowId}
      design={design}
      page={page}
      setCurrentColumnId={setCurrentColumnId}
      setPage={setPage}
    />
  )

  if (currentRowId) return (
    <RowProperties
      activeDesign={activeDesign}
      activePage={activePage}
      currentRowId={currentRowId}
      design={design}
      page={page}
      setCurrentRowId={setCurrentRowId}
      setPage={setPage}
    />
  )
}

export default NewDocumentRightSection
