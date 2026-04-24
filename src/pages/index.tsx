import { useState } from 'react'
import { ProductCard } from '../components/ProductCard/ProductCard'
import { Cart } from '../components/Cart/Cart'
import { CheckoutForm } from '../components/CheckoutForm/CheckoutForm'
import { products } from '../data/products'
import { CartItem, CheckoutData } from '../types'

export default function Home() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [submitted, setSubmitted] = useState(false)

  function handleAddToCart(productId: number) {
    const product = products.find((p) => p.id === productId)
    if (!product) return

    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === productId)
      if (existing) {
        return prev.map((item) =>
          item.product.id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prev, { product, quantity: 1 }]
    })
  }

  function handleRemove(productId: number) {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId))
  }

  function finalizarCompra(data: CheckoutData) {
    console.log('Pedido finalizado:', data)
    setSubmitted(true)
  }

  function voltarParaLoja() {
    setSubmitted(false)
    setCartItems([])
  }

  if (submitted) {
    return (
      <div style={{
        textAlign: 'center',
        padding: '4rem',
        fontFamily: 'sans-serif'
      }}>
        <h1 style={{
          color: '#4CAF50',
          fontSize: '2rem'
        }}>Pedido realizado com sucesso!</h1>
        <p>Obrigado pela sua compra.</p>
        <button onClick={voltarParaLoja} style={{
          background: '#2c5aa0',
          color: 'white',
          border: 'none',
          padding: '0.75rem 1.5rem',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '1rem',
          marginTop: '1rem'
        }}>Voltar à loja</button>
      </div>
    )
  }

  return (
    <main style={{
      fontFamily: 'sans-serif',
      padding: '2rem',
      maxWidth: '1200px',
      margin: '0 auto',
      background: '#fff',
      minHeight: '100vh'
    }}>
      <header style={{
        textAlign: 'center',
        marginBottom: '2rem',
        borderBottom: '2px solid #eee',
        paddingBottom: '1rem'
      }}>
        <h1 style={{
          color: '#2c5aa0',
          margin: '0'
        }}>Mini Loja</h1>
        <p style={{
          color: '#666',
          margin: '0.5rem 0 0 0'
        }}>Produtos de qualidade com entrega rápida</p>
      </header>

      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{
          color: '#333',
          borderBottom: '1px solid #ddd',
          paddingBottom: '0.5rem'
        }}>Produtos</h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1.5rem',
          marginTop: '1rem'
        }}>
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      </section>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 400px',
        gap: '2rem',
        alignItems: 'start'
      }}>
        <section>
          <Cart items={cartItems} onRemove={handleRemove} />
        </section>

        <section>
          <CheckoutForm onSubmit={finalizarCompra} />
        </section>
      </div>
    </main>
  )
}
