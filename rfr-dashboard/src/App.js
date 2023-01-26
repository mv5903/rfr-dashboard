
import background from './media/car.jpg';
import './App.css';
import HomePage from './components/HomePage';

function App() {
  return (
      <div className="App container" style={{backgroundImage: "url(" + background + ")"}}>
        <div className='content'>
          <HomePage />
        </div>
      </div>
  );
}

export default App;
