import 'babel-polyfill'

import { Cats } from '../src/cats'
import chai from 'chai'
import data from './data.json'
import spies from 'chai-spies'

chai.use(spies)

const {
  expect,
  spy
} = chai

const property = {  
    url: 'sample.url.com'
}

describe('Cats', () => {
  let cat

  beforeEach(() => cat = new Cats(property))

  describe('display', () => {
    it('should return an array of cats by their owners gender names', () => {
      const result = cat.display({
        male: ['Garfield', 'Tom', 'Nemo'],
        female: ['Sam', 'Max']
      })

      expect(result).be.a('array')
      expect(result).be.length(11)
      expect(result[0]).be.equal('<h2>Male</h2>')
      expect(result[1]).be.equal('<ul>')
      expect(result[2]).be.equal('<li>Garfield</li>')
      expect(result[3]).be.equal('<li>Tom</li>')
      expect(result[4]).be.equal('<li>Nemo</li>')
      expect(result[5]).be.equal('</ul>')
      expect(result[6]).be.equal('<h2>Female</h2>')
      expect(result[7]).be.equal('<ul>')
      expect(result[8]).be.equal('<li>Sam</li>')
      expect(result[9]).be.equal('<li>Max</li>')
      expect(result[10]).be.equal('</ul>')

    })

    it('should return an empty array if response data is empty', () => {
      const result = cat.display(undefined)
      expect(result).be.a('array')
      expect(result).be.empty
    })
  })

  describe('displayCats', () => {
    it('should return an array of cats and their type', () => {
      const result = cat.displayCats(['Garfield', 'Tom', 'Nemo'], 'Male')
      expect(result).be.a('array')
      expect(result).be.length(6)
      expect(result[0]).be.equal('<h2>Male</h2>')
      expect(result[1]).be.equal('<ul>')
      expect(result[2]).be.equal('<li>Garfield</li>')
      expect(result[3]).be.equal('<li>Tom</li>')
      expect(result[4]).be.equal('<li>Nemo</li>')
      expect(result[5]).be.equal('</ul>')
    })

    it('should return an empty array if response is empty', () => {
      const result = cat.displayCats(undefined, 'Male')
      expect(result).be.a('array')
      expect(result).be.empty
    })


    it('should return an empty array if type is empty', () => {
      const result = cat.displayCats(['Garfield', 'Tom', 'Nemo'], '')
      expect(result).be.a('array')
      expect(result).be.empty
    })

    it('should return array with "Empty array" message if cats array is empty', () => {
      const result = cat.displayCats([], 'Male')
      expect(result).be.a('array')
      expect(result).be.length(4)
      expect(result[0]).be.equal('<h2>Male</h2>')
      expect(result[1]).be.equal('<ul>')
      expect(result[2]).be.equal('<li>Empty array</li>')
      expect(result[3]).be.equal('</ul>')
    })
  })

  describe('displayCat', () => {
    it('should display html tag with given cat name', () => {
      const result = cat.displayCat('Garfield')
      expect(result).be.equal('<li>Garfield</li>')
    })

    it('should return empty string if cat name is undefined', () => {
      const result = cat.displayCat(undefined)
      expect(result).be.equal('')
    })

    it('should return empty string if cat name is empty string', () => {
      const result = cat.displayCat(' ')
      expect(result).be.equal('')
    })
  })

  describe('sortCatsByName', () => {
    it('should sort the given array of cats by male and female', () => {
      const result = cat.sortCatsByName({
        male: ['Garfield', 'Tom', 'Nemo'],
        female: ['Sam', 'Max']
      })

      expect(result).be.a('object')
      expect(result).have.property('male')
      expect(result.male).be.a('array')
      expect(result.male).be.length(3)
      expect(result.male[0]).be.equal('Garfield')
      expect(result.male[1]).be.equal('Nemo')
      expect(result.male[2]).be.equal('Tom')

      expect(result).have.property('female')
      expect(result.female).be.a('array')
      expect(result.female).be.length(2)
      expect(result.female[0]).be.equal('Max')
      expect(result.female[1]).be.equal('Sam')
    })

    it('should sort female array if male array is empty', () => {
      const result = cat.sortCatsByName({
        male: [],
        female: ['Sam', 'Max']
      })

      expect(result).be.a('object')
      expect(result).have.property('male')
      expect(result.male).be.a('array')
      expect(result.male).be.empty

      expect(result).have.property('female')
      expect(result.female).be.a('array')
      expect(result.female).be.length(2)
      expect(result.female[0]).be.equal('Max')
      expect(result.female[1]).be.equal('Sam')
    })

    it('should sort male array if female array is empty', () => {
      const result = cat.sortCatsByName({
        male: ['Sam', 'Max'],
        female: undefined
      })

      expect(result).be.a('object')
      expect(result).have.property('male')
      expect(result.male).be.a('array')
      expect(result.male).be.length(2)
      expect(result.male[0]).be.equal('Max')
      expect(result.male[1]).be.equal('Sam')

      expect(result).have.property('female')
      expect(result.female).be.a('array')
      expect(result.female).be.empty
    })

    it('should return undefined if input is undefined', () => {
      const result = cat.sortCatsByName(undefined)
      expect(result).be.undefined
    })
  })

  describe('grouping', () => {
    it('should group cat name by owner gender', () => {
      const result = cat.grouping(data)
      expect(result).be.a('object')
      expect(result).have.property('male')
      expect(result.male).be.a('array')
      expect(result.male).be.length(4)
      expect(result.male[0]).be.equal('Garfield')
      expect(result.male[1]).be.equal('Tom')
      expect(result.male[2]).be.equal('Max')
      expect(result.male[3]).be.equal('Jim')

      expect(result).have.property('female')
      expect(result.female).be.a('array')
      expect(result.female).be.length(3)
      expect(result.female[0]).be.equal('Garfield')
      expect(result.female[1]).be.equal('Tabby')
      expect(result.female[2]).be.equal('Simba')
    })

    it('should return undefined if data is undefined in grouping', () => {
      const result = cat.grouping(undefined)
      expect(result).be.undefined
    })

    it('should group even if cats array is empty', () => {
      const dataItem = JSON.parse(JSON.stringify(data[0])) // clone
      dataItem.pets = undefined
      const result = cat.grouping([dataItem])
      expect(result).be.a('object')
      expect(result).have.property('male')
      expect(result.male).be.a('array')
      expect(result.male).be.empty

      expect(result).have.property('female')
      expect(result.female).be.a('array')
      expect(result.female).be.empty
    })

    it('should filter out items with gender other than male or female', () => {
      const result = cat.grouping([{
        gender: 'other',
        pets: [{
          name: 'Max',
          type: 'Cat'
        }]
      }, {
        gender: 'Female',
        pets: [{
          name: 'Simba',
          type: 'Cat'
        }]
      }])
      expect(result).be.a('object')
      expect(result).have.property('male')
      expect(result.male).be.a('array')
      expect(result.male).be.empty

      expect(result).have.property('female')
      expect(result.female).be.a('array')
      expect(result.female).be.length(1)
      expect(result.female[0]).be.equal('Simba')
    })

    it('should filter out items if its not cat', () => {
      const result = cat.grouping([{
        gender: 'Male',
        pets: [{
          name: 'Max',
          type: 'Dog'
        }]
      }, {
        gender: 'Female',
        pets: [{
          name: 'Simba',
          type: 'Cat'
        }]
      }])
      expect(result).be.a('object')
      expect(result).have.property('male')
      expect(result.male).be.a('array')
      expect(result.male).be.empty

      expect(result).have.property('female')
      expect(result.female).be.a('array')
      expect(result.female).be.length(1)
      expect(result.female[0]).be.equal('Simba')
    })
  })

  describe('getData', () => {
    it('should return response with window.fetch', () => {
      function fetch() {
        return {
          then: () => {}
        }
      }
      global.window = {
        fetch: spy(fetch)
      }
      cat.getData(property);
      expect(global.window.fetch).to.have.been.called.once()
    })

    it('should return response using window.fetch with given url', () => {
      function fetch(url) {
        return {
          then: () => {}
        }
      }
      global.window = {
        fetch: spy(fetch)
      }
      cat.getData(property);
      expect(global.window.fetch).to.have.been.called.with(property)
    })

    it('should throw an error if url is empty', () => {
      function fetch(url) {
        return {
          then: () => {}
        }
      }
      global.window = {
        fetch: spy(fetch)
      }
      expect(() => {
        cat.getData();
      }).to.throw('Url is not defined')
    })

    it('should return response in json if status is ok', () => {
      function fetch(url) {
        return new Promise((resolve) => {
          resolve({
            ok: true,
            json: () => (['test'])
          })
        })
      }
      global.window = {
        fetch: spy(fetch)
      }
      const dataHandler = spy(() => {})
      cat.getData(property)
        .then(dataHandler)
        .then(() => {
          expect(dataHandler).to.have.been.called.with(['test'])
        })
    })

    it('should not return response if status is not ok', () => {
      function fetch(url) {
        return new Promise((resolve) => {
          resolve({
            ok: false,
            json: () => (['test'])
          })
        })
      }
      global.window = {
        fetch: spy(fetch)
      }
      const errorHandler = spy(() => {})
      cat.getData(property)
        .then(() => {}, errorHandler)
        .then(() => {
          expect(errorHandler).to.have.been.called.once()
        })
    })
  })



  describe('generateError', () => {
    it('should return array of html tags which gives error message', () => {
      const result = cat.generateError(new Error('Testing error message'))
      expect(result).be.a('array')
      expect(result).be.length(1)
      expect(result[0]).be.equal('<div class="error">FAILED: Testing error message</div>')
    })
    it('should return array of html tags which give generic error message, if message is empty', () => {
      const result = cat.generateError(new Error())
      expect(result).be.a('array')
      expect(result).be.length(1)
      expect(result[0]).be.equal('<div class="error">FAILED: We are currently facing some technical issue, will be back in some time</div>')
    })
  })

  describe('init', () => {
    it('should get the dom element with id "container" as the target node', () => {
      global.document = {
        getElementById: spy(() => ({}))
      }
      cat.init().then(() => {
        expect(global.document.getElementById).to.have.been.called.with('container')
      }, (error) => {
        throw new Error('Failed to get the container')
      })
    })
  })
})