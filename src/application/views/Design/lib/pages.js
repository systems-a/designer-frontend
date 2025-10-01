import { v4 as UUIDv4 } from 'uuid';
import { displayComponent } from "./components";

const addPage = (doc) => {
  return ({
    ...doc,
    pages: [
      ...doc.pages,
      getDefaultPageProperties(doc)
    ]
  });
}

const deletePage = (doc, index) => {
  if (doc.pages.length == 1) return doc;
  if (!confirm('Are you sure?')) return doc;
  return ({
    ...doc,
    pages: doc.pages.filter((p) => p.page_number !== doc.pages[index].page_number)
  });
}

const getPageComponents = (doc, setDoc, pageIndex, onComponentBlur, onComponentFocus, onComponentKeydown) => {
  const page = doc.pages[pageIndex];

  return page.components.map((component) => {
    return displayComponent(
      doc,
      setDoc,
      pageIndex,
      null,
      null,
      component,
      (e) => onComponentBlur(e),
      (e) => onComponentFocus(e, component.id, null, null),
      (e) => onComponentKeydown(e, component.id, null, null),
    )
  })
}

const updatePage = (doc, pageIndex, property, value) => {
  return ({
    ...doc,
    pages: doc.pages.map((p, i) => (i === pageIndex ? { ...p, [property]: value } : p))
  });
}

const getDefaultPageProperties = (doc) => pageProperties(doc);

const pageProperties = (doc) => ({
  id: UUIDv4(),
  title: `Page ${doc?.pages.length + 1}`,
  page_number: doc?.pages.length + 1,
  width: 800,
  height: 200,
  autoLayout: false,
  rows: [],
  columns: [],
  components: []
})

export {
  pageProperties,

  addPage,
  deletePage,
  getDefaultPageProperties,
  getPageComponents,
  updatePage,
}
