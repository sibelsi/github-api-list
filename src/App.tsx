import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Provider} from "react-redux";
import {store} from "@shared/lib/redux/store.ts";
import {CredentialsPage, ReposPage} from "@/pages";


function App() {
  const location = window.location;
  const isLocalhost = location.host.includes("localhost")
  const baseUrl = isLocalhost?'/': '/github-api-list';

  return (
    <BrowserRouter basename={baseUrl} >
      <Provider store={store} >
        <Routes>
          <Route path="/" element={<CredentialsPage />} />
          <Route path="/repos" element={<ReposPage />} />
        </Routes>
      </Provider>
    </BrowserRouter>
  )
}

export default App
