export const handleApiResponse = (response: any) => {
  if (response.status >= 200 && response.status < 300) {
    return response.data;
  } else {
    throw new Error(response.statusText);
  }
};

export const handleApiError = (error: any) => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.error('API Error Response:', error.response.data);
    return {
      status: error.response.status,
      message: error.response.data.message || 'An error occurred',
    };
  } else if (error.request) {
    // The request was made but no response was received
    console.error('API Error Request:', error.request);
    return {
      status: 500,
      message: 'No response received from the server',
    };
  } else {
    // Something happened in setting up the request that triggered an Error
    console.error('API Error Message:', error.message);
    return {
      status: 500,
      message: error.message || 'An error occurred',
    };
  }
};
