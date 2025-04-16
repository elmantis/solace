"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Advocate, UpdateAdvocateValues } from "@/types/types";
import { Button, Card, Modal, ModalBody, ModalHeader } from "flowbite-react";
import AdvocateForm from "@/app/forms/AdvocateForm";
import api from "@/services/api";

export default function AdvocatePage() {
  const params = useParams();
  const [openModal, setOpenModal] = useState(false);
  const [advocate, setAdvocate] = useState<Advocate>();

  const fetchAdvocate = async () => {
    const advocate = await api.advocates.fetchAdvocate(`${params.id}`);
    setAdvocate(advocate);
  };
  const handleSubmit = async (data: UpdateAdvocateValues) => {
    const updatedAdvocate = await api.advocates.updateAdvocate(
      `${params.id}`,
      data
    );

    setAdvocate(updatedAdvocate);
  };

  useEffect(() => {
    fetchAdvocate();
  }, []);

  if (!advocate) return null;

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <Card
        className="w-full max-w-sm text-center"
        imgSrc="https://picsum.photos/200"
      >
        <div className="flex flex-col items-center pb-10">
          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
            {advocate.firstName} {advocate.lastName}
          </h5>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {advocate.specialties.map(
              (specialties) => specialties.specialty.name
            )}
          </span>
          <div className="mt-4 flex space-x-3 lg:mt-6">
            <Button
              color="alternative"
              size="md"
              onClick={() => setOpenModal(true)}
            >
              Edit
            </Button>
          </div>
        </div>
      </Card>
      <Modal show={openModal} onClose={() => setOpenModal(false)} size="xl">
        <ModalHeader>Update Advocate Name</ModalHeader>
        <ModalBody className="max-w-3xl">
          <AdvocateForm
            initialValues={{
              firstName: advocate.firstName,
              lastName: advocate.lastName,
            }}
            onSubmit={handleSubmit}
          />
        </ModalBody>
      </Modal>
    </div>
  );
}
