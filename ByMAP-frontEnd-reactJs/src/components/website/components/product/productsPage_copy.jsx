import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { axiosClient } from '../../../../api/axios';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from '@/components/ui/pagination';
import { Link , useLocation  } from 'react-router-dom';
import { cn } from '../../../../lib/utils';
import { buttonVariants } from '../../../ui/button';

const ProductPageCopy = () => {
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);

  const fetchProducts = async (page) => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const category = queryParams.get('category');

    
    try {

      const response = await axiosClient.get(`/v1/products?page=${page}`);
      const { data, pagination } = response.data;
      setProducts(data);
      setPagination(pagination);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const generatePaginationItems = () => {
    const items = [];
    for (let i = 1; i <= pagination.last_page; i++) {
      items.push(
        <PaginationItem key={i}>
          <PaginationLink className={cn(currentPage === i && buttonVariants())}  onClick={() => {
            handlePageChange(i)
            window.scrollTo(0)
          }} active={currentPage === i}>
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }
    return items;
  }; 
  return (
    <div>
      <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Customers also purchased</h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <div key={product.id} className="group relative">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                <img
                  src={product.image}
                  alt={product.image}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <Link to={`/products/${product.id}/product`}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.title}
                    </Link>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                </div>
                <p className="text-sm font-medium text-gray-900">{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

      <Pagination className='cursor-pointer'>
        <PaginationContent>
          <PaginationPrevious  onClick={() => {
             handlePageChange(currentPage - 1)
             window.scrollTo(0)
          }} disabled={!pagination.prev_page_url} />
          {generatePaginationItems()}
       {
         (pagination.next_page_url) &&  <PaginationEllipsis />
       }
       
          <PaginationNext  onClick={() => {
            handlePageChange(currentPage + 1)
            window.scrollTo(0)
          }} disabled={!pagination.next_page_url} />
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default ProductPageCopy;
