import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Home() {
  const navigate = useNavigate()

  useEffect(() => {
    const logado = localStorage.getItem('logado')
    if (logado !== 'true') {
      alert('Você precisa estar logado para acessar a Home.')
      navigate('/login')
    }
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem('logado')
    navigate('/login')
  }

  return (
    <div>
      <h1>Bem-vindo à Home!</h1>
      <button onClick={handleLogout}>Sair</button>
    </div>
  )
}

export default Home
