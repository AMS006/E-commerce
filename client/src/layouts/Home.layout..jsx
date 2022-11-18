import React from 'react'
import Navbar from '../components/Navbar'

const HomeLayout = (Components) =>({...props}) =>{
    return(
        <>
            <Navbar />
            <Components {...props} />
        </>
    )
}

export default HomeLayout