import { configureStore } from "@reduxjs/toolkit";

import session from "../application/services/session"

export const store = configureStore({
  reducer: {
    session: session.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
})
