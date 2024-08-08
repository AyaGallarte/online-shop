import { useState, useEffect, useContext } from 'react';
//import AdminView from '../components/AdminView';
import UserView from '../pages/UserView';
import UserContext from '../context/UserContext';


export default function ViewAllPosts() {

    const [posts, setPosts] = useState([]);
    const {user} = useContext(UserContext);
    console.log('this is the user' + user.id);
    const fetchData = () => {
            let fetchUrl = "https://blog-apiserver.onrender.com/posts/getPosts";

            fetch(fetchUrl, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then(res => res.json())
            .then(data => {             
                if(data.message === "No posts found"){
                    setPosts([])
                } else {
                    setPosts(data.posts);
                }
            });
        }

   useEffect(() => {

        fetchData();

    }, [user]);

    return(
       
        (user.isAdmin === true)
        ?
            <AdminView posts={posts} fetchData={fetchData}/>
        :
            <UserView posts={posts} fetchData={fetchData}/>
            
    )
}