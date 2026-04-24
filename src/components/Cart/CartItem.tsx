import { CartItem as CartItemType } from '../../types'

interface CartItemProps {
  item: CartItemType
  onRemove: (productId: number) => void
}

export function CartItem({ item, onRemove }: CartItemProps) {
  const subtotal = item.product.price * item.quantity

  const formattedSubtotal = subtotal.toLocaleString('pt-BR', {
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
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <div style={{ flex: 1 }}>
        <span style={{
          fontWeight: 'bold',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <span style={{ fontSize: '1.2rem' }}>{obterIconeCategoria(item.product.category)}</span>
          {item.product.name}
        </span>
        <span style={{
          color: '#666',
          fontSize: '0.9rem'
        }}>Qtd: {item.quantity}</span>
      </div>
      <span style={{
        fontWeight: 'bold',
        color: '#2c5aa0'
      }}>{formattedSubtotal}</span>
      <button onClick={() => onRemove(item.product.id)} style={{
        background: '#ff4444',
        color: 'white',
        border: 'none',
        padding: '0.25rem 0.5rem',
        borderRadius: '4px',
        cursor: 'pointer',
        marginLeft: '0.5rem'
      }}>Remover</button>
    </div>
  )
}
