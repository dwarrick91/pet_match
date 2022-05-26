import React from "react";
import '../styles/signup.css';
import { Link } from 'react-router-dom';
import Footer from "./footer";


function SignUp() {
    return (
        <>

            <div className="jumbotron jumbotron-fluid">
                <div className="container">
                    <h1 className="signupHeader">Welcome to Pet Match</h1>
                </div>
            </div>

            <div className="container-fluid signupContainer">

                <div className="row justify-content-center">
                    <div className="col-10 signupCol">

                        <h2 className="signupH2">Sign Up</h2>

                        <form className="signupForm">

                            <div class="form-group">
                                <label for="exampleInputEmail1">Email address</label>
                                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                            </div>

                            <div class="form-group">
                                <label for="exampleInputEmail1">Confirm Email address</label>
                                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Confirm email" />
                            </div>

                            <div class="form-group">
                                <label for="exampleInputPassword1">Password</label>
                                <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" />
                                
                            </div>

                            <button type="submit" class="btn btn-dark">Submit</button>
                            <br/>
                            <small id="emailHelp" class="form-text text-muted smallText">Already a user? <Link className="nav-item nav-link" to="/login">Login</Link></small>
                        </form>




                    </div>
                </div>

            </div>

            <Footer />


        </>
    )
}

export default SignUp;