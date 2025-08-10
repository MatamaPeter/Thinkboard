import Note from "../model/Note.js";
export const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find().sort({createdAt: -1});
    res.status(200).json(notes);
  } catch (error) {
    console.error("Error in getting notes", error);
    res.status(500).send("Internal Server error");
  }
};

export const getNoteById = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note)
      return res.status(400).json({
        message: "Note not found",
      });
    res.status(200).json({
      note,
    });
  } catch (error) {
    console.error("Error in finding note", error);
    res.status(500).send("Internal Server error");
  }
};

export const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const note = new Note({ title, content });

    const savedNote = await note.save();
    res.status(201).json({
      message: "Note created successfully",
      savedNote,
    });
  } catch (error) {
    console.error("Error in creating note", error);
    res.status(500).send("Internal Server error");
  }
};

export const updateNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true }
    );
      
    if (!updatedNote)
      return res.status(400).json({
        message: "Note not found",
      });
      
    res.status(200).json({
      message: "Note updated successfully",
      updatedNote,
    });

    
  } catch (error) {
    console.error("Error in updating note", error);
    res.status(500).send("Internal Server error");
  }
};

export const deleteNote = async(req, res) => {
  try {
      const deletedNote = await Note.findByIdAndDelete(req.params.id);
      if (!deletedNote) 
          return res.status(400).json({
            message: "Note not found",
          });
      res.status(200).json({
        message: "Note deleted successfully",
        deletedNote,
      });

  } catch (error) {
    console.error("Error in updating note", error);
    res.status(500).send("Internal Server error");
  }
};

