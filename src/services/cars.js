import { ApiClient } from "../api/client";
import { API_CONFIG } from "../api/endpoints";

export async function fetchCars() {
    const cli = new ApiClient(API_CONFIG.BASE_URL);
    const resp = await cli.get(API_CONFIG.CARS.GET);
    return resp;
}