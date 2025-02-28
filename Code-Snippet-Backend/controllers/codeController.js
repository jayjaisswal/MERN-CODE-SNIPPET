import CodeSnippet from "../models/CodeSnippet.js";

// Get all code snippets
export const getSnippets = async (req, res) => {
  try {
    const snippets = await CodeSnippet.find();
    res.json(snippets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a new snippet
export const createSnippet = async (req, res) => {
  try {
    const { title, code } = req.body;
    const newSnippet = new CodeSnippet({ title, code });
    await newSnippet.save();
    res.status(201).json(newSnippet);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a snippet
export const updateSnippet = async (req, res) => {
  try {
    const { title, code } = req.body;
    const updatedSnippet = await CodeSnippet.findByIdAndUpdate(
      req.params.id,
      { title, code },
      { new: true }
    );
    res.json(updatedSnippet);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a snippet
export const deleteSnippet = async (req, res) => {
  try {
    await CodeSnippet.findByIdAndDelete(req.params.id);
    res.json({ message: "Snippet Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
