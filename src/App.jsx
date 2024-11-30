import { useEffect, useState } from "react";
import "./App.css";
import Createtask from "./components/Createtask.jsx";
import Card from "./components/Card.jsx";



function App() {
  const [tasklist, setTasklist] = useState([]);
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [edit, setEdit] = useState(undefined);
  const [status, setStatus] = useState("Not-Completed");

  useEffect(() => {
    let arr = localStorage.getItem("tasklist");
    if (arr) {
      let obj = JSON.parse(arr);
      setTasklist(obj);
    }
  }, []);

  // Function To Delete Tasks //


  const deleteTask = (index) => {
    let templist = structuredClone(tasklist);
    templist.splice(index, 1);
    localStorage.setItem("tasklist", JSON.stringify(templist));
    setTasklist(templist);
  };

  // function To Save And Edit Tasks //
  const saveTask = (taskobj) => {
    if (edit != undefined) {
      let templist = structuredClone(tasklist);
      templist[edit] = taskobj;
      localStorage.setItem("tasklist", JSON.stringify(templist));
      setTasklist(templist);
      setEdit(undefined);
    } else {
      let templist = structuredClone(tasklist);
      templist.push(taskobj);
      localStorage.setItem("tasklist", JSON.stringify(templist));
      setTasklist(templist);
    }
    setDescription("");
    setTaskName("");
  };

  return (
    <>
    
    
      <div className="container py-5 " >
        <h1 className="   text-center bold " >My-Todo</h1>
        <div className="row">
          <div className="col   mt-5">
            {/* Calling Create Task Component */}
            <Createtask
              status={status}
              setStatus={setStatus}
              setEdit={setEdit}
              taskName={taskName}
              setTaskName={setTaskName}
              description={description}
              setDescription={setDescription}
              save={saveTask}
            />
          </div>
        </div>
        <div className="row mt-4">
          <div className="col d-flex justify-content-around">
            <div className="px-3 col bold"><h5>Mytodo</h5> </div>
           

            <div className="px-5 col  text-end">
              <label><b>Status Filter:</b></label>
              <select
                onChange={(e) => {
                  console.log(e.target.value);
                  let a = JSON.parse(localStorage.getItem("tasklist"));
                  console.log(a);
                  if (e.target.value == "All") {
                    setTasklist(a);
                    return;
                  }
                  let b = a.filter((value) => {
                    if (value.status == e.target.value) {
                      return value;
                    }
                  });
                  setTasklist(b);
                }}
                name="status"
                id="status"
              >
                <option value="All">All</option>
                <option className=" bg-success" value="Completed">
                  Completed
                </option>
                <option className=" bg-danger" value="Not-Completed">
                  Not-Completed
                </option>
              </select>
            </div>
          </div>
        </div>

        {/* Calling Card Component  */}
        <div className="task-container mt-3 px-3">
          {tasklist &&
            tasklist.map((obj, index) => (
              <Card
                edit={edit}
                setEdit={setEdit}

                taskName={taskName}
                setTaskName={setTaskName}

                description={description}
                setDescription={setDescription}

                save={saveTask}
                taskobj={obj}

                deleteTask={deleteTask}
                index={index}
                key={index}
                staus={status}
                setStatus={setStatus}
              />
            ))}
        </div>
      </div>
      
    </>
  );
}

export default App;