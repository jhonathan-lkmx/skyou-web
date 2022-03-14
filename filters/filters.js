import Vue from 'vue'

export default () => {
    Vue.filter('currency', (value) => {
        if (typeof value !== 'number') {
            return value;
        }
    
        var formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        });
    
        return formatter.format(value);
    });
}