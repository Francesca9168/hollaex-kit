import { all } from 'bluebird';
import querystring from 'query-string';
import axios from 'axios';

import { requestAuthenticated } from '../../../utils';
import { WS_URL } from '../../../config/constants';

const toQueryString = (values) => {
	return querystring.stringify(values);
};

const handleError = (err) => err.data;

export const requestUserData = (values) =>
	requestAuthenticated(`/admin/users?${toQueryString(values)}`)
		.catch(handleError)
		.then((data) => data);

export const requestUserBalance = (values) =>
	requestAuthenticated(`/admin/user/${values}/balance`)
		.catch(handleError)
		.then((data) => {
			return data;
		});

export const updateNotes = (values) => {
	const options = {
		method: 'PUT',
		body: JSON.stringify(values)
	};
	return requestAuthenticated(`/admin/user/note?user_id=${values.id}`, options);
};
export const requestUserImages = (values) =>
	requestAuthenticated(`/plugins/kyc/id?${toQueryString(values)}`, {}, null, WS_URL)
		.catch(handleError)
		.then((data) => data);

export const updateUserData = (values) => {
	const options = {
		method: 'PUT',
		body: JSON.stringify(values)
	};
	return requestAuthenticated(`/plugins/kyc/admin?user_id=${values.id}`, options, null, WS_URL);
};

export const addBankData = (values) => {
	const options = {
		method: 'POST',
		body: JSON.stringify(values)
	};
	return requestAuthenticated(`/plugins/bank/admin?user_id=${values.id}`, options, null, WS_URL);
};

export const approveBank = (values) => {
	const options = {
		method: 'POST',
		body: JSON.stringify(values)
	};
	return requestAuthenticated('/plugins/bank/verify', options, null, WS_URL);
};

export const rejectBank = (values) => {
	const options = {
		method: 'POST',
		body: JSON.stringify(values)
	};
	return requestAuthenticated('/plugins/bank/revoke', options, null, WS_URL);
};

export const requestUser = (values) => {
	const promises = [requestUserData(values), requestUserImages(values)];
	return all(promises);
};

export const requestUsersDownload = (values) => {
	let path = '/admin/users';
	if (values) {
		path = `/admin/users?${toQueryString(values)}`;
	}
	return axios({
		method: 'GET',
		url: path
	})
	.then((res) => {
	    const url = window.URL.createObjectURL(new Blob([res.data]));
		const link = document.createElement('a'); link.href = url;
		link.setAttribute('download', 'users.csv');
		document.body.appendChild(link); link.click();
	})
	.catch((err) => {});
}
