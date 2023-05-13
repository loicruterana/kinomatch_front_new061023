import { SetStateAction, useState } from "react";

function CommentPost(postResult) {

    const [ post, setPost ] = useState('');

    const handleChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        setPost(event.target.value);
        console.log(event.target.value);
    }

    const handleSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        postResult(post);
    }
    console.log(post);

    return (
        <form className='movieDetails__description-comments' role="post" onSubmit={handleSubmit}>
            <div className='movieDetails__description-comments--content'>
                <textarea className='movieDetails__description-comments--textArea' onChange={handleChange} name="comments" id="comments" placeholder='Laissez votre commentaire ici'>
                </textarea>
            </div>
            <input className='movieDetails__description-comments--input' type="submit" value="Envoyer" />
        </form>
    )
    
}

export default CommentPost;
