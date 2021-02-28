const Button = ({title, onClick}) => {
  return (
    <a href="#" onClick={onClick} className="button">{title}</a>
  )
}

export default Button;