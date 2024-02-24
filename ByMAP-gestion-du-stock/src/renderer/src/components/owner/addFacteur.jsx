import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'

import { useToast } from '../ui/use-toast.js'
import { Input } from '../ui/input.jsx'
import { Button, buttonVariants } from '../ui/button.jsx'
import { cn } from '../../lib/utils.js'
import { Minus, PlusCircle, X } from 'lucide-react'

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command'

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

import { useUserContext } from '@/context/UserContext.jsx'
import { NODE_URL } from '@/api/axios.js'

import swal from "sweetalert2"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"



const statuses = [
  {
    value: '+',
    label: 'Entre',
    icon: PlusCircle
  },
  {
    value: '-',
    label: 'Sortie',
    icon: Minus
  }
]

const AddFacteur = () => {
  const { user } = useUserContext()

  const [open, setOpen] = React.useState(false)
  const [selectedStatus, setSelectedStatus] = React.useState()
  const [products, setProducts] = useState([]);
  const [operationItem, setOperationItem] = useState([])


 const  type =  useRef()
 const qte = useRef()
 const  product_id = useRef()

const maaga = localStorage.getItem('magazin')
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`${NODE_URL}/products/${maaga}`)

        setProducts(response.data)

      } catch (error) {
        console.log(error)
      }
    }

    fetchData()


  }, [])


  const { toast } = useToast()



  const resetForm = () => {

    qte.current.value = " ";
    product_id.current.value = "" ;
    // You may also reset other state variables if needed
    setSelectedStatus(null)
  }



  const saveFacture = async () => {

    try {
      const response = await axios.post(`${NODE_URL}/Facture`, operationItem);
      resetForm();
      setOperationItem([])
      toast({
        title: "Success",
        description: "Magazin created successfully!",
      });
    } catch (error) {
      console.error('Error submitting data:', error);
    }


  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const magaz = parseInt(localStorage.getItem('magazin'));

    if (!selectedStatus) {
      swal.fire({
        title: "Select type",
        text: "Choisir facture type",
        icon: "error"
      });
    }


    //

    const currentFormData = {
      type: selectedStatus.value,
      qte: qte.current.value,
      product_id: parseInt(product_id.current.value),
      magazin_id: magaz
    }


    // Check if there is an existing entry for the same product_id and type
    const existingIndex = operationItem.findIndex(
      (item) =>
        item.product_id === currentFormData.product_id &&
        item.type === currentFormData.type
    );
    resetForm();
    // If an existing entry is found, replace it; otherwise, add a new entry
    if (existingIndex !== -1) {
      operationItem[existingIndex] = currentFormData;
    } else {
      setOperationItem((prev) => [...prev, currentFormData]);
    }

  }

  const deleteItem = (indexToDelete) => {
    setOperationItem((prev) => prev.filter((_, index) => index + 1 !== indexToDelete));
  };

  return (
    <div className="w-full mx-10 my-10">
      <form onSubmit={handleSubmit} className="space-y-8">

        <label for="product_id" class="sr-only">Underline select</label>
        <select
          required
          id="product_id"
          name="product_id"
          placeholder="Select a product"
          className="resize-none"
          ref={product_id}
      
          class="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer">
          <option selected>Select un produit</option>
          {products.map((v) => (
            <option key={v.id} value={v.id}>{v.title}</option>
          ))}
        </select>

        <div className="flex items-center space-x-4">
          <p className="text-sm text-muted-foreground">Type</p>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className=" w-1/5 py-3 justify-start">
                {selectedStatus ? (
                  <>
                    <selectedStatus.icon className="mr-2 h-4 w-4 shrink-0" />
                    {selectedStatus.label}
                  </>
                ) : (
                  <>+ Set Type</>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0" side="right" align="start">
              <Command>
                <CommandInput placeholder="Change type de facteur..." />
                <CommandList>
                  <CommandEmpty>No results found.</CommandEmpty>
                  <CommandGroup>
                    {statuses.map((status) => (
                      <CommandItem
                        key={status.value}
                        value={status.value}
                        onSelect={(value) => {
                          setSelectedStatus(
                            statuses.find((priority) => priority.value === value) || null
                          )
                          setOpen(false)
                        }}
                      >
                        <status.icon
                          className={cn(
                            'mr-2 h-4 w-4',
                            status.value === selectedStatus?.value ? 'opacity-100' : 'opacity-40'
                          )}
                        />
                        <span>{status.label}</span>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>


        <div className="col-span-full">
          <label htmlFor="qte" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-400">
            Qte
          </label>
          <div className="mt-2">
            <Input
              required
              id="latitude"
              name="qte"
              type="text"
              placeholder="Qte"
              className="resize-none"
              // value={formData.qte}
              ref={qte}
          
            />
          </div>
        </div>

        {/* Cover photo input field */}

        <Button className={cn(buttonVariants())} type="submit">
          Create
        </Button>
      </form>

      <Table className="my-7">
        <TableCaption>Une liste de vos produits récentes.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Product</TableHead>
            <TableHead>Qte</TableHead>
            <TableHead >type</TableHead>
            <TableHead >type</TableHead>
            <TableHead className="text-right"> Method</TableHead>

          </TableRow>
        </TableHeader>
        <TableBody>
          {operationItem.map((invoice, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{++index}</TableCell>
              <TableCell>{invoice.qte}</TableCell>
              <TableCell>{products.find(v => v.id == parseInt(invoice.product_id)).title}</TableCell>
              <TableCell >{invoice.type === "+" ? "Entre" : "Sortie"}</TableCell>
              <TableCell className="flex justify-end w-full">
                <X onClick={() => deleteItem(index)} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        {/* <TableFooter>
        <TableRow>
          <TableCell colSpan={4}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow>
      </TableFooter> */}
      </Table>

   { (operationItem.length !==0) &&  <Button onClick={saveFacture}>Save facture</Button>}
    </div>
  )
}

export default AddFacteur
