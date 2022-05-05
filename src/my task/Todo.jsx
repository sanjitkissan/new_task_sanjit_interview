import React, { useState, useRef } from 'react'
import "./style.css"


export default function Todo() {
    const [data, setData] = useState([])
    const [comment, setComment] = useState([])
    const [editeIndex, setEditeIndex] = useState(null);

    const commentRef = useRef();
    const dateRef = useRef();
    const statusRef = useRef();

    function submit(event) {
        event.preventDefault()
        let details = {
            comment: event.target.comment.value,
            date: event.target.date.value,
            status: event.target.status.value

        }
        let newComment = [...data, details]
        console.log(newComment)
        setData(newComment)

    }
    function searchData() {
        let date = document.getElementById("dateTwo").value;
        console.log(date)
        let newData = data.filter((val, index) => {
            if (val.date == date) {
                return true;
            } else {
                return false

            }
        })
        setComment(newData)
    }

    function editComment(i) {
        console.log(i)
        setEditeIndex(i);
        let filterData = data.filter((val, index) => {
            if (index == i) {
                return true;
            }
        })
        console.log(filterData);

        commentRef.current.value = "";
        dateRef.current.value = "";
        statusRef.current.value = "";
    }
    function updateData(event) {
        event.preventDefault()
        let newInfo = data.map((val, index) => {
            if (index == editeIndex) {
                console.log(val);
                val.comment = commentRef.current.value;
                val.date = dateRef.current.value;
                val.status = statusRef.current.value;
            }
            return val;
        })
        setData(newInfo);
        commentRef.current.val = "";
        dateRef.current.value = "";
        statusRef.current.value = "";
    }

    function deleteComment(index) {
        let newCooment = [...data];
        delete newCooment[index];
        let modifiedComment = newCooment.filter((item) => item);
        setData(modifiedComment)
    }
    function deleteCommentOne(index) {
        let newCooment = [...comment];
        delete newCooment[index];
        let modifiedComment = newCooment.filter((item) => item);
        setComment(modifiedComment)
    }


    return (
        <div>
            <div className="nav">
                <input type="date" name="search" id='dateTwo' className='search-tag' placeholder='enter date to search comment'/>
                <span class="input-group-btn">
        <button class="btn btn-primary" type="button" onClick={searchData}>search!</button>
      </span>
                
            </div>

            <div className='comment-div'>
                {comment != undefined ? comment.map((val, index) => {
                    return <ul>
                        <li id='commentli' >{"comment:- "}{val.comment} <br />{"date:-"}{val.date} <br />{"status :-"}{val.status} <br /> <button className="btn btn-primary" onClick={() => editComment(index)}>Edit</button>
                            {"  "} <br /><button type='button' className="btn btn-primary" onClick={() => deleteCommentOne(index)}>Delete</button></li>
                    </ul>
                }) : <h2> there is no comment on this date please add a comment </h2>}
            </div>
                

            <div className="input-tag">
                <form id='formOne' onSubmit={submit}>
                    <input type="text" name="comment" id="comment" ref={commentRef} placeholder="Enter your comment" /><br />
                    <input type="date" name="date" id="date" ref={dateRef} placeholder="Select the date" /><br />
                    <select name="status" id="select" ref={statusRef} placeholder="Selecte the option">
                        <option value="select">Select option</option>
                        <option value="complited">Complited</option>
                        <option value="Incomplited">Incomplited</option>
                    </select><br />

                    {editeIndex != null ? <button type='button' className="btn btn-primary" onClick={updateData}>Update</button> : <button type='submit' className='btn btn-primary'>Add comment</button>}

                </form>
            </div>

            <br />



       <div className='submit-tag'>
               
       {
                data.map((val, index) => {
                    return <ul>
                        <li id='lisiOne'>{"comment:- "}{val.comment} <br /> {"date:-"} {val.date} <br /> {"status :-"}{val.status} <br />
                            <button className="btn btn-primary" onClick={() => editComment(index)}>Edit</button>
                            {"  "} <br /><button type='button' className="btn btn-primary" onClick={() => deleteComment(index)}>Delete</button> </li>
                    </ul>
                })
            }
       </div>

        </div>
    )
}
