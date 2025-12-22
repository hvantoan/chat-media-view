/**
 * ThumbHash decoder - Minimal implementation (~1KB)
 * Based on https://evanw.github.io/thumbhash/
 */

/**
 * Decode ThumbHash to RGBA pixels
 */
export function thumbHashToRGBA(hash: Uint8Array): {
  w: number
  h: number
  rgba: Uint8Array
} {
  const { PI, min, max, cos, round } = Math

  // Read header
  const header24 = hash[0] | (hash[1] << 8) | (hash[2] << 16)
  const header16 = hash[3] | (hash[4] << 8)
  const lDc = (header24 & 63) / 63
  const pDc = ((header24 >> 6) & 63) / 31.5 - 1
  const qDc = ((header24 >> 12) & 63) / 31.5 - 1
  const lScale = ((header24 >> 18) & 31) / 31
  const hasAlpha = (header24 >> 23) !== 0
  const pScale = ((header16 >> 0) & 63) / 63
  const qScale = ((header16 >> 6) & 63) / 63
  const isLandscape = (header16 >> 12) !== 0
  const lx = max(3, isLandscape ? (hasAlpha ? 5 : 7) : ((header16 >> 13) & 7) + 1)
  const ly = max(3, isLandscape ? ((header16 >> 13) & 7) + 1 : (hasAlpha ? 5 : 7))
  const aScale = hasAlpha ? ((hash[5] & 15) / 15) : 1
  const aDc = hasAlpha ? ((hash[5] >> 4) / 15) : 1

  // Decode AC coefficients
  const ac: number[] = []
  let dataIndex = hasAlpha ? 6 : 5
  let bitIndex = 0
  const readBits = (bits: number): number => {
    let value = 0
    for (let i = 0; i < bits; i++) {
      if (hash[dataIndex] & (1 << bitIndex)) {
        value |= 1 << i
      }
      bitIndex++
      if (bitIndex === 8) {
        bitIndex = 0
        dataIndex++
      }
    }
    return value
  }

  for (let cy = 0; cy < ly; cy++) {
    for (let cx = cy ? 0 : 1; cx * ly < lx * (ly - cy); cx++) {
      ac.push(((readBits(4) + 0.5) / 16 - 0.5) * lScale)
    }
  }
  for (let cy = 0; cy < 3; cy++) {
    for (let cx = cy ? 0 : 1; cx < 3 - cy; cx++) {
      ac.push(((readBits(4) + 0.5) / 16 - 0.5) * pScale)
    }
  }
  for (let cy = 0; cy < 3; cy++) {
    for (let cx = cy ? 0 : 1; cx < 3 - cy; cx++) {
      ac.push(((readBits(4) + 0.5) / 16 - 0.5) * qScale)
    }
  }
  if (hasAlpha) {
    for (let cy = 0; cy < 5; cy++) {
      for (let cx = cy ? 0 : 1; cx < 5 - cy; cx++) {
        ac.push(((readBits(4) + 0.5) / 16 - 0.5) * aScale)
      }
    }
  }

  // Compute output size
  const ratio = isLandscape ? (lx / ly) : (ly / lx)
  const w = round(ratio > 1 ? 32 : 32 * ratio)
  const h = round(ratio > 1 ? 32 / ratio : 32)
  const rgba = new Uint8Array(w * h * 4)

  // Decode pixels
  let acIndex = 0
  const lAc: number[] = []
  const pAc: number[] = []
  const qAc: number[] = []
  const aAc: number[] = []

  for (let cy = 0; cy < ly; cy++) {
    for (let cx = cy ? 0 : 1; cx * ly < lx * (ly - cy); cx++) {
      lAc.push(ac[acIndex++])
    }
  }
  for (let cy = 0; cy < 3; cy++) {
    for (let cx = cy ? 0 : 1; cx < 3 - cy; cx++) {
      pAc.push(ac[acIndex++])
    }
  }
  for (let cy = 0; cy < 3; cy++) {
    for (let cx = cy ? 0 : 1; cx < 3 - cy; cx++) {
      qAc.push(ac[acIndex++])
    }
  }
  if (hasAlpha) {
    for (let cy = 0; cy < 5; cy++) {
      for (let cx = cy ? 0 : 1; cx < 5 - cy; cx++) {
        aAc.push(ac[acIndex++])
      }
    }
  }

  // Render
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      let l = lDc
      let p = pDc
      let q = qDc
      let a = aDc

      // L channel
      let acIdx = 0
      for (let cy = 0; cy < ly; cy++) {
        const fy = cos((PI * cy * (y + 0.5)) / h)
        for (let cx = cy ? 0 : 1; cx * ly < lx * (ly - cy); cx++) {
          l += lAc[acIdx++] * cos((PI * cx * (x + 0.5)) / w) * fy
        }
      }

      // P channel
      acIdx = 0
      for (let cy = 0; cy < 3; cy++) {
        const fy = cos((PI * cy * (y + 0.5)) / h)
        for (let cx = cy ? 0 : 1; cx < 3 - cy; cx++) {
          p += pAc[acIdx++] * cos((PI * cx * (x + 0.5)) / w) * fy
        }
      }

      // Q channel
      acIdx = 0
      for (let cy = 0; cy < 3; cy++) {
        const fy = cos((PI * cy * (y + 0.5)) / h)
        for (let cx = cy ? 0 : 1; cx < 3 - cy; cx++) {
          q += qAc[acIdx++] * cos((PI * cx * (x + 0.5)) / w) * fy
        }
      }

      // A channel
      if (hasAlpha) {
        acIdx = 0
        for (let cy = 0; cy < 5; cy++) {
          const fy = cos((PI * cy * (y + 0.5)) / h)
          for (let cx = cy ? 0 : 1; cx < 5 - cy; cx++) {
            a += aAc[acIdx++] * cos((PI * cx * (x + 0.5)) / w) * fy
          }
        }
      }

      // Convert to RGB
      const b = l - 2 / 3 * p
      const r = (3 * l - b + q) / 2
      const g = r - q

      const i = (y * w + x) * 4
      rgba[i] = max(0, 255 * min(1, r))
      rgba[i + 1] = max(0, 255 * min(1, g))
      rgba[i + 2] = max(0, 255 * min(1, b))
      rgba[i + 3] = max(0, 255 * min(1, a))
    }
  }

  return { w, h, rgba }
}

/**
 * Convert base64 string to Uint8Array
 */
export function base64ToBytes(base64: string): Uint8Array {
  const binary = atob(base64)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i)
  }
  return bytes
}

/**
 * Convert RGBA pixels to data URL
 */
export function rgbaToDataURL(w: number, h: number, rgba: Uint8Array): string {
  const canvas = document.createElement('canvas')
  canvas.width = w
  canvas.height = h
  const ctx = canvas.getContext('2d')
  if (!ctx) return ''
  const imageData = new ImageData(new Uint8ClampedArray(rgba), w, h)
  ctx.putImageData(imageData, 0, 0)
  return canvas.toDataURL()
}

/**
 * Decode ThumbHash to data URL
 */
export function thumbHashToDataURL(hash: string): string {
  const bytes = base64ToBytes(hash)
  const { w, h, rgba } = thumbHashToRGBA(bytes)
  return rgbaToDataURL(w, h, rgba)
}
