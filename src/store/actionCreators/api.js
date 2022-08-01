import axios from "axios";
// import "dotenv/config";

const host = process.env.REACT_APP_API_HOST ?? "localhost",
	port = process.env.REACT_APP_API_PORT,
	baseUrl = process.env.REACT_APP_API_BASE_URL ?? "api",
	protocol = process.env.REACT_APP_API_PROTOCOL ?? "http";

const api = axios.create({
	withCredentials: true,
	baseURL: `${protocol}://${host}${port ? `:${port}` : ""}/${baseUrl}`,
});

export default api;
