export function createRouter<T>(rootRouter: T): {
  [key in keyof T]: T[key];
} & {
  root: string;
} {
  const routerCreator = (router: any, path: string) => {
    let temp: any = {};
    temp.root = path ? path : "/";

    let key: keyof typeof router;
    for (key in router) {
      if (typeof router[key] == "object") {
        temp[key] = routerCreator(router[key], `${path}/${key}`);
      } else if (typeof router[key] == "string") {
        temp[key] = path + router[key];
      }
    }
    return temp;
  };

  return routerCreator(rootRouter, "");
}
