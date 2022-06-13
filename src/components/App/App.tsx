import React from 'react';
import DataService from '../../services/DataService'


const App = () => {
    return (
        <div>
            <h1>aaa</h1>
            <button onClick={DataService.fetchData}>fetch</button>
        </div>
    );
};


export default App;

