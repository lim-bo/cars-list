import { useState } from "react";
import "./CarItem.css";

function CarItem({ data, onDelete, onUpdate }) {
    const [editingField, setEditingField] = useState(null);
    const [editValue, setEditValue] = useState('');

    const handleEditStart = (field, currentValue) => {
        setEditingField(field);
        setEditValue(currentValue);
    };

    const handleEditSave = () => {
        if (editingField && editValue.trim()) {
            onUpdate(data.id, { [editingField]: editValue });
        }
        setEditingField(null);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleEditSave();
        } else if (e.key === 'Escape') {
            setEditingField(null);
        }
    };

    return (
        <li className="cars-list__item">
            <div className="car">
                <h2 className="car__title">
                    {editingField === 'name' ? (
                        <input
                        type="text"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        onBlur={handleEditSave}
                        onKeyDown={handleKeyDown}
                        autoFocus
                        className="car__edit-input"
                        />
                    ) : (
                        <span 
                        className="car__name"
                        onClick={() => handleEditStart('name', data.name)}
                        style={{ cursor: 'pointer' }}
                        >
                        {data.name}
                        </span>
                    )}
                    <span className="car__model">{data.model}</span>
                </h2>
                <div className="car__info">
                    <p className="car__year">Дата выпуска: {data.year}</p>
                    <p className="car__color">Цвет: {data.color}</p>
                    {editingField === 'price' ? (
                        <p className="car__price">
                        Стоимость: 
                        <input
                            type="number"
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            onBlur={handleEditSave}
                            onKeyDown={handleKeyDown}
                            autoFocus
                            className="car__edit-input car__edit-input--small"
                        />
                        $
                        </p>
                    ) : (
                        <p 
                        className="car__price"
                        onClick={() => handleEditStart('price', data.price.toString())}
                        style={{ cursor: 'pointer' }}
                        >
                        Стоимость: {data.price}$
                        </p>
                    )}
                </div>
                <button className="car__delete-btn button" onClick={() => { onDelete(data.id) }}>Удалить</button>
            </div>
        </li>
    );
}

export default CarItem;