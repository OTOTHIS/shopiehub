

// import * as z from "zod";
// import axios from "axios";
// import { useForm , Controller  } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "../../ui/form.jsx";
// import { Input } from "../../ui/input.jsx";
// import { Button } from "../../ui/button.jsx";
// import { Loader } from "lucide-react";

// import { Textarea } from "../../ui/textarea.jsx";
// import { useToast } from "../../ui/use-toast.js";


// import {Upload} from 'lucide-react'
// import { useEffect, useRef, useState } from "react";



// const formSchema = z.object({
//   name: z.string(),
//   adresse: z.string(),
//   Latitude: z.unknown(), 
//   Longitude: z.unknown(),
//     image: z.unknown(), 
//   });
  
//   const OwnerCreateMagazin = () => {
//     const latitudeRef = useRef("");
//     const longitudeRef = useRef("");
//     const [location, setLocation] = useState({ latitude: null, longitude: null });

//     const { toast } = useToast();
//     const form = useForm({
//       resolver: zodResolver(formSchema),
//       defaultValues: {
//         Latitude:location.latitude,
//         Longitude:location.longitude
//       }
    
//     });
  
//     const {
//       setError,
//       formState: { isSubmitting },
//       handleSubmit,
//       reset,
//       setValue
      
//     } = form;
  
//     const handleFileChange = (event) => {
//       form.setValue("image", event.target.files[0]);
//     };
  

//     // Fetch user's location using Geolocation API
//     useEffect(() => {
//       if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(
//           (position) => {
         
//             // Update the latitude and longitude state
//             setLocation({
//               latitude: position.coords.latitude,
//               longitude: position.coords.longitude,
//             });
//                 // Update the input values using refs
//                 if (latitudeRef.current) {
//                   latitudeRef.current.value = position.coords.latitude;
//                 }
      
//                 if (longitudeRef.current) {
//                   longitudeRef.current.value = position.coords.longitude;
//                 }
         
//         },
//           (error) => {
//             console.error('Error getting location:', error.message);
//           }
//         );
//       } else {
//         console.error('Geolocation is not supported by this browser.');
//       }
//     }, []);
  
//     const onSubmit = async (formData) => {
//       try {
//         // await formSchema.validate(formData);

//         console.log('hello')

  
//         const formDataForUpload = new FormData();
//         Object.entries(formData).forEach(([key, value]) => {
//           formDataForUpload.append(key, value);
//         });
  
//         await axios.post(
//           `${import.meta.env.VITE_BACKEND_URL}/api/owner/magazins/`,
//           formDataForUpload,
//           {
//             headers: {
//               "Content-Type": "multipart/form-data",
//               Authorization: `Bearer ${localStorage.getItem("token")}`,
//             },
//           }
//         );
  
//         toast({
//           title: "Success",
//           description: "magazin created successfully!",
//         });
//         reset();
//       } catch (error) {
//         console.error(error);
      
//       }
//     };
  
//     return (
//       <div className="w-1/3 mx-auto">
//         <Form {...form}>
//           <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
//             <FormField
//               control={form.control}
//               name="name"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>name</FormLabel>
//                   <FormControl>
//                     <Input placeholder="name" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="adresse"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Adresse</FormLabel>
//                   <FormControl>
//                     <Input placeholder="adresse" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />


//       <FormField
//             control={form.control}
//             name="Latitude"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Latitude</FormLabel>
//                 <FormControl>
//                 <Input placeholder="Latitude" className="resize-none" ref={latitudeRef}  {...field} />

//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

// <FormField
//             control={form.control}
//             name="Longitude"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Longitude</FormLabel>
//                 <FormControl>
//                 <Input placeholder="Longitude" className="resize-none"  ref={longitudeRef} {...field} />

//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />




     
  
           

//             <div className="col-span-full">
//               <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
//                 Cover photo
//               </label>
//               <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
//                 <div className="text-center">
//                   <Upload className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                
//                   <div className="mt-4 flex text-sm leading-6 text-gray-600">
//                     <label
//                       htmlFor="file-upload"
//                       className="relative cursor-pointer rounded-md  font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
//                     >
//                       <span>Upload a file</span>
//                       <input id="file-upload" name="file-upload"  onChange={handleFileChange} type="file" className="sr-only" />
//                     </label>
//                     <p className="pl-1">or drag and drop</p>
//                   </div>
//                   <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
//                 </div>
//               </div>
//             </div>


//             <Button className="" type="submit" disabled={isSubmitting}>
//               {isSubmitting && <Loader className="mx-2 my-2 animate-spin" />} Create
//             </Button>
//           </form>
//         </Form>
//       </div>
//     );
//   };
  
//   export default OwnerCreateMagazin;





// import axios from "axios";
// import { useForm } from "react-hook-form";
// import { useEffect, useRef, useState } from "react";
// import { Upload } from "lucide-react";
// import { useToast } from "../../ui/use-toast.js";

// const OwnerCreateMagazin = () => {
//   const latitudeRef = useRef("");
//   const longitudeRef = useRef("");
//   const [location, setLocation] = useState({ latitude: null, longitude: null });

//   const { toast } = useToast();
//   const form = useForm({
//     defaultValues: {
//       Latitude: location.latitude,
//       Longitude: location.longitude,
//     },
//   });

//   const {
//     formState: { isSubmitting },
//     handleSubmit,
//     reset,
//     setValue,
//   } = form;

//   const handleFileChange = (event) => {
//     form.setValue("image", event.target.files[0]);
//   };

//   // Fetch user's location using Geolocation API
//   useEffect(() => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           setLocation({
//             latitude: position.coords.latitude,
//             longitude: position.coords.longitude,
//           });

//           if (latitudeRef.current) {
//             latitudeRef.current.value = position.coords.latitude;
//           }

//           if (longitudeRef.current) {
//             longitudeRef.current.value = position.coords.longitude;
//           }
//         },
//         (error) => {
//           console.error("Error getting location:", error.message);
//         }
//       );
//     } else {
//       console.error("Geolocation is not supported by this browser.");
//     }
//   }, []);

//   const onSubmit = async (formData) => {
//     try {
//       const formDataForUpload = new FormData();
//       Object.entries(formData).forEach(([key, value]) => {
//         formDataForUpload.append(key, value);
//       });

//       await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/owner/magazins/`, formDataForUpload, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });

//       toast({
//         title: "Success",
//         description: "Magazin created successfully!",
//       });
//       reset();
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div className="w-1/3 mx-auto">
//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
//         <div className="col-span-full">
//           <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
//             Name
//           </label>
//           <div className="mt-2">
//             <input
//               id="name"
//               name="name"
//               type="text"
//               placeholder="Name"
//               className="resize-none"
//               ref={form.register}
//             />
//           </div>
//         </div>

//         <div className="col-span-full">
//           <label htmlFor="adresse" className="block text-sm font-medium leading-6 text-gray-900">
//             Adresse
//           </label>
//           <div className="mt-2">
//             <input
//               id="adresse"
//               name="adresse"
//               type="text"
//               placeholder="Adresse"
//               className="resize-none"
//               ref={form.register}
//             />
//           </div>
//         </div>

//         <div className="col-span-full">
//           <label htmlFor="latitude" className="block text-sm font-medium leading-6 text-gray-900">
//             Latitude
//           </label>
//           <div className="mt-2">
//             <input
//               id="latitude"
//               name="latitude"
//               type="text"
//               placeholder="Latitude"
//               className="resize-none"
//               ref={(e) => {
//                 form.register(e);
//                 latitudeRef.current = e;
//               }}
//             />
//           </div>
//         </div>

//         <div className="col-span-full">
//           <label htmlFor="longitude" className="block text-sm font-medium leading-6 text-gray-900">
//             Longitude
//           </label>
//           <div className="mt-2">
//             <input
//               id="longitude"
//               name="longitude"
//               type="text"
//               placeholder="Longitude"
//               className="resize-none"
//               ref={(e) => {
//                 form.register(e);
//                 longitudeRef.current = e;
//               }}
//             />
//           </div>
//         </div>



//         <div className="col-span-full">
// <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
//                 Cover photo              </label>
//                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
//                 <div className="text-center">
//                    <Upload className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                
//                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
//                      <label
//                        htmlFor="file-upload"
//                        className="relative cursor-pointer rounded-md  font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
//                     >
//                       <span>Upload a file</span>
//                        <input id="file-upload" name="file-upload"  onChange={handleFileChange} type="file" className="sr-only" />
//                    </label>
//                     <p className="pl-1">or drag and drop</p>
//                   </div>
//                   <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>                </div>
//               </div>
//            </div>
//            <button >submit</button>
//       </form>
//     </div>
//   );
// };

// export default OwnerCreateMagazin;
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Upload , MapPin  } from "lucide-react";
import { useToast } from "../../ui/use-toast.js";
import { Input } from "../../ui/input.jsx";
import { Button, buttonVariants } from "../../ui/button.jsx";
import { cn } from "../../../lib/utils.js";
import {   Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger, } from "../../ui/dialog.jsx";
import { Label } from "../../ui/label.jsx";


const OwnerCreateMagazin = () => {
     const mapLink = useRef("");
  const [formData, setFormData] = useState({
    name: "",
    Latitude: "",
    Longitude: "",
    image: null,
  });

  const { toast } = useToast();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({ ...prevData, image: e.target.files[0] }));
  };

  useEffect(() => {
    // Fetch user's location using Geolocation API
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData((prevData) => ({
            ...prevData,

            Latitude: position.coords.latitude,
            Longitude: position.coords.longitude,
          }));
        },
        (error) => {
          console.error("Error getting location:", error.message);
        }
      );
      


    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);



    // Function to extract latitude and longitude from the map link
    const extractLatLongFromMapLink = () => {
   
      const mapLinks =String(mapLink.current.value).split('data=')[0];
   

      // Extract latitude, longitude, and zoom level from the link
      var regex = /@(-?\d+\.\d+),(-?\d+\.\d+),(\d+)z/;
      var match = mapLinks.match(regex);

      if (match) {
        var latitude = match[1];
        var longitude = match[2];
        var zoomLevel = match[3];

        setFormData((prevData) => ({
          ...prevData,

          Latitude: latitude,
          Longitude:longitude,
        }));
      
       
      } else {
        console.log("Invalid Google Maps link. Please enter a valid link.");
      }
    };
  


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataForUpload = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataForUpload.append(key, value);
      });

      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/owner/magazins/`,
        formDataForUpload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      toast({
        title: "Success",
        description: "Magazin created successfully!",
      });

      // Optionally reset the form data
      setFormData({
        name: "",
        Latitude: "",
        Longitude: "",
        image: null,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-1/3 mx-auto">
     


      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="col-span-full">
          <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
            Name
          </label>
          <div className="mt-2">
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Name"
              className="resize-none"
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>
        </div>

   
        <div className='mx-auto'>
        <Dialog >
      <DialogTrigger asChild>
        <Button variant="outline">Get location from map link</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle> link map</DialogTitle>
          <DialogDescription>
           Get Location form map link
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input
              id="link"
              ref={mapLink}
            />
          </div>
          <Button onClick={extractLatLongFromMapLink} type="submit" size="sm" className="px-3">
            <span className="sr-only">Copy</span>
            <MapPin  className="h-4 w-4" />
          </Button>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    </div>

        <div className="col-span-full">
          <label htmlFor="latitude" className="block text-sm font-medium leading-6 text-gray-900">
            Latitude
          </label>
          <div className="mt-2">
            <Input
              id="latitude"
              name="Latitude"
              type="text"
              placeholder="Latitude"
              className="resize-none"
              value={formData.Latitude}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="col-span-full">
          <label htmlFor="longitude" className="block text-sm font-medium leading-6 text-gray-900">
            Longitude
          </label>
          <div className="mt-2">
            <Input
              id="longitude"
              name="Longitude"
              type="text"
              placeholder="Longitude"
              className="resize-none"
              value={formData.Longitude}
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* Cover photo input field */}
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
                  className="relative cursor-pointer rounded-md font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                >
                  <span>Upload a file</span>
                  <input id="file-upload" name="file-upload" onChange={handleFileChange} type="file" className="sr-only" />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
            </div>
          </div>
        </div>

        <Button className={cn(buttonVariants())}  type="submit" >
               Create
             </Button>
      </form>
    </div>
  );
};

export default OwnerCreateMagazin;