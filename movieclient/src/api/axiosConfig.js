import axios from "axios";

export default axios.create({
    baseURL: 'https://aacd-111-246-191-29.ngrok-free.app',
    headers: {"ngrok-skip-browser-warning": "true"}

});
