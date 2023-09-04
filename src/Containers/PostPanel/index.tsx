import React from 'react';
import './styles.css';
import { useSelector } from 'react-redux';
import { userLogo } from '../../Icons/DefaultUserLogo';

const PostPanel = () => {
  const userDetails = useSelector((state: any) => state.commonStore.userDetails);

  const userPost = {
    name: userDetails.name,
    username: userDetails.username,
    photo: userDetails.photo,
    postText: 'Hello this is my first tweet.',
    postImg: userDetails.photo,
  };
  const posts = [userPost, userPost, userPost, userPost, userPost];

  return (
    <div className="postsPanel">
      <h3 style={{ color: 'white' }}>HOME</h3>
      <line className="separator" />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <line className="separator" />
      {posts.map((post) => (
        <>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              paddingTop: '8px',
              paddingBottom: '8px',
            }}
          >
            <div style={{ display: 'flex' }}>
              <div className="imageDiv" style={{ height: '48px', width: '48px' }}>
                <img
                  className="profileImg"
                  src={post.photo ?? userLogo}
                  height="48px"
                  alt="Profile"
                />
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  height: 'fit-content',
                }}
              >
                <span
                  style={{
                    color: 'white',
                    margin: '0 8px',
                    fontSize: '20px',
                    fontWeight: '600',
                  }}
                >
                  {post.name}
                </span>
                <span
                  style={{
                    color: 'rgb(113, 118, 123)',
                    fontSize: '15px',
                    fontWeight: '300',
                  }}
                >
                  @{post.username}
                </span>
              </div>
            </div>
            <span
              style={{
                color: 'white',
                fontSize: '16px',
                fontWeight: '400',
                margin: '0 0 16px 50px',
              }}
            >
              {post.postText}
            </span>
            {post.postImg && (
              <img
                className="profileImg"
                src={post.postImg}
                height="250px"
                alt="Profile"
              />
            )}
          </div>
          <line className="separator" />
        </>
      ))}
    </div>
  );
};

export default PostPanel;
