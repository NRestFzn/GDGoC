import React, {useEffect, useState} from 'react';
import Input from './components/Input';
import Label from './components/Label';
import Button from './components/Button';
import Card from './components/Card';

const App = () => {
  const [addTask, setAddTask] = useState({
    title: '',
    description: '',
  });

  const [listTasks, setListTasks] = useState([]);

  const [updateTask, setUpdateTask] = useState(false);

  const disabled = addTask.title === '' || addTask.description === '';

  const handleInputChange = (e) => {
    const {name, value} = e.target;

    setAddTask((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleResetTask = (e) => {
    setAddTask({
      title: '',
      description: '',
    });

    setUpdateTask(false);
  };

  const handleAddTask = () => {
    const listTasks = JSON.parse(localStorage.getItem('listtasks')) || [];

    const newTask = {
      id: listTasks.length + 1,
      title: addTask.title,
      description: addTask.description,
      createdAt: new Date(),
    };

    const updateTask = [...listTasks, newTask];

    localStorage.setItem('listtasks', JSON.stringify(updateTask));

    window.location.reload();
  };

  useEffect(() => {
    setListTasks(JSON.parse(localStorage.getItem('listtasks')) || []);
  }, []);

  const handleDeleteTask = (id) => {
    const updatedList = listTasks.filter((item) => item.id !== id);

    setListTasks(updatedList);

    localStorage.setItem('listtasks', JSON.stringify(updatedList));
  };

  const handleEditTask = (id) => {
    const findIndex = listTasks.findIndex((item) => item.id === id);

    setUpdateTask(true);

    setAddTask({
      id: findIndex,
      title: listTasks[findIndex].title,
      description: listTasks[findIndex].description,
    });
  };

  const handleUpdateTask = () => {
    listTasks[addTask.id] = {...addTask, createdAt: new Date()};

    localStorage.setItem('listtasks', JSON.stringify(listTasks));

    setUpdateTask(false);

    window.location.reload();
  };

  return (
    <div className="m-12 flex flex-col gap-[10px]">
      <div className="flex flex-col gap-[5px]">
        <Label message="Title" />
        <Input
          type="text"
          name="title"
          placeholder="Title"
          onChange={handleInputChange}
          value={addTask.title}
        />
      </div>
      <div className="flex flex-col gap-[5px]">
        <Label message="Description" />
        <Input
          type="text"
          name="description"
          placeholder="Description"
          onChange={handleInputChange}
          value={addTask.description}
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-1.5  md:flex-row justify-end lg:flex-row xl:flex-row">
        <Button
          message={updateTask ? 'Update' : 'Add'}
          color={updateTask ? 'blue' : 'green'}
          disabled={disabled}
          onClick={updateTask ? handleUpdateTask : handleAddTask}
        />

        {!disabled ? (
          <Button
            message="Cancel"
            color="red"
            disabled={disabled}
            onClick={handleResetTask}
          />
        ) : (
          ''
        )}
      </div>

      <div className="flex flex-col gap-4">
        {listTasks.length > 0
          ? listTasks.map((task) => (
              <Card
                key={task.id}
                title={task.title}
                description={task.description}
                createdAt={task.createdAt}
                onDelete={() => handleDeleteTask(task.id)}
                onEdit={() => handleEditTask(task.id)}
              />
            ))
          : ''}
      </div>
    </div>
  );
};

export default App;
