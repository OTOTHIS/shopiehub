import { NODE_URL } from '@/api/axios'
import { useUserContext } from '@/context/UserContext'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, buttonVariants } from '../ui/button'
import { cn } from '@/lib/utils'
import { OWNER_DASHBOARD_ROUTE, SELECT_MAGAZIN } from '@/router'
import {useNavigate} from "react-router-dom";
export default function SelectMagazin() {
  const { user , setMagazin , magazin} = useUserContext()
  const [magazins, setMagazins] = useState([])
  const [maga, setMaga] = useState([])




  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`${NODE_URL}/magazin/${1}`)
        console.log(response.data)
        if(response.data === 1) {
            setMagazin(response.data)
        }else {
            setMaga(response.data)
        }
       
      
      } catch (error) {
        console.log(error)
      }
    }

    fetchData()


  }, [])


  const ElectForm = ({item}) => {
    const navigate = useNavigate()
    return (
      <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        {/* <a href="#">
          <img className="rounded-t-lg" src="/docs/images/blog/image-1.jpg" alt="" />
        </a> */}
        <div className="p-5">
          <a href="#">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {item.name}
            </h5>
          </a>
          <Button
          onClick = {()=> {
            window.localStorage.setItem('magazin', item.id)
            navigate(OWNER_DASHBOARD_ROUTE)
          }}
           className={cn(buttonVariants("link"),"inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800")}
           
          >
              go to stock mangament
            <svg
              className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </Button>
        </div>
      </div>
    )
  }
  return (
    <>
     
   
    
{Array.isArray(magazins) &&
    magazins.map((item, index) => <ElectForm key={index} item={item} />)
}


    {maga && <ElectForm item={maga} />}

    </>
  )
}


