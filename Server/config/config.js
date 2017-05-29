/**
 * Created by Marina Khanamiryan on 5/29/2017.
 */

var config = {
    host: 'http://localhost',
    port: '3000',
    restApi: {
         api_version: 'v1',
         rest_url: function () {
                return '/check_in/api/' + this.api_version;
        }
    },

    databaseConfiguration: {
        "host": "mongodb://localhost:27017/locations"
    }
};

module.exports = config;