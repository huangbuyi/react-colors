import padStart from './padStart'

const rgbToHex = color => {
	let number = Math.round(color[0]) * 256 * 256 + Math.round(color[1]) * 256 + Math.round(color[2])
	return '#' + padStart(Number(number).toString(16), 6, '0')
}

export default rgbToHex