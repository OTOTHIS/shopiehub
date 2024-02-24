import * as z from "zod"
import axios from "axios" 
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.jsx";
import {Input} from "@/components/ui/input.jsx";
import {Button} from "../ui/button.jsx";
import {useNavigate} from "react-router-dom";


import {useUserContext} from "../../context/UserContext.jsx";

import { Icons } from "../icons.jsx";
import {  SELECT_MAGAZIN } from "@/router/index.jsx";
import { useState } from "react";


const formSchema = z.object({
  email: z.string().email().min(2).max(30),
  password: z.string().min(8).max(30)
})

export default function UserLogin() {
  const {login, setAuthenticated, setToken , setUser ,  setRole } = useUserContext()
  const navigate = useNavigate()
  const [magaz , setMagaz] = useState({})
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email:"",
      password:""
    }
  })
  let {setError, formState: {isSubmitting , isLoading}} = form


  // 2. Define a submit handler.
  const onSubmit = async (values) => {
    try {
      const { status, data } = await axios.get('http://localhost:9900/api/user/'+values.email);
  
      if (status === 200) {
        // setToken(data.token);

          console.log(data)

        setUser(data);
        localStorage.setItem('user',JSON.stringify(data))
        setAuthenticated(true);
        navigate(SELECT_MAGAZIN)

     
      }
    } catch (error) {
      if (error.response) {
        const { status, data } = error.response;
  
        if (status === 500) {
          isSubmitting = false;
          document.getElementById('loadSubmit').classList.remove('animate-spin');
          setError('email', {
            message: 'Email and password not correct',
          });
        } else if (data && data.errors && data.errors.email) {
          setError('email', {
            message: data.errors.email.join(),
          });
        }
      } else {
        // Handle other types of errors
      }
    }
  };


  // const onSubmit = (values) => {
   

  //   fetch(")
  //   .then(response => response.json())
  //     .then(json => {
  //       console.log(json)
  //       setMagaz(json)
  //       setUser(json)
  //       setRole('owner')
  //       navigate(SELECT_MAGAZIN)
  //     })

  // }
  return <>

  
  <Form className="grid gap-6" {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-2">
         
          <FormField
          control={form.control}
          name="email"
          render={({field}) => (
            <FormItem>
              <FormLabel className="sr-only" htmlFor="email">Email</FormLabel>
              <FormControl>
                <Input     id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading} {...field} />
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />

          <FormField
          control={form.control}
          name="password"
          className="grid gap-1"
          render={({field}) => (
            <FormItem>
              <FormLabel className="sr-only" htmlFor="password">Password</FormLabel>
              <FormControl>
                <Input  type={'password'} placeholder="Password" {...field} />
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />

          <Button disabled={isSubmitting}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign In 
          </Button>
        </div>
      </form>
   
      <Button variant="outline" type="submit" disabled={isSubmitting}>
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.gitHub className="mr-2 h-4 w-4" />
        )}{" "}
        GitHub {magaz.id}
      </Button>
    </Form>
  
  </>
}
