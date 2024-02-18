
import {  Link, useParams } from 'react-router-dom';
import { Check, Shield } from 'lucide-react'
import MaxWidthWrapper from '../MaxWidthWrapper';
import ProductApi from '../../../../services/Api/productApi';
import { useEffect, useState } from 'react';
import { formatPrice } from '../../../../lib/utils';
import AddToCartButton from '../AddToCartButton';
import ProductReel from './ProductReel';
import { Skeleton } from '../../../ui/skeleton';



const BREADCRUMBS = [
  { id: 1, name: 'Home', href: '/' },
  { id: 2, name: 'Products', href: '/products' },
]

const ProductPageDetail =  () => {
    let {id} = useParams();
    const [product,setProduct] = useState([])
 useEffect(() => {
   
    ProductApi.get(id).then(res=> setProduct(res.data)).catch(err=>console.log(err))
 
 
 }, [])
 

 
//   const validUrls = product.images
//     .map(({ image }) =>
//       typeof image === 'string' ? image : image.url
//     )
//     .filter(Boolean) 

  return (

  
    
    <MaxWidthWrapper className='bg-white'>
    <div className='bg-white'>
      <div className='mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8'>
        {/* Product Details */}
        <div className='lg:max-w-lg lg:self-end'>
          <ol className='flex items-center space-x-2'>
            {BREADCRUMBS.map((breadcrumb, i) => (
              <li key={breadcrumb.href}>
                <div className='flex items-center text-sm'>
                  <Link
                    to={breadcrumb.href}
                    className='font-medium text-sm text-muted-foreground hover:text-gray-900'>
                    {breadcrumb.name}
                  </Link>
                  {i !== BREADCRUMBS.length - 1 ? (
                    <svg
                      viewBox='0 0 20 20'
                      fill='currentColor'
                      aria-hidden='true'
                      className='ml-2 h-5 w-5 flex-shrink-0 text-gray-300'>
                      <path d='M5.555 17.776l8-16 .894.448-8 16-.894-.448z' />
                    </svg>
                  ) : null}
                </div>
              </li>
            ))}
          </ol>
  
          <div className='mt-4'>
            <h1 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
              {product.name}
            </h1>
          </div>
  
          <section className='mt-4'>
            <div className='flex items-center'>
              <p className='font-medium text-gray-900'>
              {
                 `MAD ${product.price}` === "" || `MAD ${product.price}` ===  `MAD ${undefined}`  ?  (
                     <Skeleton height={4} width={200} className="h-4 w-[200px]" />) : (`MAD ${product.price}`)
              }
              </p>
  
              <div className='ml-4 border-l text-muted-foreground border-gray-300 pl-4'>
                {product.category_name}
              </div>
            </div>
  
            <div className='mt-4 space-y-6'>
              <p className='text-base text-muted-foreground'>
                {product.description}
              </p>
            </div>
  
            <div className='mt-6 flex items-center'>
              <Check
                aria-hidden='true'
                className='h-5 w-5 flex-shrink-0 text-green-500'
              />
              <p className='ml-2 text-sm text-muted-foreground'>
                En stock
              </p>
            </div>
          </section>
        </div>
  
        {/* Product images */}
        <div className='mt-10 lg:col-start-2 lg:row-span-2 lg:mt-0 lg:self-center'>
          <div className='aspect-square rounded-lg'>
            {product.image ? (
              // <ImageSlider urls={validUrls} />
              <img src={product.image} alt={product.name} />
            ) : (
              <Skeleton height={300} width={300} className="h-64 w-64" />
            )}
          </div>
        </div>
  
        {/* Add to cart part */}
        <div className='mt-10 lg:col-start-1 lg:row-start-2 lg:max-w-lg lg:self-start'>
          <div>
            <div className='mt-10'>
              {product.image ? (
                <AddToCartButton product={product} />
              ) : (
                <Skeleton height={40} width={200} className="h-10 w-40" />
              )}
            </div>
            <div className='mt-6 text-center'>
              <div className='group inline-flex text-sm text-medium'>
                <Shield
                  aria-hidden='true'
                  className='mr-2 h-5 w-5 flex-shrink-0 text-gray-400'
                />
                <span className='text-muted-foreground hover:text-gray-700'>
                  Garantie de retour de 30 jours
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  
    <ProductReel
      href='/products'
      title={`Similar ${"label"}`}
      subtitle={`Browse similar high-quality zerzerze just like '${product.name}'`}
    />
  </MaxWidthWrapper>
    )
}

export default ProductPageDetail
