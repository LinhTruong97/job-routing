import React from 'react'
import "./App.css"

import { Routes, Route } from "react-router-dom";

import HomePage from './pages/HomePage'
import JobCardModal from "./components/JobCardModal";
import AuthProvider from './auth/AuthProvider';
import SigninFormModal from './components/SigninFormModal';
import Layout from './Layout/Layout';
import RequireAuth from './auth/RequireAuth';


function App() {

    return (
        <div>
            <AuthProvider>
                <Routes >
                    <Route element={<Layout />}>
                        <Route path="/" element={<HomePage />} >
                            <Route path="/signin" element={<SigninFormModal />} />
                            <Route
                                path="/jobs/:id"
                                element={
                                    <RequireAuth>
                                        <JobCardModal />
                                    </RequireAuth>
                                }
                            />
                        </Route>
                        <Route
                            path="*"
                            element={
                                <main style={{ padding: '1rem' }}>
                                    <p>Not found page!</p>
                                </main>
                            }
                        />
                    </Route>
                </Routes>
            </AuthProvider>
        </div>
    )
}

export default App
