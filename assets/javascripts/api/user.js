import ajax from '../supports/ajax';

let _u = null;
let _ready = false;
let _info = {};
let infoCallbacks = [];

export default class User {
  constructor (uid = null) {
    if (_u != null || _u != null && uid === _u.uid) {
      return _u;
    }

    if (uid === -1) {
      return null;
    }

    _ready = false;
    ajax.get('/api/user/info', {uid})
    .then(function (data) {
      _info = data.value;
      _info.id = uid;
      
      let cb;
      _ready= true;
      while (cb = infoCallbacks.pop()) {
        cb(_info);
      }
    })
    
    return this._uid = uid, _u = this, _u;
  }

  static info (cb) {
    if (_ready) {
      cb(_info);
      return;
    }

    infoCallbacks.push(cb);
  }

  static uid () {
    return this._uid;
  }

  static logged () {
    return _u !== null;
  }

  static logout (refresh = true) {
    _u = null;

    ajax.post('/api/session/logout')
    .then(function(suc) {
      if (refresh) {
        window.location.reload();
      }
    }, function (err) {
      // show error message
      alert("an error occurred for that request");
    })
  }
}
