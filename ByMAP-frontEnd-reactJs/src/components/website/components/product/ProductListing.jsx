'use client'


import { useEffect, useState } from 'react'
import { Skeleton } from '../../../ui/skeleton'

import { cn, formatPrice } from '@/lib/utils'
import { Link } from 'react-router-dom'




const ProductListing = ({
  product,
  index,
}) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, index * 75)

    return () => clearTimeout(timer)
  }, [index])

  if (!product || !isVisible) return <ProductPlaceholder />



  // const validUrls = product.images
  //   .map(({ image }) =>
  //     typeof image === 'string' ? image : image.url
  //   )
  //   .filter(Boolean)

  if (isVisible && product) {
    return (
      <a href={`/products/${product.id}/product`}
        className={cn(
          'invisible h-full w-full cursor-pointer group/main',
          {
            'visible animate-in fade-in-5': isVisible,
          }
        )}
       >
        <div className='flex flex-col w-full'>
          {/* <ImageSlider urls={validUrls} /> */}
         <img src={product.image} />
          <h3 className='mt-4 font-medium text-sm text-gray-700'>
            {product.title}
          </h3>
          <p className='mt-1 text-lg text-gray-900'>
            {product.category_name}
          </p>
          <p className='mt-1 font-medium text-sm text-gray-900'>
            {formatPrice(product.price)}
          </p>
          
        </div>
      </a>
    )
  }
}

const ProductPlaceholder = () => {
  return (
    <div className='flex flex-col w-full'>
      <div className='relative bg-zinc-100 aspect-square w-full overflow-hidden rounded-xl'>
        <Skeleton className='h-full w-full' />
      </div>
      <Skeleton className='mt-4 w-2/3 h-4 rounded-lg' />
      <Skeleton className='mt-2 w-16 h-4 rounded-lg' />
      <Skeleton className='mt-2 w-12 h-4 rounded-lg' />
    </div>
  )
}

export default ProductListing
