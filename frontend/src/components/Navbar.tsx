// // import { useNavigate } from "react-router-dom";

// // export default function Navbar() {
// //   const navigate = useNavigate();

// //   const logout = () => {
// //     localStorage.removeItem("token");
// //     navigate("/login");
// //   };

// //   return (
// //     <div
// //       style={{
// //         background: "#ec4899",
// //         color: "white",
// //         padding: "14px 30px",
// //         display: "flex",
// //         justifyContent: "space-between",
// //         alignItems: "center",
// //       }}
// //     >
// //       <h2 style={{ margin: 0 }}>🍬 Sweet Shop</h2>
// //       <button
// //         onClick={logout}
// //         style={{
// //           background: "white",
// //           color: "#ec4899",
// //           border: "none",
// //           padding: "8px 14px",
// //           borderRadius: 6,
// //           cursor: "pointer",
// //           fontWeight: "bold",
// //         }}
// //       >
// //         Logout
// //       </button>
// //     </div>
// //   );
// // }
// // import { useNavigate } from "react-router-dom";

// // export default function Navbar() {
// //   const navigate = useNavigate();

// //   const logout = () => {
// //     localStorage.removeItem("token");
// //     navigate("/login");
// //   };

// //   return (
// //     <div
// //       style={{
// //         height: 64,
// //         background: "#ec4899",
// //         color: "white",
// //         padding: "0 30px",
// //         display: "flex",
// //         alignItems: "center",
// //         justifyContent: "space-between",
// //         boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
// //       }}
// //     >
// //       <h2 style={{ margin: 0 }}>🍬 Sweet Shop</h2>

// //       <button
// //         onClick={logout}
// //         style={{
// //           background: "white",
// //           color: "#ec4899",
// //           border: "none",
// //           padding: "8px 16px",
// //           borderRadius: 8,
// //           cursor: "pointer",
// //           fontWeight: "bold",
// //           width: "auto",
// //         }}
// //       >
// //         Logout
// //       </button>
// //     </div>
// //   );
// // }
// import { useNavigate } from "react-router-dom";

// export default function Navbar() {
//   const navigate = useNavigate();

//   const logout = () => {
//     localStorage.removeItem("token");
//     navigate("/login");
//   };

//   return (
//     <div
//       style={{
//         height: 64,
//         background: "#ec4899",
//         color: "white",
//         padding: "0 30px",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "space-between",
//         boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
//       }}
//     >
//       <h2 style={{ margin: 0 }}>🍬 Sweet Shop</h2>

//       <button
//         onClick={logout}
//         style={{
//           background: "white",
//           color: "#ec4899",
//           border: "none",
//           padding: "8px 16px",
//           borderRadius: 8,
//           cursor: "pointer",
//           fontWeight: "bold",
//         }}
//       >
//         Logout
//       </button>
//     </div>
//   );
// }
import { useNavigate } from "react-router-dom";
import { logout } from "../utils/auth";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div
      style={{
        height: 64,
        background: "linear-gradient(90deg,#ec4899,#f43f5e)",
        color: "white",
        padding: "0 32px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        boxShadow: "0 6px 20px rgba(0,0,0,0.25)",
      }}
    >
      <h2 style={{ margin: 0 }}>🍬 Sweet Shop</h2>

      <button
        onClick={handleLogout}
        style={{
          background: "white",
          color: "#ec4899",
          border: "none",
          padding: "8px 18px",
          borderRadius: 10,
          fontWeight: "bold",
          cursor: "pointer",
        }}
      >
        Logout
      </button>
    </div>
  );
}
