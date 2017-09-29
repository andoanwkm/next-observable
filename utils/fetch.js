/**
 * Created by andoan on 9/29/17.
 */

import * as QueryString from 'qs';
import { Observable } from 'rxjs';
import es6promise from 'es6-promise'
es6promise.polyfill()
import 'isomorphic-fetch';

const merge = (...args) => Object.assign({}, ...args);

const defaultArgs = {
    method: 'GET',
};

const isQueryString = (method) => (
    method === 'GET' ||
    method === 'HEAD' ||
    method === 'DELETE'
);

const buildQueryString = (url, params) => `${url}?${QueryString.stringify(params)}`;

export const fetchData = (url, { method, params, token } = defaultArgs) => {

    let body;

    if (isQueryString(method)) {
        url = buildQueryString(url, params);
    } else {
        body = JSON.stringify(params);
    }

    let headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Accept-Charset': 'utf-8',
    };

    if (token) {
        headers = merge(headers, {
            [token.key]: token.value,
        });
    }

    const req = new Request(url, {
        method: method,
        headers: new Headers(headers),
        body,
    });
    return fetch(req)
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                throw new Error('Fetch error status: ' + response.status);
            }
        });
};

export const observableFetch = (url, args) =>
    Observable.fromPromise(fetchData(url, args));

export const observableFetchJSON = (url, args) => Observable.fromPromise(
    fetchData(url, args)
    .then(response => response.json())
    );

export const get = (url, args) => {
    return observableFetchJSON(url, merge(args, {
    method: 'GET',
}));
};

export const post = (url, args) => {
    return observableFetchJSON(url, merge(args, {
    method: 'POST',
}));
};

export const put = (url, args) => {
    return observableFetchJSON(url, merge(args, {
    method: 'PUT',
}));
};

export const remove = (url, args) => {
    return observableFetchJSON(url, merge(args, {
    method: 'DELETE',
}));
};