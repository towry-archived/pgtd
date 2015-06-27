
let xhrSetting = function () {};

function serializeQuery (o) {
  if (typeof o !== 'object') {
    return;
  }

  let q = [];
  for (var p in o) {
    if (o.hasOwnProperty(p)) {
      q.push(encodeURIComponent(p) + '=' + encodeURIComponent(o[p]));
    }
  }

  return q.join('&')
}

function getXhr () {
  if (window.XMLHttpRequest) {
    return new XMLHttpRequest();
  } else {
    return null;
  }
}

function get (url, data, async = true) {
  let xhr = getXhr();
  if (xhr == null) {
    console.error("Can't get the xhr object");
    return;
  }
  xhrSetting(xhr);

  var query = '';
  if (Object.prototype.toString.call(data) === '[object Object]') {
    var query = serializeQuery(data);
  }

  if (query !== '') {
    if (url.indexOf('?') != -1) {
      url = url[url.length - 1] == '&' ? (url + query) : (url + '&' + query);
    } else {
      url = url + '?' + query;
    }
  }

  xhr.open("GET", url || '', async);

  return new Promise(function (res, rej) {
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4) {
        xhr.onreadystatechange = null;
        if (xhr.status === 200) {
          let data = xhr.responseText;
          res(JSON.parse(data));
        } else {
          rej({error: `${xhr.status}: ${xhr.statusText}`}); 
        }
      }
    }

    xhr.send(null);
  })
}

function post (url, data, async = true) {
  let xhr = getXhr();
  if (xhr == null) {
    console.error("Can't get the xhr object");
    return;
  }
  xhrSetting(xhr);
  var query = '';
  if (Object.prototype.toString.call(data) === '[object Object]') {
    var query = serializeQuery(data);
  }

  xhr.open("POST", url || '', async);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

  return new Promise(function (res, rej) {
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        xhr.onreadystatechange = null;
        if (xhr.status === 200) {
          let data = xhr.responseText;
          res(JSON.parse(data));
        } else {
          rej({error: `${xhr.status}: ${xhr.statusText}`});
        }
      }
    }

    xhr.send(query);
  })
}

export default {
  get,
  post,
  xhrSetting(cb) {
    if (typeof cb !== 'function') {
      throw new Error("argument is not a function");
    }

    xhrSetting = cb
  }
}
