import { z } from "zod";
import "./AddCarForm.css";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

const CarSchema = z.object(
    {
        name: z.string()
            .min(2, "Марка должна иметь длину минимум 2 символа"),
        model: z.string().nonempty("Обязательное поле"),
        year: z.coerce.number()
            .gte(1950, "Год выпуска должен быть не раньше 1950 года")
            .lte(new Date().getUTCFullYear(), "Машина должна быть выпущена до нынешнего года"), // Машина выпущена не раньше текущего года,
        color: z.string()
            .min(3, "Название цвета содержит минимум 3 символа"),
        price: z.coerce.number("Цена должна быть числом")
            .positive("Цена должна быть положительная")
    }
)

function AddCarForm({ onAddCar }) {
    const [isOpen, setOpen] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(CarSchema) });

    const onSubmit = (data) => {
        onAddCar(data);
        setOpen(false);
    }

    return (
        <form name="add-car" className={`add-car-form${isOpen ? " opened" : ""}`} onSubmit={handleSubmit(onSubmit)}>
            <span className="add-car-form__open side-open" onClick={() => {setOpen(!isOpen)}}>
            {
                isOpen ?
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M10.6 12.71a1 1 0 010-1.42l4.59-4.58a1 1 0 000-1.42 1 1 0 00-1.41 0L9.19 9.88a3 3 0 000 4.24l4.59 4.59a1 1 0 00.7.29 1 1 0 00.71-.29 1 1 0 000-1.42z"/>
                    </svg>
                :
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M23 11H13V1a1 1 0 00-1-1 1 1 0 00-1 1v10H1a1 1 0 00-1 1 1 1 0 001 1h10v10a1 1 0 001 1 1 1 0 001-1V13h10a1 1 0 001-1 1 1 0 00-1-1z"/>
                    </svg>
            }
            </span>
            <h2 className="add-car-form__title">Добавить автомобиль</h2>
            <label className="add-car-form__label" htmlFor="name">
                Марка
            </label>
            <div className="add-car-form__field">
                <input {...register("name")} id="name" className={`add-car-form__text-input ${errors.name && "form_error"}`} placeholder="Subaru"/>
                { errors.name && (<span className="form_error-message">{errors.name.message}</span>) }
            </div>
            <label className="add-car-form__label" htmlFor="model">
                Модель
            </label>
            <div className="add-car-form__field">
                <input {...register("model")} id="model" className={`add-car-form__text-input ${errors.model && "form_error"}`} placeholder="BRZ"/>
                { errors.model && (<span className="form_error-message">{errors.model.message}</span>) }
            </div>
            <label className="add-car-form__label" htmlFor="year">
                Год выпуска
            </label>
            <div className="add-car-form__field">
                <input {...register("year")} id="year" className={`add-car-form__text-input ${errors.year && "form_error"}`} placeholder="2022"/>
                { errors.year && (<span className="form_error-message">{errors.year.message}</span>) }
            </div>
            <label className="add-car-form__label" htmlFor="color">
                Цвет
            </label>
            <div className="add-car-form__field">
                <input {...register("color")} id="color" className={`add-car-form__text-input ${errors.color && "form_error"}`} placeholder="blue"/>
                { errors.color && (<span className="form_error-message">{errors.color.message}</span>) }
            </div>
            <label className="add-car-form__label" htmlFor="price">
                Цена
            </label>
            <div className="add-car-form__field">
                <input {...register("price")} id="price" className={`add-car-form__text-input ${errors.price && "form_error"}`} placeholder="35000"/>
                { errors.price && (<span className="form_error-message">{errors.price.message}</span>) }
            </div>
            <button id="add-car-button" className="add-car-form__submit button">Добавить</button>
        </form>
    );
}

export default AddCarForm;