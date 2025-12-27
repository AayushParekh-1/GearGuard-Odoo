import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Equipment from "./pages/Equipment"
import Teams from "./pages/Teams"
import Department from "./pages/Department"
import WorkCenter from "./pages/WorkCenter"

function App() {

  return (
    <>
      <main>   
        {/* <ContextProvider> */}
          <BrowserRouter>
            <Routes>
              {/* for reference */}
              {/* <Route path="/" element={<Home/>} /> */}
              {/* <Route path="/tours/:id" element={<TourDetailPage/>} /> */}
              <Route path="/" element={<Home/>} />
              <Route path="/equipment" element={<Equipment/>} />
              <Route path="/teams" element={<Teams/>} />
              <Route path="/department" element={<Department/>} />
              <Route path="/work-center" element={<WorkCenter/>} />
            </Routes>
            {/* <Footer/> */}
          </BrowserRouter>
        {/* </ContextProvider> */}
      </main>
    </>
  )
}

export default App
