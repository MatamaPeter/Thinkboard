import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import RateLimitedUI from "../components/RateLimitedUI";
import toast from "react-hot-toast";
import NoteCard from "../components/NoteCard";
import api from "../lib/axios";
import NotesNotFound from "../components/NotesNotFound ";

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get("/notes");
          setNotes(res.data);
          setIsRateLimited(false);
      } catch (error) {
          console.log(error)
        if (error.response?.status === 429) {
            setIsRateLimited(true);
            toast.error("Too many requests try again later");

        } else {
          toast.error("Failed to load notes");
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen">
          <Navbar />
          <div className='max-w-7xl mx-auto p-4 mt-6'>
      {isLoading ? (
        <div className="text-center text-primary py-10">Loading notes...</div>
      ) : isRateLimited ? (
        <RateLimitedUI />
              ) : (
                      <div className="grid grid-cols-1 md-grid-cols-2 lg:grid-cols-3 gap-6">
                          {notes.length > 0 ? (
                              notes.map((note) => (
                                  <NoteCard key={note._id} note={ note} setNotes={setNotes} />
                              
                              ))
                          ):(<NotesNotFound />)}
                      </div>
        
              )}
              </div>
    </div>
  );
};

export default HomePage;
