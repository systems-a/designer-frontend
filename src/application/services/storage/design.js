import { v4 as UUIDv4 } from 'uuid';
import { createNewPage } from "./page";

const addDesignHistoryEntry = (designId, entry) => {
  const design = getDesign(designId);
  if (!design) return design;

  const updatedDesign = {
    ...design,
    history: [
      // ...design.history.slice(0, design.currentHistoryEntryIndex + 1),
      {
        ...design.history[0],
        ...design.history[design.currentHistoryEntryIndex],
        id: UUIDv4(),
        ...entry,
      }
    ],
    currentHistoryEntryIndex: 0,
    // currentHistoryEntryIndex: design.currentHistoryEntryIndex + 1,
  };

  localStorage.setItem(designId, JSON.stringify(updatedDesign));
  return updatedDesign;
}

const createDesign = () => {
  const newDesignId = UUIDv4();

  localStorage.setItem(newDesignId, JSON.stringify({
    currentHistoryEntryIndex: 0,
    history: [
      {
        id: UUIDv4(),
        currentPageId: null,
        pages: [],
        title: 'Untitled design',
      }
    ],
    id: newDesignId,
    currentPageNumber: 0,
  }));

  let designIds = []
  if (localStorage.getItem('designIds')) designIds = JSON.parse(localStorage.getItem('designIds'));
  designIds.push(newDesignId);
  localStorage.setItem('designIds', JSON.stringify(designIds));

  return newDesignId;
}

const getDesign = (designId) => {
  if (!localStorage.getItem(designId)) return null;
  const design = JSON.parse(localStorage.getItem(designId));

  return design;
}

const indexDesigns = () => {
  if (!localStorage.getItem('designIds')) return null;
  const designs = JSON.parse(localStorage.getItem('designIds'));
  return designs;
}

const initializeEmptyDesign = () => {
  const designId = createDesign();
  const pageId = createNewPage(designId);

  return {
    url: `${designId}/pages/${pageId}`
  }
}

const updateDesign = (designId, updatedProperties) => {
  const design = getDesign(designId);
  if (!design) return;

  const updatedDesign = {
    ...design,
    ...updatedProperties
  };

  localStorage.setItem(designId, JSON.stringify(updatedDesign));
}

export {
  addDesignHistoryEntry,
  getDesign,
  indexDesigns,
  initializeEmptyDesign,
  updateDesign,
}
