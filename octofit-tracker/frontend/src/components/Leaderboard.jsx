import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

// Codespaces endpoint: https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/
function Leaderboard() {
  const [entries, setEntries] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { fetchCollection('/api/leaderboard/').then(setEntries).catch((err) => setError(err.message)) }, [])

  return <section className="data-view"><p className="eyebrow">WEEKLY RACE</p><h1>Leaderboard</h1>{error ? <p className="error-message">{error}</p> : <ol className="leaderboard-list">
    {entries.sort((a, b) => (a.rank || 999) - (b.rank || 999)).map((entry, index) => <li key={entry._id || entry.id}><span>#{entry.rank || index + 1}</span><strong>{entry.username || entry.user?.username || entry.userId || 'Athlete'}</strong><b>{entry.points || 0} pts</b></li>)}
  </ol>}</section>
}

export default Leaderboard
