import React from "react";

const UserContext = React.createContext();

export const UserProvider = ({children}) => {
  const [credentials, setCredentials] = React.useState(
    {
      email:'',
      emailConfirm:'',
      password:'',
      passwordConfirm:''
    }
  );
  const [isRegistering, setIsRegistering] = React.useState(false);

  const handleChange = (event) => {
    const {name, type, value, checked} = event.target;
    setCredentials(prevCredentials => {
      return {...prevCredentials,
        [name] : type === "checkbox" ? checked : value
      }
    });
  }


  return(
    <UserContext.Provider
      value={{credentials, isRegistering,setIsRegistering ,handleChange}}
    >
      {children}
    </UserContext.Provider>
  );
}


export default UserContext;