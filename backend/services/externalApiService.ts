import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

/**
 * Makes an external API call with a retry mechanism.
 * @param url - The URL to make the request to.
 * @param options - Axios request configuration options.
 * @returns The response from the API call.
 * @throws Error if the maximum number of retries is exceeded.
 */
export async function callExternalApi(url: string, options: AxiosRequestConfig = {}): Promise<AxiosResponse> {
  const maxRetries = 3;
  let attempt = 0;

  while (attempt < maxRetries) {
    try {
      attempt++;
      console.log(`Attempt #${attempt}: Calling external API at ${url}`);
      const response = await axios(url, options);
      return response;
    } catch (error) {
      if (attempt >= maxRetries) {
        console.error(`Max retries exceeded for API call to ${url}`);
        throw new Error('Max retries exceeded');
      }
      console.warn(`Retry #${attempt} failed for API call to ${url}. Retrying...`);
    }
  }

  throw new Error('Max retries exceeded');
}
