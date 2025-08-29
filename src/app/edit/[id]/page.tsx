"use client";

import { useRouter, useParams } from "next/navigation";
import Modal from "@/components/Modal";
import MoodForm from "@/components/MoodForm";
import { useMoodStore } from "@/store/useMoodStore";
import { useEffect, useMemo, useState } from "react";

export default function EditPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const id = params?.id;

  const getById = useMoodStore((s) => s.getById);
  const mood = useMemo(() => (id ? getById(id) : undefined), [getById, id]);

  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(true), []);

  const handleClose = () => {
    setOpen(false);
    router.push("/");
  };

  if (!id) {
    return (
      <Modal open={true} onClose={() => router.push("/")} title="URL tidak valid">
        <p>Parameter <code>id</code> tidak ditemukan.</p>
        <div className="mt-4 text-right">
          <button onClick={() => router.push("/")} className="px-3 py-1.5 rounded border">
            Tutup
          </button>
        </div>
      </Modal>
    );
  }

  if (!mood) {
    return (
      <Modal open={true} onClose={() => router.push("/")} title="Tidak ditemukan">
        <p>Entri tidak ditemukan.</p>
        <div className="mt-4 text-right">
          <button onClick={() => router.push("/")} className="px-3 py-1.5 rounded border">
            Tutup
          </button>
        </div>
      </Modal>
    );
  }

  return (
    <Modal open={open} onClose={handleClose} title="Edit Entri">
      <MoodForm initial={mood} />
    </Modal>
  );
}
