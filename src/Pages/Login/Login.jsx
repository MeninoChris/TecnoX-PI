import './Login.css'
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

function Login() {
  const [usuario, setUsuario] = useState('')
  const [senha, setSenha] = useState('')
  const navigate = useNavigate()

  const handleLogin = async () => {
    if (!usuario || !senha) return alert('Preencha todos os campos!')

    const res = await fetch(`${import.meta.env.VITE_API_URL}/usuarios?usuario=${usuario}&senha=${senha}`)
    const data = await res.json()

    if (data.length === 1) {
      localStorage.setItem('logado', 'true')
      navigate('/home')
    } else {
      alert('Usuário ou senha incorretos!')
    }
  }

  return (
    <div className="login-container">
      <img src="./public/Logo.png" alt='Logo' width="180" height="180"/>
      <h3>SEJA BEM-VINDO</h3>

      <p>Usuário</p>
      <input
        type="email"
        value={usuario}
        onChange={e => setUsuario(e.target.value)}
        placeholder="Digite seu e-mail"
      />

      <p>Senha</p>
      <input
        type="password"
        value={senha}
        onChange={e => setSenha(e.target.value)}
        placeholder="Digite sua senha"
      />

      <button className="Login" onClick={handleLogin}>LOGIN</button>
      <button className="CConta">
        <Link to="/">Não possui uma conta? Crie uma aqui</Link>
      </button>
    </div>
  )
}

export default Login
