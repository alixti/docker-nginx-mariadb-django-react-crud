import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router'

function MovieDelete() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [movie, setMovie] = useState(null)
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchMovie()
  }, [id])

  const fetchMovie = async () => {
    try {
      const response = await fetch(`/api/movies/${id}/`)
      if (!response.ok) {
        throw new Error('Movie not found')
      }
      const data = await response.json()
      setMovie(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    setDeleting(true)
    setError(null)

    try {
      const response = await fetch(`/api/movies/${id}/`, {
        method: 'DELETE'
      })

      if (!response.ok) {
        throw new Error('Error deleting movie')
      }

      navigate('/')
    } catch (err) {
      setError(err.message)
      setDeleting(false)
    }
  }

  if (loading) return <div style={styles.container}>Loading...</div>
  if (error && !movie) return <div style={styles.container}>Error: {error}</div>
  if (!movie) return <div style={styles.container}>Movie not found</div>

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1>Delete Movie?</h1>
        
        {error && <div style={styles.error}>{error}</div>}
        
        <div style={styles.warning}>
          <p>You are about to delete the following movie:</p>
          <div style={styles.movieInfo}>
            <h3>{movie.title}</h3>
            <p>{movie.description}</p>
          </div>
          <p><strong>This action cannot be undone.</strong></p>
        </div>

        <div style={styles.actions}>
          <button 
            onClick={handleDelete} 
            disabled={deleting} 
            style={styles.deleteButton}
          >
            {deleting ? 'Deleting...' : 'Yes, delete'}
          </button>
          <Link to="/" style={styles.cancelButton}>Cancel</Link>
        </div>
      </div>
    </div>
  )
}

const styles = {
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
  },
  card: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '30px',
    backgroundColor: '#fff',
  },
  warning: {
    backgroundColor: '#fff3cd',
    border: '1px solid #ffc107',
    borderRadius: '4px',
    padding: '20px',
    marginTop: '20px',
    marginBottom: '30px',
  },
  movieInfo: {
    margin: '20px 0',
    padding: '15px',
    backgroundColor: '#f8f9fa',
    borderRadius: '4px',
  },
  actions: {
    display: 'flex',
    gap: '10px',
  },
  deleteButton: {
    padding: '10px 20px',
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  cancelButton: {
    padding: '10px 20px',
    backgroundColor: '#6c757d',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '5px',
    display: 'inline-block',
  },
  error: {
    padding: '10px',
    backgroundColor: '#f8d7da',
    color: '#721c24',
    borderRadius: '4px',
    marginTop: '20px',
  },
}

export default MovieDelete
