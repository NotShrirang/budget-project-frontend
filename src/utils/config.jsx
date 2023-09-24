class Config {
  static baseURL = "http://localhost:8000";
  static requestToken = `${Config.baseURL}/api/token/`;
  static refreshToken = `${Config.baseURL}/api/token/refresh/`;
  static register = `${Config.baseURL}/api/register/`;
  static getRequests = `${Config.baseURL}/api/transactions/`;
  static getRequestCount = `${Config.baseURL}/api/request-count/`;
}

export default Config;
