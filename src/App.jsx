import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import { Outlet } from 'react-router-dom'
import { fetchMe } from './features/auth/authSlice'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchMe())
  }, [dispatch])

  return (
    <>
    <div className='w-full'>
      <Navbar/>
    </div>
    <div className='min-h-157'>
      <Outlet/>
    </div>
    <div>
      <Footer/>
    </div>
    </>
  )
}

export default App
