import React, { useEffect, useState } from 'react'

const useLocalStorage = (key, initialValue) => {
    
    const [value, setValue] = useState(() => {
        try {
            const localValue = window.localStorage.getItem(key); //check if there is there anything in this location with the key passed in. If there is return local value
            return localValue ? JSON.parse(localValue) :initialValue; //ternary to check if local value is available and then parse if true otherwise return default initial value.
        //essentially check to see if there is anything in the local storage,otherwise return the initial value
        } catch (error) {
            console.log(error)
            return initialValue; 
        }
    })

    useEffect(() => {
        window.localStorage.setItem(key, JSON.stringify(value)) //set the key/name to JSON and then revert into a string and pass it into the value variable.
    }, [key, value]) //pass key and value as dependencies for this useEffect hook

    return [value, setValue]


}

export default useLocalStorage