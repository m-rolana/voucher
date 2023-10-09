import config from '../../src/config';
import logger from '../../src/services/logger';
import axios, { AxiosError } from 'axios';

type RequestPayload = {
    url: string;
    method: string;
    queryParams?: object | null;
    body?: object | null;
};

const serverUrl = `http://${config.host === '0.0.0.0' ? '127.0.0.1' : config.host}:${config.port}/api/`;

function apiRequest({ url, method, queryParams = null, body = null }: RequestPayload) {
    logger.debug('apiRequest ', method, url, body);

    return axios({
        method,
        url: serverUrl + url,
        params: queryParams,
        data: body,
    }).catch((e) => {
        return (e as AxiosError).response;
    });
}

export { apiRequest };
