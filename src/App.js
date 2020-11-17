import React, { useState,useEffect } from 'react';
import {Form} from './Form/Form';

import {getAllPosts} from './api/posts';

import './App.css';

const initialData = {
  userName: '',
  password: '',
};

function App() {
  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState({
    userNameError: false,
    passwordError: false,
  });
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);
  const [posts, setPosts] = useState([]);

  useEffect(async () => {
    const postsFromServer = await getAllPosts();
    const preparedPosts = postsFromServer
      .filter(post => post.userId === selectedUserId);

    setPosts(preparedPosts);
  }, [selectedUserId, isSuccess]);

  const handleChange = name => ({ target: { value } }) => {
    setFormData(oldData => ({
      ...oldData,
      [name]: value,
    }));
    setErrors({
      userNameError: false,
      passwordError: false,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (formData.userName.length < 2) {
      setErrors(oldErrors => ({
        ...oldErrors,
        userNameError: true,
      }));

      return;
    }

    for(let userId in localStorage) {
      if (!localStorage.hasOwnProperty(userId)) {
        continue;
      }
      const user = JSON.parse(localStorage.getItem(userId));
      if (user.userName === formData.userName) {
        setSelectedUserId(+userId);
        setIsSuccess(true);
        return ;
      }
    }


    const userId = localStorage.length + 1;
    setSelectedUserId(userId);
    localStorage.setItem(userId, JSON.stringify(formData));
    setIsSuccess(true);
  };

  return (
    <div className="App">
      <Form
        formData={formData}
        errors={errors}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
      {isSuccess && (
        <ul>
          {posts.map(({ id, userId, title, body }) => (
            <li key={id}>
            <p>{userId}</p>
            <p>{title}</p>
            <p>{body}</p>
            </li>
            ))}
        </ul>
      )}
    </div>
  );
}

export default App;
