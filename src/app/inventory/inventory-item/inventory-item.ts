import { HalJson, Link } from '../../hal/hal';

export class InventoryItem extends HalJson {
    productId: string;
    quantity: number;
    unitPrice: number;
    createdAt: Date;
    updatedAt: Date;
}