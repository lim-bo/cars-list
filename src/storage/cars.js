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

export function getMinID(items) {
    const existingIDs = new Set(items.map(car => car.id));
    if (!existingIDs.size) return 1;
    let id = 1;
    while (existingIDs.has(id)) {
        id++;
    }
    return id;
}