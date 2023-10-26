class Config {
  static baseURL = "http://localhost:8000";
  static requestToken = `${Config.baseURL}/api/token/`;
  static refreshToken = `${Config.baseURL}/api/token/refresh/`;
  static register = `${Config.baseURL}/api/register/`;
  static getUser = `${Config.baseURL}/api/college-users`;
  static getRequests = `${Config.baseURL}/api/transactions/`;
  static getActivities = `${Config.baseURL}/api/activities/`;
  static getDepartments = `${Config.baseURL}/api/departments/`;
  static updateTransactionStatus = `${Config.baseURL}/api/update-status-transactions/`;
  static updateTransactionReadStatus = `${Config.baseURL}/api/update-read-status-transactions/`;
  static getRequestCount = `${Config.baseURL}/api/request-count/`;
  static getRequestByActivity = `${Config.baseURL}/api/request-by-activities/`;
}

export default Config;
