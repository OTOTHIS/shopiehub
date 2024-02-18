import {createContext, useContext, useState} from "react";
import UserApi from "../services/Api/User/UserApi.js";


export const UserStateContext = createContext({
  user: {},
  authenticated: false,
  role: "owner",
  magazin: "",
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
  setMagazin: () => {
  
  },
 
})
export default function UserContext({children}) {
  const [user, setUser] = useState({})
  const [authenticated, _setAuthenticated] = useState('true' === window.localStorage.getItem('AUTHENTICATED'))
  const [role, setRole] = useState("owner")
  const [magazin, setMagazin] = useState(null)


  const login = async (email, password) => {
    return UserApi.login(email, password)
  }
  const logout = () => {
    setUser({})
    setAuthenticated(false)
    // window.localStorage.removeItem('token');
    
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
      role,
      magazin,
      setMagazin,
      authenticated,
      setAuthenticated,
      setToken
    }}>
      {children}
    </UserStateContext.Provider>
  </>
}
export const useUserContext = () => useContext(UserStateContext);
