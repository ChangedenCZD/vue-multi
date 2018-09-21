import axios from 'axios';

class Options {
  url: string = '';
  method: string = 'GET';
  data: any = {};
  params: any = {};
  timeout: number = 60000;
  maxContentLength: number = 3145728;
}

export default class Api {
  options: Options;

  constructor() {
    this.options = new Options();
  }

  setUrl(url: string) {
    this.options.url = url;
    return this;
  }

  setMethod(method: string = 'GET') {
    this.options.method = method;
    return this;
  }

  setData(data: any = {}) {
    this.options.data = data;
    return this;
  }

  setParams(params: any = {}) {
    this.options.params = params;
    return this;
  }

  setTimeout(timeout: number) {
    this.options.timeout = timeout;
    return this;
  }

  setMaxContentLength(maxContentLength: number) {
    this.options.maxContentLength = maxContentLength;
    return this;
  }

  request(): Promise<any> {
    const self: Api = this;
    const options = self.options;
    return new Promise((resolve, reject) => {
      axios.request(options).then(response => {
        // if (response.status < 400) {
        resolve(response.data);
        // } else {
        //   throw new Error(response);
        // }
      }).catch(err => {
        reject(err);
      });
    });
  }
}
