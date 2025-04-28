// // import { Route, BrowserRouter as Router, Routes, Navigate } from "react-router-dom";
// // import Toast from "./components/toast/Toast";
// // import EditorPage from "./pages/EditorPage";
// // import HomePage from "./pages/HomePage";
// // import Auth from "./Auth"; // Make sure this path is correct

// // const App = () => {
// //     return (
// //         <>
// //             <Router>
// //                 <Routes>
// //                     {/* Redirect root path to /auth */}
// //                     <Route path="/" element={<Navigate to="/auth" />} />
// //                     <Route path="/auth" element={<Auth />} />
// //                     <Route path="/home" element={<HomePage />} />
// //                     <Route path="/editor/:roomId" element={<EditorPage />} />
// //                 </Routes>
// //             </Router>
// //             <Toast />
// //         </>
// //     );
// // };

// // export default App;



// // import { useEffect, useState } from "react";
// // import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// // import { onAuthStateChanged, User } from "firebase/auth";
// // import { auth } from "./firebaseConfig";

// // import Toast from "./components/toast/Toast";
// // import EditorPage from "./pages/EditorPage";
// // import HomePage from "./pages/HomePage";
// // import Auth from "./Auth";

// // const App = () => {
// //   const [user, setUser] = useState<User | null>(null);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
// //       console.log("User state changed:", currentUser);
// //       setUser(currentUser);
// //       setLoading(false);
// //     });

// //     return () => unsubscribe();
// //   }, []);

// //   if (loading) {
// //     return (
// //       <div className="flex justify-center items-center h-screen text-white bg-black text-xl">
// //         Checking user...
// //       </div>
// //     );
// //   }

// //   return (
// //     <>
// //       <Router>
// //         <Routes>
// //           <Route path="/" element={<Navigate to={user ? "/home" : "/auth"} />} />
// //           <Route path="/auth" element={!user ? <Auth /> : <Navigate to="/home" />} />
// //           <Route path="/home" element={user ? <HomePage /> : <Navigate to="/auth" />} />
// //           <Route path="/editor/:roomId" element={user ? <EditorPage /> : <Navigate to="/auth" />} />
// //         </Routes>
// //       </Router>
// //       <Toast />
// //     </>
// //   );
// // };

// // export default App;
// // import { Route, BrowserRouter as Router, Routes, Navigate } from "react-router-dom";
// // import { useState, useEffect } from "react";
// // import Toast from "./components/toast/Toast";
// // import EditorPage from "./pages/EditorPage";
// // import HomePage from "./pages/HomePage";
// // import Auth from "./Auth"; // Ensure correct path
// // import { auth } from "./firebaseConfig"; // Firebase auth

// // const App = () => {
// //   const [user, setUser] = useState<any>(null);

// //   useEffect(() => {
// //     // Listen for changes to authentication state
// //     const unsubscribe = auth.onAuthStateChanged((user) => {
// //       setUser(user);
// //     });

// //     // Cleanup the subscription on component unmount
// //     return () => unsubscribe();
// //   }, []);

// //   return (
// //     <Router>
// //       <Routes>
// //         {/* If the user is authenticated, navigate to /home, else to /auth */}
// //         <Route path="/" element={user ? <Navigate to="/home" /> : <Navigate to="/auth" />} />
        
// //         {/* Auth route - will show login/sign-up page */}
// //         <Route path="/auth" element={!user ? <Auth /> : <Navigate to="/home" />} />
        
// //         {/* Home and Editor pages - Only accessible if logged in */}
// //         <Route path="/home" element={user ? <HomePage /> : <Navigate to="/auth" />} />
// //         <Route path="/editor/:roomId" element={user ? <EditorPage /> : <Navigate to="/auth" />} />
// //       </Routes>
// //       <Toast />
// //     </Router>
// //   );
// // };

// // export default App;


// import { useState, useEffect } from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import { onAuthStateChanged, User } from "firebase/auth";
// import { auth } from "./firebaseConfig";

// import Toast from "./components/toast/Toast";
// import HomePage from "./pages/HomePage";
// import EditorPage from "./pages/EditorPage";
// import Auth from "./Auth";

// const App = () => {
//   const [user, setUser] = useState<User | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser);
//       setLoading(false);
//     });

//     return () => unsubscribe();
//   }, []);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen bg-black text-white text-xl">
//         Checking user...
//       </div>
//     );
//   }

//   return (
//     <Router>
//       <Routes>
//         {/* Root path redirects to /home or /auth based on auth state */}
//         <Route path="/" element={<Navigate to={user ? "/home" : "/auth"} />} />

//         {/* Auth page route */}
//         <Route path="/auth" element={!user ? <Auth /> : <Navigate to="/home" />} />

//         {/* Home and Editor pages only for logged-in users */}
//         <Route path="/home" element={user ? <HomePage /> : <Navigate to="/auth" />} />
//         <Route path="/editor/:roomId" element={user ? <EditorPage /> : <Navigate to="/auth" />} />
//       </Routes>

//       <Toast />
//     </Router>
//   );
// };

// export default App;
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "./firebaseConfig";

import Toast from "./components/toast/Toast";
import HomePage from "./pages/HomePage";
import EditorPage from "./pages/EditorPage";
import Login from "./login";
import SignUp from "./signup";

const App = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-black text-white text-xl">
        Checking user...
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        {/* Redirect root based on login status */}
        <Route path="/" element={<Navigate to={user ? "/home" : "/login"} />} />

        {/* Auth routes */}
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/home" />} />
        <Route path="/signup" element={!user ? <SignUp /> : <Navigate to="/home" />} />

        {/* Protected routes */}
        <Route path="/home" element={user ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/editor/:roomId" element={user ? <EditorPage /> : <Navigate to="/login" />} />
      </Routes>

      <Toast />
    </Router>
  );
};

export default App;
