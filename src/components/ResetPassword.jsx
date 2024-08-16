import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import Swal from 'sweetalert2';
import '../style.css';

export default function ResetPassword() {
  const [newPassword, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      Swal.fire({
        title: "Password and Confirm Password Do Not Match",
        icon: "error",
        text: "Please try again.",
        customClass: {
          confirmButton: 'sweet-warning'
        }
      });
      return;
    }
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "Do you want to reset your password?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, reset it!',
      cancelButtonText: 'No, cancel',
      customClass: {
        confirmButton: 'sweet-confirm',
        cancelButton: 'sweet-cancel'
      }
    });

    if (result.isConfirmed) {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`https://ecommerce-api-9r0z.onrender.com/users/update-password`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ newPassword }),
        });

        if (response.ok) {
          Swal.fire({
            title: "Reset Password Successful",
            icon: "success",
            text: "Password reset successfully.",
            showConfirmButton: false,
            timer: 1500
          });

          setPassword('');
          setConfirmPassword('');

        } else {
          const errorData = await response.json();
          Swal.fire({
            title: "Reset Password Failed",
            icon: "error",
            text: "Failed to reset password. Please try again.",
            customClass: {
              confirmButton: 'sweet-warning'
            }
          });
        }
      } catch (error) {
        Swal.fire({
          title: "Internal Server Error",
          icon: "error",
          text: "Internal server error.",
          customClass: {
            confirmButton: 'sweet-warning'
          }
        });
        console.error(error);
      }
    } else if (result.isDismissed) {
      Swal.fire({
        title: 'Cancelled',
        text: 'Password reset was cancelled.',
        icon: 'info',
        customClass: {
          confirmButton: 'sweet-warning'
        }
      });
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center">
      <div className="w-100" style={{ maxWidth: '400px' }}>
        <h2 className="text-center mb-4">Reset Password</h2>
        <form onSubmit={handleResetPassword}>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              New Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={newPassword}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          {message && <div className="alert alert-danger">{message}</div>}
          <button type="submit" className="btn btn-primary w-100">
            Reset Password
          </button>
        </form>
      </div>
    </Container>
  );
}

