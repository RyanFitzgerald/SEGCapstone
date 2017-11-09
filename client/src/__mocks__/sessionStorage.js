
let sessionStorage = {};

export default {  
    setItem(key, value) {
        return Object.assign(sessionStorage, {[key]: value});
    },
    getItem(key) {
        return sessionStorage[key];
    },
    clear() {
        sessionStorage = {};
    }
};