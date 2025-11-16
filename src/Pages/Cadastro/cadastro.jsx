import './cadastro.css'
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { toast } from 'react-hot-toast'

function Cadastro() {
  const [usuario, setUsuario] = useState('')
  const [senha, setSenha] = useState('')
  const [confirmar, setConfirmar] = useState('')
  const navigate = useNavigate()

  const handleCadastro = async () => {
    if (!usuario || !senha) {
      toast.error('Preencha todos os campos!')
      return
    }

    if (senha !== confirmar) {
      toast.error('As senhas não coincidem!')
      return
    }

    // 🔍 Verifica se o e-mail já existe no "banco"
    const checkUser = await fetch(`${import.meta.env.VITE_API_URL}/usuarios?usuario=${usuario}`)
    const existente = await checkUser.json()
    if (existente.length > 0) {
      toast.error('Usuário já cadastrado!')
      return
    }

    // 📝 Envia para o bd.json
    await fetch(`${import.meta.env.VITE_API_URL}/usuarios`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ usuario, senha })
    })

    toast.success('Cadastro realizado com sucesso!')
    navigate('/login')
  }

  return (
  <div className="background">
    <div className="login-container">
      <img src="./public/images/logo.png" alt='Logo' width="180" height="180"></img>
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

      <p>Confirmar senha</p>
      <input
        type="password"
        value={confirmar}
        onChange={e => setConfirmar(e.target.value)}
        placeholder="Confirme sua senha"
      />

      <button className="Login" onClick={handleCadastro}>Cadastrar</button>
      <button className="LLogin">
        <Link to="/login">Já tem uma conta? Faça login</Link>
      </button>
    </div>
  </div>
  )
}

export default Cadastro
