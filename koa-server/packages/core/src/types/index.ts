import Koa from "koa"

export interface Hook {
  default: (app: any) => void;
} 

export interface KoaApp extends Koa {
  on(arg0: string, arg1: (error: any) => void);
  appPath: string;
  extName: string;
  config: any;
}