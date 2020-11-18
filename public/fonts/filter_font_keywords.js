const fs = require('fs')
const mapJson = require('./china.json')
const fonts = require('./FZNewShuSong-Z10S_Regular.json')

const keywords = getKeywords(mapJson)
genFonts(keywords, fonts)

function getKeywords(json) {
  const mapJson = decode(json)
  let words = ''
  mapJson.features.forEach(item => {
    words += item.properties.name
  })
  return [...new Set(words.split(''))]
}

function genFonts(keywords, fontJson) {
  const result = {}
  let recode = 0
  for (let key in fontJson) {
    if (key === 'glyphs') {
      // const reg = /[\u4e00-\u9fa5]/,
      const reg = /[\W]/,
        specialCharacter = /[`~!$%^&*()_\-+=<>?:"{}|,.\\/;'\\[\]·~！@#￥……（）——《》？：“”【】、；‘’，。、]/,
        glyphs = fontJson.glyphs
      result.glyphs = {}
      for (let word in glyphs) {
        if (!reg.test(word) || specialCharacter.test(word)) {
          result.glyphs[word] = glyphs[word]
        } else if (keywords.includes(word)) {
          result.glyphs[word] = glyphs[word]
          recode++
        }
        if (recode === keywords.length) break
      }
    } else {
      result[key] = fontJson[key]
    }
  }
  fs.writeFileSync(
    `${result.familyName}__filterd.json`,
    JSON.stringify(result),
    'utf8'
  )
  console.log('过滤完成')
}

function decodePolygon(coordinate, encodeOffsets, encodeScale) {
  const result = []
  let [prevX, prevY] = encodeOffsets
  for (let i = 0; i < coordinate.length; i += 2) {
    let x = coordinate.charCodeAt(i) - 64,
      y = coordinate.charCodeAt(i + 1) - 64
    // ZigZag decoding
    x = (x >> 1) ^ -(x & 1)
    y = (y >> 1) ^ -(y & 1)
    // Delta decoding
    x += prevX
    y += prevY

    prevX = x
    prevY = y
    // Dequantize
    result.push([x / encodeScale, y / encodeScale])
  }
  return result
}

// 地图json解码
function decode(json) {
  if (!json.UTF8Encoding) return json
  let encodeScale = json.UTF8Scale
  if (!encodeScale) {
    encodeScale = 1024
  }
  json.features.forEach(feature => {
    const geometry = feature.geometry,
      { coordinates, encodeOffsets } = geometry
    coordinates.forEach((coordinate, c) => {
      if (geometry.type === 'Polygon') {
        coordinates[c] = decodePolygon(
          coordinate,
          encodeOffsets[c],
          encodeScale
        )
      } else if (geometry.type === 'MultiPolygon') {
        coordinate.forEach((polygon, c2) => {
          coordinate[c2] = decodePolygon(
            polygon,
            encodeOffsets[c][c2],
            encodeScale
          )
        })
      }
    })
  })
  // has been decoded
  json.UTF8Encoding = false
  return json
}
