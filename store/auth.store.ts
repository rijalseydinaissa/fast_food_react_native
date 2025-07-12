import { create } from 'zustand'
import { User } from "@/type"
import {isLoading} from "expo-font";
import {getCurrentUser} from "@/lib/appwrite";

type AuthState = {

    isAuthenticated: boolean
    user: User | null
    isLoading: boolean

    setIsAuthenticated: (isAuthenticated: boolean) => void
    setUser: (user: User) => void
    setIsLoading: (isLoading: boolean) => void

    fetchAuthenticatedUser: () => void
}

const useAuthStore = create<AuthState>((set)=>(
    {
        isAuthenticated: false,
        user:null,
        isLoading: false,

        setIsAuthenticated:(value)=>set({isAuthenticated:value}),
        setUser:(value)=>set({user:value}),
        setIsLoading:(value)=>set({isLoading:value}),

        fetchAuthenticatedUser:async ()=>{
            set({isLoading:true})
            try {
               const user = await getCurrentUser()
                if (user) set({
                    user:user as User,
                    isAuthenticated:true,
                })
                else set({
                    isAuthenticated:false,
                    user:null,
                })

            }catch (e) {
                set({
                    isAuthenticated:false,
                    user:null,
                })
                console.log("Fetch authenticated user error",e)
                throw new Error(e as string)
            }finally {
                set({isLoading: false})
            }
        }

    }
))

export default useAuthStore