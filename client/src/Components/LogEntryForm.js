import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { createLogEntry } from "../api";
import classes from "./Form.module.css"
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
      setLoading(true);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={ classes.entryForm }>
      {error ? <h3>{error}</h3> : null}
      <label htmlFor="access_key">ACCESS KEY</label>
      <input type="password" name="accessKey" required ref={register}/>
      <label htmlFor="title">Where did you go?</label>
      <input name="title" type="text" required ref={register} />
      <label htmlFor="description">Describe your experience</label>
      <textarea rows={3} name="description" ref={register}></textarea>
      <label htmlFor="image">Image url</label>
      <input name="image" type="text" ref={register} />
      <label htmlFor="visitDate">Visit Date</label>
      <input name="visitDate" type="date" required ref={register} />
      <button className={ classes.btn } disabled={loading}>
        {loading ? "Loading..." :`+`}
      </button>
    </form>
  );
};
