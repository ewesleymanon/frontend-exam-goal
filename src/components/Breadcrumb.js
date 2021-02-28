const Breadcrumb = ({title}) => (
  <div className="breadcrumb">
    <div className="breadcrumb-inner">
      <p className="breadcrumb-text">Home <span className="breadcrumb-seperator">{'>'}</span>{title}</p>
    </div>
  </div>
)

export default Breadcrumb;