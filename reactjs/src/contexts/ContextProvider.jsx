import { createContext, useContext, useState } from "react";

const StateContext = createContext({
    currentUser: {},
    userToken: null,
    stoks: [],
    penjualans: [],
    tenants: [],
    pendapatans: [],
    toast: {
        message: "",
        show: false,
    },
    setStoks: () => { },
    setPenjualans: () => { },
    setTenants: () => { },
    setPendapatans: () => { },
    setCurrentUser: () => { },
    setUserToken: () => { },
});

export const ContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState({});
    const [userToken, setUserToken] = useState(localStorage.getItem('accessToken'));
    const [stoks, setStoks] = useState([]);
    const [penjualans, setPenjualans] = useState([]);
    const [tenants, setTenants] = useState([]);
    const [pendapatans, setPendapatans] = useState([]);
    const [toast, setToast] = useState({ message: "", show: false, color: "" });

    const setToken = (token) => {
        if (token) {
            localStorage.setItem('accessToken', token);
        } else {
            localStorage.removeItem('accessToken');
        };
        setUserToken(token);
    }

    const showToast = (message, color) => {
        setToast({
            message: message,
            show: true,
            color: color,
        });

        setTimeout(() => {
            setToast({ message: "", show: false, color: "" });
        }, 3000)
    }

    return (
        <StateContext.Provider value={{
            currentUser,
            setCurrentUser,
            stoks,
            penjualans,
            tenants,
            pendapatans,
            setStoks,
            setPenjualans,
            setTenants,
            setPendapatans,
            userToken,
            setToken,
            toast,
            showToast
        }}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext);