import { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import UserContext from '../context/UserContext';

export default function Logout() {
    const { setUser, unsetUser } = useContext(UserContext);
    const navigate = useNavigate();
    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        // Set the alert to show
        setShowAlert(true);
    }, []);

    useEffect(() => {
        if (showAlert) {
            Swal.fire({
                title: 'Are you sure?',
                text: "You are about to log out!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, log out',
                cancelButtonText: 'No, cancel',
                customClass: {
                    confirmButton: 'sweet-confirm',
                    cancelButton: 'sweet-cancel'
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    unsetUser();
                    setUser({
                        id: null,
                        isAdmin: null,
                    });
                    localStorage.clear();
                    navigate('/login');
                } else if (result.isDismissed) {
                    navigate('/');
                }
                setShowAlert(false); 
            });
        }
    }, [showAlert, unsetUser, setUser, navigate]);

    return null;
}
