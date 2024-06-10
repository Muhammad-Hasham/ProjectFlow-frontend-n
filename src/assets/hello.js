// update.jsx:
// import React, { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { Text } from "components";
// import { Sidebar } from "react-pro-sidebar";

// const ProjectDetailsPage = () => {
//   const navigate = useNavigate();
//   const { projectId } = useParams();
//   const [project, setProject] = useState(null);
//   const [projectname, setProjectname] = useState("");
//   const [description, setDescription] = useState("");
//   const [dueDate, setDueDate] = useState(""); // State for the editable due date

//   useEffect(() => {
//     // Fetch project details from the API based on the 'projectId' parameter
//     const token = localStorage.getItem("token");

//     // Fetch the project details using a GET request
//     fetch(http://127.0.0.1:3000/api/v1/projects/${projectId}, {
//       headers: {
//         Authorization: Bearer ${token},
//         "Content-Type": "application/json",
//       },
//     })
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error("Project not found");
//         }
//         return response.json();
//       })
//       .then((data) => {
//         console.log(data);
//         setProject(data);

//         // Set the initial value of the editable due date from the fetched data
//         setDueDate(data.data.project.end_date);
//       })
//       .catch((error) => {
//         console.error("Error: ", error);
//       });
//   }, [projectId]);

//   const handleDeleteProject = () => {
//     if (window.confirm("Are you sure you want to delete this project?")) {
//       const token = localStorage.getItem("token");
//       fetch(http://127.0.0.1:3000/api/v1/projects/${projectId}, {
//         method: "DELETE",
//         headers: {
//           Authorization: Bearer ${token},
//           "Content-Type": "application/json",
//         },
//       })
//         .then((response) => {
//           if (response.ok) {
//             navigate("/myprojects");
//           } else {
//             throw new Error("Project deletion failed");
//           }
//         })
//         .catch((error) => {
//           console.error("Error: ", error);
//         });
//     }
//   };

//   const handleUpdateProject = () => {
//     const token = localStorage.getItem("token");
//     const updateData = {
//       name: projectname,
//       end_date: dueDate, // Use the state variable for the editable due date
//       description: description,
//     };

//     fetch(http://127.0.0.1:3000/api/v1/projects/${projectId}, {
//       method: "PATCH",
//       headers: {
//         Authorization: Bearer ${token},
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(updateData),
//     })
//       .then((response) => {
//         if (response.ok) {
//           alert("Project Updated Successfully")
//           navigate("/myprojects");
//         } else {
//           throw new Error("Project update failed");
//         }
//       })
//       .catch((error) => {
//         console.error("Error: ", error);
//       });
//   };

//   if (!project) {
//     return (
//       <div>
//         <p>Project not found.</p>
//       </div>
//     );
//   }

//   return (
//     <>
//       <div className="bg-white-A700 flex flex-col font-poppins items-center justify-start mx-auto w-full">
//         <div className="flex md:flex-col flex-row md:gap-10 items-start justify-between mx-auto md:px-5 w-full">
//           <div className="h-[1024px] relative w-[22%] md:w-full">
//             <Sidebar className="!sticky !w-[299px] border border-black-900 border-solid flex h-screen md:hidden justify-start m-auto overflow-auto top-[0]"></Sidebar>
//             <div className="absolute flex flex-col inset-x-[0] justify-start mx-auto top-[6%] w-[45%]">
//               <Text
//                 className="text-[22px] text-center text-indigo-800 sm:text-lg md:text-xl"
//                 size="txtPoppinsBold22"
//                 onClick={() => navigate("/dashboard")}
//               >
//                 ProjectFlow
//               </Text>
//               <Text
//                 className="ml-7 md:ml-[0] mt-[102px] text-base text-indigo-800 tracking-[0.44px]"
//                 size="txtPoppinsRegular16"
//                 onClick={() => navigate("/dashboard")}
//               >
//                 Dashboard
//               </Text>
//               <div className="flex flex-col gap-[46px] items-start justify-start md:ml-[0] ml-[35px] mt-[47px]">
//                 <Text
//                   className="md:ml-[0] ml-[3px] text-base text-indigo-800 tracking-[0.44px]"
//                   size="txtPoppinsRegular16"
//                   onClick={() => navigate("/myprojects")}
//                 >
//                   Projects
//                 </Text>
//                 <Text
//                   className="text-base text-indigo-800 tracking-[0.44px]"
//                   size="txtPoppinsRegular16"
//                   onClick={() => navigate("/mytasks")}
//                 >
//                   My Tasks
//                 </Text>
//                 <Text
//                   className="md:ml-[0] ml-[9px] text-base text-indigo-800 tracking-[0.44px]"
//                   size="txtPoppinsRegular16"
//                   onClick={() => navigate("/apps")}
//                 >
//                   Apps
//                 </Text>
//               </div>
//             </div>
//           </div>
//           <div className="flex md:flex-1 flex-col md:gap-10 gap-[97px] justify-start md:mt-0 mt-[68px] w-3/4 md:w-full">
//             <Text
//               className="md:ml-[0] ml-[851px] text-base text-indigo-800 tracking-[0.44px]"
//               size="txtPoppinsRegular16"
//               onClick={() => navigate("/myprofile")}
//             >
//               My Profile
//             </Text>
//             <div className="flex flex-col gap-[51px] items-start justify-start w-full">
//               <div className="flex flex-row sm:gap-10 gap-[639px] items-start justify-start md:ml-[0] ml-[3px] w-[92%] md:w-full">
//                 <Text
//                   className="mb-[7px] sm:text-3xl md:text-[32px] text-[34px] text-left text-indigo-800"
//                   size="txtPoppinsBold34"
//                 >
//                   Project Details
//                 </Text>

//                 </div>
//             </div>
//           </div>
//         </div>
      
//                 <div className="bg-white p-4 mt-4 border border-black-900 border-solid rounded-md" style={{marginTop:"-45%", width:"50%"}}>

//                   {/* <p>Project Name: {project.data.project.name}</p> */}

                  
//                   <div className="flex md:flex-col flex-row md:gap-10 items-start justify-between mt-[34px] w-[97%] md:w-full" >
//                     <Text
//                       className="md:mt-0 mt-0.5 text-base text-indigo-800 tracking-[0.44px]"
//                       size="txtPoppinsRegular16"
//                     >
//                       Project Name
//                     </Text>
//                     <div className="h-12 relative w-[76%] md:w-full">
//                       <input
//                         type="text"
//                         name="projectName"
//                         placeholder={project.data.project.name}
//                         value={projectname}
//                         onChange={(e) => setProjectname(e.target.value)}
//                         className="text-base w-full"
//                       />
//                     </div>
//                   </div>

//                   <div className="flex md:flex-col flex-row md:gap-10 items-start justify-between mt-[34px] w-[97%] md:w-full">
//                     <Text
//                       className="md:mt-0 mt-0.5 text-base text-indigo-800 tracking-[0.44px]"
//                       size="txtPoppinsRegular16"
//                     >
//                       Due Date
//                     </Text>
//                     <div className="h-12 relative w-[76%] md:w-full">
//                       <input
//                         type="date"
//                         name="DueDate"
                        
//                         value={dueDate ? dueDate.substring(0, 10) : ""}
//                         onChange={(e) => setDueDate(e.target.value)}
//                         className="text-base w-full"
//                       />
//                     </div>
//                   </div>

//                   <div className="flex md:flex-col flex-row md:gap-10 items-start justify-between mt-[34px] w-[97%] md:w-full">
//                     <Text
//                       className="md:mt-0 mt-0.5 text-base text-indigo-800 tracking-[0.44px]"
//                       size="txtPoppinsRegular16"
//                     >
//                       Description
//                     </Text>
//                     <div className="h-12 relative w-[76%] md:w-full">
//                       <input
//                         type="text"
//                         name="description"
//                         placeholder={project.data.project.description}
//                         value={description}
//                         onChange={(e) => setDescription(e.target.value)}
//                         className="text-base w-full"
//                       />
//                     </div>
//                   </div>

//                   <div className="mt-4">
//                     <button
//                       onClick={handleDeleteProject}
//                       className="bg-red-500 text-white px-4 py-2 rounded-md mr-2"
//                     >
//                       Delete
//                     </button>
//                     <button
//                       onClick={handleUpdateProject}
//                       className="bg-blue-500 text-white px-4 py-2 rounded-md"
//                     >
//                       Update
//                     </button>
//                   </div>
                  
//                 </div>
//                 </div>
//     </>
//   );
// };

// export default ProjectDetailsPage;