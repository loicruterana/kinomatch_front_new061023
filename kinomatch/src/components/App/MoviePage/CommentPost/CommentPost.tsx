//! fonction à revoir ! le message passe dans l'URL
//! ===============================================

import { SetStateAction, useState } from "react";
import axios from 'axios';

import './CommentPost.scss';

function CommentPost() {

    const [postMessage, setPostMessage] = useState('');

    const handleChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        setPostMessage(event.target.value);
        // console.log(event.target.value);
    };

    const handleSubmit = (event: { prevent: { default: any; }; }) => {
        event.prevent.default();
        const userMessage = { postMessage };
        // console.log(postMessage);

        axios.post("http:/NotreBack/api/users/messages", userMessage).then((response) => {
            // console.log(response.status, response.data);
            // console.log(userMessage);
        })
    };

    return (
        <div className='movieDetails__comments' id='movieDetails__comments'>
            <h4 className='movieDetails__comments-pseudo'>65 | webcritic87</h4>
            <p className='movieDetails__comments-comment'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque vel exercitationem quasi unde reprehenderit maxime, dolores aut est sapiente provident molestiae, nesciunt architecto quod veritatis repellat inventore officiis optio! Corrupti?</p>
            <h4 className='movieDetails__comments-pseudo'>62 | toto_du_75</h4>
            <p className='movieDetails__comments-comment'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque vel exercitationem quasi unde reprehenderit maxime, dolores aut est sapiente provident molestiae, nesciunt architecto quod veritatis repellat inventore officiis optio! Corrupti?</p>
            <h4 className='movieDetails__comments-pseudo'>58 | tata_du_30</h4>
            <p className='movieDetails__comments-comment'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque vel exercitationem quasi unde reprehenderit maxime, dolores aut est sapiente provident molestiae, nesciunt architecto quod veritatis repellat inventore officiis optio! Corrupti?</p>
            <div className='movieDetails__description-comments'>
                <form className='movieDetails__description-comments-form' onSubmit={handleSubmit}>
                    <div className='movieDetails__description-comments-form--content' id='movieDetails__description-comments-form--content'>
                        <textarea className='movieDetails__description-comments-form--textArea' onChange={handleChange} name="comments" id="comments" placeholder='Laissez votre commentaire ici'>
                        </textarea>
                    </div>
                    <button className='movieDetails__description-comments-form--button' type="submit">Envoyer</button>
                </form>
            </div>
        </div>
    );
}

export default CommentPost;
