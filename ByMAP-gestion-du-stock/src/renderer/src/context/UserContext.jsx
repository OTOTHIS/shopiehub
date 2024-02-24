import {createContext, useContext, useState} from "react";
import UserApi from "../services/Api/User/UserApi.js";


export const UserStateContext = createContext({
  user: {},
  authenticated: false,
  role: "owner",
  magazin: "",
  setUser: () => {
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
  const [role] = useState("owner")
  const [magazin, setMagazin] = useState(null)


  const login = async (email, password) => {
    return UserApi.login(email, password)
  }


  const setAuthenticated = (isAuthenticated) => {
    _setAuthenticated(isAuthenticated)
    window.localStorage.setItem('AUTHENTICATED', isAuthenticated)
  }

 

 

  return <>
    <UserStateContext.Provider value={{
      user,
      login,
    
      setUser,
      role,
      magazin,
      setMagazin,
      authenticated,
      setAuthenticated,
    }}>
      {children}
    </UserStateContext.Provider>
  </>
}
export const useUserContext = () => useContext(UserStateContext);
