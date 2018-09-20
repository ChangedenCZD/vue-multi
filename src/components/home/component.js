import BaseComponent from '@/lib/BaseComponent';
class Component extends BaseComponent {
    constructor() {
        super();
        this.setModuleName('component-home');
        this.setProps([]);
        this.setComponent({});
        this.setMethod({
            ...Component.mapActions([])
        });
        this.setCompute({
            ...Component.mapGetters({})
        });
        this.setWatch({});
    }
    getData() {
        return {
            title: '首页'
        };
    }
    onCreate() {
        super.onCreate(this);
    }
}
export default new Component();
//# sourceMappingURL=component.js.map