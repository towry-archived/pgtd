import ajax from '../supports/ajax';

let _u = null;

export default class User {
  constructor (uid = null) {
    if (_u != null || _u != null && uid === _u.uid) {
      return _u;
    }

    if (uid === -1) {
      return null;
    }
    
    return this._uid = uid, _u = this, _u;
  }

  info () {
    ajax.get('/api/user/info', {uid: this.uid})
    .then(function (data) {
      console.log(data);
    })
  }

  get uid () {
    return this._uid;
  }

  set uid (id) {
    this._uid = id;
  }

  static logged () {
    return _u != null;
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
