// import React from "react";
// // import "./style.css";

// // This component exports both the List and ListItem components

// export const TabHeader = ({ children }) => (
//     <nav>
//         <div class="nav nav-tabs" id="nav-tab" role="tablist">
//             { children }
//         </div>
//     </nav>
// );

// export function TabItem({ children, id, href, aria }) {
//     console.log("tab log", {children}, {id}, {href}, {aria})
//     // return <li className="list-group-item">{children}</li>;
//     return <a id={id} href={href} class="nav-item nav-link"  data-toggle="tab"  role="tab" aria-controls="nav-favorites" aria-selected="false">{ children }</a>
//   }
//   //id="nav-profile-tab"
// //   href="#nav-profile"
// // aria-controls="nav-profile"
  
// export const TabBody = ({ children }) => (
// //   <ul className="list-group">
// //     {children}
// //   </ul>
//   <div class="tab-content" id="nav-tabContent">
//     {children}
//   </div>
// );

// export function TabPane({ children, id, aria }) {
//   return <div id={id} class="tab-pane fade" role="tabpanel" aria-labelledby="nav-favorites-tab">{ children }</div>
//   ;
// }
// //aria-labelledby="nav-profile-tab"
// // id="nav-profile"

// {/* <nav>
//   <div class="nav nav-tabs" id="nav-tab" role="tablist">
//     <a class="nav-item nav-link active" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true">Home</a>
//     <a class="nav-item nav-link" id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false">Profile</a>
//     <a class="nav-item nav-link" id="nav-contact-tab" data-toggle="tab" href="#nav-contact" role="tab" aria-controls="nav-contact" aria-selected="false">Contact</a>
//   </div>
// </nav>
// <div class="tab-content" id="nav-tabContent">
//   <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">...</div>
//   <div class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">...</div>
//   <div class="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">...</div>
// </div> */}