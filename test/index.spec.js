'use strict'
const chai = require('chai')
const expect = chai.expect
const namespace = require('../index')

describe('Namespace', function () {
  it('should provide an interface', function () {
    expect(namespace).not.to.be.undefined
  })

  it('should set a string', function () {
    namespace.set('space.planets.earth', 'cool!')

    expect(namespace.$).to.eql({
      space: {
        planets: {
          earth: 'cool!'
        }
      }
    })
  })

  it('should set an object', function () {
    namespace.set('space.planets.earth', {
      animals: ['dolphins', 'dogs', 'cats']
    })

    expect(namespace.$).to.eql({
      space: {
        planets: {
          earth: {
            animals: ['dolphins', 'dogs', 'cats']
          }
        }
      }
    })
  })

  it('should get', function () {
    const value = namespace.get('space.planets.earth.animals')
    expect(value).to.eql(['dolphins', 'dogs', 'cats'])
  })

  it('should get undefined', function () {
    const value = namespace.get('nope')
    expect(value).not.to.be.defined
  })

  it('should extend', function () {
    namespace.set('space.planets.mars', 'soon!')
    namespace.set('space.comets.halley', 'every 75/76 years')
    namespace.set('metal', 'yeah!')

    expect(namespace.$).to.eql({
      space: {
        planets: {
          earth: {
            animals: ['dolphins', 'dogs', 'cats']
          },
          mars: 'soon!'
        },
        comets: {
          halley: 'every 75/76 years'
        }
      },
      metal: 'yeah!'
    })
  })

  it('should tell if a property exist', function () {
    expect(namespace.has('spacex')).to.equal(false)
    expect(namespace.has('space.planets')).to.equal(true)
    expect(namespace.has('space.planets.mars')).to.equal(true)
    expect(namespace.has('space.comets.halley')).to.equal(true)
  })
})
