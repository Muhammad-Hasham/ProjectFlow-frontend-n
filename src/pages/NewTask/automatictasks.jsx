import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { Box, Button, Checkbox, Dialog, DialogTitle, DialogContent, Table, TableBody, TableCell, TableHead, TableRow, Typography, FormControl, InputLabel, Select, MenuItem, CircularProgress } from '@mui/material';
import { Mic, MicOff } from '@mui/icons-material';
import {Text} from '../../components';

const AutomaticTasks = () => {
    const [isMicrophoneClicked, setMicrophoneClicked] = useState(true);
    const [isRecording, setRecording] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const { transcript, resetTranscript } = useSpeechRecognition();
    const { projectId } = useParams();
    const [projid, setprojid] = useState("");
    const [projects, setProjects] = useState([]);
    const [assign, setAssign] = useState([]);
    const [proj, setProj] = useState("");

    useEffect(() => {
        const id = localStorage.getItem("userid");

        fetch(`https://projectflow-cgjn.onrender.com/api/v1/users/${id}/projects`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                const apiProjects = data.data.projects;
                setProjects(apiProjects);
            })
            .catch(error => {
                console.error("Error fetching projects:", error);
            });
    }, []);

    const HandleProjChange = (e) => {
        const selectedAssigneeId = e.target.value;

        setprojid(selectedAssigneeId);

        fetch(`https://projectflow-cgjn.onrender.com/api/v1/projects/${selectedAssigneeId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Project not found");
                }
                return response.json();
            })
            .then((data) => {
                setAssign(data.data.project.Members);
                // handle project data if needed
            })
            .catch((error) => {
                console.error("Error fetching project details:", error);
            });

        setProj(selectedAssigneeId);
    };

    const handleSpeakNowClick = () => {
        if (!isRecording) {
            SpeechRecognition.startListening();
            setRecording(true);
        } else {
            SpeechRecognition.stopListening();
            setRecording(false);
        }
    };

    const handleGenerateTaskClick = () => {
        const generateTasks = () => {
            fetch('https://tasks-abdul-rehmans-projects-50d28608.vercel.app/api/generate-tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_story: transcript,
                }),
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to fetch data');
                    }
                    return response.json();
                })
                .then(data => {
                    if (data === null) {
                        // Retry if data is null
                        generateTasks();
                    } else {
                        const tasking = data.tasks.map(task => ({ ...task, isSelected: false }));
                        setTasks(tasking);
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('Failed to generate tasks. Please try again later.');
                })
                .finally(() => {
                    setLoading(false);
                });
        };
    
        setLoading(true);
        generateTasks();
    }; 

    const handleTaskCheckboxChange = (index) => {
        setTasks(prevTasks => {
            const updatedTasks = [...prevTasks];
            updatedTasks[index] = { ...updatedTasks[index], isSelected: !updatedTasks[index].isSelected };
            return updatedTasks;
        });
    };

    const handleConfirmClick = () => {
        const selectedTasks = tasks.filter(task => task.isSelected);
    
        const requestData = {
            tasks: selectedTasks.map(task => ({
                name: task.name,
                description: task.description,
                priority: task.priority,
                project: projid ? projid : projectId,
                assignee:assign[Math.floor(Math.random() * assign.length)],
            })),
        };
        console.log(requestData)
        let token = localStorage.getItem("token");
        axios
            .post("https://projectflow-cgjn.onrender.com/api/v1/tasks", requestData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        })
            .then(response => {
                if (response.status === 201) {
                    setLoading(true);
                    setTimeout(() => {
                        setLoading(false);
                        // If tasks are saved successfully, call sendSavedTasksToSlack function
                        //sendSavedTasksToSlack(selectedTasks);
                        setTasks([]);
                        setMicrophoneClicked(true);
                        alert('Tasks saved successfully!');
                    }, 2000);
                } else {
                    throw new Error('Failed to save tasks');
                }
            })
            .catch(error => {
                console.error('Error saving tasks:', error);
                alert('Failed to save tasks. Please try again later.');
            });
    };

    const sendSavedTasksToSlack = (selectedTasks) => {
        let token = localStorage.getItem("token");
        axios
            .post("https://projectflow-slackbackend.onrender.com/sendTasksToSlack", { tasks: selectedTasks }, { // Call the Slack server endpoint
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            })
            .then(response => {
                if (response.status === 200) {
                    console.log('Tasks sent to Slack successfully:', response.data);
                    alert('sent to Slack successfully');
                } else {
                    throw new Error('Failed to send tasks to Slack');
                }
            })
            .catch(error => {
                console.error('Error sending tasks to Slack:', error);
                alert('Failed to send tasks to Slack. Please try again later.');
            });
    };

    const handleCancelClick = () => {
        setTasks([]);
        setMicrophoneClicked(true);
    }

    return (
        <Dialog
        open={isMicrophoneClicked}
        onClose={() => setMicrophoneClicked(false)}
        aria-labelledby="form-dialog-title"
        fullWidth
        maxWidth="sm"
    >
        <DialogTitle id="form-dialog-title">Automatic Task Generation</DialogTitle>
        <DialogContent dividers>
            <Box textAlign="center" py={2}>
                <Button style = {{backgroundColor:"#860A35"}}
                    variant="contained"
                    
                    startIcon={isRecording ? <MicOff /> : <Mic />}
                    onClick={handleSpeakNowClick}
                >
                    {isRecording ? 'Stop Recording' : 'Start Recording'}
                </Button>
            </Box>

            {transcript && !isRecording && (
                <Box textAlign="center" py={2}>
                    <Typography variant="body1" gutterBottom>
                        Recorded Text: {transcript}
                    </Typography>
                    <Button style = {{backgroundColor:"#860A35"}}
                        variant="contained"
                        
                        //onClick={handleGenerateTaskClick}
                        disabled={isLoading}
                        startIcon={isLoading && <CircularProgress size={24} />}
                    >
                        Generate Task
                    </Button>
                </Box>
            )}

            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Priority</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Select</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tasks.map((task, index) => (
                        <TableRow key={index}>
                            <TableCell>{task.name}</TableCell>
                            <TableCell>{task.priority}</TableCell>
                            <TableCell>{task.description}</TableCell>
                            <TableCell padding="checkbox">
                                <Checkbox
                                    checked={task.isSelected}
                                    onChange={() => handleTaskCheckboxChange(index)}
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {!projectId && (
                        <div className="flex md:flex-col flex-row md:gap-10 items-start justify-between mt-[34px] w-[97%] md:w-full">
                            <Text className="md:mt-0 mt-0.5 text-base text-indigo-800 tracking-[0.44px]" size="txtPoppinsRegular16">Select Project</Text>
                            <div className="text-base w-[76%]" style={{ backgroundColor: 'transparent' }}>
                                <select name="project" value={proj} onChange={HandleProjChange} style={{ fontSize: '1rem', width: '100%', backgroundColor: 'transparent', border: 'none', outline: 'none', borderBottom: '0.5px solid #1F2544' }}>
                                    <option>Select Project</option>
                                    {projects.map((member) => (
                                        <option key={member.id} value={member.id}>{member.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    )}


            {/* Additional UI elements for project selection and task confirmation */}

            <Box display="flex" justifyContent="space-between" mt={2}>
                <Button color="error" onClick={() => setMicrophoneClicked(false)}>
                    Cancel
                </Button>
                <Button color="success" onClick={handleConfirmClick}>
                    Confirm
                </Button>
            </Box>
        </DialogContent>
    </Dialog>
    );
};

export default AutomaticTasks;
