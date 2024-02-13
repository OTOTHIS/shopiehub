
import { cn } from "../../../lib/utils.js";

import {   AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger, } from "../../ui/alert-dialog.jsx";
import { AspectRatio } from "../../ui/aspect-ratio.jsx";
import {Button} from "../../ui/button.jsx";
import {ArrowUp,ArrowDown,X} from "lucide-react";
import OwnerProductApi from "../../../services/Api/ownerProductApi.jsx";

const handleDelte =  async (id) => {

  OwnerProductApi.delete(id).then(res=> console.log(res)).catch(err=>console.log(err))
}


export const ProductMagazinOwnerColumns = [

  {
    accessorKey: "id",
    header: "id",
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      const isAsc = column.getIsSorted() === "asc"
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(isAsc)}
        >
          title
          {isAsc?<ArrowUp className="ml-2 h-4 w-4" />:<ArrowDown className="ml-2 h-4 w-4" />}
        </Button>
      )
    },
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => {
      const fullDescription = row.original.description;
      const truncatedDescription = fullDescription.slice(0, 40);
      return <div className="text-right font-medium">{truncatedDescription}...</div>;
    },
  },

  {
    accessorKey: "category.name", // Update accessorKey to reflect nested property
    header: "Category",
  },
  // {
  //   accessorKey: "created_at",
  //   header: "created_at",
  //   cell: ({row}) => {
  //     const value = row.getValue("created_at")
    
  //     return <>{value}</>
  //   },
  // },
  {
    accessorKey: "image_url",
    header: "image",
    cell: ({row}) => {
      let img = String(row.getValue("image_url")) ;
      let image ;
        if(img.includes("placeholder")) {
          image = img.slice(30,img.length)
        }else{
          image = String(row.getValue("image_url")) ;
        }

      console.warn("image" , image)
      return <img   src={image}
      alt={image}
      width={200}
      height={80}
      className={cn(
        "object-cover transition-all hover:scale-105",
        AspectRatio === "portrait" ? "aspect-[3/4]" : "aspect-square"
      )}
    /> 

    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      const isAsc = column.getIsSorted() === "asc"
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(isAsc)}
        >
          Price
          {isAsc?<ArrowUp className="ml-2 h-4 w-4" />:<ArrowDown className="ml-2 h-4 w-4" />}
        </Button>
      )
    },
  },



  {
    accessorKey: "created_at",
    header: "created at",
    cell: ({ row }) => {
      const date = (row.getValue("created_at"))
      const formatted = new Date(date).toString()

      return <div className="text-right font-medium">{formatted.slice(0,21)}</div>
    },
  },

  
  {
    accessorKey: "Actions",
    header: "Actions",
    cell: ({row}) => {
   

      return (
      
      <>
      
      <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline"><X/></Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={()=> handleDelte(row.getValue('id'))}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
    </>
      
      )
    },
  },
]

