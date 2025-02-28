import React, { useState } from 'react';
import Modal from '../../components/Modal/Modal';
import postitNight from '../../assets/images/postitNight.svg'; // 이미지 import

export default function ModalTest() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalImageUrl, setmodalImageUrl] = useState(postitNight);
  const [modalContent, setmodalContent] = useState('1232132132132213213213');

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <button
        onClick={() => setModalOpen(true)}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600"
      >
        Open Image Modal
      </button>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        imageUrl={modalImageUrl}
        modalContent={modalContent}
      />
    </div>
  );
}
