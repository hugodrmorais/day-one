import {defineMigration, at, setIfMissing, unset, set} from 'sanity/migrate'

const from = 'eventType'
const to = 'format'

export default defineMigration({
  title: 'Replace event type with event format',

  migrate: {
    document(doc, context) {
      // Só processa documentos do tipo 'event'
      if (doc._type !== 'event') {
        return []
      }

      const defaultValue = 'in-person'
      const validValues = ['in-person', 'virtual']

      // Pega o valor original ou usa o padrão
      let originalValue = doc[from] || defaultValue

      // Se o valor não for válido, usa o padrão
      const newValue = validValues.includes(originalValue) ? originalValue : defaultValue

      return [
        // Define o valor do format (substitui se já existir)
        at(to, set(newValue)),
        // Remove o campo eventType antigo
        at(from, unset())
      ]
    }
  }
})
