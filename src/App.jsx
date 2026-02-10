import { useEffect, useState } from 'react'
import './App.css'
import CarsList from './components/CarsList/CarsList'
import { loadCars } from './storage/cars';
import { fetchCars } from './services/cars';

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
      <header>
        <h1>Beautiful cars</h1>
      </header>
      <main>
        {
          isLoading ? 
          <p>Загрузка</p>
          :
          <CarsList cars={cars}></CarsList>
        }
      </main>
    </>
  )
}

export default App
