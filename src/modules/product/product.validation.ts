import { z } from 'zod'

export const VariantValidationSchema = z.object(
  {
    type: z.string({ required_error: 'Variant type is required' }),
    value: z.string({ required_error: 'Variant value is required' })
  },
  { message: 'Product variant is required' }
)

export const InventoryValidationSchema = z.object(
  {
    quantity: z.number().nonnegative('Product price must be a non-negative number'),
    inStock: z.boolean({ required_error: 'Inventory inStock must be a boolean value' })
  },
  { message: 'Product inventory is required' }
)

const productValidationSchema = z.object({
  name: z
    .string({ required_error: 'Product name is required' })
    .min(3, { message: 'Product name must be 3 or more characters long' })
    .max(200, { message: 'Product name must be 200 or fewer characters long' }),
  description: z
    .string({ required_error: 'Product description is required' })
    .min(5, { message: 'Product description must be 5 or more characters long' })
    .max(1500, { message: 'Product description must be 1500 or fewer characters long' }),
  price: z
    .number({ required_error: 'Product price is required' })
    .nonnegative({ message: 'Product price must be a non-negative number' }),
  category: z
    .string({ required_error: 'Product category is required' })
    .min(1, { message: 'Product category must be 1 or more characters long' })
    .max(80, { message: 'Product category must be 80 or fewer characters long' }),
  tags: z.array(z.string()),
  variants: z.array(VariantValidationSchema),
  inventory: InventoryValidationSchema
})

export default productValidationSchema
