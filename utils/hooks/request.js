import Cookies from 'js-cookie';

async function request(url, method = "GET", body , auth = false) {
  let config = {
    method: method,
    headers: {
      "Content-type": "application/json",
    },
  };
  if (body) {
    config.body = JSON.stringify(body);
  }
  
  if (auth) {
    config.headers["Authorization"] = `Bearer ${Cookies.get("token")}`;
  }

  try {
    const response = await fetch(url, config);
    const result_1 = await response.json();
    if (result_1.error) {
      throw result_1.error;
    }
    return result_1;
  } catch (err) {
    throw new Error(err);
  }
}

export default request;
