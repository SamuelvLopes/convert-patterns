const Model = require('./Model');

class Session extends Model{


}

module.exports = () =>{
    let session = new Session();
    return session;
}