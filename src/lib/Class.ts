import clone from 'clone';

export default class BaseClass {
  static clone(object: any) {
    return clone(object);
  }
}
