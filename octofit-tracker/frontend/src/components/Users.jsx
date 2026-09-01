import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

function Users() {
  const [users, setUsers] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { fetchCollection('users').then(setUsers).catch((err) => setError(err.message)) }, [])
  return <section className="data-view"><p className="eyebrow">THE COMMUNITY</p><h1>Members</h1>{error ? <p className="error-message">{error}</p> : <div className="data-grid">{users.map((user) => <article className="data-card" key={user._id || user.id}><strong>{user.profile?.displayName || user.username}</strong><span>{user.profile?.level || 'Athlete'}</span><small>{user.email}</small></article>)}</div>}</section>
}

export default Users
