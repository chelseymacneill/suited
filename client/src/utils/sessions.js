
export default {
    setSession: function(value) {
        console.log("session test", value);
        sessionStorage.setItem('key', value);    
    },
    
    getSession: function() {
        let data = sessionStorage.getItem('key');
        return data;
    },

    clearSession: function() {
        sessionStorage.removeItem('key');
    }
}