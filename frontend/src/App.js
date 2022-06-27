import React, {useEffect} from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { getToken, usarToken, updateTimer} from './store/slices/thunks';
import './App.css';

function App() {
  //states y dispatcher
  const { token, tiempo, check} = useSelector(state => state.token);
  const dispatch = useDispatch();
  /**
   * llamada al generate token cada 60 s
   * 
   */
  useEffect(()=> {
    //primer token
    dispatch( getToken('Testclient'));

    //regenear cada 60 secs
    const refresh = setInterval(() => {
      dispatch( getToken('TestClient'));
    }, 1000*60);
    //actualizar el tiempo de validez
    const timer = setInterval(()=>{
      dispatch( updateTimer());
    },1000);

    return () => {
      clearInterval(refresh);
      clearInterval(timer);
    }
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h2>Datos del Token</h2>
        
        {/*token.slice(token.length-6,token.length)*/}
        <textarea 
          rows={6}
          cols={50}
          value={token}  
        >
        </textarea>
        <p>Tiempo de validez: {tiempo}</p>
        <hr/>
        <h2>Prueba del Token</h2>
        <button
          onClick={() => {dispatch(usarToken('Testclient', token))}}
        >
          Probar token
        </button>
        <p>Respuesta del test: {check}</p>

      </header>
    </div>
  );
}

export default App;
