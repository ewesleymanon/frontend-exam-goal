import { Link } from 'react-router-dom';

const Breadcrumb = ({title}) => (
  <div className="breadcrumb">
    <div className="breadcrumb-inner">
      <p className="breadcrumb-text"><Link className="breadcrumb-text-link" to="/">HOME</Link><span className="breadcrumb-seperator">{'>'}</span>{title}</p>
    </div>
  </div>
)

export default Breadcrumb;