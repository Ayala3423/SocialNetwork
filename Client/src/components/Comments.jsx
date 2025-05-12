import React from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { CurrentUser } from "./App";
import Delete from "./Delete";
import Update from "./Update";
import Add from './Add';
import { apiService } from "../../services/genericServeices"
import '../style/Comments.css';

function Comments() {
    const [comments, setComments] = useState("");
    const { postId } = useParams();
    const { currentUser } = useContext(CurrentUser);
    const [error, setError] = useState(null);
    const [isChange, setIsChange] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchComments = async () => {
            setIsChange(prev => prev !== 0 ? 0 : prev);
            try {
                await apiService.getNested(
                    currentUser.id,
                    "Posts",
                    postId,
                    "Comments",
                    {postId: postId},
                    (comments) => {
                        setComments(comments);
                    },
                    (error) => {
                        console.log(error);
                        setError("Failed to fetch comments");
                    },
                );
            } catch (error) {
                console.log("Unexpected error:", error);
                setError("Failed to fetch comments 2");
            }
        };
        fetchComments();
    }, [postId, isChange]);

    return (
        <>
            <div className='control'>
                <button onClick={() => navigate(`/users/${currentUser.id}/posts`)}>back to posts</button>
                <Add type={"Comments"} setIsChange={setIsChange} inputs={["name", "body"]} setData={setComments} defaultValue={{ postId: postId, email: currentUser.email }} name="Add Comment" />
            </div>

            <div className='container'>
                <h1>Comments</h1>
                <h2>{error}</h2>
                {comments.length > 0 ? (
                    <ul className='comments-list'>
                        {comments.map((comment) => (
                            <li className='comments-item' key={comment.id}>
                                <div className="comment-details">
                                    <h4>{comment.name}</h4>
                                    {comment.body}
                                </div>
                                <div className="comment-actions">
                                    {comment.email == currentUser.email && <Update type={"Comments"} itemId={comment.id} setIsChange={setIsChange} inputs={["name", "body"]} />}
                                    {comment.email == currentUser.email && <Delete type={"Comments"} itemId={comment.id} setIsChange={setIsChange} />}
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No Comments found.</p>
                )}
            </div>
        </>
    )
}

export default Comments;