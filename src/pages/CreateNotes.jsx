import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { addNote, resetSuccess, updateNotes } from "../store/features/noteUser/noteUserSlice";
import { FaBackward } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";

function CreateNotes() {
  const location = useLocation();
  const { isUpdate, initialData = {} } = location.state || {};
  const [title, setTitle] = useState(initialData?.title || "");
  const [content, setContent] = useState(initialData?.content || "");
  const [category, setCategory] = useState(initialData?.category || "");
  const [priority, setPriority] = useState(initialData?.priority || "");
  const { isLogged } = useSelector((state) => state.authUser);
  const {success, error } = useSelector((state) => state.noteUser);
  const [filled, setFilled] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const notify = (message) => toast(message);
  const goBackHandler = () => {
    navigate("/")
  }
  const addHandler = async () => {
    const payload = isUpdate
      ? { title, content, category, priority, noteId: initialData._id }
      : { title, content, category, priority };
    // console.log("payload to add note", payload)
    if (isUpdate) {
      dispatch(updateNotes(payload));
      setTitle("");
      setContent("");
      setCategory("");
      setPriority("");
    } else {
      dispatch(addNote(payload));
      setTitle("");
      setContent("");
      setCategory("");
      setPriority("");
    }
  };
  useState(() => {
    dispatch(resetSuccess());
  },[]) 
  useEffect(( )=> {
    const msg = isUpdate ? "Note Updated Successfull" : "Note Created Successfull" 
    if(success ) {
      notify(msg);
    }
    if(error) {
      notify(error.message);
    }
  },[success, error])
  useEffect(() => {
    if (!isLogged) {
      navigate("/login");
    }
    if (title && content && category && priority) {
      setFilled(false);
    } else {
      setFilled(true);
    }
    return () => {
      dispatch(resetSuccess())
    }
  }, [isLogged, isUpdate, title, content, category, priority]);
  return (
    <div className="min-w-44 phone:min-w-80 max-w-60 phone:max-w-2xl mx-auto text-sm phone:text-base tablet:text-lg tablet:min-w-full tablet:max-w-4xl h-lvw py-5 phone:px-2 tablet:px-4">
      <ToastContainer position="top-center" autoClose={1000} hideProgressBar={false}    closeOnClick pauseOnHover draggable />
      <div className="w-full mx-auto flex justify-center items-center gap-4 phone:justify-evenly tablet:justify-evenly phone:text-xl tablet:text-xl">
          <button onClick={goBackHandler} className="text-center rounded-md font-medium hover:bg-gray-400 px-6 py-2 bg-gray-200">{<FaBackward />}</button>
          <p className="text-center phone:w-36 tablet:w-36 px-4 py-1 w-28 rounded-md font-medium bg-blue-400">
            {isUpdate ? "Update Note" : "Add Note"}
          </p>
      </div>
      <div className="max-w-60 phone:max-w-80 tablet:max-w-80 flex justify-center flex-col m-auto mt-5 px-2 py-4 shadow-xl bg-gray-300 rounded-md">
        <input
          className="outline-none rounded-md pl-2"
          type="text"
          placeholder="Enter title "
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />{" "}
        <br />
        <textarea
          className="outline-none rounded-md pl-2"
          name="content"
          id=""
          onChange={(e) => setContent(e.target.value)}
          value={content}
          placeholder="Enter content "
        ></textarea>
        <br />
        <label className="text-gray-500" htmlFor="category">
          Category :
          <select
            className="outline-none text-black rounded-md pl-2 w-full"
            value={category}
            id="category"
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select Category</option>
            <option value="others">Others</option>
            <option value="work">Work</option>
            <option value="personal">Personal</option>
            <option value="ideas">Ideas</option>
            <option value="shopping list">Shopping List</option>
          </select>
        </label>
        <br />
        <label className="text-gray-500 " htmlFor="priority">
          Priority :
          <select
            className="outline-none text-black rounded-md pl-2 w-full"
            value={priority}
            id="priority"
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value=""> Select Priority</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </label>
        <br />
        <button
          className={
            !filled
              ? "bg-blue-400 hover:bg-blue-600 hover:text-white py-1 px-3 rounded-md font-medium tracking-wide "
              : "px-3 rounded-md py-1"
          }
          onClick={addHandler}
          disabled={filled}
        >
          {isUpdate ? "Update" : "Add"}
        </button>
      </div>
    </div>
  );
}

export default CreateNotes;
