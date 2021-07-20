import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";


import './Join.css';

export default function SignIn() {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');

  const [date , setDate] = useState();

    const getYear = () =>  setDate(new Date().getFullYear())


    useEffect(() => {
        getYear();
    }, [])

  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
      <h1 className="title">Welcome to Chatify</h1>
      <h1 className="titleholder">Powered By Nafi</h1>
      <h1 className="year">&copy; {date}</h1>
        <h3 className="heading">Chat</h3>
        <div>
          <input placeholder="Enter Name" className="joinInput" type="text" onChange={(event) => setName(event.target.value)} />
        </div>
        <div>
          <input placeholder="Enter Room (Make or Join)" className="joinInput mt-20" type="text" onChange={(event) => setRoom(event.target.value)} />
        </div>
        <Link onClick={e => (!name || !room) ?  e.preventDefault() : null} to={`/chat?name=${name}&room=${room}`}>
          <button className={'button mt-20'} type="submit">Get Room</button>
        </Link>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
      </div>
    </div>
  );
}
