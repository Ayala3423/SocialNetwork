import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CurrentUser } from './App';
import { useContext } from 'react';
import Cookies from 'js-cookie';

function Logout() {
    const { setCurrentUser } = useContext(CurrentUser);
    const navigate = useNavigate();

    function logOutFunc() {
        localStorage.removeItem("currentUser");
        Cookies.remove("token");
        setCurrentUser(null);
        navigate('/home');
    }

    return (
        <>
            <ul onClick={logOutFunc}><a>LogOut</a></ul>
        </>
    )
}
export default Logout;