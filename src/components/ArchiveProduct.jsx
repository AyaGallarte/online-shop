import React from 'react';
import { Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import '../style.css';

export default function ArchiveProduct({ product, isActive, fetchData }) {

    const archiveToggle = async (product) => {
        try {
            const response = await fetch(`https://ra-server-nom3.onrender.com/products/${product}/archive`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            if (data.message === "Product archived successfully") {
                Swal.fire({
                    title: 'Success',
                    icon: 'success',
                    text: 'Product successfully disabled',
                    customClass: {
                        confirmButton: 'sweet-warning'
                    }
                });
            } else {
                Swal.fire({
                    title: 'Something Went Wrong',
                    icon: 'error',
                    text: 'Please Try again',
                    customClass: {
                        confirmButton: 'sweet-warning'
                    }
                });
            }
            fetchData();
        } catch (error) {
            console.error("Error:", error);
            Swal.fire({
                title: 'Error',
                icon: 'error',
                text: 'Failed to archive product. Please try again later.',
                    customClass: {
                        confirmButton: 'sweet-warning'
                    }
            });
        }
    }

    const activateToggle = async (product) => {
        try {
            const response = await fetch(`https://ra-server-nom3.onrender.com/products/${product}/activate`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log(data);

            if (data.message === "Product activated successfully") {
                Swal.fire({
                    title: 'Success',
                    icon: 'success',
                    text: 'Product successfully enabled',
                    customClass: {
                        confirmButton: 'sweet-warning'
                    }
                });
            } else {
                Swal.fire({
                    title: 'Something Went Wrong',
                    icon: 'error',
                    text: 'Please Try again',
                    customClass: {
                        confirmButton: 'sweet-warning'
                    }
                });
            }
            fetchData();
        } catch (error) {
            console.error("Error:", error);
            Swal.fire({
                title: 'Error',
                icon: 'error',
                text: 'Failed to activate product. Please try again later.',
                    customClass: {
                        confirmButton: 'sweet-warning'
                    }
            });
        }
    }

    return (
        <>
            {isActive ?
                <Button className="btnArchive" variant="danger" size="sm" onClick={() => archiveToggle(product)}>Archive</Button>
                :
                <Button className="btnActivate" variant="success" size="sm" onClick={() => activateToggle(product)}>Activate</Button>
            }
        </>
    )
}
