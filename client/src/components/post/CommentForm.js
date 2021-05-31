import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addComment } from '../../actions/post';

const CommentForm = ({ postId }) => {
  const dispatch = useDispatch();

  const [text, setText] = useState('');

  return (
    <div className="post-form">
      <form
        className="form my-1"
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(addComment(postId, { text }));
          setText('');
        }}
      >
        <textarea
          name="text"
          cols="30"
          rows="1"
          placeholder="Tweet your reply"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
        <input type="submit" className="btn btn-primary my-1" value="Reply" disabled={!text} />
      </form>
    </div>
  );
};

export default CommentForm;
