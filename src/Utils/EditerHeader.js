import React from "react";
import Quill from "quill";

// Register fonts only once
const Font = Quill.import("formats/font");

Font.whitelist = [
  "sans-serif",
  "serif",
  "monospace",
  "poppins",
  "montserrat",
];

Quill.register(Font, true);

const EditorToolbar = (
  <span className="ql-formats">
    <select className="ql-font" defaultValue="">
      <option value="sans-serif">Sans Serif</option>
      <option value="serif">Serif</option>
      <option value="monospace">Monospace</option>
      <option value="poppins">Poppins</option>
      <option value="montserrat">Montserrat</option>
    </select>

    <select className="ql-size" defaultValue="">
      <option value="small"></option>
      <option value=""></option>
      <option value="large"></option>
      <option value="huge"></option>
    </select>

    <button className="ql-bold" />
    <button className="ql-italic" />
    <button className="ql-underline" />
    <button className="ql-list" value="ordered" />
    <button className="ql-list" value="bullet" />
  </span>
);

export default EditorToolbar;