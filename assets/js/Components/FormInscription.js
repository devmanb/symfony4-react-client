import React from 'react';
import superagent from 'superagent';

class FormInscription extends React.Component {
    constructor() {
        super();
        this.state = {
            _username: "",
            _password: ""
        };
    }
    handlerUsernameChanged(e) {
        this.setState({ _username: e.target.value });
    }
    handlerPasswordChanged(e) {
        this.setState({ _password: e.target.value })
    }
    submitForm(e) {
        e.preventDefault();
        superagent.post('http://127.0.0.1:8000/api/login_check')
            //.set('Access-Control-Allow-Credentials', 'true')
            .set('Content-Type', 'application/json')
            // .set('credentials', 'include')
            .withCredentials()
            .send({ "_username": this.state._username, "_password": this.state._password })
            .end((err, res) => {

                if (err) { this.setState({ errorMsg: "Erreur de l'E-mail ou du Mots de passe" }); return; }
                console.log('res.body', res.body)
            })
    }
    render() {
        return (
            <div>
                {isAlreadyAuth ? <Redirect push to={{ pathname: '/page_perso' }} /> :
                (
                        <form onSubmit={this.submitForm.bind(this)}>
                            <label>E-mail</label><br />
                            <input type="email" value={this.state._username} onChange={this.handlerUsernameChanged.bind(this)} /><br />
                            <label>Mots de passe</label><br />
                            <input value={this.state._password} onChange={this.handlerPasswordChanged.bind(this)} type="password" /><br />
                            <br />
                            <button>Soumettre</button>
                        </form>
                )}
            </div>

        )
    }
}

export default FormInscription;