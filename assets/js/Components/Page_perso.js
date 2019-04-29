import React from 'react';
import superagent from 'superagent';
import { Redirect } from 'react-router-dom';

class Page_perso extends React.Component {

    constructor() {
        super();
        this.state = {
            username: "xxxx",
            temperature: "xxxx",
            ville: "xxxx",
            auth:true
        };
    }

    logout() {
        if (!this.isAuth())
            localStorage.setItem('token', '');
            this.setState({auth:false})
        //window.location.reload()
        // window.location.href = "/";
        this.props.history.push('');
    }
    isAuth() {
        const token = localStorage.getItem('token');
        return this.auth&&token && token.length > 10;
    }

    componentDidMount() {
        // fetch('https://jsonplaceholder.typicode.com/posts/')
        //     .then(response => response.json())
        //     .then(entries => {
        //         this.setState({
        //             entries
        //         });
        //     });
        this.setState({username:'zzzz'});
    }
    render() {
        const isAlreadyAuth = this.isAuth();
        return (
                <div>
                <button onClick={this.logout.bind(this)}>Se Deconnecter</button>
                <br/>
                <div>Bienvenu <b>{this.state.username}</b></div>
                <div>Vous êtes <b>{ this.state.ville }</b></div>
                    <div>La Température <b>{ this.state.temperature }</b></div>
                </div>
            )
    }
}

export default Page_perso;