import logo from './logo.svg';
import './App.css';
import {initialize, sendAE} from './utils.jsx';
import {useEffect, useState} from 'react';

const Window = ({data}) => {
    return (
        <div className="window">
          {data?.map(
              (i, pos) =>
              <div key={pos}>
                {i.name}
              </div>
          )}
        </div>
    );
};



const App = () =>  {

    const [currObject, setCurrObject] = useState(null);
    const [data, setData] = useState([]);

    useEffect(() => {
        window.evg_assistant = initialize();
        window.evg_assistant.on("data", (obj) => {
            console.log("GOT OBJECT");
            console.log(obj);
            if (obj?.type === "smart_app_data") {
                setCurrObject(obj?.smart_app_data);
            }
        });
    }, []);

    useEffect( () => {
        if (currObject !== null) {
            if (currObject?.commandName === "setData") {
                setData(currObject?.commandParams?.data);
            }
        }
    }, [currObject]);

        
    return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <Window data={data}/>
            <button onClick={
                () => {
                    sendAE("HELLO", {});
                }
            }>
              Click me
            </button>
          </header>
        </div>
    );
}

export default App;
