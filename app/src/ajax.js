// send the XmlreqRequest, and if the req.readyState == 4 and the req.status == 200
// then invoke the callback function and pass the responseText as a param to it

// if the req.readyState == 4 and the req.status is NOT 200 then invoke the error method (defined below)
// and pass the status as a param, like this...
//this.error(req.status);

const ajax = {
  send: options => {
    return new Promise((succeed, fail) => {
      const req = new XMLHttpRequest();
      const url = options.url;
      const method = options.method;
      const headers = options.headers;
      const data = options.data;

      data ? data : null;

      req.open(method, url);
      for (key in headers) {
        req.setRequestHeader(key, headers[key]);
      }
      req.addEventListener("load", () => {
        if (req.status < 400) succeed(req.responseText);
        else fail(new Error("Request Failed: " + req.statusText));
      });
      req.addEventListener("error", () => {
        fail(new Error("Network error"));
      });

      req.send(data);
    });
  }
};

// exporting the ajax module to be used elsewhere
export default ajax;
