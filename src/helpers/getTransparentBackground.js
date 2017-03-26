
function getTransparentBackground(color = 'transparent', size = 6) {
  size *= 2
  return {
    backgroundImage: `linear-gradient(${ color }, ${ color }),linear-gradient(45deg, #ccc 25%, transparent 25%, transparent 75%, #ccc 75%, #ccc),linear-gradient(45deg, #ccc 25%, transparent 25%, transparent 75%, #ccc 75%, #ccc)`,
    backgroundSize: `${ size }px ${ size }px,${ size }px ${ size }px`,
    backgroundPosition: `0 0, ${ size }px ${ size }px`,
    backgroundColor: '#fff'
  }
}

export default getTransparentBackground