export const getError = (error: any) =>
  error?.response?.data?.message ? error.response.data.message : error.message;
