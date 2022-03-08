import { createContext, useState } from "react";

export const SearchContext = createContext({searchString : "", handleChange : () => {}});

export const SearchContextProvider = ({children}) => {
    const [searchString, setSearchString] = useState("");
    const handleChange = (str) => {
        console.log("str:", str);
        setSearchString(str);
    }
    return <SearchContext.Provider value={{searchString, handleChange}}>{children}</SearchContext.Provider>
}