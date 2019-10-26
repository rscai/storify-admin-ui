import { HalJson, Link } from '../../hal/hal';
import { ProductImage } from '../product-image/product-image';

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
  id: string;
  title: string;
  tags: string[];
  images: string[];
  createdAt: Date;
  updatedAt: Date;
  imageCollection: ProductImage[];
}
