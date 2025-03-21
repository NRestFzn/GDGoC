import React, {useEffect, useState} from 'react';
import Input from './components/Input';
import Label from './components/Label';
import Button from './components/Button';
import Card from './components/Card';
import db from './config/firebase';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
  updateDoc,
} from 'firebase/firestore';

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

  const handleAddTask = async () => {
    const newTask = {
      id: Date.now(),
      title: addTask.title,
      description: addTask.description,
      createdAt: Date.now(),
    };

    try {
      await setDoc(doc(db, 'todos', newTask.id.toString()), newTask);
      setListTasks(await getData());
    } catch (error) {
      console.log(error);
    }
  };

  const getData = async () => {
    const docRef = collection(db, 'todos');
    const query = await getDocs(docRef);
    return query.docs.map((e) => e.data());
  };

  useEffect(() => {
    getData().then((data) => setListTasks(data));
  }, []);

  const handleDeleteTask = async (id) => {
    try {
      await deleteDoc(doc(db, 'todos', id.toString()));
      setListTasks(await getData());
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditTask = (id) => {
    const findIndex = listTasks.findIndex((item) => item.id === id);

    setUpdateTask(true);

    setAddTask({
      id: id,
      title: listTasks[findIndex].title,
      description: listTasks[findIndex].description,
    });
  };

  const handleUpdateTask = async () => {
    const docRef = doc(db, 'todos', addTask.id.toString());

    await updateDoc(docRef, {
      ...addTask,
      createdAt: Date.now(),
    });

    setUpdateTask(false);

    setListTasks(await getData());
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
