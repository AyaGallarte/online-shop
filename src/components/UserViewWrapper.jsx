// import React, { useState, useEffect } from 'react';
// import UserView from '../pages/UserView';

// const UserViewWrapper = () => {
//     const [posts, setPosts] = useState([]);

//     useEffect(() => {
//         fetch('http://localhost:4000/posts/getPosts')
//             .then(res => res.json())
//             .then(data => setPosts(data));
//     }, []);

//     return <UserView posts={posts} setPosts={setPosts} />;
// };

// export default UserViewWrapper;
