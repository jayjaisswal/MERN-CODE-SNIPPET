import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import CodeBlock from "./components/CodeBlock";
import AddCodeForm from "./components/AddCodeForm";
import Spinner from "./components/Spinner";

const API_URL = "https://mern-code-snippet-backend.vercel.app/api/snippets";

function App() {
  const [codeSnippets, setCodeSnippets] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasFetched, setHasFetched] = useState(false);

  // Fetch snippets from backend
  useEffect(() => {
    const fetchSnippets = async () => {
      setLoading(true);
      try {
        const res = await axios.get(API_URL);
        setCodeSnippets(res.data);
      } catch (error) {
        console.error("Error fetching snippets:", error);
      }
      setLoading(false);
      setHasFetched(true);
    };

    fetchSnippets();
  }, []);

  // Filter snippets based on search term
  const filteredSnippets = codeSnippets.filter((snippet) =>
    snippet.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-gray-900 min-h-screen text-white p-6">
      <h1 className="text-3xl text-center font-bold mb-4">
        My Code Snippet App
      </h1>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search code snippets..."
        className="w-full text-center p-2 mb-2 text-white border border-gray-400 rounded"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Add Snippet Form */}
      <AddCodeForm
        onAdd={async (snippet) => {
          try {
            const res = await axios.post(API_URL, snippet, {
              headers: { "Content-Type": "application/json" },
            });
            setCodeSnippets((prev) => [...prev, res.data]);
          } catch (error) {
            console.error("Error saving snippet:", error);
          }
        }}
      />

      {/* Show loading spinner */}
      {loading && <Spinner />}

      {/* Show message when fetch is complete but no data is available */}
      {!loading && hasFetched && filteredSnippets.length === 0 && (
        <p className="text-center text-gray-400 mt-4">No snippets found.</p>
      )}

      {/* Render filtered snippets */}
      {filteredSnippets.map((snippet) => (
        <CodeBlock
          key={snippet._id}
          title={snippet.title}
          code={snippet.code}
          onDelete={async () => {
            try {
              await axios.delete(`${API_URL}/${snippet._id}`); // Delete from backend
              setCodeSnippets(codeSnippets.filter((s) => s._id !== snippet._id)); // Update UI
            } catch (error) {
              console.error("Error deleting snippet:", error);
            }
          }}
          
          onEdit={async (newTitle, newCode) => {
            try {
              const res = await axios.put(`${API_URL}/${snippet._id}`, { 
                title: newTitle, 
                code: newCode 
              });
          
              // Update UI with new data from backend
              setCodeSnippets(
                codeSnippets.map((s) => 
                  s._id === snippet._id ? res.data : s
                )
              );
            } catch (error) {
              console.error("Error updating snippet:", error);
            }
          }}
          
        />
      ))}
    </div>
  );
}

export default App;
