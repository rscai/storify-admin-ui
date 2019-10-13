import { HalJson } from '../../hal/hal';

export class ProductImage extends HalJson {
    id: string;
    src: string;
    createdAt: Date;
    updatedAt: Date;
}
