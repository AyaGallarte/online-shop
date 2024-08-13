import { useState, useEffect, useContext } from 'react';
//import AdminView from '../components/AdminView';
import UserView from '../pages/UserView';
import UserContext from '../context/UserContext';


export default function ViewAllPosts() {
    const [posts, setPosts] = useState([]);
    const {user} = useContext(UserContext);

    const fetchData = async () => {
        let fetchUrl = "https://blog-server-nhh1.onrender.com/posts/getPosts";

        try {
            const response = await fetch(fetchUrl, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            // Check if the response has a message indicating no posts found
            if (data.message === "No posts found") {
                setPosts([]);
            } else if (data.posts) {
                setPosts(data.posts);
            } else {
                // Handle unexpected response structure
                console.error("Unexpected response structure:", data);
                setPosts([]);
            }
        } catch (error) {
            // Handle fetch or network errors
            console.error("Error fetching data:", error);
            setPosts([]);
        }
    };


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