import RowProperties from './RowProperties';
import ColumnProperties from './ColumnProperties';
import ComponentProperties from './ComponentProperties';

function NewDocumentRightSection({
  currentComponentId,
  currentColumnId,
  currentPageIndex,
  currentRowId,
  doc,
  setCurrentColumnId,
  setCurrentComponentId,
  setCurrentRowId,
  setDoc,
}) {
  if (currentComponentId) return (
    <ComponentProperties
      currentComponentId={currentComponentId}
      currentColumnId={currentColumnId}
      currentPageIndex={currentPageIndex}
      currentRowId={currentRowId}
      doc={doc}
      setCurrentComponentId={setCurrentComponentId}
      setDoc={setDoc}
    />
  )

  if (currentColumnId) return (
    <ColumnProperties
      currentColumnId={currentColumnId}
      currentPageIndex={currentPageIndex}
      currentRowId={currentRowId}
      doc={doc}
      setCurrentColumnId={setCurrentColumnId}
      setDoc={setDoc}
    />
  )

  if (currentRowId) return (
    <RowProperties
      currentPageIndex={currentPageIndex}
      currentRowId={currentRowId}
      doc={doc}
      setCurrentRowId={setCurrentRowId}
      setDoc={setDoc}
    />
  )
}

export default NewDocumentRightSection
