import { useState, useContext } from "react";
import { PGContext } from "../../context/PGContext";
import "./addPG.css";

const AddPG = () => {
  const { addPG } = useContext(PGContext);

  const [formData, setFormData] = useState({
    name: "",
    location: "",
    price: "",
    sharing: "",
    images: [], // images array
  });

  const [imageUrl, setImageUrl] = useState(""); // temp input for adding one image

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddImage = () => {
    if (imageUrl.trim() === "") return;

    setFormData({
      ...formData,
      images: [...formData.images, imageUrl.trim()],
    });

    setImageUrl(""); // clear input
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.images.length) {
      alert("Please add at least one image!");
      return;
    }

    addPG({
      id: Date.now(),
      ...formData,
      price: Number(formData.price),
      isVerified: false,
      ownerRole: "owner",
    });

    alert("PG Added Successfully");

    // reset form
    setFormData({
      name: "",
      location: "",
      price: "",
      sharing: "",
      images: [],
    });
    setImageUrl("");
  };

  return (
    <div className="addpg-container">
      <h2 className="addpg-title">Add New PG</h2>

      <form onSubmit={handleSubmit} className="addpg-form">
        <input
          name="name"
          placeholder="PG Name"
          value={formData.name}
          onChange={handleChange}
        />

        <input
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
        />

        <input
          name="price"
          placeholder="Price"
          type="number"
          value={formData.price}
          onChange={handleChange}
        />

        <input
          name="sharing"
          placeholder="Sharing (Single / Double)"
          value={formData.sharing}
          onChange={handleChange}
        />

        {/* Image URL input */}
        <div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
          <input
            type="text"
            placeholder="Image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
          <button type="button" onClick={handleAddImage}>
            Add Image
          </button>
        </div>

        {/* Preview added images */}
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "15px" }}>
          {formData.images.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`PG ${idx}`}
              style={{ width: "80px", height: "80px", objectFit: "cover", borderRadius: "8px" }}
            />
          ))}
        </div>

        <button type="submit">Add PG</button>
      </form>
    </div>
  );
};

export default AddPG;