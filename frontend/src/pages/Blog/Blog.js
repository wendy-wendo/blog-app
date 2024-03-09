import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import "./Blog.css"
import ReactHtmlParser from "html-react-parser"

export default function Blog() {

    const { id } = useParams()

    const { currentUser } = useAuth()

    const [post, setPost] = useState({
        "id": "",
        "title": "",
        "content": ""
    })

    useEffect(() => {
        fetch(`http://localhost:8000/blog/detail/${id}/`)
            .then(response => response.json())
            .then(data => setPost(data))
    }, [currentUser, id])

    return (
        <main>
            <div className="blog-info">
                <div>
                    <h2>{post.title}</h2>
                    <p>{ReactHtmlParser(post.content)}</p>
                </div>
                <button><Link to={`/new/${id}/`}>EDIT</Link></button>
            </div>
        </main>
    )
}
