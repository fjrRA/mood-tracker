"use client";

import { useRouter } from "next/navigation";
import Modal from "@/components/Modal";
import MoodForm from "@/components/MoodForm";
import { useState, useEffect } from "react";

export default function AddPage() {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(true), []);

  const handleClose = () => {
    setOpen(false);
    router.push("/");
  };

  return (
    <Modal open={open} onClose={handleClose} title="Tambah Entri Mood">
      <MoodForm />
    </Modal>
  );
}
