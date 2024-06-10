
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
const NewProject = React.lazy(() => import("pages/NewProject/index.jsx"));
const MyTasks = React.lazy(() => import("pages/MyTasks"));
const Dashboard = React.lazy(() => import("pages/Dashboard"));
const Apps = React.lazy(() => import("pages/Apps"));
const NewTask = React.lazy(() => import("pages/NewTask"));
const Signuprole = React.lazy(() => import("pages/Signuprole"));
const Signup = React.lazy(() => import("pages/Signup"));
const Signin = React.lazy(() => import("pages/Signin"));
const MyProjects = React.lazy(() => import("pages/MyProjects"));
const MyProfile = React.lazy(() => import("pages/MyProfile"));
const Startingpage = React.lazy(() => import("pages/Startingpage"));
const UpdateProject = React.lazy(()=> import ("./pages/MyProjects/update.jsx"))
const ProjectDetails = React.lazy(()=> import ("./pages/ProjectVisualization/stats.jsx"))
const Kanban = React.lazy(() => import("./pages/ProjectVisualization/kanban.jsx"))
const Calendar = React.lazy(() => import("./pages/ProjectVisualization/calendar.jsx"))
const Invite = React.lazy(() => import("pages/NewProject/inviteMembers.jsx"))
const GanttComponent = React.lazy(() => import("pages/ProjectVisualization/ganttchart.jsx"))
const Googledocs = React.lazy(() => import("pages/GoogleDocs/App.js"))
const Logs = React.lazy(() => import("pages/Logs/index.jsx"))
const ProjectRoutes = () => {
  return (
    <React.Suspense fallback={<>Loading...</>}>
      <Router>
        <Routes>
          <Route path="/" element={<Startingpage />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signuprole" element={<Signuprole />} />
          <Route path="/myprofile" element={<MyProfile />} />
          <Route path="/myprojects" element={<MyProjects />} />
          <Route path="/newtask/:projectId" element={<NewTask />} />
          <Route path="/newtask" element={<NewTask />} />
          <Route path="/apps" element={<Apps />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/mytasks" element={<MyTasks />} />
          <Route path="/newproject" element={<NewProject />} />
          <Route path="/updateproject/:projectId" element={<UpdateProject />} />
          <Route path="/details/:projectId" element={<ProjectDetails />} />
          <Route path="/kanban/:projectId" element={<Kanban />} />
          <Route path="/calendar/:projectId" element={<Calendar />} />
          <Route path="/invite" element={<Invite />} />
          <Route path="/ganttchart/:projectId" element={<GanttComponent />} />
          <Route path="/googledocs" element={<Googledocs />} />
          <Route path="/logs" element={<Logs />} />

        </Routes>
      </Router>
    </React.Suspense>
  );
};
export default ProjectRoutes;
