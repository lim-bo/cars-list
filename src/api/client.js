export class ApiClient {
    #baseURL;

    constructor(baseURL) {
        this.#baseURL = baseURL;
    }

    async get(endpoint, headers = {}) {
        try {
            const response = await fetch(`${this.#baseURL}${endpoint}`, {
                headers: headers
            });
            
            if (!response.ok) {
                throw response.status;
            }

            let data;
            const contentType = response.headers.get("content-type");
            if (contentType?.includes("application/json")) {
                data = await response.json();
            } else {
                data = await response.blob();
            }
            return {
                success: true,
                data: data
            }
        } catch (code) {
            return {
                success: false,
                error: code
            }
        }
    }
}