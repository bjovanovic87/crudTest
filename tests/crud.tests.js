import axios from 'axios'
import { expect } from 'chai'

const baseUrl =
  'https://l761dniu80.execute-api.us-east-2.amazonaws.com/default/exercise_api'

const headerSection = {
  'Content-type': 'application/json',
  Content: 'JSON object',
}
const randomMainKey = String(Math.floor(Math.random() * 100000000000))
const randomValue = String(Math.floor(Math.random() * 100))
const newValue = {
  main_key: randomMainKey,
  value: randomValue,
}

describe('GET Requests for AutoTest', () => {
  it('GET should return list of all resources', async function () {
    try {
      const response = await axios.get(baseUrl)
      expect(response.status).to.eql(200)
      expect(response.data.length).to.eql(10)
    } catch (err) {
      throw new Error(err)
    }
  })
  it('GET - should return a 403 if resource not found', async function () {
    await axios
      .get(
        'https://l761dniu80.execute-api.us-east-2.amazonaws.com/default/exercise'
      )
      .catch(err => {
        expect(err.response.status).to.eql(403)
      })
  })
})

describe('DELETE Requests for AutoTest', () => {
  it('DELETE specific resourse', async function () {
    try {
      const filteredMainKey = await axios.get(baseUrl).then(response => {
        return response.data[0].main_key
      })
      const response = await axios.delete(
        baseUrl,
        { data: { main_key: filteredMainKey } },
        { headerSection }
      )
      expect(response.status).to.eql(200)
    } catch (err) {
      throw new Error(err)
    }
  })

  it('DELETE - delete resource without providing main_key', async function () {
    try {
      await axios
        .delete(baseUrl, {
          headers: headerSection,
        })
        .catch(err => {
          expect(err.response.status).to.eql(400)
          expect(err.response.data).to.eql(
            'the JSON object must be str, bytes or bytearray, not NoneType'
          )
        })
    } catch (err) {
      throw new Error(err)
    }
  })
})

describe('PUT Requests for AutoTest', () => {
  it('PUT - add new valid value', async function () {
    try {
      const response = await axios.put(baseUrl, newValue, {
        headers: headerSection,
      })
      expect(response.status).to.eql(200)
      expect(response.data).to.eql(newValue)
    } catch (err) {
      throw new Error(err)
    }
  })

  it('PUT - add new key with partial data', async () => {
    try {
      const partialData = {
        main_key: randomMainKey,
      }
      await axios
        .put(baseUrl, partialData, {
          headers: headerSection,
        })
        .catch(err => {
          expect(err.response.status).to.eql(400)
          expect(err.response.data).to.contain('value')
        })
    } catch (err) {
      throw new Error(err)
    }
  })
})

describe('POST Requests for AutoTest', () => {
  it('POST - update value of main_key', async function () {
    try {
      const updatedResourse = newValue
      const response = await axios.post(baseUrl, updatedResourse, headerSection)
      expect(response.status).to.eql(200)
      expect(response.data).to.eql(updatedResourse)
    } catch (err) {
      throw new Error(err)
    }
  })

  it('POST update new resourse using non-existing key', async function () {
    try {
      const nonExistingResourse = {
        main_key: randomMainKey,
        value: randomValue,
      }
      await axios
        .post(baseUrl, nonExistingResourse, headerSection)
        .catch(err => {
          expect(err.response.status).to.eql(403)
        })
    } catch (err) {
      throw new Error(err)
    }
  })

  it('POST - update resource without providing main_key', async function () {
    try {
      const partialData = {
        value: randomValue,
      }
      await axios
        .put(baseUrl, partialData, {
          headers: headerSection,
        })
        .catch(err => {
          expect(err.response.status).to.eql(400)
          expect(err.response.data).to.contain('main_key')
        })
    } catch (err) {
      throw new Error(err)
    }
  })
})
