// import React, { useEffect, useLayoutEffect, useState } from "react";
// import { useCookies } from "react-cookie";
// import { setRawCookie } from "react-cookies";

// const UserContext = React.createContext();
// export function UserContextProvider({ children }) {
//   const [cookie] = useCookies();
//   const [user, setUser] = useState({});
//   useLayoutEffect(() => {
//     if (cookie.token) {
//       jwtToken = cookie.token;
//       const decoded = jwt_decode(jwtToken);
//       const roles = decoded.roles || [];
//       const username = decoded.sub;
//       setUser({
//         username: username,
//         roles: roles,
//       });
//     }
//     return;
//   }, [cookie.token]);
//   const values = { user, setUser, cookie };
//   return (
//     <>
//       <UserContext.Provider value={values}>{children}</UserContext.Provider>
//     </>
//   );
// }
// export default UserContext;
