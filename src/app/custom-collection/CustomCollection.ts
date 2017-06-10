import { HalJson } from "../hal/hal";

export class CustomCollection extends HalJson{
  id: string;
  title: string;
  bodyHtml: string;
}
