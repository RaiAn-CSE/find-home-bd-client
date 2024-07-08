// import React, { useEffect } from "react";

// const ChatBotIframe = ({ botId, clientId, botName }) => {
//     useEffect(() => {
//         const script = document.createElement("script");
//         script.src = "https://cdn.botpress.dev/webchat/v0/inject.js";
//         script.async = true;
//         script.onload = () => {
//             window.botpressWebChat.init({
//                 botId,
//                 hostUrl: "https://cdn.botpress.dev/webchat/v0",
//                 messagingUrl: "https://messaging.botpress.dev",
//                 clientId,
//                 botName,
//             });
//         };
//         document.body.appendChild(script);

//         return () => {
//             document.body.removeChild(script);
//         };
//     }, [botId, clientId, botName]);

//     return <div id="botpress-webchat"></div>;
// };

// export default ChatBotIframe;
