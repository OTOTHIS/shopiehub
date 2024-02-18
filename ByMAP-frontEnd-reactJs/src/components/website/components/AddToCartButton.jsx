'use client'

import { useEffect, useState } from 'react'
import { Button } from '../../ui/button'
import { useCart } from '../../../hooks/use-cart'

const AddToCartButton = ({
  product,
}) => {
  const { addItem, items } = useCart()
  const [isSuccess, setIsSuccess] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsSuccess(false)
    }, 2000)

    return () => clearTimeout(timeout)
  }, [isSuccess])

  // Check if the current product is already in the cart
  const isProductInCart = items.some(item => item.product.id === product.id);

  return (
    <Button
      onClick={() => {
        addItem(product)
        setIsSuccess(true)
      }}
      size='lg'
      className='w-full'
      disabled={isProductInCart} // Disable the button if the product is already in the cart
    >
      {isProductInCart ? 'saved!' : isSuccess ? 'saved!' : 'Add to favorite'}
    </Button>
  )
}

export default AddToCartButton
