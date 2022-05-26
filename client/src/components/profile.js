import React, { useEffect, useState } from 'react';
import auth from '../utils/auth'
import { GET_PROFILE, ADD_PET } from '../utils/mutations';
import { useLazyQuery } from '@apollo/client';
import SavedPet from './SavedPet'

import '../styles/profile.css'
import Footer from './footer';https://github.com/mcarson24/pet_match/pull/18/conflict?name=client%252Fsrc%252Fcomponents%252Fprofile.js&ancestor_oid=217329a45d669ccac0a8a5a97a75db62957fde70&base_oid=a16b7df8320c55b855ac99ed207975223e14431a&head_oid=37e8aa9c16e2ba618751572e11ec46088439d2ad

function Profile(props) {
    const [user, setUser] = useState(auth.getProfile())
    const [pets, setPets] = useState([])

    const classes = {
        petContainer: {
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between'
        }
    }
    const [getPets, { loading, error, data }] = useLazyQuery(GET_PROFILE, {
        variables: { id: user.data._id },
    }, [user, pets]);

    useEffect(() => { 
        async function fetch() {
            const pets = await getPets()
            setPets(pets.data.user.pets)
        }
        fetch()
    }, [getPets])

    return(
        <>
            <div className="jumbotron jumbotron-fluid">
                <div className="container">
                    <h1 className="profileHeader">Your Profile</h1>
                </div>
            </div>
            <div className='container-fluid'>
                <div className='row justify-content-center'>
                    <div className='col-6 firstCol'>
                        <h3>{user.data.name}</h3>
                        <img className='userPic' src='https://media.istockphoto.com/vectors/profile-placeholder-image-gray-silhouette-no-photo-vector-id1016744034?k=20&m=1016744034&s=612x612&w=0&h=kjCAwH5GOC3n3YRTHBaLDsLIuF8P3kkAJc9RvfiYWBY=' alt=''/>
                    </div>
                    <div className='col-4 secondCol'>
                        <h3>Email</h3>
                        <h6>{user.data.email}</h6>
                        <h3>Change Password</h3>
                        <h3>Edit Profile</h3>
                        <h3>Settings</h3>
                    </div>
                    <div className='col-10 likesCol'>
                        <h2>Saved Pets</h2>
                        <div style={classes.petContainer}>
                            {props.pets && props.pets.map(pet => <SavedPet pet={pet} key={pet._id} /> )}
                        </div>
                    </div>
                </div>
            </div>

        
        <Footer />
        

        </>
    )
}

export default Profile;