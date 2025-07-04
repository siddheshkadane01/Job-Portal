import { createContext, useState } from "react";

export const AppContext = createContext()

export const AppContextProvider = (props) => {
    const [searchFilter, setSearchFilter] = useState({
        title: '',
        location: '',
    })

    const [isSearched, setIsSearched] = useState(false)

    const value = {
        stateSearchFilter: searchFilter,
        setSearchFilter,
        isSearched, setIsSearched,
    }

    return (<AppContext.Provider value={value}>
        {props.children}
    </AppContext.Provider>)
}