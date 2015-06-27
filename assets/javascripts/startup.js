import User from './api/user';

(function () {
  if (! window._pgtd) {
    throw new Error("Losing important config");
  }

  var pgtd = window._pgtd;
  var uid = pgtd._uid || -1;

  (new User(uid));
}());
