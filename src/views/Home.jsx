import React from 'react';
import Navbar from '../components/Navbar.jsx';
import './Home.css';
import Login from '../components/Login.jsx';
import Capture from '../components/Capture.jsx';
import HomeCNC from './HomeCNC.jsx';

const Home = () => {
    const token = localStorage.getItem('token');
    // const name = localStorage.getItem('name');

    return (
        <div className='total_home'>
       

            {token ? (
                <>
                
                <HomeCNC />
                </>
            ) : (
                <Login />
            )}

        </div>
    );
}

export default Home;
