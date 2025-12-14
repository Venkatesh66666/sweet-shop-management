// import { useEffect, useState } from "react";
// import Navbar from "../components/Navbar";
// import {
//   getSweets,
//   buySweet,
//   deleteSweet,
//   updateSweet,
// } from "../services/sweets.service";
// import type { Sweet } from "../services/sweets.service";
// import { isAdmin } from "../utils/auth";
// import AddSweetForm from "../components/AddSweetForm";

// export default function Dashboard() {
//   const [sweets, setSweets] = useState<Sweet[]>([]);
//   const [error, setError] = useState("");
//   const [search, setSearch] = useState("");

//   const [editingId, setEditingId] = useState<number | null>(null);
//   const [editPrice, setEditPrice] = useState(0);
//   const [editQuantity, setEditQuantity] = useState(0);

//   const admin = isAdmin();

//   const loadSweets = async () => {
//     try {
//       const data = await getSweets();
//       setSweets(data);
//     } catch {
//       setError("Failed to load sweets");
//     }
//   };

//   useEffect(() => {
//     loadSweets();
//   }, []);

//   const filteredSweets = sweets.filter(
//     (s) =>
//       s.name.toLowerCase().includes(search.toLowerCase()) ||
//       s.category.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <>
//       <Navbar />

//       <div style={{ padding: 30 }}>
//         {admin && <AddSweetForm onSuccess={loadSweets} />}

//         {error && <p style={{ color: "red" }}>{error}</p>}

//         <input
//           placeholder="🔍 Search sweets..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           style={{
//             width: "100%",
//             padding: 12,
//             marginBottom: 24,
//             borderRadius: 8,
//             border: "1px solid #ccc",
//           }}
//         />

//         <div
//           style={{
//             display: "grid",
//             gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))",
//             gap: 24,
//           }}
//         >
//           {filteredSweets.map((sweet) => (
//             <div
//               key={sweet.id}
//               style={{
//                 background: "white",
//                 borderRadius: 16,
//                 padding: 18,
//                 boxShadow: "0 10px 28px rgba(0,0,0,0.15)",
//               }}
//             >
//               <h3>{sweet.name}</h3>
//               <p>Category: {sweet.category}</p>
//               <p>₹{sweet.price}</p>
//               <p>Stock: {sweet.quantity}</p>

//               <button
//                 onClick={() => buySweet(sweet.id).then(loadSweets)}
//                 disabled={sweet.quantity === 0}
//               >
//                 Buy
//               </button>

//               {admin && (
//                 <button
//                   onClick={() =>
//                     deleteSweet(sweet.id).then(loadSweets)
//                   }
//                   style={{ background: "#ef4444", marginTop: 10 }}
//                 >
//                   Delete
//                 </button>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// }
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getSweets, buySweet, deleteSweet } from "../services/sweets.service";
import type { Sweet } from "../services/sweets.service";
import { isAdmin } from "../utils/auth";
import AddSweetForm from "../components/AddSweetForm";

export default function Dashboard() {
  const [sweets, setSweets] = useState<Sweet[]>([]);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const admin = isAdmin();

  useEffect(() => {
    let active = true;

    (async () => {
      try {
        const data = await getSweets();
        if (active) setSweets(data);
      } catch {
        if (active) setError("Failed to load sweets");
      }
    })();

    return () => {
      active = false;
    };
  }, []);

  const refresh = async () => {
    const data = await getSweets();
    setSweets(data);
  };

  const filteredSweets = sweets.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Navbar />

      <div style={{ padding: 30 }}>
        {admin && <AddSweetForm onSuccess={refresh} />}

        {error && <p style={{ color: "red" }}>{error}</p>}

        <input
          placeholder="Search sweets..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ width: "100%", padding: 12, marginBottom: 20 }}
        />

        <div style={{ display: "grid", gap: 20 }}>
          {filteredSweets.map((sweet) => (
            <div key={sweet.id}>
              <h3>{sweet.name}</h3>
              <p>{sweet.category}</p>
              <p>₹{sweet.price}</p>
              <p>Stock: {sweet.quantity}</p>

              <button
                onClick={() => buySweet(sweet.id).then(refresh)}
                disabled={sweet.quantity === 0}
              >
                Buy
              </button>

              {admin && (
                <button
                  onClick={() => deleteSweet(sweet.id).then(refresh)}
                >
                  Delete
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
