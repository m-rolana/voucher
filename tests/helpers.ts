import config from '../src/config';
import logger from '../src/services/logger';
import http from 'http';
import qs from 'qs';
import axios from 'axios';

type RequestPayload = {
    url: string;
    method: string;
    queryParams?: object | null;
    body?: object | null;
};

const serverUrl = `http://${config.host === '0.0.0.0' ? '127.0.0.1' : config.host}:${config.port}/api/`;

function apiRequest({ url, method, queryParams = null, body = null }: RequestPayload) {
    let fullUrl = serverUrl + url;

    logger.debug('apiRequest ', method, url, body);

    return axios({
      method,
      url: fullUrl,
      params: queryParams,
      data: body,
    });
}

export {
    apiRequest,
};
