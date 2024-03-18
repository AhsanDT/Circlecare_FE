import React, { createContext } from "react";

export const AppContext = createContext({
    socket: null
})

const { Provider } = AppContext;

export const AppContextProvider = ({ children }) => {
    return (
        <Provider value={{ socket }}>
            {children}
        </Provider>
    )
}