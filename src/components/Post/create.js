import { Link } from 'react-router-dom';
import { useState } from 'react';
import fire from '../../base';

const CreatePost = () => {

  const [date, setDate] = useState(handleGetDate());
  const [title, setTitle] = useState('');
  const [imageUpload, setImageUpload] = useState(null);
  const [content, setContent] = useState('');
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

    const storageRef = fire.storage().ref();
    const fileRef = storageRef.child(imageUpload.name);
    await fileRef.put(imageUpload)
    const fileUrl = await fileRef.getDownloadURL();
    if(title && imageUpload && content) {
      fire.firestore()
        .collection('posts')
        .doc()
        .set({
          title: title,
          content: content,
          img: fileUrl,
          date: date,
        })
        .then(() => {
          setImageUpload(null)
          setSuccess('Successfully Added!');
        })
        .catch(error => {
          console.log(error);
          setError(error);
        })
      
    } else {
      setError('All fields are required!');
    }
  }

  return (
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
            <img className={"form-post-image " + (imageUpload && 'is-visible')} src={handlePreviewFile()}/>
            <input type="file" accept="image/gif, image/jpeg, image/png" name="image" id="file" onChange={(e) => handleLoadFile(e)} className="form-post-upload"/>
          </div>
          <textarea  placeholder="Content" value={content} rows="5" onChange={(e) => handleOnChangeContent(e)} className="form-post-field-textarea" required/>

        </form>
      </div>
      
    </div>
  )
}

export default CreatePost;