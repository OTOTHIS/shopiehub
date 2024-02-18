import * as z from "zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form.jsx";
import { Input } from "../../ui/input.jsx";
import { Button } from "../../ui/button.jsx";
import { Loader } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "../../ui/radio-group.jsx";
import { Textarea } from "../../ui/textarea.jsx";
import { useToast } from "../../ui/use-toast.js";
import OwnerProductApi from "../../../services/Api/ownerProductApi.jsx";
import { useEffect, useState } from "react";
import MagazinApi from "../../../services/Api/magazinApi.js";
import adminCategoryApi from "../../../services/Api/adminCategory.jsx";
import {Upload} from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";


const formSchema = z.object({
    title: z.string(),
    description: z.string(),
    magazin_id: z.unknown(), 
    category_id: z.unknown(),
    price: z.unknown(),
    subcategory_id : z.unknown(),
    image: z.unknown(), 
  });
  
  const CreateProductOwner = () => {
    const [magazins, setMagazins] = useState([]);
    const [categories, setCategories] = useState([]);
    const [Subcategories, setSubCategories] = useState([]);
  
    const { toast } = useToast();
    const form = useForm({
      resolver: zodResolver(formSchema),
      defaultValues : {
        subcategory_id : ""
      }
    });
  
    const {
      setError,
      formState: { isSubmitting },
      handleSubmit,
      reset,
      resetField
    } = form;
  
    const handleFileChange = (event) => {
      form.setValue("image", event.target.files[0]);
    };
  
    useEffect(() => {
      MagazinApi.all()
        .then(({ data }) => {
          const modifiedData = data.map(({ id, name }) => ({ id, name }));
          setMagazins(modifiedData);
        })
        .catch((reason) => {
          console.warn(reason);
        });
  
      adminCategoryApi
        .all()
        .then(({ data }) => {
          
          setCategories(data);
        })
        .catch((reason) => {
          console.warn(reason);
        });

    


    }, []);
  
    const onSubmit = async (formData) => {
      try {
        // await formSchema.validate(formData);
        const formDataForUpload = new FormData();

        Object.entries(formData).forEach(([key, value]) => {
          // Check if the value is numeric (you may need to adjust this check based on your specific requirements)
          if (!isNaN(value)) {
            // Parse the value to an integer
            formDataForUpload.append(key, parseInt(value, 10));
          } else {
            // If it's not numeric, append as is
            formDataForUpload.append(key, value);
          }
        });

       
        await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/owner/products`,
          formDataForUpload,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        resetField();
        toast({
          title: "Success",
          description: "Product created successfully!",
        });
        reset();
      } catch (error) {
        console.error(error);
      
      }
    };
  

    return (
      <div className="w-1/3 mx-auto">
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>title</FormLabel>
                  <FormControl>
                    <Input placeholder="Title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>price</FormLabel>
                  <FormControl>
                    <Input  placeholder="price" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
      <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="description"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />


         <FormField
            control={form.control}
            name="magazin_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>magazin_id</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a verified magazin to display" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {magazins.map((v) => (
                      <SelectItem  key={v.id} value={String(v.id)}>
                        {v.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>category_id</FormLabel>
                <Select
                
                  // onValueChange={field.onChange}
                  onValueChange={(value) => {
                    field.onChange(value);
                    adminCategoryApi
                    .getSubs(parseInt(value))
                    .then(({ data }) => {
                     
                      setSubCategories(data[0]);
                    })
                    .catch((reason) => {
                      console.warn(reason);
                    });
                 
                  }}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a verified category_id to display" />
                    </SelectTrigger>
                  </FormControl>

                  <SelectContent>
                    {categories.map((v) => (
                      <SelectItem  key={String(v.id)} value={String(v.id)}>
                        {v.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />
     
     <FormField
            control={form.control}
            name="subcategory_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>subcategory_id</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a verified subcategory_id to display" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Subcategories.map((v) => (
                      <SelectItem key={String(v.id)} value={String(v.id)}>
                        {v.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />
  
           

            <div className="col-span-full">
              <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                Cover photo
              </label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md  font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                    >
                      <span>Upload a file</span>
                      <input id="file-upload" name="file-upload"  onChange={handleFileChange} type="file" className="sr-only" />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
            </div>


            <Button className="" type="submit" disabled={isSubmitting}>
              {isSubmitting && <Loader className="mx-2 my-2 animate-spin" />} Create
            </Button>
          </form>
        </Form>
      </div>
    );
  };
  
  export default CreateProductOwner;