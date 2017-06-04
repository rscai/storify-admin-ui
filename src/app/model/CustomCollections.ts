import { HalJson } from "../hal/hal";

export class CustomCollections extends HalJson{
  id: number;
  title: string;
  bodyHtml: string;
}
