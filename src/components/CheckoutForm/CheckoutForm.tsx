import { useState } from 'react'
import { CheckoutData } from '../../types'

interface CheckoutFormProps {
  onSubmit: (data: CheckoutData) => void
}

interface FormErrors {
  nome?: string
  email?: string
  cep?: string
}

export function CheckoutForm({ onSubmit }: CheckoutFormProps) {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [cep, setCep] = useState('')
  const [errors, setErrors] = useState<FormErrors>({})

  function validate(): FormErrors {
    const newErrors: FormErrors = {}

    if (!nome.trim()) {
      newErrors.nome = 'Nome é obrigatório'
    }

    if (!email.trim()) {
      newErrors.email = 'E-mail é obrigatório'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'E-mail inválido'
    }

    if (!cep.trim()) {
      newErrors.cep = 'CEP é obrigatório'
    } else if (cep.replace(/\D/g, '').length < 8) {
      newErrors.cep = 'CEP deve ter 8 dígitos'
    }

    return newErrors
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const newErrors = validate()

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    onSubmit({ nome, email, cep })
  }

  return (
    <form onSubmit={handleSubmit} noValidate style={{
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '1rem',
      background: '#f9f9f9',
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      width: '100%',
      boxSizing: 'border-box'
    }}>
      <h2 style={{
        marginTop: '0',
        color: '#333'
      }}>Finalizar Compra</h2>
      
      <div style={{
        marginBottom: '1rem',
        display: 'flex',
        flexDirection: 'column',
        width: '100%'
      }}>
        <label htmlFor="nome" style={{
          display: 'block',
          marginBottom: '0.25rem',
          fontWeight: 'bold'
        }}>Nome</label>
        <input
          id="nome"
          type="text"
          placeholder="Seu nome completo"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          style={{
            width: '100%',
            padding: '0.5rem',
            border: '1px solid #ccc',
            borderRadius: '4px',
            fontSize: '1rem',
            boxSizing: 'border-box'
          }}
        />
        {errors.nome && <span role="alert" style={{
          color: '#ff4444',
          fontSize: '0.8rem',
          display: 'block',
          marginTop: '0.25rem'
        }}>{errors.nome}</span>}
      </div>

      <div style={{
        marginBottom: '1rem',
        display: 'flex',
        flexDirection: 'column',
        width: '100%'
      }}>
        <label htmlFor="email" style={{
          display: 'block',
          marginBottom: '0.25rem',
          fontWeight: 'bold'
        }}>E-mail</label>
        <input
          id="email"
          type="email"
          placeholder="seu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: '100%',
            padding: '0.5rem',
            border: '1px solid #ccc',
            borderRadius: '4px',
            fontSize: '1rem',
            boxSizing: 'border-box'
          }}
        />
        {errors.email && <span role="alert" style={{
          color: '#ff4444',
          fontSize: '0.8rem',
          display: 'block',
          marginTop: '0.25rem'
        }}>{errors.email}</span>}
      </div>

      <div style={{
        marginBottom: '1rem',
        display: 'flex',
        flexDirection: 'column',
        width: '100%'
      }}>
        <label htmlFor="cep" style={{
          display: 'block',
          marginBottom: '0.25rem',
          fontWeight: 'bold'
        }}>CEP</label>
        <input
          id="cep"
          type="text"
          placeholder="00000-000"
          value={cep}
          onChange={(e) => setCep(e.target.value)}
          style={{
            width: '100%',
            padding: '0.5rem',
            border: '1px solid #ccc',
            borderRadius: '4px',
            fontSize: '1rem',
            boxSizing: 'border-box'
          }}
        />
        {errors.cep && <span role="alert" style={{
          color: '#ff4444',
          fontSize: '0.8rem',
          display: 'block',
          marginTop: '0.25rem'
        }}>{errors.cep}</span>}
      </div>

      <button type="submit" style={{
        background: '#4CAF50',
        color: 'white',
        border: 'none',
        padding: '0.75rem 1rem',
        borderRadius: '4px',
        cursor: 'pointer',
        width: '100%',
        fontSize: '1rem'
      }}>Finalizar Compra</button>
    </form>
  )
}
