import React from 'react'
import {render} from 'react-dom'
import Home from './Home/Home'

document.getElementsByClassName('loader')[0] && document.getElementsByClassName('loader')[0].remove()
render(<Home />, document.getElementById('content'))

