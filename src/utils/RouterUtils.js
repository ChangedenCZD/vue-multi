import RouteQueryKey from '../resource/RouteQueryKey';
export default class RouterUtils {
    static routeQuery(app) {
        return (app.$route || {}).query || {};
    }
    static getValidParam(app, queryKey, defaultValue, routeQueryInfo = undefined) {
        const query = RouterUtils.routeQuery(app);
        let param = query[queryKey];
        if (typeof param === 'object') {
            param = param[param.length - 1];
        }
        param = ((param === 'undefined' || param === 'null') ? '' : param) || defaultValue;
        if (routeQueryInfo && routeQueryInfo.condition) {
            const condition = routeQueryInfo.condition;
            param = condition(param);
        }
        return param;
    }
    static parseRoute(app) {
        const _RouteQueryKey = RouteQueryKey;
        Object.keys(RouteQueryKey).forEach((key) => {
            const routeQuery = _RouteQueryKey[key];
            app[routeQuery.instance] = RouterUtils.getValidParam(app, key, routeQuery.defaultValue, routeQuery);
        });
    }
}
//# sourceMappingURL=RouterUtils.js.map