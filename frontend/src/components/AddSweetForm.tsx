import { useState } from "react";
import { addSweet } from "../services/sweets.service";

interface Props {
  onSuccess: () => void;
}

export default function AddSweetForm({ onSuccess }: Props) {
  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    quantity: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async () => {
    setError("");

    if (!form.name || !form.category) {
      setError("All fields are required");
      return;
    }

    try {
      await addSweet({
        name: form.name,
        category: form.category,
        price: Number(form.price),
        quantity: Number(form.quantity),
      });

      onSuccess();
      setForm({ name: "", category: "", price: "", quantity: "" });
    } catch {
      setError("Failed to add sweet");
    }
  };

  return (
    <div style={{ marginBottom: 30 }}>
      <h3>Add New Sweet</h3>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <input
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
      />
      <br />

      <input
        name="category"
        placeholder="Category"
        value={form.category}
        onChange={handleChange}
      />
      <br />

      <input
        name="price"
        type="number"
        placeholder="Price"
        value={form.price}
        onChange={handleChange}
      />
      <br />

      <input
        name="quantity"
        type="number"
        placeholder="Quantity"
        value={form.quantity}
        onChange={handleChange}
      />
      <br />

      <button onClick={submit}>Add Sweet</button>
    </div>
  );
}
