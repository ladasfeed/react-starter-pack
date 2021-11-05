import axios, { AxiosResponse } from "axios";

const createRequest = async (response: any): Promise<AxiosResponse<any>> => {
  try {
    return await response;
  } catch (e: any) {
    throw await e.response;
  }
};

export function apiBuilder<T>(
  method: (props: T) => Promise<AxiosResponse<any>>
) {
  return async (apiProps: T) => await createRequest(method(apiProps));
}
