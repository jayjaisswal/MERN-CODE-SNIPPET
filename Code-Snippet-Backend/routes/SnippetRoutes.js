router.post("/", async (req, res) => {
    try {
      const { title, code } = req.body;
      const newSnippet = new Snippet({ title, code });
      await newSnippet.save();
      res.status(201).json(newSnippet); // Return the new snippet
    } catch (error) {
      res.status(500).json({ message: "Error adding snippet", error });
    }
  });
  