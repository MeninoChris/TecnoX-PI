import './Login.css'
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { toast } from 'react-hot-toast'

export default function Login() {
  const [usuario, setUsuario] = useState('')
  const [senha, setSenha] = useState('')
  const navigate = useNavigate()

  const handleLogin = async () => {
    if (!usuario || !senha) {
      toast.error('Preencha todos os campos!')
      return
    }

    const res = await fetch(`${import.meta.env.VITE_API_URL}/usuarios?usuario=${usuario}&senha=${senha}`)
    const data = await res.json()

    if (data.length === 1) {
      localStorage.setItem('logado', 'true')
      try {
        const user = data[0] || { usuario }
        localStorage.setItem('usuarioLogado', JSON.stringify({
          id: user.id,
          email: user.usuario || usuario,
        }))
      } catch {}
      toast.success('Login realizado com sucesso!')
      navigate('/')
    } else {
      toast.error('Usuário ou senha incorretos!')
    }
  }

  return (
  <div className="background">
    <div className="login-container">
      <img src="./public/logo2.png" alt='Logo' width="180" height="180"/>
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
        <Link to="/cadastro">Não possui uma conta? Crie uma aqui</Link>
      </button>
    </div>
  </div>
  )
}