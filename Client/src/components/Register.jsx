import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useState, useContext } from 'react';
import { CurrentUser } from './App';
import Cookies from "js-cookie";
import { validateFirstRegisterStep, validateSecondRegisterStep } from '../../utils/userValidator';
import { signup } from '../../services/usersServices';
import '../style/Register.css';

function Register() {
    const navigate = useNavigate();
    const { register, handleSubmit: handleFirstSubmit, reset: resetFirstForm } = useForm();
    const { register: registerSecond, handleSubmit: handleSecondSubmit, reset: resetSecondForm } = useForm();
    const [registerIsCompleted, setRegisterIsCompleted] = useState(0);
    const [responsText, setResponstText] = useState("Fill the form and click the sign up button");
    const { setCurrentUser } = useContext(CurrentUser);
    const [userData, setUserData] = useState({});

    const onFirstSubmit = async (data) => {
        const error = validateFirstRegisterStep(data);
        if (error) {
            setResponstText(error);
            return;
        }
        setUserData({ username: data.username, password: data.password });
        setRegisterIsCompleted(1);
        resetFirstForm();
    };

    const onSecondSubmit = async (data) => {
        const error = validateSecondRegisterStep(data);
        if (error) {
            setResponstText(error);
            return;
        }
        const fullUser = {
            ...userData,
            name: data.name,
            email: data.email,
            address: {
                street: data.street,
                suite: data.suite,
                city: data.city,
                zipcode: data.zipcode,
                geo: {
                    lat: data.lat,
                    lng: data.lng,
                },
            },
            phone: data.phone,
            website: data.website,
            company: {
                name: data.companyName,
                catchPhrase: data.catchPhrase,
                bs: data.bs,
            },
        };

        await signup(
            fullUser,
            (createdUser) => {
                navigate(`/users/${createdUser.user.id}/home`);
                Cookies.set("token", createdUser.token);
                setCurrentUser(createdUser.user);
                localStorage.setItem("currentUser", JSON.stringify(createdUser.user));
            },
            () => {
                setResponstText("Registration failed. Please try again.");
            }
        );
        resetSecondForm();
    };

    return (
        <div className="back-ground-img">
            {registerIsCompleted === 0 ? (
                <div>
                    <h2>Sign Up</h2>
                    <div className="entryContainer">
                        <form onSubmit={handleFirstSubmit(onFirstSubmit)} className="entryForm">
                            <input type="text" placeholder="username" {...register("username")} required />
                            <input type="password" placeholder="password" {...register("password")} required />
                            <input type="password" placeholder="verifyPassword" {...register("verifyPassword")} required />
                            <button type="submit">sign up</button>
                            <h4>{responsText}</h4>
                        </form>
                    </div>
                </div>
            ) : (
                <div className="form-container">
                    <form onSubmit={handleSecondSubmit(onSecondSubmit)}>
                        <h2 className="form-title">More Details</h2>
                        <input {...registerSecond("name")} placeholder="Name" required />
                        <input {...registerSecond("email")} placeholder="Email" required />
                        <fieldset>
                            <legend>Address</legend>
                            <input {...registerSecond("street")} placeholder="Street" required />
                            <input {...registerSecond("suite")} placeholder="Suite" required />
                            <input {...registerSecond("city")} placeholder="City" required />
                            <input {...registerSecond("zipcode")} placeholder="Zipcode" required />
                            <input {...registerSecond("lat")} placeholder="Latitude" required />
                            <input {...registerSecond("lng")} placeholder="Longitude" required />
                        </fieldset>
                        <input {...registerSecond("phone")} placeholder="Phone" required />
                        <fieldset>
                            <legend>Company</legend>
                            <input {...registerSecond("companyName")} placeholder="Company Name" required />
                            <input {...registerSecond("catchPhrase")} placeholder="CatchPhrase" required />
                            <input {...registerSecond("bs")} placeholder="Business Strategy" required />
                        </fieldset>
                        <input {...registerSecond("website")} placeholder="Website" required />
                        <button type="submit" className="form-button">Submit</button>
                        <h4>{responsText}</h4>
                    </form>
                </div>
            )}
        </div>
    );
}

export default Register;