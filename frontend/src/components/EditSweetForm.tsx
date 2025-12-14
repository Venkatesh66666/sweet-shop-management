import { useState } from "react";
import { updateSweet } from "../services/sweets.service";
import type { Sweet } from "../services/sweets.service";

interface Props {
  sweet: Sweet;
  onCancel: () => void;
  onSuccess: () => void;
}

export default function EditSweetForm({
  sweet,
  onCancel,
  onSuccess,
}: Props) {
  const [price, setPrice] = useState(sweet.price);
  const [quantity, setQuantity] = useState(sweet.quantity);

  const submit = async () => {
    await updateSweet(sweet.id, { price, quantity });
    onSuccess();
  };

  return (
    <div style={{ marginTop: 10 }}>
      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(Number(e.target.value))}
        placeholder="Price"
      />

      <input
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
        placeholder="Quantity"
        style={{ marginLeft: 8 }}
      />

      <button onClick={submit} style={{ marginLeft: 8 }}>
        Save
      </button>

      <button onClick={onCancel} style={{ marginLeft: 8 }}>
        Cancel
      </button>
    </div>
  );
}
