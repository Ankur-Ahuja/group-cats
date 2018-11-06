import './cats.css'

export class Cats {

  constructor(property) {
    this.property = property
  }

    init() {
    const target = document.getElementById('container')
    return Promise.resolve()
    .then(this.getData.bind(this, this.property.url))
    .then(this.grouping)
    .then(this.sortCatsByName)
    .then(this.display.bind(this))
    .catch(this.generateError)
    .then(html => target.innerHTML = html.join('\n'))
  }

  display(data) {
    if (data == undefined) return []
      return [
    ...this.displayCats(data.male, 'Male'),
    ...this.displayCats(data.female, 'Female')
    ]
  }

  displayCats(cats, type) {
    if (cats == undefined || type == undefined || type === '') return []
      const catsHtml = cats.length > 0 ? cats.map(this.displayCat) : ['<li>Empty array</li>']
    return [
    `<h2>${type}</h2>`,
    '<ul>',
    ...catsHtml,
    '</ul>'
    ]
  }

  displayCat(cat) {
    if (cat == undefined || cat.trim() === '') return ''
      return `<li>${cat.trim()}</li>`
  }

  sortCatsByName(data) {
    if (data == undefined) return
      return Object.keys(data).reduce((object, key) => {
        object[key] = (data[key] || []).sort()
        return object;
      }, {})
  }

  grouping(data) {
    if (data == undefined) return
      return data
    .filter(item => ['male', 'female'].indexOf(item.gender.toLowerCase()) >= 0)
    .reduce((catsGroupedByGender, item) => {
      const key = item.gender.toLowerCase()
      catsGroupedByGender[key] = catsGroupedByGender[key].concat(
        (item.pets || []).filter(cat => cat.type === 'Cat')
        .map(cat => cat.name)
        )
      return catsGroupedByGender
    }, {
      male: [],
      female: []
    })
  }

  getData(url) {
    if (url == undefined) throw new Error('Url is not defined')
      return window.fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json()
      }
      throw new Error(response.statusText)
    })
  }

  generateError(error) {
    return [`<div class="error">FAILED: ${error.message || 'We are currently facing some technical issue, will be back in some time'}</div>`]
  }


}