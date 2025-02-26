import React from 'react';
import './Profile.css'
import Navbar from '../components/Navbar.jsx';

const Profile = () => {





    return (
        <div>
            <Navbar />
            <img src='https://universidaddepadres.es/wp-content/uploads/humanos_construccion.jpg' className='img-fluid rounded mx-auto d-block' alt='Imagen en construccion'></img>

            <div className="container mt-3 profile-container" >
                <p style={{ marginLeft: '25px', marginTop: '15px', marginBottom: '20px' }}>
                    Profile Settings
                </p>

            </div>
        </div>
    )
}

export default Profile