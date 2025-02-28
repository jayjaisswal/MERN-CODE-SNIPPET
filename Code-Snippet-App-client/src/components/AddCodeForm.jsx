import { useState } from "react";

function AddCodeForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [code, setCode] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !code.trim()) return;
    onAdd({ title, code });
    setTitle("");
    setCode("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 text-white bg-gray-800 p-4 rounded-lg">
      <input
        type="text"
        placeholder="Enter title"
        className="w-full p-2 mb-2 text-white border border-gray-400 rounded"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Enter code"
        className="w-full h-[200px] p-2 text-white border border-gray-400 rounded"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <button type="submit" className= "bg-green-500 cursor-pointer text-white px-4 py-2 mt-2 rounded">
        Add Code
      </button>
    </form>
  );
}

export default AddCodeForm;
