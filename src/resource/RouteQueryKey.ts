class Key {
  type: any;
  defaultValue: any;
  instance: string;
  condition: any;

  constructor(type: any, instance: string, defaultValue: any, condition: any = undefined) {
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
  mobile: new Key(Boolean, 'isMobile', false, (param: string) => param === '1')
};
