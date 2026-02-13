import { useCallback, useEffect, useState } from 'react'
import './App.css'
import CarsList from './components/CarsList/CarsList'
import { loadCars, saveCars, getMinID } from './storage/cars';
import { fetchCars } from './services/cars';
import Sort from './components/Sort/Sort';
import AddCarForm from './components/AddCarForm/AddCarForm';
import { SortProvider, useSort } from './context/SortContext';

function App() {
  const [cars, setCars] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const { sortOption } = useSort();

  const addCar = useCallback((newCar) => {
    const newItems = [...cars, { id: getMinID(cars), ...newCar }];
    const newSorted = sortCarsByOption(newItems, sortOption)
    setCars(newSorted);
    saveCars(newSorted);
  }, [sortOption]);

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

  useEffect(() => {
    if (cars.length) {
      setCars( prev => {
        const sorted = sortCarsByOption(prev, sortOption);
        saveCars(sorted);
        return sorted;
      })
    }
  }, [sortOption])

  const sortCarsByOption = (carsArray, option) => {
    const sorted = [...carsArray];
    
    switch (option) {
      case "year-sort":
        sorted.sort((a, b) => a.year - b.year);
        break;
      case "price-sort":
        sorted.sort((a, b) => a.price - b.price);
        break;
      default:
        sorted.sort((a, b) => a.id - b.id);
    }
    
    return sorted;
  }

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
              <Sort></Sort>
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
