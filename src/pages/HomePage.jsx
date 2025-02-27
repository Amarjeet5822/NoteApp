import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { deleteUser } from "../store/features/authUser/authUserSlice";
import {
  deleteNote,
  getNotes,
  searchNotes,
} from "../store/features/noteUser/noteUserSlice";
import { CiSearch } from "react-icons/ci";
import { toast, ToastContainer } from "react-toastify";

function HomePage() {
  const [isDelete, setDelete] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const notify = (message) => toast(message);
  const { isLogged } = useSelector((state) => state.authUser);
  const { notes } = useSelector((state) => state.noteUser);
  // Search functionality =>
  const handlerSearch = (query) => {
    if (searchRef.current) {
      clearTimeout(searchRef.current); // Clear previous timeout
    }
    searchRef.current = setTimeout(() => {
      dispatch(searchNotes({ query })); // API call with search query
    }, 500); // Adjust the delay time as needed (500ms is common)
  };

  const deleteAccount = () => {
    setDelete(false);
    dispatch(deleteUser());
  };
  const AddNoteHandler = () => {
    navigate("/addnotes", { state: { isUpdate: false } });
  };
  const updateHandler = (note) => {
    navigate("/addnotes", { state: { isUpdate: true, initialData: note } });
  };
  const deleteHandler = async (noteId) => {
    try {
      await dispatch(deleteNote({ noteId })).unwrap(); // Wait for the deletion to finish
      notify("Note Deleted Successfully")
      getAllNotes(); // Only fetch notes after successful delete
    } catch (error) {
       notify(error?.message)
      console.error("Failed to delete note:", error);
    }
  };
  // console.log("notes: ", NOTES);
  const getAllNotes = () => {
    dispatch(getNotes());
  };
  useEffect(() => {
    // console.log("Updated notes from Redux:", notes); // Check if notes are updating
  }, [notes]);
  useEffect(() => {
    if (!isLogged) {
      navigate("/login");
    }
    getAllNotes();
  }, [isLogged]);
  useEffect(() => {
    if (searchQuery.trim() === "") {
      getAllNotes(); // Fetch all notes if search query is empty
    }
  }, [searchQuery, dispatch]); // Runs when searchQuery changes
  return (
    <div className="min-w-44 phone:min-w-60  phone:max-w-2xl tablet:max-w-4xl phone:px-4 tablet:px-4 max-w-60 m-auto text-sm phone:text-base tablet:text-xl ">
      <ToastContainer position="top-center" autoClose={1000} hideProgressBar={false}    closeOnClick pauseOnHover draggable />
      <div>
        {isDelete && (
          <div className="text-center flex flex-col items-center justify-center">
            <p className="text-red-600 font-medium">
              Are You Sure You want to Delete Account??
            </p>
            <div className="flex justify-center items-center gap-1">
              <button
                className="bg-blue-200 py-1 px-5 mt-1 rounded-md hover:bg-red-400 hover:font-medium "
                onClick={() => setDelete(false)}
              >
                No
              </button>
              <button
                onClick={deleteAccount}
                className="bg-blue-200 py-1 px-5 mt-1 rounded-md hover:bg-red-400 hover:font-medium "
              >
                Yes
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="w-full  m-auto flex  justify-between px-3 py-2">
        <button
          onClick={AddNoteHandler}
          className="bg-blue-200 py-1 px-3 mt-1 rounded-md hover:bg-blue-400 hover:font-medium "
        >
          Add Notes
        </button>
        <button
          className="bg-blue-200 py-1 px-3 mt-1 rounded-md hover:bg-red-400 hover:font-medium "
          onClick={() => setDelete(true)}
        >
          Delete Account
        </button>
      </div>
      <div className="flex justify-left items-center my-2  w-full  bg-gray-300 rounded-lg  text-gray-700">
        <span className="text-gray-900 pl-2 phone:text-xl">{<CiSearch />}</span>
        <input
          value={searchQuery}
          type="text"
          placeholder={`Search question here...`}
          className="outline-none bg-gray-300 w-full rounded-lg pl-2 py-2"
          onChange={(e) => {
            const query = e.target.value;
            setSearchQuery(query);
            handlerSearch(query);
          }}
        />
      </div>
      <div className="w-full m-auto rounded-md p-3  bg-gray-300">
        <p className="font-medium shadow-md text-sm text-center bg-white rounded-md py-2 mb-2 phone:text-xl tablet:text-2xl">
          {notes && notes.length !== 0
            ? "All the Notes"
            : "Notes Not Available"}
        </p>
        <div className="flex flex-col justify-between gap-2">
          {Array.isArray(notes) && notes.length !== 0
            ? notes.map((item) => {
                return (
                  <div
                    className="shadow-md rounded-md bg-white flex gap-2 justify-between py-2 px-2"
                    key={item._id}
                  >
                    <div className="phone:flex phone:flex-col phone:gap-2 ">
                      <div>
                        <p className="text-gray-800 font-bold border-b-4 border-gray-300">
                          {item.title}
                        </p>
                        <p className="text-gray-700">{item.content}</p>
                      </div>

                      <div className="flex gap-1 phone:gap-4 flex-wrap text-xs phone:text-base items-center tablet:text-lg tablet:gap-4 tablet:mt-1">
                        <div>
                          <button className="bg-gray-300 tablet:px-2 px-1 rounded-md">
                            <span className=" text-gray-700">Category : </span>
                            {item.category}
                          </button>
                        </div>
                        <div>
                          <button className="bg-gray-300 tablet:px-2 px-1 rounded-md">
                            <span className="text-gray-700 ">Priority : </span>
                            {item.priority}
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1 phone:gap-2 justify-center text-xs phone:text-base tablet:text-xl tablet:gap-2 ">
                      <button
                        onClick={() => updateHandler(item)}
                        className="bg-blue-300 py-2 px-3 rounded-md hover:bg-blue-600 hover:text-white tablet:px-4 tablet:font-medium"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => deleteHandler(item._id)}
                        className="bg-red-300 py-2 px-3 rounded-md hover:bg-red-600 hover:text-white tablet:px-4 tablet:font-medium"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                );
              })
            : ""}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
