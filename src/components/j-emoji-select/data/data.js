import appleEmoji from './apple.json';

const mapping = {
    name: 'a',
    unified: 'b',
    non_qualified: 'c',
    has_img_apple: 'd',
    has_img_google: 'e',
    has_img_twitter: 'f',
    has_img_emojione: 'g',
    has_img_facebook: 'h',
    has_img_messenger: 'i',
    keywords: 'j',
    sheet: 'k',
    emoticons: 'l',
    text: 'm',
    short_names: 'n',
    added_in: 'o',
}

const buildSearch = (emoji) => {
  const search = []

  var addToSearch = (strings, split) => {
    if (!strings) {
      return
    }

    ;(Array.isArray(strings) ? strings : [strings]).forEach((string) => {
      ;(split ? string.split(/[-|_|\s]+/) : [string]).forEach((s) => {
        s = s.toLowerCase()

        if (search.indexOf(s) == -1) {
          search.push(s)
        }
      })
    })
  }

  addToSearch(emoji.short_names, true)
  addToSearch(emoji.name, true)
  addToSearch(emoji.keywords, false)
  addToSearch(emoji.emoticons, false)

  return search.join(',')
}

const compress = (emoji) => {
  emoji.short_names = emoji.short_names.filter((short_name) => {
    return short_name !== emoji.short_name
  })
  delete emoji.short_name

  emoji.sheet = [emoji.sheet_x, emoji.sheet_y]
  delete emoji.sheet_x
  delete emoji.sheet_y

  emoji.added_in = parseInt(emoji.added_in)
  if (emoji.added_in === 6) {
    delete emoji.added_in
  }

  for (let key in mapping) {
    emoji[mapping[key]] = emoji[key]
    delete emoji[key]
  }

  for (let key in emoji) {
    let value = emoji[key]

    if (Array.isArray(value) && !value.length) {
      delete emoji[key]
    } else if (typeof value === 'string' && !value.length) {
      delete emoji[key]
    } else if (value === null) {
      delete emoji[key]
    }
  }
}

const uncompress = (data) => {
  data.compressed = false
  const map = {};

  for (let id in data.emojis) {
    let emoji = data.emojis[id]
    emoji.id = id;
    const category = data.categories.find(({ emojis }) => emojis.includes(id)).id;
    for (let key in mapping) {
      emoji[key] = emoji[mapping[key]]
      delete emoji[mapping[key]]
    }
    emoji.unified = unifiedToNative(emoji.unified);
    emoji.category = category

    if (!emoji.short_names) emoji.short_names = []
    emoji.short_names.unshift(id)

    emoji.sheet_x = emoji.sheet[0]
    emoji.sheet_y = emoji.sheet[1]
    delete emoji.sheet

    if (!emoji.text) emoji.text = ''

    if (!emoji.added_in) emoji.added_in = 6
    emoji.added_in = emoji.added_in.toFixed(1)

    emoji.search = buildSearch(emoji)
    if(!map[category]) map[category] = [];
    map[category].push(emoji);
  }
  return map
}
const _String = String

const stringFromCodePoint = _String.fromCodePoint ||
  function () {
    var MAX_SIZE = 0x4000
    var codeUnits = []
    var highSurrogate
    var lowSurrogate
    var index = -1
    var length = arguments.length
    if (!length) {
      return ''
    }
    var result = ''
    while (++index < length) {
      var codePoint = Number(arguments[index])
      if (
        !isFinite(codePoint) || // `NaN`, `+Infinity`, or `-Infinity`
        codePoint < 0 || // not a valid Unicode code point
        codePoint > 0x10ffff || // not a valid Unicode code point
        Math.floor(codePoint) != codePoint // not an integer
      ) {
        throw RangeError('Invalid code point: ' + codePoint)
      }
      if (codePoint <= 0xffff) {
        // BMP code point
        codeUnits.push(codePoint)
      } else {
        // Astral code point; split in surrogate halves
        // http://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
        codePoint -= 0x10000
        highSurrogate = (codePoint >> 10) + 0xd800
        lowSurrogate = codePoint % 0x400 + 0xdc00
        codeUnits.push(highSurrogate, lowSurrogate)
      }
      if (index + 1 === length || codeUnits.length > MAX_SIZE) {
        result += String.fromCharCode.apply(null, codeUnits)
        codeUnits.length = 0
      }
    }
    return result
  }
function unifiedToNative(unified) {
  var unicodes = unified.split('-'),
    codePoints = unicodes.map((u) => `0x${u}`)

  return stringFromCodePoint.apply(null, codePoints)
}



export const categories = appleEmoji.categories.map(({ id }) => id);

export const appleEmojiMap = uncompress(appleEmoji);