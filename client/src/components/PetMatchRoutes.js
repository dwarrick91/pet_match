import React, { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { useLazyQuery, useMutation } from '@apollo/client';
import auth from '../utils/auth'
import { ADD_PET, GET_PROFILE, LOGIN_USER } from '../utils/mutations';
import { useNavigate } from "react-router-dom";

import Nav from './nav'
import Home from './home';
import Profile from './profile';
import Mission from './mission';
import Pet from './pet';
import Donate from './donate';
import Login from './login';
import SignUp from './signup';

const PetMatchRoutes = () => {
  const [user, setUser] = useState(auth.getProfile())
  const [pets, setPets] = useState([])
  const [shouldRedirect, setShouldRedirect] = useState(false)

  const [addPet, { petError, petData }] = useMutation(ADD_PET)
  const [login, { logInerror, LogInUserData }] = useMutation(LOGIN_USER);

  const navigate = useNavigate()

  
  const [getPets, { loading, error, data }] = useLazyQuery(GET_PROFILE, {
    variables: { id: user?.data._id  },
  }, [user, pets]);

  useEffect(() => {
    if (shouldRedirect) {
      navigate('/profile')
    }
  }, [shouldRedirect, navigate])

  useEffect(() => {
    async function fetch() {
      const pets = await getPets()
      setPets(pets.data.user.pets)
    }
    if (user) fetch()
  }, [getPets, user])

  useEffect(() => { 
    if (shouldRedirect) {
      navigate('/profile')
      setShouldRedirect(false)
    }
  }, [shouldRedirect, navigate])

  const likePet = async pet => {
    try {
      const { data, error } = await addPet({
          variables: { 
            name: pet.name,
            type: pet.type,
            image: pet.photos[0].large,
            breed: pet.breeds.primary,
            location: 'Philadelphia, PA',
            description: pet.description,
            link: pet.url,
            petAdoptee: user.data._id
          }
      })
      setPets(prevPets => ([
          ...prevPets,
          data.addPet
      ]))
    } catch (err) {
        console.log(err)
    }
  }

  const logInUser = async (formState) => {
    try {
      const { data } = await login({
        variables: { ...formState },
      });
      auth.login(data.login.token);
      setUser(auth.getProfile())
      setShouldRedirect(true)
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <>
      <Nav user={user}/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/ourmission" element={<Mission />} />
        <Route path="/profile" element={<Profile user={user} pets={pets}/>} />
        <Route path="/pets" element={<Pet pets={pets} likePet={likePet} />}/>
        <Route path="/login" element={<Login logInUser={logInUser} />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </>
  )
}

export default PetMatchRoutes