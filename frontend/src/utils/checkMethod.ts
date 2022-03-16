export const checkMethod = (
  method: (() => void) | undefined
): boolean | null => {
  if (typeof method === 'function') {
    method();
    return true;
  }
  return null;
};
