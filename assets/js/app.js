import React from 'react';
import ReactDOM from 'react-dom';
import Link_Route from './Components/Link_Route';


class App extends React.Component {

    
    componentDidMount() {
        // fetch('https://jsonplaceholder.typicode.com/posts/')
        //     .then(response => response.json())
        //     .then(entries => {
        //         this.setState({
        //             entries
        //         });
        //     });
        localStorage.setItem('token','');    
    
    }

    render() {
        return (
            <div className="app_">
                <Link_Route></Link_Route>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));