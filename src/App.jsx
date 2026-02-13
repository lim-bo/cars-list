import { useCallback, useEffect, useState } from 'react'
import './App.css'
import CarsList from './components/CarsList/CarsList'
import { loadCars, saveCars, getMinID } from './storage/cars';
import { fetchCars } from './services/cars';
import Sort from './components/Sort/Sort';
import AddCarForm from './components/AddCarForm/AddCarForm';

function App() {
  const [cars, setCars] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const sortCars = useCallback((option) => {
    switch (option) {
      case "year-sort":
        setCars([...cars].sort((a, b) => {
          if (a.year < b.year) {
            return -1;
          } else if (a.year > b.year) {
            return 1;
          }
          return 0;
        }));
        break;
      case "price-sort":
        setCars([...cars].sort((a, b) => {
          if (a.price < b.price) {
            return -1;
          } else if (a.price > b.price) {
            return 1;
          }
          return 0;
        }));
        break;
      default:
        setCars([...cars].sort((a, b) => {
          return a.id - b.id;
        }))
        return;
    }
  }, [cars]);

  const addCar = useCallback((newCar) => {
    const newItems = [...cars, { id: getMinID(cars), ...newCar }];
    setCars(newItems);
    saveCars(newItems);
  }, [cars]);

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
          saveCars(fetchedCars.data);
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
            <div>
              <Sort onSort={sortCars}></Sort>
              <AddCarForm onAddCar={addCar}></AddCarForm>
            </div>
            <CarsList cars={cars}></CarsList>
          </>
        }
      </main>
    </>
  )
}

export default App
