import { BrowserRouter, Routes, Route } from 'react-router'
import MovieList from './pages/MovieList'
import MovieEdit from './pages/MovieEdit'
import MovieView from './pages/MovieView'
import MovieDelete from './pages/MovieDelete'
import MovieCreate from './pages/MovieCreate'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MovieList />} />
        <Route path="/create" element={<MovieCreate />} />
        <Route path="/edit/:id" element={<MovieEdit />} />
        <Route path="/view/:id" element={<MovieView />} />
        <Route path="/delete/:id" element={<MovieDelete />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
