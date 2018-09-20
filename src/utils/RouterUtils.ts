import RouteQueryKey from '../resource/RouteQueryKey';

export default class RouterUtils {

  static routeQuery(app: any) {
    return (app.$route || {}).query || {};
  }

  static getValidParam(app: any, queryKey: string, defaultValue: any, routeQueryInfo: any = undefined) {
    const query: any = RouterUtils.routeQuery(app);
    let param = query[queryKey];
    if (typeof param === 'object') {
      param = param[param.length - 1];
    }
    param = ((param === 'undefined' || param === 'null') ? '' : param) || defaultValue;
    if (routeQueryInfo && routeQueryInfo.condition) {
      const condition: Function = routeQueryInfo.condition;
      param = condition(param);
    }
    return param;
  }

  static parseRoute(app: any) {
    const _RouteQueryKey: any = RouteQueryKey;
    Object.keys(RouteQueryKey).forEach((key: any) => {
      const routeQuery: any = _RouteQueryKey[key];
      app[routeQuery.instance] = RouterUtils.getValidParam(app, key, routeQuery.defaultValue, routeQuery);
    });
  }
}
