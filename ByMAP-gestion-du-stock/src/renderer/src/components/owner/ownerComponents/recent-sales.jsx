import { useEffect, useState } from "react"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../ui/avatar"
import axios from "axios"
import { NODE_URL } from '@/api/axios';

export function RecentSales() {


  const [data, setData] = useState([])
  useEffect(() => {
    const magazin = parseInt(localStorage.getItem('magazin'))
    async function fetchData() {
      try {
        const response = await axios.get(`${NODE_URL}/operations/price/${magazin}`)

        setData(response.data)
      } catch (error) {
        console.log(error)
      }

    }

    fetchData();
  }, [])

  return (
    <div className="space-y-8">

      {
        data.map(item => (
          <div className="flex items-center">
            <Avatar className="flex h-9 w-9 items-center justify-center space-y-0 border">
              <AvatarImage src="/avatars/02.png" alt="Avatar" />
              <AvatarFallback>JL</AvatarFallback>
            </Avatar>
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">Jackson Lee</p>
              <p className="text-sm text-muted-foreground">{String(new Date(item.created_at)).slice(0, 21)}</p>
            </div>
            <div className="ml-auto font-medium">{item.total_sum} MAD</div>
          </div>
        ))
      }





    </div>
  )
}
