import { useState, useEffect } from 'react'
import { Link } from 'react-router'

function MovieList() {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchMovies()
  }, [])

  const fetchMovies = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/movies/')
      if (!response.ok) {
        throw new Error('Error loading movies')
      }
      const data = await response.json()
      setMovies(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div style={styles.container}>Loading...</div>
  if (error) return <div style={styles.container}>Error: {error}</div>

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1>Movie List</h1>
        <Link to="/create" style={styles.createButton}>New Movie</Link>
      </div>
      
      {movies.length === 0 ? (
        <p>No movies yet. <Link to="/create">Create one</Link></p>
      ) : (
        <div style={styles.grid}>
          {movies.map(movie => (
            <div key={movie.id} style={styles.card}>
              <h3>{movie.title}</h3>
              <p style={styles.description}>{movie.description}</p>
              <div style={styles.actions}>
                <Link to={`/view/${movie.id}`} style={styles.viewButton}>View</Link>
                <Link to={`/edit/${movie.id}`} style={styles.editButton}>Edit</Link>
                <Link to={`/delete/${movie.id}`} style={styles.deleteButton}>Delete</Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '30px',
  },
  createButton: {
    padding: '10px 20px',
    backgroundColor: '#28a745',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '5px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '20px',
  },
  card: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '20px',
    backgroundColor: '#f9f9f9',
  },
  description: {
    color: '#666',
    fontSize: '14px',
    marginBottom: '15px',
  },
  actions: {
    display: 'flex',
    gap: '10px',
  },
  viewButton: {
    padding: '8px 16px',
    backgroundColor: '#17a2b8',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '4px',
    fontSize: '14px',
  },
  editButton: {
    padding: '8px 16px',
    backgroundColor: '#007bff',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '4px',
    fontSize: '14px',
  },
  deleteButton: {
    padding: '8px 16px',
    backgroundColor: '#dc3545',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '4px',
    fontSize: '14px',
  },
}

export default MovieList
