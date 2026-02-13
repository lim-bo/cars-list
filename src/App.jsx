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
    setCars(prev => {
      const newItems = [...prev, { id: getMinID(prev), ...newCar }];
      const sorted = sortCarsByOption(newItems, sortOption)
      saveCars(sorted);
      return sorted;
    })
    
  }, [sortOption]);

  const deleteCar = useCallback((id) => {
    setCars(prev => {
      const newItems = prev.filter(car => car.id !== id);
      const sorted = sortCarsByOption(newItems, sortOption);
      saveCars(sorted);
      return sorted;
    })
    
  }, [sortOption]);

  const updateCar = useCallback((id, newData) => {
    setCars(prev => {
      const newItems = prev.map((car) => car.id === id ? {...car, ...newData} : car );
      const sorted = sortCarsByOption(newItems, sortOption);
      saveCars(sorted);
      return sorted;
    })
    
  }, [sortOption]);

  // Инициализация: берём данные с апи или достаём из localstorage, если есть
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

  // Пересортировка при изменении опции сортировки
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
              {
                cars.length ? <Sort/> : <></>
              }
              <AddCarForm onAddCar={addCar}></AddCarForm>
            </div>
            <CarsList cars={cars} onDelete={deleteCar} onUpdate={updateCar}></CarsList>
          </>
        }
      </main>
    </>
  )
}

export default App
