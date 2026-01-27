
import { useEffect, useState } from "react";

const CATEGORIES = ["All", "Lifestyle", "Study", "IT", "Textile"];

export default function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [showCreate, setShowCreate] = useState(false);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("Lifestyle");
  const [preview, setPreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);




  /* LOAD BLOGS FROM MONGODB */
  useEffect(() => {
    fetch("http://localhost:5000/api/blogs")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch blogs");
        return res.json();
      })
      .then((data) => setBlogs(data))
      .catch((err) => console.log("Fetch error:", err));
  }, []);

  /* FILTER BY CATEGORY */
  const filtered =
    activeCategory === "All"
      ? blogs
      : blogs.filter((b) => b.category === activeCategory);

  const openArticle = (article) => {
    const w = window.open("", "_blank");
    w.document.write(`
      <html>
        <head>
          <title>${article.title}</title>
          <style>
            body { font-family: Georgia, serif; max-width:800px; margin:auto; padding:40px; }
            img { width:100%; margin:20px 0; }
            .meta { color:#777; font-size:14px; }
          </style>
        </head>
        <body>
          <h1>${article.title}</h1>
          <div class="meta">${article.category} • ${article.date}</div>
          <img src="http://localhost:5000${article.image}" />
          <p>${article.content}</p>
        </body>
      </html>
    `);
    w.document.close();
  };

  return (
    <div style={styles.page}>
      {/* NAVBAR */}
      <header style={styles.navbar}>
        <h2 style={{ margin: 0 }}>My Blogs</h2>

        <nav style={styles.navLinks}>
          {CATEGORIES.map((c) => (
            <span
              key={c}
              style={{
                ...styles.navItem,
                borderBottom: activeCategory === c ? "2px solid #000" : "none",
              }}
              onClick={() => {
                setActiveCategory(c);
                setShowCreate(false);
              }}
            >
              {c}
            </span>
          ))}
        </nav>

        <button style={styles.createBtn} onClick={() => setShowCreate(true)}>
          + Create
        </button>
      </header>

      {/* CREATE ARTICLE */}
      {showCreate && (
        <div style={styles.createBox}>
          <h3>Create Article</h3>

          <input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            {CATEGORIES.filter((c) => c !== "All").map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>

          <input
            type="file"
            onChange={(e) => {
              const file = e.target.files[0];
              setImageFile(file);                 // real file
              setPreview(URL.createObjectURL(file)); // preview only
            }}
          />
          


          {preview && <img src={preview} style={styles.preview} />}

          <textarea
            rows="5"
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <button
            onClick={async () => {
              const formData = new FormData();
              formData.append("title", title);
              formData.append("content", content);
              formData.append("category", category);
              formData.append("date", new Date().toISOString().slice(0, 10));
              formData.append("image", imageFile);


              try {
                const res = await fetch("http://localhost:5000/api/blogs/create", {
                  method: "POST",
                  body: formData,
                });

                if (!res.ok) throw new Error("Save failed");

                const savedBlog = await res.json();

                // UPDATE UI FROM BACKEND DATA
                setBlogs([savedBlog, ...blogs]);

                // RESET FORM
                setShowCreate(false);
                setTitle("");
                setContent("");
                setCategory("Lifestyle");
                setPreview(null);
                setImageFile(null);
              } catch (err) {
                console.log("Save error:", err);
                alert("Error saving blog");
              }
            }}
          >
            Publish
          </button>
        </div>
      )}

      {/* BLOG LIST */}
      {!showCreate && (
        <main style={styles.grid}>
          {filtered.map((b) => (
            <div
              key={b._id}
              style={styles.card}
              onClick={() => openArticle(b)}
            >
              <img
                src={`http://localhost:5000${b.image}`}
                style={styles.cardImg}
                alt={b.title}
              />
              <div style={styles.cardBody}>
                <span style={styles.meta}>
                  {b.category} • {b.date}
                </span>
                <h4>{b.title}</h4>
              </div>
            </div>
          ))}
        </main>
      )}

      {/* FOOTER */}
      <footer style={styles.footer}>
        <p>© 2026 My Blogs</p>
        <p>Sharing ideas, stories & inspiration</p>
      </footer>
    </div>
  );
}

const styles = {
  page: { background: "#fafafa", fontFamily: "Georgia, serif" },
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 40px",
    background: "#fff",
    borderBottom: "1px solid #eee",
  },
  navLinks: { display: "flex", gap: "20px" },
  navItem: { cursor: "pointer", fontSize: "14px" },
  createBtn: { border: "1px solid #000", background: "none", padding: "6px 12px" },
  grid: {
    padding: "40px",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: "30px",
  },
  card: {
    background: "#fff",
    cursor: "pointer",
    boxShadow: "0 5px 20px rgba(0,0,0,.05)",
  },
  cardImg: { width: "100%", height: "180px", objectFit: "cover" },
  cardBody: { padding: "15px" },
  meta: { fontSize: "12px", color: "#777" },
  footer: {
    textAlign: "center",
    padding: "30px",
    color: "#666",
    background: "#fff",
    borderTop: "1px solid #eee",
  },
  createBox: {
    maxWidth: "600px",
    margin: "40px auto",
    background: "#fff",
    padding: "25px",
  },
  preview: { width: "100%", marginTop: "10px" },
};
