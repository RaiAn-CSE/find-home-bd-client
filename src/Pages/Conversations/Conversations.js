import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { BsPersonCircle } from "react-icons/bs";

import { AuthContext } from "../../contexts/AuthProvider";

import "./Conversation.css";

const Conversations = () => {
  const { propertyId } = useParams() || {};
  const { user } = useContext(AuthContext);
  const { email: userEmail } = user || {};
  const [conversations, setConversations] = useState([]);
  const [activeConversation, setActiveConversation] = useState({});

  const fetchConversations = async () => {
    const response =
      (await axios.post(`http://localhost:5000/conversations`, {
        email: userEmail,
        propertyId,
      })) || {};
    setConversations(response?.data?.conversations || []);
  };

  useEffect(() => {
    fetchConversations();
  }, []);

  const getReceiverParticipant = (participants = []) =>
    participants.find((participant) => participant.email !== userEmail);

  const { register, reset, handleSubmit } = useForm();

  const addNewMessage = async (form) => {
    if (activeConversation?._id) {
      const response =
        (await axios.post("http://localhost:5000/conversations/messages", {
          conversationId: activeConversation._id,
          message: form.message,
          senderEmail: userEmail,
        })) || {};
      const newMessage = response?.data?.conversationMessage;
      if (newMessage) {
        setActiveConversation((prevState) => {
          const { conversationMessages } = prevState;
          if (
            !conversationMessages?.find((item) => item._id === newMessage?._id)
          ) {
            conversationMessages.push(newMessage);
          }
          return prevState;
        });
      }
    } else alert("Please choose a conversation first!");
    reset({ message: "" });
  };

  return (
    <>
      <div className="container">
        <h2 className="text-center">Conversation</h2>

        <div className="row">
          <div className="col-3">
            {conversations.map((conversation) => (
              <div
                className="message mb-2"
                onClick={() => setActiveConversation(conversation)}
                key={conversation?._id}
                style={{ cursor: "pointer" }}
              >
                <div className="contact-info border-bottom">
                  <h5>
                    <BsPersonCircle />{" "}
                    {getReceiverParticipant(conversation?.participants)?.name}
                  </h5>
                  {/* <span>
                    Email:{" "}
                    {getReceiverParticipant(conversation?.participants)?.email}
                  </span> */}
                </div>
              </div>
            ))}
          </div>

          {activeConversation?._id ? (
            <div className="col-9">
              <div className="message-container mb-4">
                <div className="contact-info mb-3 border-bottom">
                  <h3>
                    <BsPersonCircle />{" "}
                    {
                      getReceiverParticipant(activeConversation?.participants)
                        ?.name
                    }
                  </h3>
                  <span>
                    Email:{" "}
                    {
                      getReceiverParticipant(activeConversation?.participants)
                        ?.email
                    }
                  </span>
                </div>

                <div className="feedback">
                  {activeConversation?.conversationMessages.map(
                    (conversationMessage) => (
                      <p
                        key={conversationMessage?._id}
                        style={
                          conversationMessage?.createdBy === userEmail
                            ? { textAlign: "right" }
                            : {}
                        }
                      >
                        <span className=" message w-50">
                          {conversationMessage?.message}
                        </span>
                      </p>
                    )
                  )}
                </div>

                <form onSubmit={handleSubmit(addNewMessage)}>
                  <div className="delete-btn">
                    <input
                      {...register("message", { required: true })}
                      type="text"
                      className="form-control"
                      id="exampleFormControlInput1"
                      placeholder="Type your message here"
                    />
                    <input
                      className="login-btn form-control ms-2 w-25"
                      value="Send"
                      type="submit"
                    />
                  </div>
                </form>
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>

        {/* Chat frontend design */}
      </div>
    </>
  );
};

export default Conversations;
