import {loaderPromisify} from '../tool/util'
import {TextureLoader, Texture} from 'three'
const textures = [],
  loader = loaderPromisify(new TextureLoader())

export async function getTexture(symbol) {
  if (symbol.startsWith('image://')) {
    const src = symbol.slice(8)
    let texture = textures.find(t => t.name === src)
    if (!texture) {
      texture = await loader(src)
      texture.name = src
      textures.push(texture)
    }
    return texture
  }
  return symbol
}
