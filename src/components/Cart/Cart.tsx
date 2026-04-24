import { CartItem as CartItemType } from '../../types'
import { CartItem } from './CartItem'

interface CartProps {
  items: CartItemType[]
  onRemove: (productId: number) => void
}

export function Cart({ items, onRemove }: CartProps) {
  const total = items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  )

  const formattedTotal = total.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })

  if (items.length === 0) {
    return <p style={{
      textAlign: 'center',
      color: '#666',
      fontStyle: 'italic',
      padding: '2rem'
    }}>Seu carrinho está vazio</p>
  }

  return (
    <section style={{
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '1rem',
      background: '#f9f9f9'
    }}>
      <h2 style={{
        marginTop: '0',
        color: '#333'
      }}>Carrinho</h2>
      <ul style={{
        listStyle: 'none',
        padding: '0'
      }}>
        {items.map((item) => (
          <li key={item.product.id} style={{
            borderBottom: '1px solid #eee',
            padding: '0.5rem 0'
          }}>
            <CartItem item={item} onRemove={onRemove} />
          </li>
        ))}
      </ul>
      <p style={{
        fontSize: '1.2rem',
        fontWeight: 'bold',
        textAlign: 'right',
        margin: '1rem 0 0 0',
        color: '#2c5aa0'
      }}>Total: {formattedTotal}</p>
    </section>
  )
}
