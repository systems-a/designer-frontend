import { v4 as UUIDv4 } from 'uuid';
import { createNewPage } from "./page";

const addDesignHistoryEntry = (designId, entry) => {
  const design = getDesign(designId);
  if (!design) return design;

  const updatedDesign = {
    ...design,
    history: [
      ...design.history.slice(0, design.currentHistoryEntryIndex + 1),
      {
        ...design.history[design.currentHistoryEntryIndex],
        id: UUIDv4(),
        ...entry,
      }
    ],
    currentHistoryEntryIndex: design.currentHistoryEntryIndex,
    // currentHistoryEntryIndex: design.currentHistoryEntryIndex + 1,
  };

  window[designId] = JSON.stringify(updatedDesign);
  return updatedDesign;
}

const createDesign = () => {
  const newDesignId = UUIDv4();

  window[newDesignId] = JSON.stringify({
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
  });

  let designIds = []
  if (window['designIds']) designIds = JSON.parse(window['designIds']);
  designIds.push(newDesignId);
  window['designIds'] = JSON.stringify(designIds);

  return newDesignId;
}

const getDesign = (designId) => {
  if (!window[designId]) return null;
  const design = JSON.parse(window[designId])

  return design;
}

const indexDesigns = () => {
  if (!window['designIds']) return null;
  const designs = JSON.parse(window['designIds']);
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

  window[designId] = JSON.stringify(updatedDesign);
}

export {
  addDesignHistoryEntry,
  getDesign,
  indexDesigns,
  initializeEmptyDesign,
  updateDesign,
}
