import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Signup from './pages/account/Signup'
import Signin from './pages/account/Signin'
import Blog from './pages/Blog'
import Blogs from './pages/Blogs'
import Publish from './pages/Publish'
import Authentication from './components/Authentication'
import NotFound from './pages/NotFound'
import Notification from './pages/Notification'
import Profile from './pages/Profile'
import Appbar from './components/Appbar'

function App() {

  return (
    <div className='w-full h-full'>
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
    </div>
  )
}

export default App