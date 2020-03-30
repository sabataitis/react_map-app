import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { createLogEntry } from "./api";
export const LogEntryForm = ({ location, onClose }) => {
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const onSubmit = async data => {
    try {
      data.latitude = location.latitude;
      data.longitude = location.longitude;
      await createLogEntry(data);
      onClose();
    } catch (error) {
      setError(error.message);
      setLoading(true)
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="entryForm">
      {error ? <h3>{error}</h3> : null}
      <label htmlFor="title">Title</label>
      <input name="title" type="text" required ref={register} />
      <label htmlFor="description">Descriptin</label>
      <textarea rows={3} name="description" ref={register}></textarea>
      <label htmlFor="comments">Comments</label>
      <textarea rows={3} name="comments" ref={register}></textarea>
      <label htmlFor="image">Image</label>
      <input name="image" type="text" ref={register} />
      <label htmlFor="visitDate">Visit Date</label>
      <input name="visitDate" type="date" required ref={register} />
      <button disabled={loading}>{loading ? "Loading..." : "Add Entry"}</button>
    </form>
  );
};
