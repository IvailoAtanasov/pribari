import { type SchemaTypeDefinition } from 'sanity'
import cake from './cake'
import special from './special'
import sweet from './sweet'
import chocolate from './chocolate'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [cake, special, sweet, chocolate],
}
