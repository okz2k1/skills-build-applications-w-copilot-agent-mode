import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

function Teams() {
  const [teams, setTeams] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { fetchCollection('teams').then(setTeams).catch((err) => setError(err.message)) }, [])
  return <section className="data-view"><p className="eyebrow">FIND YOUR CREW</p><h1>Teams</h1>{error ? <p className="error-message">{error}</p> : <div className="data-grid">{teams.map((team) => <article className="data-card" key={team._id || team.id}><strong>{team.name}</strong><span>{team.members?.length || 0} members</span><small>{team.description}</small></article>)}</div>}</section>
}

export default Teams
