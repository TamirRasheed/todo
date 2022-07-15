import PropTypes from 'prop-types'

function Button({ color, text, onClick}) {

  return (
    <div>
    <button onClick={onClick} className='btn' style={{color}}>
    {text}
</button></div>
  )
}


Button.defaultProps = {
    color: 'steelblue'
}

Button.propTypes = {
    text: PropTypes.string,
    color: PropTypes.string,
    onclick: PropTypes.func,
}
export default Button