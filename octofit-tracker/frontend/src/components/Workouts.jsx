import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { fetchCollection('workouts').then(setWorkouts).catch((err) => setError(err.message)) }, [])
  return <section className="data-view"><p className="eyebrow">TODAY'S MENU</p><h1>Workouts</h1>{error ? <p className="error-message">{error}</p> : <div className="data-grid">{workouts.map((workout) => <article className="data-card" key={workout._id || workout.id}><strong>{workout.name}</strong><span>{workout.durationMinutes || workout.duration || 0} min / {workout.difficulty}</span><small>{workout.exercises?.join(' / ') || workout.category}</small></article>)}</div>}</section>
}

export default Workouts
