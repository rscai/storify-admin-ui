import { HalJson } from '../hal/hal';

export class MetaField {
  key: string;
  value: string;
  valueType: string;
  namespace: string;
  description: string;
}

export class ProductVariant extends HalJson {
  id: number;
  barcode: string;
  createdAt: Date;
  fulfillmentService: string;
  grams: number;
  imageId: string;
  inventoryManagement: string;
  inventoryPolicy: string;
  inventoryQuantity: number;
  inventoryQuantityAdjustment: number;
  metafield: [MetaField];
  position: number;
  price: string;
  requiresShipping: boolean;
  sku: string;
  taxable: boolean;
  title: string;
  updatedAt: Date;
  weight: number;
  weightUnit: string;
}

export class Product extends HalJson {
  id: number;
  title: string;
  bodyHtml: string;
  handle: string;
  createdAt: Date;
  productType: string;
  published: boolean;
  publishedScope: string;
  tags: string;
  templateSuffix: string;
  metafieldsGlobalTitleTag: string;
  metafieldsGlobalDescriptionTag: string;
  updatedAt: Date;
  vendor: string;
}
