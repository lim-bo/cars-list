import { useEffect, useState } from 'react'
import './App.css'
import CarsList from './components/CarsList/CarsList'
import { loadCars } from './storage/cars';
import { fetchCars } from './services/cars';
import Sort from './components/Sort/Sort';

function App() {
  const [cars, setCars] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const initialLoading = async () => {
      const localCars = loadCars();
      if (localCars) {
        setCars(localCars);
        setLoading(false);
      } else {
        try {
          const fetchedCars = await fetchCars();
          if (!fetchedCars.success) {
            throw fetchedCars.error;
          }
          setCars(fetchedCars.data);
        } catch (error) {
          console.error(`Fetching cars error: ${error}`);
        } finally {
          setLoading(false);
        }
      }
    }
    initialLoading();
  }, []);

  return (
    <>
      <header className="section header">
        <h1 className="header__title">Beautiful cars</h1>
      </header>
      <main className="section main">
        {
          isLoading ? 
          <p>Загрузка</p>
          :
          <>
            <Sort></Sort>
            <CarsList cars={cars}></CarsList>
          </>
        }
      </main>
    </>
  )
}

export default App
