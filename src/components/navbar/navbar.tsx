import { NavLink } from 'react-router-dom';
import * as React from 'react';
import { useEffect, useState } from 'react';
import AuthService from '../../services/auth-service';
import { User } from '../../model/user';
import { Role } from '../../model/role';

export default function Navbar() {
  const [currentUser, setCurrentUser] = useState<User | undefined>(undefined);
  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
  }, []);
  const logOut = () => {
    AuthService.logout();
  };
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        {!currentUser && (
          <li>
            <NavLink to="/login">Login</NavLink>
          </li>
        )}
        {currentUser?.roles.includes(Role.ROLE_ADMIN) && (
          <li>
            <NavLink to="/registration">Registration</NavLink>
          </li>
        )}
        {currentUser && (
          <>
            <li>
              <NavLink to="/the">Times Higher Education</NavLink>
            </li>
            <li>
              <NavLink to="/qs">Top Universities</NavLink>
            </li>
          </>
        )}
        {currentUser?.roles.includes(Role.ROLE_MODERATOR) && (
          <li>
            <NavLink to="/admin">Administration</NavLink>
          </li>
        )}
        {currentUser && (
          <li>
            <NavLink to="/login" onClick={logOut}>
              Logout
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
}
