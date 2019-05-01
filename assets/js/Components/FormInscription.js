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
        superagent.post('http://127.0.0.1:8000/user/inscription')
            //.set('Access-Control-Allow-Credentials', 'true')
            .set('Content-Type', 'application/json')
            // .set('credentials', 'include')
            .withCredentials()
            .send({ "_username": this.state._username, "_password": this.state._password })
            .end((err, res) => {

                if (err) { this.setState({ errorMsg: "Erreur sur l'inscription soit votre email exist déjà !" }); return; }
                console.log('res.body', res.body)
            })
    }
    isAuth() {
        const token = localStorage.getItem('token');
        return token && token.length > 10;
    }
    render() {
        const isAlreadyAuth = this.isAuth();
        return (
            <div>
                {isAlreadyAuth ? <Redirect push to={{ pathname: '/page_perso' }} /> :
                (
                        <form onSubmit={this.submitForm.bind(this)}>
                            <div style={this.state.errorMsg == "" ? { display: 'none' } : { display: 'block', color: 'red', textAlign: 'center' }}>Erreur Authentification</div>
                            <div style={this.state.errorMsg == "" ? { display: 'block' } : { display: 'none', color: 'green', textAlign: 'center' }}>vous êtes inscrit veuiller vous redirigez <button onClick={() => { this.props.history.push('inscription') }}>ici</button></div>
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