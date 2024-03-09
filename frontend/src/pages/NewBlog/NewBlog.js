import React, { useEffect, useState } from 'react'
import "./NewBlog.css"
import { useAuth } from '../../context/AuthContext'
import { useNavigate, useParams } from "react-router-dom"
import ReactQuill from "react-quill"
import 'react-quill/dist/quill.snow.css';

export default function NewBlog() {

  const { id } = useParams()

  const { currentUser } = useAuth()
  const navigate = useNavigate()

  function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
  }

  const [newItem, setNewItem] = useState({
    "author": currentUser.email,
    "title": "",
    "content": ""
  })


  let url = 'http://localhost:8000/blog/create/'

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:8000/blog/detail/${id}/`)
        .then(response => response.json())
        .then(data => setNewItem( prevItem =>
          ({...prevItem, title: data.title, content: data.content})
        ))
    }
  }, [id])


  function handleSubmit(e) {
    e.preventDefault()

    var csrftoken = getCookie('csrftoken')

    if (id) {
      url = `http://localhost:8000/blog/update/${id}/`
    }

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'X-CSRFToken': csrftoken
      },
      body: JSON.stringify(newItem)
    })
      .then(navigate("/"))
  }

  const handleChange = (content) => {
    setNewItem(prevItem => ({
      ...prevItem,
      content: content
    }));
  }

  return (
    <main>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
            <h2>NEW BLOG</h2>
            <label htmlFor='title'>Title:</label>
            <input 
              id='title'
              type="text" 
              value={newItem.title}
              onChange={e => setNewItem({...newItem, title: e.target.value})}
              placeholder='Title'
            />

            <label htmlFor='content'>Content:</label>

            <div className="text-editor">
              <ReactQuill
                  theme="snow"
                  value={newItem.content}
                  onChange={handleChange}
              />
            </div>

            <button type='submit'>Submit</button>
        </form>
      </div>
    </main>
  )
}
