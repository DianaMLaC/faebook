// // src/context/WebSocketContext.tsx
// import React, { createContext, useContext, useEffect, useState, ReactNode } from "react"
// import { createConsumer, Channel } from "@rails/actioncable"
// import { WebSocketContextType, Message, Chat } from "../utils/types"
// import { createChat, createMessage, fetchMessages } from "../utils/chats"

// const cable = createConsumer("ws://localhost:3000/cable")

// interface WebSocketProviderProps {
//   children: React.ReactNode
// }

// const WebSocketContext = createContext<WebSocketContextType | null>(null)

// function WebSocketProvider({ children }: WebSocketProviderProps): React.ReactElement {
//   const [messages, setMessages] = useState<Message[]>([])
//   const [chats, setChats] = useState<Chat[]>([])
//   const [subscriptions, setSubscriptions] = useState<Record<string, Channel | null>>({})

//   // Function #B
//   const addMessageOptimistic = (newMessage: Message): void => {
//     setMessages((prevMessages): Message[] => [...prevMessages, newMessage])
//     // Here we would also make an API call to save the message on the backend
//     console.log("adding message in websockets from:")
//     createMessage(newMessage.chatId, newMessage.body, newMessage.senderId) // Ensure this API call handles errors gracefully
//   }

//   // Function #D to send a message through the WebSocket with optimistic rendering
//   const sendMessageOptimistic = (chatId: string, body: string, senderId: string) => {
//     const optimisticMessage: Message = {
//       id: Date.now().toString(), // Temporary ID for the optimistic message
//       chatId,
//       body,
//       senderId, // Use the passed senderId
//       createdAt: new Date().toISOString(), // Temporary timestamp
//     }

//     // Optimistically add the message to the chat
//     addMessageOptimistic(optimisticMessage)

//     const subscription = subscriptions[chatId]
//     if (subscription) {
//       subscription.perform("send_message", {
//         chat_id: chatId,
//         message: body,
//         sender_id: senderId,
//       })
//     }
//   }

//   // Function to fetch messages for a specific chat
//   const getMessages = async (chatId: string): Promise<Message[]> => {
//     const messagesData = await fetchMessages(chatId)
//     return messagesData
//   }

//   // Function to create a chat or fetch an existing one, and subscribe to it
//   const initiateChat = async (senderId: string, recipientId: string): Promise<Chat> => {
//     console.log("initiating chat in websockets")

//     const chat = await createChat(senderId, recipientId)
//     console.log("we got the response from creating a chat")
//     console.log({ chat })

//     subscribeToChat(chat.id)

//     setChats((prevChats) => ({
//       ...prevChats,
//       [chat.id]: chat,
//     }))
//     if (messages) {
//       setMessages(chat.messages)
//     }
//     return chat
//   }

//   // Function to subscribe to a chat channel
//   const subscribeToChat = (chatId: string) => {
//     if (subscriptions[chatId]) return
//     console.log("subscribed to chat in websockets")
//     const subscription = cable.subscriptions.create(
//       { channel: "MessagingChannel", chat_id: chatId },
//       {
//         received(data) {
//           addMessageOptimistic(data.message)
//         },
//       }
//     )

//     setSubscriptions((prevSubscriptions) => ({
//       ...prevSubscriptions,
//       [chatId]: subscription,
//     }))
//   }

//   let subscription: Channel | null = null

//   // useEffect to set up the WebSocket subscription
//   useEffect(() => {
//     return () => {
//       Object.values(subscriptions).forEach((subscription) => {
//         if (subscription) {
//           cable.subscriptions.remove(subscription)
//         }
//       })
//     }
//   }, [subscriptions])

//   return (
//     <WebSocketContext.Provider
//       value={{
//         messages,
//         chats,
//         sendMessageOptimistic,
//         fetchMessages,
//         initiateChat,
//         subscribeToChat,
//       }}
//     >
//       {children}
//     </WebSocketContext.Provider>
//   )
// }

// function useWebSocket(): WebSocketContextType {
//   const context = useContext(WebSocketContext)
//   if (!context) {
//     throw new Error("useWebSocket must be used within a WebSocketProvider")
//   }
//   return context
// }

// export { WebSocketProvider, useWebSocket }
// export default WebSocketProvider
