import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import CurriculumPage from './pages/Curriculum'
import AIPage from './pages/AIPage'
import ProgressPage from './pages/Progress'
import AboutPage from './pages/About'
import './styles/global.css'

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/"         element={<CurriculumPage />} />
          <Route path="/ai"       element={<AIPage />} />
          <Route path="/progress" element={<ProgressPage />} />
          <Route path="/about"    element={<AboutPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}
