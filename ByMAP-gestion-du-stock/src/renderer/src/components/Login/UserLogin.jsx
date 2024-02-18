import * as z from "zod"
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.jsx";
import {Input} from "@/components/ui/input.jsx";
import {Button} from "../ui/button.jsx";
import {useNavigate} from "react-router-dom";
import {Loader} from "lucide-react";
import {useUserContext} from "../../context/UserContext.jsx";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Icons } from "../icons.jsx";
import { OWNER_DASHBOARD_ROUTE, SELECT_MAGAZIN } from "@/router/index.jsx";


const formSchema = z.object({
  email: z.string().email().min(2).max(30),
  password: z.string().min(8).max(30)
})
export default function UserLogin() {
  const {login, setAuthenticated, setToken , setUser ,  setRole } = useUserContext()
  const navigate = useNavigate()
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
      const { status, data } = await login(values.email, values.password);
  
      if (status === 200) {
        setToken(data.token);
        setUser(data.user);
        setAuthenticated(true);
        const { role } = data.user;
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
        GitHub
      </Button>
    </Form>
  
  </>
}
