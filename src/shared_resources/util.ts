/**
 * Generates a dummy promise to simulate a delay.
 * @param ms Time of delay in milli seconds
 * @returns Return a promise that resolves after the given time
 */
export const delayInMs = async (ms: number): Promise<unknown> =>
  new Promise((resolve) => setTimeout(resolve, ms));
