import { useState, useContext } from "react";
import { PGContext } from "../../context/PGContext";

const AddPGForm = () => {
  const { addPG } = useContext(PGContext);

  const [formData, setFormData] = useState({
    name: "",
    location: "",
    price: "",
    sharing: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    addPG({
      id: Date.now(),
      ...formData,
      price: Number(formData.price),
      isVerified: false,
      ownerRole: "owner",
    });

    alert("PG Added Successfully");

    setFormData({
      name: "",
      location: "",
      price: "",
      sharing: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="addpg-form">
      <input name="name" placeholder="PG Name" value={formData.name} onChange={handleChange} />
      <input name="location" placeholder="Location" value={formData.location} onChange={handleChange} />
      <input name="price" type="number" placeholder="Price" value={formData.price} onChange={handleChange} />
      <input name="sharing" placeholder="Sharing (Single / Double)" value={formData.sharing} onChange={handleChange} />
      <button type="submit">Add PG</button>
    </form>
  );
};

export default AddPGForm;
