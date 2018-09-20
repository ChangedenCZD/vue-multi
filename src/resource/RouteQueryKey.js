class Key {
    constructor(type, instance, defaultValue, condition = undefined) {
        this.type = type;
        this.instance = instance;
        this.defaultValue = defaultValue;
        this.condition = condition;
    }
}
export default {
    pid: new Key(String, 'pid', ''),
    companyId: new Key(String, 'companyId', ''),
    salesId: new Key(String, 'salesId', ''),
    gid: new Key(String, 'gid', ''),
    mobile: new Key(Boolean, 'isMobile', false, (param) => param === '1')
};
//# sourceMappingURL=RouteQueryKey.js.map