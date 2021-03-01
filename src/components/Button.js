import Loading from './Loading';

const Button = ({title, onClick, type, loading, modifier}) => {
  return (
    <button type={type} onClick={onClick} className={"button " + modifier}>
      {
        loading
          ? <Loading/>
          : <span>{title}</span>
      }  
    </button>
  )
}

export default Button;