"use client"
import { EventRecord } from "@/lib/types";
import React, { createContext, useContext, useState } from "react";

interface AuthContextType {
    addToJoin: EventRecord | null;
    setAddToJoin: React.Dispatch<React.SetStateAction<EventRecord | null>>
}

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {

    const [addToJoin, setAddToJoin] = useState<EventRecord | null>(null);
    const sharedData = {
        addToJoin,
        setAddToJoin
    }
    return (
        <AuthContext.Provider value={sharedData}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === null) {
        throw new Error('useAuth must be used within AuthProvider')
    }
    return context
}