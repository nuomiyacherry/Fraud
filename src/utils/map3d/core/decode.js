export function decodePolygon(coordinate, encodeOffsets, encodeScale) {
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
export default function decode(json) {
  if (!json.UTF8Encoding) return json
  let encodeScale = json.UTF8Scale
  if (!encodeScale) {
    encodeScale = 1024
  }
  json.features.forEach(feature => {
    const geometry = feature.geometry,
      {coordinates, encodeOffsets} = geometry
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
