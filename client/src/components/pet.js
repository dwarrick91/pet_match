import React, { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap-button-loader'
import '../styles/pet.css';

import auth from '../utils/auth'

function Pet(props) {
    const [pets, setPets] = useState([])
    const [user, setUser] = useState(auth.getProfile())

    const classes = {
        svg: {
            height: '1em'
        },
        petTitle: {
            display: 'flex',
            justifyContent: 'space-between',
        },
        petsList: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        },
        pet: {
            margin: '1em auto',
            backgroundColor: 'rgb(228 228 231)',
            padding: '1em 2em',
            width: '75%',
            borderRadius: '1em',
            filter: 'drop-shadow(0 4px 3px rgb(0 0 0 / 0.07)) drop-shadow(0 2px 2px rgb(0 0 0 / 0.06))'
        },
        petInfo: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            color: 'rgb(113 113 122)'
        },
        petImage: {
            borderRadius: '1em'
        }
    }
    
    const getPets = e => {
        e.preventDefault()
        axios.get('/api/token')
             .then(res => {
                 setPets(res.data.animals)
             })
    }

    return (
        <>
            <div className="jumbotron jumbotron-fluid">
                <div className="container">
                    <h1 className="petHeader">Search</h1>
                </div>
            </div>

            <div className='container-fluid'>

                <div className='row justify-content-center'>
                    <div className='col-10 searchCol'>

                        <form className="form-inline searchBar" onSubmit={e => getPets(e)}>
                            <input className="form-control mr-sm-2" type="search" placeholder="Search Pets" aria-label="Search" />
                            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                        </form>

                        <div style={classes.petsList}>
                            {pets && pets.map(pet => (
                                <div key={pet.id} style={classes.pet}>
                                    <div style={ classes.petTitle }>
                                        <h2>{ pet.name }</h2>
                                        {user && (
                                            <Button onClick={() => props.likePet(pet)}>
                                                <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" style={classes.svg}>
                                                    <path style={ { fill: 'white' } } d="m10 3.22-.61-.6a5.5 5.5 0 0 0 -7.78 7.77l8.39 8.39 8.39-8.4a5.5 5.5 0 0 0 -7.78-7.77z"/>
                                                </svg>
                                            </Button>
                                        )}
                                    </div>
                                    <div style={classes.petInfo}>
                                        <h5>{ pet.age } | { pet.gender } | { pet.size }</h5>
                                        {pet.photos.length > 0 && <img src={pet.photos[0].large} alt={pet.name} style={classes.petImage}/>}
                                        {!pet.photos.length && <img src="http://placecorgi.com/480" alt="Placeholder" style={classes.petImage}/>}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Pet