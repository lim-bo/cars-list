import "./CarItem.css";

function CarItem({ data }) {
    return (
        <li>
            <div>
                <h2>{`${data.name} ${data.model}`}</h2>
                <div>
                    <p>Дата выпуска: {data.year}</p>
                    <p>Цвет: {data.color}</p>
                    <p>Стоимость: {data.price}$</p>
                </div>
            </div>
        </li>
    );
}

export default CarItem;