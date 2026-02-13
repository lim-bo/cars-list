import CarItem from "../CarItem/CarItem";
import "./CarsList.css";

function CarsList({ cars, onDelete, onUpdate }) {
    return (
        <ul className="cars-list">
        {
            cars.map(car => <CarItem key={car.id} data={car} onDelete={onDelete} onUpdate={onUpdate}/>)
        }
        </ul>
    );
}

export default CarsList;