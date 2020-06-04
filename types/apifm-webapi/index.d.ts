declare namespace WebApi {
  interface WebApiStatic<T extends object = object> {
    init(name: string): string | undefined;
    [propName: string]: any;
  }
}

declare const WebApi: WebApi.WebApiStatic;

export = WebApi;
export as namespace WebApi;
