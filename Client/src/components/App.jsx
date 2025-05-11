import { useState, createContext, useMemo } from 'react'
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Cookies from 'js-cookie'

import Navigation from './Navigation'
import LogIn from './LogIn'
import Register from './Register'
import Home from './Home'
import Posts from './Posts'
import Comments from './Comments'
import Todos from './Todos'
import Info from './Info'
import ErrorPage from './ErrorPage'
import '../style/App.css'

// יצירת קונטקסט עם ערך ברירת מחדל הגיוני
export const CurrentUser = createContext({
  currentUser: null,
  setCurrentUser: () => {}
})

function App() {
  const initialCurrentUser = useMemo(() => {
    const cookieUser = Cookies.get('currentUser')
    return cookieUser ? JSON.parse(cookieUser) : null
  }, [])

  const [currentUser, _setCurrentUser] = useState(initialCurrentUser)
  const [isShowInfo, setIsShowInfo] = useState(0)

  const setCurrentUser = (user) => {
    _setCurrentUser(user)
    if (user) {
      Cookies.set('currentUser', JSON.stringify(user), { expires: 1 })
    } else {
      Cookies.remove('currentUser')
    }
  }

  return (
    <CurrentUser.Provider value={{ currentUser, setCurrentUser }}>
      <Navigation currentUser={currentUser} setIsShowInfo={setIsShowInfo} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/users/:userId">
          <Route path="home" element={<Home />} />
          <Route path="todos" element={<Todos />} />
          <Route path="posts" element={<Posts />} />
          <Route path="posts/:postId/comments" element={<Comments />} />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      {isShowInfo === 1 && <Info setIsShowInfo={setIsShowInfo} />}
    </CurrentUser.Provider>
  )
}

export default App