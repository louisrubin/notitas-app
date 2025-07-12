import { createContext, useState, useContext } from "react";

const DropDownContext = createContext<{
    openKey: string | null;
    setOpenKey: (key: string | null) => void;
}>({
    // valores default 
    openKey: null,
    setOpenKey: () => {},
});

export const DropDownProvider = ({ children }) => {
    const [openKey, setOpenKey] = useState<string | null>(null);
    return (
        <DropDownContext.Provider value={{ openKey, setOpenKey }}>
            {children}
        </DropDownContext.Provider>
    );
};

export const useDropDown = () => useContext(DropDownContext);
