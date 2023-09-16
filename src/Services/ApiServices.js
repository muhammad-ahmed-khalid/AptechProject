import Utils, { BUS_EVENTS, LOGOUT_EVENT } from '../Utility/Utils';
// import { getItem } from './storageService';
import { ApiResponse, ApisauceConfig, create } from 'apisauce';
import { queryClient } from '../APIServices/APIServices';
import { API_CONFIG, CONTENT_TYPE, HTTP_STATUS } from '../constants/api';
// import { STORAGE_KEYS } from '@Constants/queryKeys';
// const { EventBusSingleton } = require('light-event-bus');


export const BASE_URL = API_CONFIG.BASE_URL_DEV;

const apiSauceInstance = create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': CONTENT_TYPE.JSON,
  },
});
async function get(url: string, queryParams?: {}, config?: {}) {
  console.log(url, "BSEEEEEE")
  const response = await apiSauceInstance.get(url, queryParams, config);
  return handleResponse(response);
}

async function post(url: string, data: object, config?: ApisauceConfig) {
  const response = await apiSauceInstance.post(url, data, config);
  return handleResponse(response);
}

async function put(url: string, data: object, config?: ApisauceConfig) {
  const response = await apiSauceInstance.put(url, data, config);
  return handleResponse(response);
}

async function patch(url: string, data: object, config?: ApisauceConfig) {
  const response = await apiSauceInstance.patch(url, data, config);
  return handleResponse(response);
}

async function deleteReq(
  url: string,
  queryParams: object,
  config?: ApisauceConfig,
) {
  const response = await apiSauceInstance.delete(url, queryParams, config);
  return handleResponse(response);
}

function handleResponse(response: ApiResponse<any>) {
  const mutatedResponse = {
    ok: response.ok,
    status: response.status,
  };
  const data = response.data;
  if (response.status === HTTP_STATUS.UNAUTHORIZED) {
    // snackbarService.fail('You are not authorized to perform this action');
    // EventBusSingleton.publish(BUS_EVENTS.HANDLE_LOGOUT_EVENT);
    return {
      ...mutatedResponse,
      data: !Utils.isEmpty(data) ? data : null,
    };
  }
  if (response.status === HTTP_STATUS.SERVER_ERROR) {
    // snackbarService.fail('Something went wrong');
    return {
      ...mutatedResponse,
      data: !Utils.isEmpty(data) ? data : null,
    };
  }
  if (response.ok) {
    return { ...mutatedResponse, data };
  } else {
    return {
      ...mutatedResponse,
      data: !Utils.isEmpty(data) ? data : null,
    };
  }
}

apiSauceInstance.addRequestTransform(request => {
//   const token = getItem(STORAGE_KEYS.TOKEN);
//   if (token) {
//     request.headers.AUTHORIZATION = `Bearer ${token}`;
//   }
//   request.headers.tenant = 'root';
});

export default {
  get,
  post,
  patch,
  put,
  delete: deleteReq,
};
