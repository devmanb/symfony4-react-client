import React from 'react';
import superagent from 'superagent';
import {Redirect} from 'react-router-dom';
class Logout extends React.Component
{

    isAuth()
    {
        const token = localStorage.getItem('token');
        return token && token.length > 10;
    }
    render()
    {
        return (
            <div>
        <Redirect to={{pathname:'/'}}/>:
               </div> 
                )
    }
}

export default Logout;