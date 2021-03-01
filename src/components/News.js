import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import fire from '../base';

const News = () => {
  const auth = useSelector(state => state.auth);
  const [news, setNews] = useState([]);

  const [postsToShow, setPostsToShow] = useState([]);
  const postsPerPage = 6;
  let arrayForHoldingPosts = [];
  const ref = useRef(postsPerPage);

  const loopWithSlice = (start, end) => {
    const slicedPosts = news.slice(start, end)
    arrayForHoldingPosts = arrayForHoldingPosts.concat(slicedPosts)
    setPostsToShow(arrayForHoldingPosts)
  }

  const handleShowMorePosts = (e) => {
    // e.preventDefault();
    loopWithSlice(ref.current, ref.current + postsPerPage)
    ref.current += postsPerPage
  }

  const handleBack = (e) => {
    // e.preventDefault();
    ref.current -= postsPerPage
    loopWithSlice(ref.current - postsPerPage, ref.current)
  }

  async function fetchNews() {
    fire.firestore()
      .collection('posts')
      .get()
      .then(querySnapshot => {
        const data = querySnapshot.docs.map(doc => ({...doc.data(), id: doc.id}));
        setNews(data);
      });
  }

  useEffect(() => {
    fetchNews();
  }, [])

  useEffect(() => {
    if(news)
      loopWithSlice(0, postsPerPage)
  }, [news])


  return (
    <section className="news">
      <div className="news-block">
        <h2 className="news-heading">News</h2>
        {
          auth.isLogged && auth.role == 'admin' 
            ? <Link className="news-create-link" to="/news/create">Create New Post</Link>
            : '' 
        }
      </div>
      <ul className="news-list">
        {
          postsToShow &&
            postsToShow.map((item, index) => (
              <li className="news-list-item" key={index}>
                <Link className="news-list-link" to={'/news/single/'+ item.id}>
                  <div className="news-list-image" style={{backgroundImage: `url(${item.img})`}}></div>
                  <p className="news-list-date">{ item.date }</p>
                  <h3 className="news-list-heading">{ item.title }</h3>
                </Link>
              </li>
            ))
        }
      </ul>
      {
        ref.current <= news.length
        ?<a onClick={(e) => handleShowMorePosts(e)} className="load-more-button">LOAD MORE</a>
        :<a onClick={(e) => handleBack(e)} className="load-more-button">Back</a>
      }
    </section>
  )
}

export default News;