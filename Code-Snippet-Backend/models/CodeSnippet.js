import mongoose from "mongoose";

const codeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  code: { type: String, required: true },
});

const CodeSnippet = mongoose.model("CodeSnippet", codeSchema);

export default CodeSnippet;
