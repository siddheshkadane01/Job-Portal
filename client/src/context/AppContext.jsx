import { createContext, useEffect, useState } from "react";
import { jobsData } from "../assets/assets";

export const AppContext = createContext()

export const AppContextProvider = (props) => {
    const [searchFilter, setSearchFilter] = useState({
        title: '',
        location: '',
    })

    const [isSearched, setIsSearched] = useState(false)

    const [jobs, setJobs] = useState([]) 

    const [showRecruterLogin, setShowRecruterLogin] = useState(false)

    //Function to fetch jobs
    const fetchJobs = async () => {
        setJobs(jobsData)
    }

    useEffect(() => {
        fetchJobs()
    }, [])


    const value = {
        stateSearchFilter: searchFilter,
        setSearchFilter,
        isSearched, setIsSearched,
        jobs, setJobs,
        showRecruterLogin, setShowRecruterLogin
    }

    return (<AppContext.Provider value={value}>
        {props.children}
    </AppContext.Provider>)
}