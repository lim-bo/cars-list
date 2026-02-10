const carsItemKey = "cars-storage";

export function saveCars(items) {
    localStorage.setItem(carsItemKey, JSON.stringify(items));
}

export function loadCars() {
    const items = localStorage.getItem(carsItemKey);
    if (items) {
        return JSON.parse(items);
    }
    return items;
}