import { Schema, model } from 'mongoose'
import Product, { Inventory, Variant } from './product.interface'

const variantSchema = new Schema<Variant>({
  type: {
    type: String,
    required: [true, 'Variant type is required']
  },
  value: {
    type: String,
    required: [true, 'Variant value is required']
  }
})

const inventorySchema = new Schema<Inventory>({
  quantity: {
    type: Number,
    required: [true, 'Inventory type is required']
  },
  inStock: {
    type: Boolean,
    required: [true, 'Inventory inStock is required']
  }
})

const productSchema = new Schema<Product>(
  {
    name: {
      type: String,
      required: [true, 'Product name is required']
    },
    description: {
      type: String,
      required: [true, 'Product description is required']
    },
    price: {
      type: Number,
      required: [true, 'Product price is required']
    },
    category: {
      type: String,
      required: [true, 'Product category is required']
    },
    tags: [{ type: String }],
    variants: [variantSchema],
    inventory: inventorySchema
  },
  {
    timestamps: true
  }
)

productSchema.index({ name: 'text' })

const ProductModel = model<Product>('Product', productSchema)

export default ProductModel
