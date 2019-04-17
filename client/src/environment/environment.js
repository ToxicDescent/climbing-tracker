// eslint-disable-next-line import/prefer-default-export
export const getServerUrl = () => {
  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:9000';
  }
  return 'http://175.32.42.210:9000';
};
