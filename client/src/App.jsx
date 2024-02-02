import {BrowserRouter, Route, Routes} from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import Dashboard from "./pages/Dashboard"
import Projects from "./pages/Projects"
import Header from "./components/Header"
import FooterComponent from "./components/Footer"
import PrivateRoute from "./components/PrivateRoute"
import OnlyAdmin from "./components/OnlyAdmin"
import CreatePost from "./pages/CreatePost"
import UpdatePost from "./pages/UpdatePost"

function App() {
  return (
    <BrowserRouter>

      {/* Add the header that will be visible to all the pages */}
      <Header />

      <Routes>

        <Route path="/" element={<Home />}/>
        <Route path="/about" element={<About />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>

        <Route element={<OnlyAdmin />}>
          <Route path="/create-post" element={<CreatePost />} />
          <Route path='/update-post/:postId' element={<UpdatePost />} />
        </Route>

        <Route path="/projects" element={<Projects />} />

      </Routes>

      <FooterComponent />
    
    </BrowserRouter>
  )
}

export default App
