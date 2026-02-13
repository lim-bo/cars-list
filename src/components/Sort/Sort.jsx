import { useCallback, useEffect, useState } from "react";
import "./Sort.css";

function Sort({ onSort }) {
    const [isOpen, setOpen] = useState(false);
    const [pickedOptionID, setOptionID] = useState("no-sort");

    useEffect(() => {
        document.querySelector(`#${pickedOptionID}`).classList.add("sort-option__picked");
        onSort(pickedOptionID);
    }, [pickedOptionID]);

    const changeOption = useCallback((event) => {
        event.preventDefault();
        if (event.target.id === pickedOptionID) {
            return;
        }
        event.target.classList.add("sort-option__picked");
        document.querySelector(`#${pickedOptionID}`).classList.remove("sort-option__picked");
        setOptionID(event.target.id);
        setOpen(false);
    }, [pickedOptionID]);

    return (
        <article className={`sort-window${isOpen ? " opened" : ""}`}>
            <span className="sort-window__open side-open" onClick={() => {
                setOpen(!isOpen);
            }}>
                {
                    isOpen ?
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M10.6 12.71a1 1 0 010-1.42l4.59-4.58a1 1 0 000-1.42 1 1 0 00-1.41 0L9.19 9.88a3 3 0 000 4.24l4.59 4.59a1 1 0 00.7.29 1 1 0 00.71-.29 1 1 0 000-1.42z"/>
                    </svg>
                    :
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M15.4 9.88l-4.59-4.59a1 1 0 00-1.41 0 1 1 0 000 1.42l4.6 4.58a1 1 0 010 1.42l-4.6 4.58a1 1 0 001.41 1.42l4.59-4.59a3 3 0 000-4.24z"/>
                    </svg>
                }
            </span>
            <form className="sort-form">
                <ul className="sort-form__options">
                    <li>
                        <button id="no-sort" className="sort-option" onClick={changeOption}>
                            Без сортировки
                        </button>
                    </li>
                    <li>
                        <button id="year-sort" className="sort-option" onClick={changeOption}>
                            По году выпуска
                        </button>
                    </li>
                    <li>
                        <button id="price-sort" className="sort-option" onClick={changeOption}>
                            По цене
                        </button>
                    </li>
                </ul>
            </form>
        </article>
    );
}

export default Sort;