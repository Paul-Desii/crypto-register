import React from 'react'
import { Link } from "react-router-dom";
import { useLogout } from './hooks/useLogout';
import { useAuthContext } from './hooks/useAuthContext';

const Navbar = () => {

    //11.a. Setting the initial auth status 
    const user = useAuthContext() //used in lines 24, 25 and 29

    //9.b. useLogout
    const {logout} = useLogout()
    const handleClick = () => {
        logout()
    }

    return (
        <header>
            <div className='container'>
                <Link to={'/api/cryptos'}>
                    <h1>Crypto Register</h1>
                </Link>
                <nav>
                    {user && (<div>
                        <span>{user.email}</span>
                        <button onClick={handleClick}>Log out</button>
                    </div>
                    )}
                    {!user && (<div>
                        <Link to='/signup'>Sign up</Link>
                        <Link to='/login'>Login</Link>
                    </div>
                    )}
                </nav>
            </div>
        </header>
    )
}

export default Navbar