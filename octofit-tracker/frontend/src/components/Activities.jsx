import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

// Codespaces endpoint: https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities/
function Activities() {
  const [activities, setActivities] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { fetchCollection('/api/activities/').then(setActivities).catch((err) => setError(err.message)) }, [])

  return <DataView title="Activity log" eyebrow="KEEP MOVING" error={error}>
    <div className="data-grid">{activities.map((activity) => <article className="data-card" key={activity._id || activity.id}>
      <strong>{activity.type || 'Workout'}</strong><span>{activity.durationMinutes || activity.duration || 0} min</span><small>{activity.points || 0} points</small>
    </article>)}</div>
  </DataView>
}

function DataView({ title, eyebrow, error, children }) {
  return <section className="data-view"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1>{error ? <p className="error-message">{error}</p> : children}</section>
}

export default Activities
