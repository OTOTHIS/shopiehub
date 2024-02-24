
import { Button } from "@/components/ui/button";
import {ArrowUp,ArrowDown} from "lucide-react";

export const SortieColumns = [
  {
    accessorKey: "id",
    header: "#ID",
  },
  {
    accessorKey: "qte",
    header: ({ column }) => {
      const isAsc = column.getIsSorted() === "asc"
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(isAsc)}
        >
          Quantite
          {isAsc?<ArrowUp className="ml-2 h-4 w-4" />:<ArrowDown className="ml-2 h-4 w-4" />}
        </Button>
      )
    },
  },


  {
    accessorKey: "created_at",
    header: "Date",
    cell: ({ row }) => {
      const date = (row.getValue("created_at"))
      const formatted = new Date(date).toString()

      return <div className="text-left font-medium">{formatted.slice(0,21)}</div>
    },

  },
]
