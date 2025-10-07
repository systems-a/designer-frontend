import { v4 as UUIDv4 } from 'uuid';
import { getPageProperties } from "../../lib/pages";

const addPageHistoryEntry = (designId, pageId, entry) => {
  const page = getPage(designId, pageId);
  if (!page) return null;

  const updatedPage = {
    ...page,
    history: [
      // ...page.history.slice(0, page.currentHistoryEntryIndex + 1),
      {
        ...page.history[0],
        ...page.history[page.currentHistoryEntryIndex],
        id: UUIDv4(),
        ...entry,
      }
    ],
    currentHistoryEntryIndex: 0,
    // currentHistoryEntryIndex: page.currentHistoryEntryIndex + 1,
  };

  localStorage.setItem(pageId, JSON.stringify(updatedPage));
  return updatedPage;
}

const createNewPage = (designId) => {
  const design = JSON.parse(localStorage.getItem(designId));
  if (!design) return null;

  const newPageId = UUIDv4();
  const newPageTitle = `Page ${design.currentPageNumber + 1}`;
  const newPage = getPageProperties(newPageTitle, design.currentPageNumber + 1);

  localStorage.setItem(newPageId, JSON.stringify({
    currentHistoryEntryIndex: 0,
    history: [
      newPage,
    ],
    id: newPageId,
  }));

  localStorage.setItem(designId, JSON.stringify({
    ...design,
    currentHistoryEntryIndex: design.currentHistoryEntryIndex + 1,
    history: [
      ...design.history,
      {
        ...design.history[design.currentHistoryEntryIndex],
        currentPageId:  newPageId,
        id: UUIDv4(),
        pages: [
          ...design.history[design.currentHistoryEntryIndex].pages,
          {
            id: newPageId,
            title: newPageTitle,
          },
        ],
      },
    ],
    currentPageNumber: design.currentPageNumber + 1,
  }))

  return newPageId;
}

const deletePage = (designId, pageId) => {
  const design = JSON.parse(localStorage.getItem(designId));
  if (!design) return null;

  const updatedPages = design.history[design.currentHistoryEntryIndex].pages.filter((entry) => entry.id !== pageId);

  let currentPageId = design.history[design.currentHistoryEntryIndex].currentPageId;
  let updatedCurrentPageId = currentPageId

  if (currentPageId == pageId) {
    let currentPageIndex = design.history[design.currentHistoryEntryIndex].pages.findIndex((entry) => entry.id == pageId);

    if (currentPageIndex == 0) {
      updatedCurrentPageId = design.history[design.currentHistoryEntryIndex].pages[1].id
    } else if (currentPageIndex == design.history[design.currentHistoryEntryIndex].pages.length - 1) {
      updatedCurrentPageId = design.history[design.currentHistoryEntryIndex].pages[design.history[design.currentHistoryEntryIndex].pages.length - 2].id
    } else {
      updatedCurrentPageId = design.history[design.currentHistoryEntryIndex].pages[currentPageIndex - 1].id
    }
  }

  const newHistoryEntry = {
    id: UUIDv4(),
    title: design.history[design.history.length - 1].title,
    pages: updatedPages,
    currentPageId: updatedCurrentPageId,
  };

  const updatedDesign = {
    ...design,
    currentHistoryEntryIndex: design.currentHistoryEntryIndex + 1,
    history: [
      ...design.history,
      {
        ...design.history[design.currentHistoryEntryIndex],
        ...newHistoryEntry,
      },
    ],
  }
  localStorage.setItem(designId, JSON.stringify(updatedDesign));

  return { updatedDesign, updatedCurrentPageId };
}

const getPage = (designId, pageId) => {
  if (!localStorage.getItem(designId)) return null;
  const design = JSON.parse(localStorage.getItem(designId));
  if (!design) return null;

  const designHistory = design.history;
  const activeDesign = designHistory[design.currentHistoryEntryIndex];
  const pages = activeDesign.pages;

  if (!pages.find(page => page.id === pageId)) return null;

  return JSON.parse(localStorage.getItem(pageId));
}

const redoPageChanges = (designId, pageId) => {
  const page = getPage(designId, pageId);
  if (!page) return null;

  const updatedPage = {
    ...page,
    currentHistoryEntryIndex:
      page.currentHistoryEntryIndex < page.history.length - 1 ?
        page.currentHistoryEntryIndex + 1 : page.history.length - 1
  };

  localStorage.setItem(pageId, JSON.stringify(updatedPage));
  return updatedPage;
}

const undoPageChanges = (designId, pageId) => {
  const page = getPage(designId, pageId);
  if (!page) return null;

  const updatedPage = {
    ...page,
    currentHistoryEntryIndex: page.currentHistoryEntryIndex > 0 ? page.currentHistoryEntryIndex - 1 : 0,
  };

  localStorage.setItem(pageId, JSON.stringify(updatedPage));
  return updatedPage;
}

export {
  addPageHistoryEntry,
  createNewPage,
  deletePage,
  getPage,
  redoPageChanges,
  undoPageChanges,
}
