import { Route, NavLink, BrowserRouter } from "react-router-dom";
import React from 'react';
import Login from './Login';
import Page_perso from './Page_perso';
import FormInscription from './FormInscription';

class Link_Route extends React.Component
{ 
    constructor()
    {
        super();
        this.state = {stlogin:true}
    }
    isAuth() {
        const token = localStorage.getItem('token');
        return token && token.length > 10;
    }
    render()
    {
        const isAlreadyAuth = this.isAuth();
        return (
            <BrowserRouter>
                        <Route exact path="/" component={Login} />
                        <Route path="/inscription" component={FormInscription} />
                        <Route path="/page_perso" component={Page_perso} />
            </BrowserRouter>
        );
    }
} 

export default Link_Route;