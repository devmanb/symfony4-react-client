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
            this.props.history.push('');
    }
    isAuth() {
        const token = localStorage.getItem('token');
        return this.auth&&token && token.length > 10;
    }
    success(pos) {
    var mylat = pos.coords.latitude;
    var mylong = pos.coords.longitude;
    console.log(mylat, mylong)
    // window.fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${mylat}&lon=${mylong}&lang=fr&units=metric&appid=1e4bb6b0352cb974596a6d35327b606e`)
    window.fetch(`http://127.0.0.1:8000/user/localisation?lat=${mylat}&lon=${mylong}`)
        .then(res => res.json(res))
        .then(resJSON => {
            this.setState({ ville: JSON.parse(resJSON.contents).name, temperature: JSON.parse(resJSON.contents).main.temp + " C°" });
        })

    }
    failure() {

    }
    componentDidMount() {
        let x = navigator.geolocation;
        x.getCurrentPosition(this.success.bind(this), this.failure.bind(this));
    }
    render() {
        return (
                <div>
                <button onClick={this.logout.bind(this)}>Se Deconnecter</button>
                <br/>
                <div>Bienvenu <b>{this.state.username}</b></div>
                <div>Vous êtes à <b>{ this.state.ville }</b></div>
                    <div>La Température <b>{ this.state.temperature }</b></div>
                </div>
            )
    }
}

export default Page_perso;