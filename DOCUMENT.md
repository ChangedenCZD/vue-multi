##Document

###Structure
####Project
```
project
└───config                  --- project automatic assembly config folder 
|       |   env.ts          --- Runtime Env
|       |   index.ts        --- Config export
|       |   pages.ts        --- Page finder
|       |   watcher.ts      --- Page hot reload
|       |   writer.ts       --- Page generator
|       
└───easyGen
|       |   config.json     --- Module/Component generator config file
|       |   easyGen.js      --- Module/Component generator
|
└───public
|       |   favicon.ico     --- vue project icon
|       |   index.html      --- webpack html template
|
└───src                     --- project src folder
|
└───utils
|       |   FileUtils.ts
|
|   package.json            --- 
|   babel.config.js         --- bable config file
|   tsconfig.json           --- typescript config file
|   vue.config.js           --- vue-cli 3.0 config file
```
####Src
```
src
└───.modules                            --- project runtime temporary folder
|       └───development
|       └───production
|
└───.template                           --- project runtime temporary folder @Deprecated
|       |   module.vue
|       
└───assets                              --- common assets folder
|       └───img
|       └───js
|       └───scss
|               |   base.scss           --- scss file base style
|
└───components
|       └───index                       --- component demo
|               |   component.ts
|               |   component.vue
|               |   index.ts
|   
└───lib                                 --- base class folder
|       |   BaseComponents.ts
|       |   BaseModule.ts
|       |   Class.ts
|       |   Context.ts
|       |   WindowContext.ts
|       
└───modules
|       └───index                       --- module demo
|               |   config.json
|               |   module.scss
|               |   module.ts
|               |   module.vue
|
└───plugins
|       └───api                         --- api support
|       |       |   index.ts
|       |       |   method.ts           --- api method enum
|       |       |   options.ts          --- api creator
|       |       |   url.ts              --- api url set
|       |
|       └───router                      --- router support
|       |       |   index.ts
|       |
|       └───store                       --- vuex support
|               |   actions.ts          --- action set
|               |   getters.ts          --- object set
|               |   index.ts
|               |   keySets.ts
|
└───resource                            --- secret info
|       |   RouteQueryKey.ts
|
└───utils
|       |   BrowserUtils.ts             --- browser support
|       |   Initiator.ts                --- module initiator
|       |   RouterUtils.ts              --- router support
|       |   Test.ts                     --- utils demo
|       |   VuexUtils.ts                --- vuex support
|
|   main.ts                             --- common config
|   shims-co.d.ts                       --- typescript support
|   shims-tsx.d.ts                      --- typescript support
|   shims-vue.d.ts                      --- typescript support
```

###Add Module
```
# vue-multi-cli
npm i -g vue-multi-cli
vues add -m pageTitle -p pagePath

# easyGen
# modify easyGen/config.json
{
  "modules":{"pagePath":{"title": "pageTitle"}}
}
# run easyGen/easyGen.js
node ./easyGen/easyGen.js

# Html-Title: pageTitle
# Html-Path: pagePath
``` 

###Add Component
```
# vue-multi-cli
npm i -g vue-multi-cli
vues add -c componentPath

# easyGen
# modify easyGen/config.json
{
  "components":["componentPath"]
}
# run easyGen/easyGen.js
node ./easyGen/easyGen.js

# import Component from '@/components/componentPath'
```

###Add Api
```
# modify and save src/plugins/api/url.ts
export default {
  TEST: 'request url'
};

# modify and save src/plugins/api/index.ts
...
export default {
  test(param1Value, data1Value) {
    return new Api().setUrl(Url.TEST).setParams({
      'param1': param1Value
    }).setData({
      'data1': data1Value
    }).setMethod(Method.POST).request();
  }
};
```

###Use the Api
```
class Module extends BaseModule {
  constructor() {
    super();
    const Api = this.Api;
    Api
    .test('param1Value', 'data1Value')
    .then(res=>{})
    .catch(err=>{});
  }
  ...
}
```

###Add Vuex
```
# Add KeySets
# modify and save src/plugins/store/keySets.ts
export default {
  SET_WINDOW_SIZE: 'SET_WINDOW_SIZE'
};

# Add action
# modify and save src/plugins/store/actions.ts
...
export default {
  setWindowSize({commit}: any, windowSize: any) {
    commit(KeySets.SET_WINDOW_SIZE, windowSize);
  }
};

# Add object getter
# modify and save src/plugins/store/getters.ts
export default {
  windowSize: (state: any) => state.windowSize
};

# Config new action and object getter
# modify and save src/plugins/store/index.ts
...
const state = {
  windowSize: {}
};
const mutations = {
  [KeySets.SET_WINDOW_SIZE](state: any, windowSize: any) {
    state.windowSize = windowSize;
  }
};
```

###Use the Vuex
```
class Module extends BaseModule {
  constructor() {
    super();
    this.setMethod({
      ...Module.mapActions(['setWindowSize']),
      init() {
        this.setWindowSize({});
      }
    });
    this.setCompute({
      ...Module.mapGetters({
        windowSize: 'windowSize'
      })
    });
    this.setWatch({
      windowSize(nValue, oValue) {}
    });
  }
  ...
}
```


##
[github](https://github.com/ChangedenCZD/vue-multi)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
[issues](https://github.com/ChangedenCZD/vue-multi/issues)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

[e-mail: changeden520@gmail.com]()
