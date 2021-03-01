import { useState, useEffect } from 'react';
import { Link, useParams, useRouteMatch, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import fire from '../../base';

import Breadcrumb from '../Breadcrumb';
import Button from '../Button';

const Edit = () => {
  const match = useRouteMatch('news/single/edit')
  const auth = useSelector(state => state.auth);

  const { id } = useParams();
  const history = useHistory();

  const [singleNews, setSingleNews] = useState([]);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [commentError, setCommentError] = useState('');
  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState('');
  const [date, setDate] = useState(handleGetDate());
  const [imageUpload, setImageUpload] = useState(null);
  const [content, setContent] = useState('');

  const [load, setLoad] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  function handleOnChangeTitle(e) {
    setTitle(e.target.value)
    setError('');
    setSuccess('');
  }

  function handleOnChangeContent(e) {
    setContent(e.target.value)
    setError('');
    setSuccess('');
  }

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

  function handleLoadFile(event) {
    setLoad(false);
    setImageUpload(event.target.files[0]);  
    setError('');
    setSuccess('');
  }

  function handlePreviewFile() {
    if(imageUpload)
      return URL.createObjectURL(imageUpload);
  }
  

  async function handleSavePost(e) {
    e.preventDefault();
    let fileUrl = null;

    if(imageUpload == null) {
      fileUrl = singleNews.img;
    } else {
      const storageRef = fire.storage().ref();
      const fileRef = storageRef.child(imageUpload.name);
      await fileRef.put(imageUpload)
      fileUrl = await fileRef.getDownloadURL();
    }

    if(title && content) {
      fire.firestore()
        .collection('posts')
        .doc(id)
        .set({
          title: title,
          content: content,
          img: fileUrl,
          date: date,
        })
        .then(() => {
          setImageUpload(null)
          setSuccess('Successfully Updated!');
          setTimeout(() => {
            history.push(`/news/single/${id}`);
          },1000);
        })
        .catch(error => {
          console.log(error);
          setError(error);
        })
      
    } else {
      setError('All fields are required!');
    }
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
          setTitle(data.title);
          setContent(data.content);
          setDate(data.date);
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
    <Breadcrumb title={singleNews.title}/>
    {
      singleNews && 
      <div className="create-post">
        <div className="create-post-button-wrapper">
          <a href="#" onClick={(e) => handleSavePost(e)} className="create-post-button">Save Post</a>
          <Link className="create-post-button" to="/">Cancel</Link>
        </div>
        <div className="l-container">
          {
            error &&
            <p className="form-status is-error">{error}</p>
          }
          {
            success &&
            <p className="form-status is-success">{success}</p>
          }
          <form className="form-post">
            <p type="text" className="form-post-date">{date}</p>
            <textarea placeholder="Title" value={title} rows="3" onChange={(e) => handleOnChangeTitle(e)} className="form-post-field-title" required/>
            <div className="form-post-group">
              {
                load
                  ?<img className={"form-post-image is-visible"} src={singleNews.img}/>
                  :<img className={"form-post-image is-visible "} src={handlePreviewFile()}/>
              }
              <input type="file" accept="image/gif, image/jpeg, image/png" name="image" id="file" onChange={(e) => handleLoadFile(e)} className="form-post-upload"/>
            </div>
            <textarea  placeholder="Content" value={content} rows="5" onChange={(e) => handleOnChangeContent(e)} className="form-post-field-textarea" required/>

          </form>
          </div>
      </div>
    }
    
    {
      singleNews &&
      <div className="single-news l-container">
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

export default Edit;
