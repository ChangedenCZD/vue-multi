import Class from '@/lib/Class';

export default class WindowContext extends Class {
  static $w: any = window;

  constructor() {
    super();
  }
}
