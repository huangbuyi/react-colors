import React, {PropTypes} from 'react'

class NumberInput extends React.Component{
	static propTypes = {
		value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
		min: PropTypes.number,
		max: PropTypes.number,
		step: PropTypes.number,
		fixed: PropTypes.number,
		scale: PropTypes.number
	}

	static defaultProps = {
		step: 1,
		fixed: 0,
		scale: 1
	}

	constructor(props) {
		super(props);
		let newValue = Number((Number(props.value) * props.scale).toFixed(props.fixed))
		this.state = {
			value: newValue,
			blurValue: null
		}
	}

	componentWillReceiveProps(nextProps) {
		const input = this.input 
		let newValue = Number((Number(nextProps.value) * nextProps.scale).toFixed(nextProps.fixed))
		if(newValue !== this.state.value) {
			if (input === document.activeElement) {
        this.setState({ blurValue: newValue })
      } else {
        this.setState({ value: newValue })
      }
		}
	}

	handleBlur = e => {
		let blurValue = this.state.blurValue
		if (blurValue || blurValue == 0){
			this.setState({
				value: blurValue,
				blurValue: null
			})
		}
	}

	handleChange = (newValue, e, call) => {
    let {min, max} = this.props

    if( !isNaN(Number(newValue)) ) {
    	let outValue = newValue > max ? max : newValue 
    	outValue = outValue < min ? min : outValue
      this.props.onChange(outValue, e)   
    }
    if( !isNaN(Number(newValue)) || !newValue )
    this.setState({ value: newValue }, call)
  }

  handleKeyDown = (e) => {
    let { step, fixed } = this.props
    let num = Number(e.target.value)
    // up
    if (e.keyCode === 38) {
      e.preventDefault()
      this.handleChange((num + step).toFixed(fixed), e, () => this.input.select())
    }

    // Down
    if (e.keyCode === 40) {
      e.preventDefault()
      this.handleChange((num - step).toFixed(fixed), e, () => this.input.select())
    }
  }

	render() {
		let {style, placeholder} = this.props
		return (
			<input 
				type='text'
				ref={ node => this.input = node }
				value={ this.state.value }
				style={ style }
				onBlur={ this.handleBlur }
				onChange={ e => this.handleChange(e.target.value, e) }
				onKeyDown={ this.handleKeyDown }
				placeholder={ placeholder }
			/>
		)
	}
}

export default NumberInput