import React, { useContext } from 'react';
import { Modal } from 'react-bootstrap';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { useProgress } from '../context/ProgressContext';
import 'react-circular-progressbar/dist/styles.css';

export default function ProgressModal() {
  const { progress, isLoading, closeModal } = useProgress();

  return (
    <Modal show={isLoading} centered onHide={closeModal}>
      <Modal.Body className="d-flex justify-content-center align-items-center">
        <div style={{ width: 100, height: 100 }}>
          <CircularProgressbar
          	className="custom-circular-progressbar"
            value={progress}
            text={`${Math.round(progress)}%`}
            styles={buildStyles({
              textColor: "#e02636b5",
	          pathColor: "#e02636b5",
	          trailColor: "#eee"
            })}
          />
        </div>
      </Modal.Body>
    </Modal>
  );
}
