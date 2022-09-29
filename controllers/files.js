const { response } = require('express')
const axios = require('axios').default
const fs = require('fs')
const { formating, formatingData } = require('../utils/formating')

const AUTHORIZATION = process.env.AUTHORIZATION || 'aSuperSecretKey'
const URL = process.env.URL || 'https://echo-serv.tbxnet.com/v1'

// RequestOptions
const options = {
  headers: {
    authorization: `Bearer ${AUTHORIZATION}`
  }
}
const optionsFile = {
  timeout: 60000,
  headers: {
    authorization: `Bearer ${AUTHORIZATION}`
  },
  responseType: 'stream'
}
const getListFiles = async (req, res = response) => {
  try {
    const response = await axios.get(`${URL}/secret/files`, options)
    res.status(200).json({ files: response.data?.files })
  } catch (error) {
    console.error(error)
    res.status(400).json({ error })
  }
}

const getFiles = async (req, res = response) => {
  try {
    const { filename } = req.query
    let array = []
    const errorArray = []

    if (filename) {
      await axios
        .get(`${URL}/secret/file/${filename}`, optionsFile)
        .then((response) => {
          response.data.pipe(fs.createWriteStream(`public/${filename}`))
        })
        .catch((error) => {
          errorArray.push({
            file: filename,
            error: error?.response?.statusText
          })
        })
      array = formating(filename)
    } else {
      const response = await axios.get(`${URL}/secret/files`, options)
      const files = response.data?.files

      let i = 0
      while (i < files.length) {
        await axios
          .get(`${URL}/secret/file/${files[i]}`, optionsFile)
          .then((response) => {
            response.data.pipe(fs.createWriteStream(`public/${files[i]}`))
            i++
          })
          .catch((error) => {
            errorArray.push({
              file: files[i],
              error: error?.response?.statusText
            })
            i++
          })
      }
      array = formatingData(files)
    }

    res.status(200).json({ files: array, filesError: errorArray })
  } catch (error) {
    res.status(400).json({ error })
  }
}

module.exports = { getFiles, getListFiles }
