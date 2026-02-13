import { createContext, useContext, useState } from "react";

const SortContext = createContext();

export const useSort = () => {
    const context = useContext(SortContext);
    if (!context) throw new Error("useSort must be used with SortProvider");
    return context;
}

export const SortProvider = ({ children }) => {
    const [sortOption, setSortOption] = useState("no-sort");

    const value = {
        sortOption,
        setSortOption
    }

    return (
        <SortContext.Provider value={value}>
            {children}
        </SortContext.Provider>
    ); 
}