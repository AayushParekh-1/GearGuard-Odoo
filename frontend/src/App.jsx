import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"

function App() {

  return (
    <>
      <main>   
        {/* <ContextProvider> */}
          <BrowserRouter>
            {/* <Navbar/> */}
            <Routes>
              {/* for reference */}
              {/* <Route path="/" element={<Home/>} /> */}
              {/* <Route path="/tours/:id" element={<TourDetailPage/>} /> */}
              <Route path="/" element={<Home/>} />
            </Routes>
            {/* <Footer/> */}
          </BrowserRouter>
        {/* </ContextProvider> */}
      </main>
    </>
  )
}

export default App
