const emmit = (app: any, action: string, value: any): Promise<any> => {
  return app.$store.dispatch(action, value);
};
export default {
  emmit
};
