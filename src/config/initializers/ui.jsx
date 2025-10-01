import { BrowserRouter } from "react-router-dom"
import { Provider } from "react-redux"

import { store } from "../../db/store"

import RoutesConfiguration from '../Routes';

export const run = () => {
  window.reactRootElement.render(
    <BrowserRouter>
      <Provider store={store}>
        <RoutesConfiguration />
      </Provider>
    </BrowserRouter>
  )
}
