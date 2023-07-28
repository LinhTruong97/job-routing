import React, { useState, createContext } from "react";
import auth from "./auth";

export const AuthContext = createContext(null);

function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [password, setPassword] = useState(null);

    let signin = (newUser, newPassword, callback) => {
        return auth.signin(() => {
            setUser(newUser);
            setPassword(newPassword);
            callback();
        });
    };

    let signout = (callback) => {
        return auth.signout(() => {
            setUser(null);
            setPassword(null);
            callback();
        });
    };
    let value = { user, password, signin, signout };
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;