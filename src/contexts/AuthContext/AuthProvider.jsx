import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../../firebase/firebase.init';

const AuthProvider = ({children}) => {

    const googleProvider=new GoogleAuthProvider();

    const [user,setUser]=useState(null);
    const [loading,setLoading]=useState(true);

    const registerUser=(email,password)=>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth,email,password);
    }

    const updateUserProfile=(profile)=>{
        return updateProfile(auth.currentUser,profile);
    }

    const signInUser=(email,password)=>{
        setLoading(true);
        return signInWithEmailAndPassword(auth,email,password);
    }

    const signInGoogle=()=>{
        setLoading(true);
        return signInWithPopup(auth,googleProvider);
    }

    const logout=()=>{
        setLoading(true);
        return signOut(auth);
    }

    useEffect(()=>{
        const unsubscribe=onAuthStateChanged(auth,(currentUser)=>{
            setUser(currentUser);
            setLoading(false);
        })
        return ()=>{
            unsubscribe();
        }
    },[])

    const authInfo={
       user,
       loading,
       registerUser,
       signInUser,
       signInGoogle,
       logout,
       updateUserProfile,
    }

    return (
        <AuthContext value={authInfo}>
             {children}
        </AuthContext>
    );
};

export default AuthProvider;