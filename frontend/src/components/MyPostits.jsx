import React from 'react';

const MyPostits = ({ postits }) => {
  return (
    <ul>
      {postits.map((postit) => (
        <li key={postit.id}>{postit.content}</li>
      ))}
    </ul>
  );
};

export default MyPostits;