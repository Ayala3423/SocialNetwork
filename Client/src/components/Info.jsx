import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

function Info({ setIsShowInfo }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const cookieUser = JSON.parse(JSON.parse(JSON.parse(JSON.parse(Cookies.get('currentUser'))))).user;

    if (cookieUser) {
      try {
        setUser(cookieUser);
      } catch (err) {
        console.error('Failed to parse user from cookie:', err);
      }
    }
  }, []);

  if (!user) return <div className="info">Loading...</div>;

  return (
    <div className="info">
      <div className="text">
        <h3 className="info-title">user information</h3><br />
        <p>name: {user.name}</p><br />
        <p>username: {user.username}</p><br />
        <p>email: {user.email}</p><br />
        <p>phone: {user.phone}</p><br />
        <button onClick={() => setIsShowInfo(0)}>Close</button>
      </div>
    </div>
  );
}

export default Info;
