import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Loader } from "lucide-react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { toast } from "../../ui/use-toast";
import { Button } from "../../ui/button";
import { Link } from "react-router-dom";
import MagazinApi from "../../../services/Api/magazinApi";
import { useEffect, useState } from "react";
import { DataTable } from "../../data-table/DataTable";
import { ProductMagazinOwnerColumns } from "../../data-table/ownerPorductsMagazins/ProdcutOwnerColumns";
import { cn } from "../../../lib/utils";

const FormSchema = z.object({
  magazin: z.string({
    required_error: "Please select an magazin",
  }),

});

const ProductMagazinDashbord = () => {
  const [magazins, setMagazins] = useState([]);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);

  useEffect(() => {
    MagazinApi.all()
      .then(({ data }) => {
        const modifiedData = data.map(({ id, name }) => ({ id, name }));
        setMagazins(modifiedData);
      })
      .catch((reason) => {
        console.warn(reason);
      });


  }, []);

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      magazins: magazins && magazins.length > 0 ? magazins[0].id : null,
      
    },
  });

  function onSubmit(data) {
    

      const fetchData = async () => {
        try {
          setLoading(true);
          setShow(true);
          const response = await MagazinApi.getPoducts(parseInt(data.magazin));
          setProducts(response.data.data);
        } catch (error) {
          console.log(error)
        } finally {
          setLoading(false);
        }
      };
  
      fetchData();

  
  }

  return (
    <>
      <div className="mx-auto mt-12">
        {" "}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6"
          >
            <FormField
              control={form.control}
              name="magazin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Magazin</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Votre magazin" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {magazins.map((v) => (
                        <SelectItem key={v.id} value={String(v.id)}>{v.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
              
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Select</Button>
          </form>
        </Form>{" "}
        {loading ? (
        <div className="h-56 flex items-center   justify-center w-96 mx-auto">
          <Loader
            id="loadSubmit"
            className={cn("mx-2 my-2 text-2xl animate-spin ",show === false ? "hidden":"")}
          />
        </div>
      ) : (

        <DataTable filterKey={"description"} columns={ProductMagazinOwnerColumns} data={products} />
      )}
      </div>
    </>
  );
};

export default ProductMagazinDashbord;
