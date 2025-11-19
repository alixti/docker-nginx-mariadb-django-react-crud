import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router'

function MovieView() {
  const { id } = useParams()
  const [movie, setMovie] = useState(null)
  const [loading, setLoading] = useState(true)
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

  if (loading) return <div style={styles.container}>Loading...</div>
  if (error) return <div style={styles.container}>Error: {error}</div>
  if (!movie) return <div style={styles.container}>Movie not found</div>

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1>{movie.title}</h1>
        <div style={styles.info}>
          <p><strong>ID:</strong> {movie.id}</p>
          <p><strong>Description:</strong></p>
          <p style={styles.description}>{movie.description}</p>
        </div>
        
        <div style={styles.actions}>
          <Link to="/" style={styles.backButton}>Back to list</Link>
          <Link to={`/edit/${movie.id}`} style={styles.editButton}>Edit</Link>
          <Link to={`/delete/${movie.id}`} style={styles.deleteButton}>Delete</Link>
        </div>
      </div>
    </div>
  )
}

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
  },
  card: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '30px',
    backgroundColor: '#f9f9f9',
  },
  info: {
    marginTop: '20px',
    marginBottom: '30px',
  },
  description: {
    marginTop: '10px',
    lineHeight: '1.6',
    color: '#333',
  },
  actions: {
    display: 'flex',
    gap: '10px',
  },
  backButton: {
    padding: '10px 20px',
    backgroundColor: '#6c757d',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '5px',
  },
  editButton: {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '5px',
  },
  deleteButton: {
    padding: '10px 20px',
    backgroundColor: '#dc3545',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '5px',
  },
}

export default MovieView
