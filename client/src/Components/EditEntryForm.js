import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { editLogEntry } from "../api";
import classes from "./Form.module.css";
export const EditLogEntryForm = ({ onClose, dataProp }) => {
  const { register, handleSubmit } = useForm();
  const [inputValues, setInputValues] = useState({
    title: dataProp.title,
    description: dataProp.description,
    image: dataProp.image,
    visitDate: dataProp.visitDate
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async data => {
    try {
      await editLogEntry(dataProp._id, data);
      onClose();
    } catch (error) {
      setError(error.message);
      setLoading(true);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.entryForm}>
      {error ? <h3>{error}</h3> : null}
      <label htmlFor="title">Where did you go?</label>
      <input
        value={inputValues.title}
        onChange={event =>
          setInputValues({
            ...inputValues,
            [event.target.name]: event.target.value
          })
        }
        name="title"
        type="text"
        required
        ref={register}
      />
      <label htmlFor="description">Describe your experience</label>
      <textarea
        onChange={event =>
          setInputValues({
            ...inputValues,
            [event.target.name]: event.target.value
          })
        }
        value={inputValues.description}
        rows={3}
        name="description"
        ref={register}
      ></textarea>
      <label htmlFor="image">Image url</label>
      <input
        onChange={event =>
          setInputValues({
            ...inputValues,
            [event.target.name]: event.target.value
          })
        }
        value={inputValues.image}
        name="image"
        type="text"
        ref={register}
      />
      <label htmlFor="visitDate">Visit Date</label>
      <input name="visitDate" type="date" required ref={register} />
      <button className={classes.btn} disabled={loading}>
        {loading ? "Loading..." : `+`}
      </button>
    </form>
  );
};
