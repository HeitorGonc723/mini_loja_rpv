import { useState } from 'react'
import { Product } from '../../types'

interface ProductCardProps {
  product: Product
  onAddToCart: (id: number) => void
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [erroImagem, setErroImagem] = useState(false)

  const formattedPrice = product.price.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })

  const obterIconeCategoria = (category: string) => {
    switch (category) {
      case 'Vestuário':
        return '👕'
      case 'Calçados':
        return '👟'
      case 'Acessórios':
        return '🧢'
      default:
        return '📦'
    }
  }

  return (
    <article style={{
      border: '1px solid #ddd',
      borderRadius: '16px',
      padding: '1.5rem',
      width: '280px',
      textAlign: 'center',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      transition: 'transform 0.2s, box-shadow 0.2s',
      background: '#fff'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-4px)'
      e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.15)'
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)'
      e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)'
    }}
    >
      {!erroImagem ? (
        <img
          src={product.image}
          alt={product.name}
          onError={() => setErroImagem(true)}
          style={{
            width: '100%',
            height: '180px',
            objectFit: 'cover',
            borderRadius: '12px',
            marginBottom: '1rem'
          }}
        />
      ) : (
        <div style={{
          width: '100%',
          height: '180px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#f4f5fb',
          borderRadius: '12px',
          marginBottom: '1rem',
          fontSize: '3rem'
        }}>
          {obterIconeCategoria(product.category)}
        </div>
      )}

      <span style={{
        display: 'inline-block',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '0.25rem 0.75rem',
        borderRadius: '20px',
        fontSize: '0.8rem',
        margin: '0.5rem 0',
        fontWeight: 'bold'
      }}>{product.category}</span>

      <h2 style={{
        fontSize: '1.3rem',
        margin: '0.75rem 0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem'
      }}>
        <span style={{ fontSize: '1.5rem' }}>{obterIconeCategoria(product.category)}</span>
        {product.name}
      </h2>
      <p style={{
        color: '#666',
        fontSize: '0.9rem',
        margin: '0.5rem 0',
        lineHeight: '1.4'
      }}>{product.description}</p>
      <p style={{
        fontSize: '1.2rem',
        fontWeight: 'bold',
        color: '#2c5aa0',
        margin: '0.75rem 0'
      }}>{formattedPrice}</p>

      {!product.inStock && <span style={{
        background: '#ff4444',
        color: 'white',
        padding: '0.25rem 0.75rem',
        borderRadius: '20px',
        fontSize: '0.8rem',
        margin: '0.5rem 0',
        fontWeight: 'bold'
      }}>Esgotado</span>}

      <button
        onClick={() => onAddToCart(product.id)}
        disabled={!product.inStock}
        style={{
          background: product.inStock ? 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)' : '#ccc',
          color: 'white',
          border: 'none',
          padding: '0.875rem 1.25rem',
          borderRadius: '12px',
          cursor: product.inStock ? 'pointer' : 'not-allowed',
          width: '100%',
          marginTop: '0.75rem',
          fontSize: '1rem',
          fontWeight: 'bold',
          transition: 'background 0.2s'
        }}
        onMouseEnter={(e) => {
          if (product.inStock) {
            e.currentTarget.style.background = 'linear-gradient(135deg, #45a049 0%, #4CAF50 100%)'
          }
        }}
        onMouseLeave={(e) => {
          if (product.inStock) {
            e.currentTarget.style.background = 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)'
          }
        }}
      >
        Adicionar ao Carrinho
      </button>
    </article>
  )
}
