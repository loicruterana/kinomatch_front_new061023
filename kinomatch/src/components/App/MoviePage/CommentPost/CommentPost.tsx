//! fonction à revoir ! le message passe dans l'URL
//! ===============================================

import { SetStateAction, useState } from "react";
import axios from 'axios';

import './CommentPost.scss';

function CommentPost() {

    const [postMessage, setPostMessage] = useState('');

    const handleChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        setPostMessage(event.target.value);
        console.log(event.target.value);
    };

    const handleSubmit = (event: { prevent: { default: any; }; }) => {
        event.prevent.default();
        const userMessage = { postMessage };
        console.log(postMessage);

        axios.post("http:/NotreBack/api/users/messages", userMessage).then((response) => {
            console.log(response.status, response.data);
            console.log(userMessage);
        })
    };

    return (
        <form className='movieDetails__description-comments' onSubmit={handleSubmit}>
            <div className='movieDetails__description-comments--content'>
                <textarea className='movieDetails__description-comments--textArea' onChange={handleChange} name="comments" id="comments" placeholder='Laissez votre commentaire ici'>
                </textarea>
            </div>
            <button className='movieDetails__description-comments--button' type="submit">Envoyer</button>
        </form>
    );
}

export default CommentPost;
