export const getRequest = async (url, headers) => {
    headers = headers instanceof Headers ? headers : new Headers(headers);

    const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}${url}`, {
        headers
    });

    if (!response.ok) {
        handleErrorResponse(response);
    }

    return response;
};

export const postRequest = async (url, body, headers = new Headers()) => {
    headers = headers instanceof Headers ? headers : new Headers(headers);
    if (body instanceof URLSearchParams) {
        headers.set('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');
    }

    const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}${url}`, {
        method: 'POST',
        headers,
        body
    });

    if (!response.ok) {
        handleErrorResponse(response);
    }

    return response;
};

const handleErrorResponse = response => {
    console.error(response);
};