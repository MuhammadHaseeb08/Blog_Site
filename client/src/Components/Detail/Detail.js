import axios from "axios";
// import { set } from 'mongoose'
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setBlog } from "../../store/store";
const Detail = () => {
  let found = useParams();
  let [data, setData] = useState([]);
  let [cmt, setCmt] = useState("");
  const [filtered, setfiltered] = useState([]);
  let id = found.id;
  let user = useSelector((store) => {
    return store.user;
  });

  //    console.log(user);
  let sendCommnet = () => {
    setCmt("")

    let sending = async () => {
      let resp = await axios.put(`/cmt`, {
        data: {
          comment: cmt,
          userId: user._id,
          userName: user.username,
        },
        id,
      });
      if (resp.data.success == true) {
        setData(resp.data.allBlogs);
      }
    };
    if (cmt == "") {
      alert("please type");
    } else {
      sending();
    }
  };
  useEffect(() => {
    let coming = async () => {
      let rsp = await axios.get("/get");
      setData(rsp.data.founded);
    };
    coming();
  }, []);

  useEffect(() => {
    let filterede = data.filter((item) => {
        if (item._id == found.id) {
          return true;
        }
      });
      setfiltered(filterede)
  }, [data])

  return (
    <div>
      { filtered && filtered.map((item) => {
        return (
          <div>
            <h1 className="text-white text-bold text-3xl m-16">
              {item.title}:
            </h1>
            <div className=" h-3/4  mx-16">
              <img src={item.imageName} alt="image of blog" width="100%" />
            </div>
            <h1 className="text-white text-semibold text-2xl m-16">
              {item.detail}
            </h1>
            <div className="flex-col items-center text-center ">
              {/* <input type="text" className='border-2 border-white bg-inherit w-72 h-28 rounded-xl text-white text-xl' /> */}
              <div>
                <textarea
                  name="comments"
                  id=""
                  cols="30"
                  rows="10"
                  value={cmt}
                  className="border-2 border-white bg-inherit w-72 h-28 rounded-2xl text-white text-xl"
                  placeholder="Leave your comments"
                  onChange={(e) => {
                    setCmt(e.target.value);
                  }}
                ></textarea>
              </div>

              <button
                className="rounded-2xl text-white text-xl bg-blue-700 m-6 p-6"
                onClick={sendCommnet}
              >
                Comment
              </button>
            </div>
          </div>
        );
      })}
      <div className="bg-gray-600 m-5 border-2 border-gray-800 rounded-md">
        <p className="text-3xl text-white text-bold p-3">Comments</p>


        { filtered[0] && filtered[0].comments.map((comment) => {
              return (
                <div className="text-white p-2 m-2 border-b-slate-300 border-b-2">
                  <div className="text-xl text-bold">{comment.userName}:</div>
                  <div className="text-lg text-gray-400">{comment.comment}</div>
                </div>
              );
            })
        }
        {/* <div className="text-white text-2xl text-center">{filtered[0] && filtered[0].comments[0].userName}</div> */}
      </div>
    </div>
  );
};

export default Detail;
