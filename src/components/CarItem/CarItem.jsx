import "./CarItem.css";

function CarItem({ data }) {
    return (
        <li className="cars-list__item">
            <div className="car">
                <h2 className="car__name">{`${data.name} ${data.model}`}</h2>
                <div className="car__info">
                    <p className="car__year">Дата выпуска: {data.year}</p>
                    <p className="car__color">Цвет: {data.color}</p>
                    <p className="car__price">Стоимость: {data.price}$</p>
                </div>
            </div>
        </li>
    );
}

export default CarItem;