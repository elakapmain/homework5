import router from "../router"

import { firebaseApp } from './useFirebase'
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { useAuth as firebaseAuth } from '@vueuse/firebase/useAuth'

const auth = getAuth(firebaseApp)

const { isAuthenticated, user } = firebaseAuth(auth)
//  firebaseAuth will retrieve isAuthenticated
//  firebaseAuth will retrieve user

export const useAuth = () => {
    const login = async (username, password) => {
        await signInWithEmailAndPassword(auth, username, password)

        return isAuthenticated.value
    }

    const logout = async () => {
        await signOut(auth)
        //  Redirect user back to homepage after logging out
        router.push({name: 'Home'})
    }

    return {isAuthenticated, user, login, logout}
}