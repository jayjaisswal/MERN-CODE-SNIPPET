import { useState } from "react";

function CodeBlock({ title, code, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [newCode, setNewCode] = useState(code);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500); // Reset back to "Copy" after 1.5 sec
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleSave = () => {
    onEdit(newTitle, newCode);
    setIsEditing(false);
  };

  return (
    <div className="bg-gray-800 p-4 rounded-md mb-4">
      {isEditing ? (
        <>
          <input
            type="text"
            className="w-full p-2 text-white border border-gray-400 rounded mb-2"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <textarea
            className="w-full p-2 text-white border border-gray-400 rounded"
            value={newCode}
            onChange={(e) => setNewCode(e.target.value)}
          />
          <button className="bg-blue-500 cursor-pointer text-white px-4 py-2 mt-2 rounded" onClick={handleSave}>
            Save
          </button>
        </>
      ) : (
        <>
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          <pre className="bg-gray-900 p-2 rounded overflow-auto">{code}</pre>
          <div className="mt-2 flex gap-2 items-center">
            <button
              className={`px-3 py-1 rounded ${copied ? "bg-green-600" : "bg-green-500"} cursor-pointer text-white`}
              onClick={handleCopy}
            >
              {copied ? "Copied!" : "Copy"}
            </button>
            <button className="bg-yellow-500 cursor-pointer text-white px-3 py-1 rounded" onClick={() => setIsEditing(true)}>
              Edit
            </button>
            <button className="bg-red-500 cursor-pointer text-white px-3 py-1 rounded" onClick={onDelete}>
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default CodeBlock;
