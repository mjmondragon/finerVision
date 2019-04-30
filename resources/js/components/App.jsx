import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import CollapsePanel from '../components/CollapsePanel';

export class App extends Component{
    render() {
        return (
            <div className="container">
                <div className="row flex-center full-height justify-content-center">
                    <div className="col-12 col-md-7 ">
                        <CollapsePanel />
                    </div>
                </div>
            </div>
        );
    }
}

if (document.getElementById('root')) {
    ReactDOM.render(<App />, document.getElementById('root'));
}