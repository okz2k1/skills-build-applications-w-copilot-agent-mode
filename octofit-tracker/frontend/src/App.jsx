import { NavLink, Navigate, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './App.css'

const navigation = [
  ['/', 'Overview'], ['/activities', 'Activities'], ['/leaderboard', 'Leaderboard'],
  ['/teams', 'Teams'], ['/users', 'Users'], ['/workouts', 'Workouts'],
]

function App() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <NavLink className="brand" to="/">Octofit <span>Tracker</span></NavLink>
        <nav aria-label="Primary navigation">
          {navigation.map(([path, label]) => <NavLink key={path} to={path} end={path === '/'}>{label}</NavLink>)}
        </nav>
      </header>
      <main className="app-main">
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  )
}

function Overview() {
  return <section className="overview">
    <p className="eyebrow">PERSONAL FITNESS HQ</p>
    <h1>Move with purpose.</h1>
    <p className="lead">Track your momentum, find your people, and make every session count.</p>
    <NavLink className="primary-button" to="/activities">Open logbook</NavLink>
  </section>
}

export default App
