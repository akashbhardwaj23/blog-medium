import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import Blog from './pages/Blog'
import Blogs from './pages/Blogs'
import Publish from './pages/Publish'
import Authentication from './components/Authentication'
import NotFound from './pages/NotFound'
import Notification from './pages/Notification'
import Profile from './pages/Profile'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Authentication/>}/>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blog/:id" element={<Blog />} />
          <Route path='/me/:id' element={<Profile />} />
          <Route path='/notification' element={<Notification />} />
          <Route path="/publish" element= {<Publish />} />
          <Route path='/*' element={<NotFound/>} />
         </Routes>
      </BrowserRouter>
    </>
  )
}

export default App