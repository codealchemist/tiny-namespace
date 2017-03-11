'use strict'
const chai = require('chai')
const expect = chai.expect
const ns = require('../index')

describe('tiny-namespace', function () {
  it('should provide an interface', function () {
    expect(ns).not.to.be.undefined
  })

  it('should set a string', function () {
    ns.set('space.planets.earth', 'cool!')

    expect(ns.$).to.eql({
      space: {
        planets: {
          earth: 'cool!'
        }
      }
    })
  })

  it('should return namespace when set', function () {
    const namespace = ns.set('space.planets.earth', 'awesome!')

    expect(namespace).to.eql({
      space: {
        planets: {
          earth: 'awesome!'
        }
      }
    })
  })

  it('should set an object', function () {
    ns.set('space.planets.earth', {
      animals: ['dolphins', 'dogs', 'cats']
    })

    expect(ns.$).to.eql({
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
    const value = ns.get('space.planets.earth.animals')
    expect(value).to.eql(['dolphins', 'dogs', 'cats'])
  })

  it('should get undefined', function () {
    const value = ns.get('nope')
    expect(value).not.to.be.defined
  })

  it('should extend', function () {
    ns.set('space.planets.mars', 'soon!')
    ns.set('space.comets.halley', 'every 75/76 years')
    ns.set('metal', 'yeah!')

    expect(ns.$).to.eql({
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
    expect(ns.has('spacex')).to.equal(false)
    expect(ns.has('space.planets')).to.equal(true)
    expect(ns.has('space.planets.mars')).to.equal(true)
    expect(ns.has('space.comets.halley')).to.equal(true)
  })
})
