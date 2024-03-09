import React, { useEffect, useState } from 'react'
import "./Home.css"
import { useAuth } from '../../context/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import { FaEdit, FaTrashAlt, FaPlus } from "react-icons/fa"

export default function Home() {

  const { currentUser } = useAuth()
  const [tasks, setTasks] = useState([])

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

  useEffect(() => {
    if (currentUser) {
      fetch(`http://localhost:8000/blog/list/${currentUser.email}/`)
        .then(response => response.json())
        .then(data => setTasks(data))
    }

  }, [currentUser, tasks])

  function deletePost(postId) {
    
    var csrftoken = getCookie('csrftoken')

    if (window.confirm("Are you sure?")) {
      if (currentUser) {
        fetch(`http://localhost:8000/blog/delete/${postId}/`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            'X-CSRFToken': csrftoken
          }
        })
        .then(navigate("/"))
      }
    }
  }

  function editPost(id) {
    navigate(`/new/${id}`)
  }

  return (
    <main>
      { currentUser &&
      <div className="container">
        <div className="profile">
          <img src="https://images.pexels.com/photos/1122414/pexels-photo-1122414.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Profile pic" />
          <div>
            <p>{ currentUser.email }</p>
            <p>{tasks.length} { tasks.length === 1 ? "entry" : "entries"}</p>
          </div>

          <button><Link to="/new"><FaPlus />Journal</Link></button>
        </div>

        <hr />

        <table>
          <tr>
            <th>Entry</th>
            <th></th>
            <th></th>
          </tr>
          { tasks.map(task => (
            <tr>
              <td className='entry'>
                <Link to={`/blog/${task.id}/`} className='title'>{task.title}</Link>
              </td>
              <td><FaEdit onClick={() => editPost(task.id)} className='edit'/></td>
              <td><FaTrashAlt onClick={() => deletePost(task.id)} className='delete'/></td>
            </tr>
          ))}
        </table>

        {!tasks && <p>No posts available</p>}
      </div>
      }

      {!currentUser && 
        <div className='info-container'>
          <h1 className='heading'>Please Login First</h1>
          <p className='text'>You need to login to access this page.</p>
        </div>
      }
    </main>
  )
}