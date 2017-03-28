import React, {PropTypes} from 'react'

class NumberInput extends React.Component{
	static propTypes = {
		value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
		min: PropTypes.number,
		max: PropTypes.number,
		step: PropTypes.number,
		fixed: PropTypes.number
	}

	static defaultProps = {
		step: 1,
		fixed: 0
	}

	constructor(props) {
		super(props);
		let newValue = Number(Number(props.value).toFixed(props.fixed))
		this.state = {
			value: newValue,
			blurValue: null
		}
	}

	componentWillReceiveProps(nextProps) {
		const input = this.input 
		let newValue = Number(Number(nextProps.value).toFixed(nextProps.fixed))
		if(newValue !== this.state.value) {
			if (input === document.activeElement) {
        this.setState({ blurValue: newValue })
      } else {
        this.setState({ value: newValue })
      }
		}
	}

	handleBlur = e => {
		if (this.state.blurValue){
			this.setState({
				value: this.state.blurValue,
				blurValue: null
			})
		}
	}

	handleChange = (newValue, e, call) => {
    let {min, max} = this.props
    newValue = newValue > max ? max : newValue 
    newValue = newValue < min ? min : newValue
    if( !isNaN(Number(newValue)) || !newValue ) {
      this.props.onChange(newValue, e)
      this.setState({ value: newValue }, call)
    }
  }

  handleKeyDown = (e) => {
    let { step, fixed } = this.props
    let num = Number(e.target.value)
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
		let {value} = this.state
		return (
			<input 
				ref={ node => this.input = node }
				value={ value }
				style={ style }
				onBlur={ this.handleBlur }
				onChange={ this.handleChange }
				onKeyDown={ this.handleKeyDown }
				placeholder={ placeholder }
			/>
		)
	}
}

export default NumberInput