import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'; //en la pagina de bootstrap se encuentra tablas botones alertas etc
import Navbar from './components/navbar/navbar';
import AppRouter from './components/router/router';

function App() {
  return (
    <div className="App">
     
        {/*<Navbar/>*/}
      <AppRouter />
          
    </div>
  );
}

export default App;
