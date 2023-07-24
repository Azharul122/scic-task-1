
import { createContext, useEffect, useState } from 'react';
import app from '../Firebase/firebase.config';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, updatePhoneNumber, updateProfile } from "firebase/auth";
import axios from 'axios';
export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const auth = getAuth(app)
    const [user, setUser] = useState(null)
    const [loading,setLoading]=useState(true)

    const createUser = (name, email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password);

    }
    const updateUserProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
        });
    }
    const signIn = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }
    const logOut = () => {
        setLoading(true)
        return signOut(auth)
    }
    const authInfo = {
        loading,
        user,
        createUser,
        signIn,
        logOut,
        updateUserProfile
    }
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, loggedUser => {

            setUser(loggedUser)
            if(loggedUser){
                axios.post('https://as-12.vercel.app/jwt',{email: loggedUser.email})
                .then(data=>{
                    console.log(data.data.token)
                    localStorage.setItem('token',data.data.token)
                })
            }
            else{
                localStorage.removeItem('token')
            }

            setLoading(false)
        })
        return () => {
            return   unsubscribe();
        }

    },[])

    return (
        <AuthContext.Provider value={authInfo}>
            {
                children
            }
        </AuthContext.Provider>
    );
};

export default AuthProvider;