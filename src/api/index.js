/*
"user-key": "c470e80941290e8b35355d10dcfb3e36"
"user-key": "52472010669a58f376a793b663734984"
"bc3cf64b137734141344e8f2b448ba99"
"bab7f707b72ea0b1154b7d786a9f05e4"
*/

const defaultHeaders = { "Content-Type": "application/json", "user-key": "bab7f707b72ea0b1154b7d786a9f05e4" };

export const callApi = (method, url, body = null, headers = defaultHeaders) => {
  const options = { method: method, headers: headers };
  if (body) options["body"] = JSON.stringify(body);
  return fetch(url, options).then((res) => res.json());
};
