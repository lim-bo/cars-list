import CarItem from "../CarItem/CarItem";
import "./CarsList.css";

function CarsList({ cars }) {
    return (
        <ul className="cars-list">
        {
            cars.map(car => <CarItem key={car.id} data={car}></CarItem>)
        }
        </ul>
    );
}

export default CarsList;