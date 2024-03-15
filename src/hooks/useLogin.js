import {useState} from 'react'
import {UseUserContext} from './useUserContext'

export const UseLogin = () => {
    const [error,setError] = useState(null)
    const [isLoading,setIsLoading] = useState(null)
    const {dispatch} = UseUserContext()
    const login = async (teamName,memEmail) => {
        setIsLoading(true)
        setError(null)
        const response = await fetch('https://mernback-emt3.onrender.com/api/login',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({"team_name":teamName,"mem_email":memEmail})
        })
        const json = await response.json()
        if(!response.ok){
            setIsLoading(false)
            setError(json.error)
        }
        if(response.ok){
            console.log("LOGIN SUCCESSFUL:")
            localStorage.setItem('user',JSON.stringify(json))
            dispatch({type:'LOGIN',payload:json})
            setIsLoading(false)
        }
    }
    return {login,isLoading,error}
}