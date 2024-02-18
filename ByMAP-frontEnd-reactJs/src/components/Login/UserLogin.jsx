import * as z from "zod"
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "../ui/form.jsx";
import {Input} from "../ui/input.jsx";
import {Button} from "../ui/button.jsx";
import {useNavigate} from "react-router-dom";
import {ADMIN_DASHBOARD_ROUTE, User_DASHBOARD_ROUTE, OWNER_DASHBOARD_ROUTE} from "../../router/index.jsx";
import {Loader} from "lucide-react";
import {useUserContext} from "../../context/UserContext.jsx";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Icons } from "../icons.jsx";

const formSchema = z.object({
  email: z.string().email().min(2).max(30),
  password: z.string().min(8).max(30)
})
export default function UserLogin() {
  const {login, setAuthenticated, setToken , setUser , setRole} = useUserContext()
  const navigate = useNavigate()
  const form = useForm({
    resolver: zodResolver(formSchema),
  })
  let {setError, formState: {isSubmitting , isLoading}} = form

  // 2. Define a submit handler.
  const onSubmit = async values => {
    await login(values.email, values.password).then(
      ({status, data}) => {
        if (status === 200) {
          setToken(data.token)
          setUser(data.user)
          setAuthenticated(true)
          const {role} = data.user
          setRole(role)
          switch (role) {
            case 'buyer':
              navigate(User_DASHBOARD_ROUTE);
              break;
            case 'admin':
              navigate(ADMIN_DASHBOARD_ROUTE)
              break;
            case 'owner':
              navigate(OWNER_DASHBOARD_ROUTE)
              break;
          
          }
        }
      }).catch(({response}) => {
        setError('email', {
          message: 'Email and password not correct ',
        });
  
      setError('email', {
        message: response.data.errors.email.join()
      })
    })
  }

  return <>
    {/* <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({field}) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({field}) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input value={'123456789'} type={'password'} placeholder="Password" {...field} />
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />
        <Button  className={''} disabled={isLoading} type="submit">
          {isSubmitting && <Loader id="loadSubmit" className={'mx-2 my-2 animate-spin'}/>} {' '} Login
        </Button>
      </form>
    </Form> */}
  
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
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
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
