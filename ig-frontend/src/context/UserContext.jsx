import React, {createContext, useState} from 'react';

//Creating the context and assigning a default value
export const UserContext = createContext(null);

export default ({children}) =>{

    const [user,setUser] = useState(null)
    return(
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}