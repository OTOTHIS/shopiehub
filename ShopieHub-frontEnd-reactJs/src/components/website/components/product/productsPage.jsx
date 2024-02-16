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
import { Link } from 'react-router-dom';
import { cn } from '../../../../lib/utils';
import { buttonVariants } from '../../../ui/button';

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);

  const fetchProducts = async (page) => {
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
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <img src={product.image} alt={product.title} />
            <h3>{product.title}</h3>
            <p>ID: {product.id}</p>
            <p>Price: {product.price}</p>
            <p>Category: {product.category_name}</p>
            <p>Magazin: {product.magazin_name}</p>
          </li>
        ))}
      </ul>

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

export default ProductPage;
