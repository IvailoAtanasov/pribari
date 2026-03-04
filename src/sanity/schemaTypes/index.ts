import { type SchemaTypeDefinition } from 'sanity'
import cake from './cake'
import cakeCategory from './cakeCategory'
import special from './special'
import sweet from './sweet'
import chocolate from './chocolate'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [cakeCategory, cake, special, sweet, chocolate],
}
