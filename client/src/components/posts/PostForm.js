import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addPost } from '../../actions/post';

const PostForm = () => {
  const dispatch = useDispatch();

  const [text, setText] = useState('');

  return (
    <div className="post-form">
      <form
        className="form my-1"
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(addPost({ text }));
          setText('');
        }}
      >
        <textarea
          name="text"
          cols="30"
          rows="1"
          placeholder="What's happening?"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
        <input type="submit" className="btn btn-primary my-1" value="Tweet" disabled={!text} />
      </form>
    </div>
  );
};

export default PostForm;
