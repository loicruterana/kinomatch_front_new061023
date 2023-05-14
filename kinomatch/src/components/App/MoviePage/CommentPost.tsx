import { SetStateAction, useState } from "react";
import axios from 'axios';

function CommentPost() {

    const [postMessage, setPostMessage] = useState('');

    const handleChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        setPostMessage(event.target.value);
        console.log(event.target.value);
    };

    const handleSubmit = (event: { prevent: { default: any; }; }) => {
        event.prevent.default;
        const userMessage = { postMessage };

        axios.post("http://NotreBack/api/users/messages", userMessage).then((response) => {
            console.log(response.status, response.data);
        })
    };

    return (
        <form className='movieDetails__description-comments' role="post" onSubmit={handleSubmit}>
            <div className='movieDetails__description-comments--content'>
                <textarea className='movieDetails__description-comments--textArea' onChange={handleChange} name="comments" id="comments" placeholder='Laissez votre commentaire ici'>
                </textarea>
            </div>
            <button className='movieDetails__description-comments--button' type="submit" value="Envoyer">Envoyer</button>
        </form>
    );

    // const handleChange = (event: { target: { value: SetStateAction<string>; }; }) => {
    //     setPost(event.target.value);
    //     console.log(event.target.value);
    // }

    // const handleSubmit = (event: { preventDefault: () => void; }) => {
    //     event.preventDefault();
    //     postResult(post);
    // }
    // console.log(post);



}

export default CommentPost;
