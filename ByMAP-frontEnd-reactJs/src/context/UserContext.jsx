import {createContext, useContext, useState} from "react";
import UserApi from "../services/Api/User/UserApi.js";
import Cookies from 'universal-cookie';
const cookies = new Cookies();

export const UserStateContext = createContext({
  user: {},
  authenticated: false,
  role: "user",
  setUser: () => {
  },
  logout: () => {
  },
  login: (email, password) => {
  },
  setAuthenticated: () => {
  },
  setToken: () => {
  },
  setRole: () => {
  },
})
export default function UserContext({children}) {
  const [user, setUser] = useState({})
  const [authenticated, _setAuthenticated] = useState('true' === window.localStorage.getItem('AUTHENTICATED'))
 const [role , _setRole] = useState(null)
 const setRole = (role) => {
  _setRole(role);
  cookies.set('role',role ) ;
  
   }
  const login = async (email, password) => {
    return UserApi.login(email, password)
  }
  const logout = () => {
    setUser({})
    setAuthenticated(false)
    // window.localStorage.removeItem('token');
    // cookies.remove("role")
  }

  const setAuthenticated = (isAuthenticated) => {
    _setAuthenticated(isAuthenticated)
    window.localStorage.setItem('AUTHENTICATED', isAuthenticated)
  }

  const setToken = (token) => {
    window.localStorage.setItem('token', token)
  }

 

  return <>
    <UserStateContext.Provider value={{
      user,
      login,
      logout,
      setUser,
      role,setRole,
      authenticated,
      setAuthenticated,
      setToken
    }}>
      {children}
    </UserStateContext.Provider>
  </>
}
export const useUserContext = () => useContext(UserStateContext);
