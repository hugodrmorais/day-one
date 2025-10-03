import {defineMigration, at, unset} from 'sanity/migrate'

export default defineMigration({
  title: 'Cleanup invalid fields from all documents',

  migrate: {
    document(doc, context) {
      const patches = []

      // Remove eventFormat de TODOS os documentos (campo não existe mais no schema)
      if ('eventFormat' in doc) {
        patches.push(at('eventFormat', unset()))
      }

      // Remove format de documentos que não são 'event' (campo só existe em event)
      if (doc._type !== 'event' && 'format' in doc) {
        patches.push(at('format', unset()))
      }

      return patches
    }
  }
})
