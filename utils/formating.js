const { readFile, utils } = require('xlsx')
const fs = require('fs')

const formatingData = (files) => {
  const array = []
  for (let index = 0; index < files.length; index++) {
    if (fs.existsSync(`public/${files[index]}`)) {
      const workbook = readFile(`public/${files[index]}`)
      const workbookSheets = workbook.SheetNames
      const sheet = workbookSheets[0]
      const dataExcel = utils.sheet_to_json(workbook.Sheets[sheet])
      if (dataExcel.length) {
        array.push({
          file: files[index],
          lines: dataExcel.filter(
            (line) => line.text && line.number && line.hex
          )
        })
      }
    }
  }
  return array
}

const formating = (file) => {
  const array = []
  if (fs.existsSync(`public/${file}`)) {
    const workbook = readFile(`public/${file}`)
    const workbookSheets = workbook.SheetNames
    const sheet = workbookSheets[0]
    const dataExcel = utils.sheet_to_json(workbook.Sheets[sheet])
    if (dataExcel.length) {
      array.push({
        file,
        lines: dataExcel.filter((line) => line.text && line.number && line.hex)
      })
    }
  }
  return array
}
module.exports = { formating, formatingData }
