import React from 'react'
// import { Context } from '../js/store/appContext'
import './Main.css'
import MapSelector from '../components/MapSelector.jsx'
import RedirectToHome from '../components/RedirectHome.jsx'

const Main = () => {

    // const { actions } = useContext(Context)
    const token = localStorage.getItem('token')


    return (
        <div className='mainTotal'>
         
            <div className="list-group">
                {
                    token ? (
                        <MapSelector />
                ) 
                    : (
                        <RedirectToHome/>
                    )
                }
            </div>
        </div>
    )
}

export default Main
