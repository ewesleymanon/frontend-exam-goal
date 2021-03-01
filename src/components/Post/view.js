import { useState, useEffect } from 'react';
import { Link, useParams, useRouteMatch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import fire from '../../base';

import Breadcrumb from '../Breadcrumb';
import Button from '../Button';

const Single = () => {
  const match = useRouteMatch('news/single/')
  const auth = useSelector(state => state.auth);

  const { id } = useParams();
  const [date, setDate] = useState(handleGetDate());
  const [singleNews, setSingleNews] = useState([]);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [commentError, setCommentError] = useState('');
  const [loading, setLoading] = useState(false);

  function handleGetDate() {
    let today = new Date();
    let dd = today.getDate();

    let mm = today.getMonth()+1; 
    let yyyy = today.getFullYear();

    if(dd<10) 
      dd='0'+dd;

    if(mm<10) 
      mm='0'+mm;

    return today = yyyy + '.' + mm + '.' + dd;
  }
  
  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    if(comment) {
      fire.firestore()
        .collection('posts')
        .doc(id)
        .collection('comments')
        .doc()
        .set({
          comment: comment,
          date: date
        })
        .then(doc => {
          console.log(doc);
          setLoading(false);
        })
        .catch(error => {
          console.log(error);
          setLoading(false);
        })
    }
  }

  useEffect(() => {
    function fetchSingleNews() {
      fire.firestore()
        .collection('posts')
        .doc(id)
        .get()
        .then(doc => {
          const data = doc.data();
          console.log(data);
          setSingleNews(data);
        })
    }

    function fetchSingleNewsComments() {
      fire.firestore()
        .collection('posts')
        .doc(id)
        .get()
        .then(doc => {
          const data = doc.data();
          console.log(data);
          setSingleNews(data);
        })

      fire.firestore()
      .collection(`posts/${id}/comments`)
      .get()
      .then(snapshot => {
        const data = snapshot.docs.map(doc => ({...doc.data(), id: doc.id}));
        setComments(data);
        console.log(data); // array of cities objects
      })
    }
    fetchSingleNews();
    fetchSingleNewsComments();
  }, [])

  return (
    <>
    {
      singleNews &&
        <Breadcrumb title={singleNews.title}/>
    }
    {
      singleNews &&
      <div className="single-news l-container">
        {
          auth.isLogged && auth.role == 'admin' &&
            <Link to={'/news/single/edit/'+ id} className="edit-post-button">Edit Post</Link>
        }
        <p className={"single-news-date " + (auth.isLogged && auth.role == 'admin' ? 'edit-post-date' : '')}>{singleNews.date}</p>
        <h1 className="single-news-heading">{singleNews.title}</h1>
        <img className="single-news-image" src={singleNews.img} alt={singleNews.title}/>
        <p className="single-news-content">ここにはテキストが入ります。ここにはテキストが入りますここにはテキストが入りますここにはテキストが入りますここにはテキストが入ります。ここにはテキストが入ります。ここにはテキストが入りますここにはテキストが入りますここにはテキストが入りますここにはテキストが入ります。ここにはテキストが入ります。ここにはテキストが入りますここにはテキストが入りますここにはテキストが入りますここにはテキストが入ります。<br/>ここにはテキストが入ります。ここにはテキストが入りますここにはテキストが入りますここにはテキストが入りますここにはテキストが入ります。ここにはテキストが入ります。ここにはテキストが入りますここにはテキストが入りますここにはテキストが入りますここにはテキストが入ります。ここにはテキストが入ります。ここにはテキストが入りますここにはテキストが入りますここにはテキストが入りますここにはテキストが入ります。</p>
        <div className="single-news-comment">
          <h2 className="single-news-comment-heading">COMMENT</h2>
          <ul className="single-news-comment-list">
            {
              comments &&
              comments.map((item, index) => (
                <li className="single-news-comment-item" key={index}>
                  <p className="single-news-comment-text">{item.comment}</p>
                  <p className="single-news-comment-date">{item.date}</p>
                </li>
              ))
            }
            
          </ul>
          <form onSubmit={(e) => handleSubmit(e)} className="single-news-form">
            <textarea  placeholder="Write comment" value={comment} rows="5" onChange={(e) => setComment(e.target.value)} className="form-single-post-field-textarea" required/>
            <small className="error">{commentError}</small>
            <Button type="submit" loading={loading} modifier="button-edit" title="Submit"/>
          </form>
        </div>

      </div>
    }
    </>
  )
}

export default Single;
