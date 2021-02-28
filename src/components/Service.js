const Service = () => {
  const logo= require('../assets/images/logo-white.png').default;
  const arrowUp = require('../assets/images/arrow-up.svg').default;
  
  return (
    <section className="service">
      <div className="l-container">
        <img 
          className="service-logo"
          src={logo}
          alt="Logo"
          />
          <p className="service-detail">サンプルテキストサンプル ルテキストサンプルテキストサ<br/>ンプルテキストサンプル ルテキスト</p>
          
          <a href="#top" className="top-button">
            <img 
            className="top-button-arrow"
            src={arrowUp}
            alt="Arrow Up"
            />
            <p className="top-button-text">TOP</p>
          </a>
          
      </div>
    </section>
  )
}

export default Service;