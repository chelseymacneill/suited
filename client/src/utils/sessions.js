
export default {
    setSession: function(value) {
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