import React from 'react';
import superagent from 'superagent';

class FormInscription extends React.Component {
    constructor() {
        super();
        this.state = {
            _username: "",
            _password: "",
            _password1: "",
            submit: false,
            mdp: false,
            errorMsg:false,
        };
    }
    handlerUsernameChanged(e) {
        this.setState({ _username: e.target.value });
    }
    handlerPasswordChanged(e) {
        this.setState({ _password: e.target.value })
    }
    handlerPassword1Changed(e) {
        this.setState({ _password1: e.target.value })
    }
    submitForm(e) {

        e.preventDefault();
        if(this.state._password == this.state._password1)
        {
            superagent.post('http://127.0.0.1:8000/user/inscription')
            //.set('Access-Control-Allow-Credentials', 'true')
            .set('Content-Type', 'application/json')
            // .set('credentials', 'include')
            .withCredentials()
            .send({ "_username": this.state._username, "_password": this.state._password })
            .end((err, res) => {
                
                if (err.status != 200) { 
                    this.setState({ errorMsg: true, submit: true }); 
                return; }
                else{res;
                    this.setState({ errorMsg: false, submit: true, _password:"",_password1:"",_username:"" });
                }
            });
        }
    }
    isAuth() {
        const token = localStorage.getItem('token');
        return token && token.length > 10;
    }
    render() {
        const isAlreadyAuth = this.isAuth();
        return (
            <div>
                <div style={(!this.state.errorMsg && this.state.submit) ? { visibility: 'visible', color: 'green', textAlign: 'center' }: { display: 'none' }}>vous êtes inscrit veuiller vous redirigez <button onClick={() => { this.props.history.push('') }}>ici</button></div>

                {isAlreadyAuth ? <Redirect push to={{ pathname: '/page_perso' }} /> :
                (
                        <form onSubmit={this.submitForm.bind(this)}>
                            <div style={(this.state._password1 == this.state._password )? { display: 'none' } : { display: 'block', color: 'red', textAlign: 'center' }}>Le mots de passe n'est pas identique</div>
                            <div style={(this.state.errorMsg && this.state.submit) ? { visibility: 'visible', color: 'red', textAlign: 'center' } : { display: 'none' }}>Erreur d'inscription email exist déjà</div>
                            <label>E-mail</label><br />
                            <input type="email" value={this.state._username} onChange={this.handlerUsernameChanged.bind(this)} /><br />
                            <label>Mots de passe</label><br />
                            <input value={this.state._password} onChange={this.handlerPasswordChanged.bind(this)} type="password" /><br />
                            <input value={this.state._password1} onChange={this.handlerPassword1Changed.bind(this)} type="password" /><br />
                            <br />
                            <button>Soumettre</button>
                        </form>
                )}
            </div>

        )
    }
}

export default FormInscription;