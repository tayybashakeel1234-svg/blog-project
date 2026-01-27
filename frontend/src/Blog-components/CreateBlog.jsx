// import { useState } from "react";

// function CreateBlog({ user, onClose }) {
//   const [heading, setHeading] = useState("");
//   const [imageURL, setImageURL] = useState("");
//   const [content, setContent] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await fetch("http://localhost:5000/api/blogs", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ heading, imageURL, content, author: user.username }),
//       });
//       if (res.ok) {
//         onClose(); // close modal and refresh
//       } else {
//         alert("Error creating blog");
//       }
//     } catch (err) {
//       console.log(err);
//       alert("Server error");
//     }
//   };

//   return (
//     <div className="create-blog-modal">
//       <form onSubmit={handleSubmit}>
//         <h2>Create New Blog</h2>
//         <input
//           type="text"
//           placeholder="Heading"
//           value={heading}
//           onChange={(e) => setHeading(e.target.value)}
//           required
//         />
//         <input
//           type="text"
//           placeholder="Image URL"
//           value={imageURL}
//           onChange={(e) => setImageURL(e.target.value)}
//         />
//         <textarea
//           placeholder="Content"
//           value={content}
//           onChange={(e) => setContent(e.target.value)}
//           required
//         />
//         <button type="submit">Save</button>
//         <button type="button" onClick={onClose}>
//           Cancel
//         </button>
//       </form>
//     </div>
//   );
// }

// export default CreateBlog;


import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateBlog = () => {
  const [form, setForm] = useState({
    title: "",
    content: "",
    image: "",
    category: ""
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post("http://localhost:5000/api/blogs/create", form);

    navigate("/blogs");     // redirect after save
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Title"
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />

      <textarea
        placeholder="Content"
        onChange={(e) => setForm({ ...form, content: e.target.value })}
      />

      <input
        placeholder="Image URL"
        onChange={(e) => setForm({ ...form, image: e.target.value })}
      />

      <select onChange={(e) => setForm({ ...form, category: e.target.value })}>
        <option value="">Select category</option>
        <option value="IT">IT</option>
        <option value="Study">Study</option>
        <option value="Textile">Textile</option>
      </select>

      <button type="submit">Save Blog</button>
    </form>
  );
};

export default CreateBlog;

