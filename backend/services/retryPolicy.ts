// backend/services/retryPolicy.ts

/**
 * Executes a function with a retry mechanism.
 * @param fn - The function to execute.
 * @param retries - The number of retries.
 * @param delay - The delay between retries in milliseconds.
 * @param args - Arguments to pass to the function.
 * @returns The result of the function execution.
 * @throws Error if the maximum number of retries is exceeded.
 */
export async function executeWithRetry<T>(
  fn: (...args: any[]) => Promise<T>,
  retries: number = 3,
  delay: number = 1000,
  ...args: any[]
): Promise<T> {
  let attempt = 0;

  while (attempt < retries) {
    try {
      attempt++;
      console.log(`Attempt #${attempt}: Executing function`);
      const result = await fn(...args);
      return result;
    } catch (error) {
      if (attempt >= retries) {
        console.error(`Max retries exceeded for function execution`);
        throw new Error('Max retries exceeded');
      }
      console.warn(`Retry #${attempt} failed. Retrying in ${delay}ms...`);
      await new Promise(res => setTimeout(res, delay));
    }
  }

  throw new Error('Max retries exceeded');
}
