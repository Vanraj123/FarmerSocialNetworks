// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const { Server } = require('socket.io'); // Import Socket.IO
// require('dotenv').config();
// const path = require('path');
// const Message = require('./models/msg');

// const app = express();

// const http = require('http').createServer(app);

// const userRoutes = require("./routes/userRoutes");
// const msgRoutes = require("./routes/msgRoutes");
// const groupRoutes = require("./routes/groupRoutes");

// const HttpError = require("./models/http-error");

// const corsOptions = {
//   origin: ['http://localhost:5173', 'http://localhost:3000'], // Allow requests from both origins
//   methods: 'GET, POST, PUT, DELETE, OPTIONS', // Specify allowed HTTP methods
//   allowedHeaders: ['Content-Type', 'Authorization'], // Specify allowed headers
//   credentials: true, // Allow credentials if necessary
// };

// app.use(cors(corsOptions));


// app.use(express.json());

// // // Initialize Socket.IO
// // const io = new Server(http, {
// //   cors: {
// //     origin: 'http://localhost:5173',
// //     methods: ['GET', 'POST'],
// //     credentials: true, // Allow credentials if necessary
// //   }
// // });

// // Update Socket.IO configuration
// const io = new Server(http, {
//   cors: {
//     origin: ['http://localhost:5173', 'http://localhost:3000'],
//     methods: ['GET', 'POST'],
//     credentials: true, // Allow credentials if necessary
//   }
// });

// // Attach socket.io instance to the app, so it can be accessed from other files
// app.set('socketio', io);

// // Handle socket connections
// io.on('connection', (socket) => {
//   socket.on('joinRoom', ({ userId, groupId }) => {
//     if (groupId) {
//       // Join group room if groupId is provided (for group chats)
//       socket.join(groupId.toString());
//       console.log(`group room ${groupId}`);
//     } else if (userId) {
//       // Join user's room for one-to-one messaging
//       socket.join(userId.toString());
//       console.log(`User ${userId} joined room ${userId}`);
//     }
//   });

//   socket.on('sendMessage', (messageData) => {
//     console.log('Sending message:', messageData);

//     if (!messageData.isDirectMsg) {
//       io.to(messageData.group.toString()).emit('receiveMessage', messageData);
//     } else {
//       io.to(messageData.receiver.toString()).emit('receiveMessage', messageData);

//       if (messageData.sender !== messageData.receiver) {
//         io.to(messageData.sender.toString()).emit('receiveMessage', messageData);
//       }
//     }
//   });

//   // Handle disconnect
//   socket.on('disconnect', () => {
//     console.log('User disconnected');
//   });
// });

// // Serve static files from the 'uploads' directory
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// app.use("/api/user", userRoutes);
// app.use("/api/msg", msgRoutes);
// app.use("/api/group", groupRoutes);

// // Fallback route for 404
// app.use((req, res, next) => {
//   const error = new HttpError("Could not find this route.", 404);
//   throw error;
// });

// // Error handling middleware
// app.use((error, req, res, next) => {
//   if (res.headerSent) {
//     return next(error);
//   }
//   res.status(error.code || 500);
//   res.json({ message: error.message || "An unknown error occurred!" });
// });


// mongoose.connect(
//   "mongodb+srv://vanrajparmar_753:Vanraj_753@myfreecluster.1sk2q.mongodb.net/Reden?retryWrites=true&w=majority",
//   { useNewUrlParser: true, useUnifiedTopology: true }
// )

// .then(() => {
//   app.listen(5000);
//   console.log("Mongo is connect.")
// })
// .catch((err) => {
//   console.log(err);
// });

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { Server } = require('socket.io');
const http = require('http');
require('dotenv').config();
const path = require('path');
const Message = require('./models/msg');

const app = express();
const server = http.createServer(app); // Create the server with http

const userRoutes = require("./routes/userRoutes");
const msgRoutes = require("./routes/msgRoutes");
const groupRoutes = require("./routes/groupRoutes");

const HttpError = require("./models/http-error");

const corsOptions = {
  origin: ['http://localhost:5173', 'http://localhost:3000'], // Allow requests from both origins
  methods: 'GET, POST, PUT, DELETE, OPTIONS', // Specify allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Specify allowed headers
  credentials: true, // Allow credentials if necessary
};

app.use(cors(corsOptions));
app.use(express.json());

// Initialize Socket.IO
const io = new Server(server, {
  cors: {
    origin: ['http://localhost:5173', 'http://localhost:3000'],
    methods: ['GET', 'POST'],
    credentials: true, // Allow credentials if necessary
  }
});

// Attach socket.io instance to the app, so it can be accessed from other files
app.set('socketio', io);

// Handle socket connections
io.on('connection', (socket) => {
  socket.on('joinRoom', ({ userId, groupId }) => {
    if (groupId) {
      socket.join(groupId.toString());
      console.log(`group room ${groupId}`);
    } else if (userId) {
      socket.join(userId.toString());
      console.log(`User ${userId} joined room ${userId}`);
    }
  });

  socket.on('sendMessage', (messageData) => {
    console.log('Sending message:', messageData);

    if (!messageData.isDirectMsg) {
      io.to(messageData.group.toString()).emit('receiveMessage', messageData);
    } else {
      io.to(messageData.receiver.toString()).emit('receiveMessage', messageData);

      if (messageData.sender !== messageData.receiver) {
        io.to(messageData.sender.toString()).emit('receiveMessage', messageData);
      }
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use("/api/user", userRoutes);
app.use("/api/msg", msgRoutes);
app.use("/api/group", groupRoutes);

// Fallback route for 404
app.use((req, res, next) => {
  const error = new HttpError("Could not find this route.", 404);
  throw error;
});

// Error handling middleware
app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred!" });
});

mongoose.connect(
  "mongodb+srv://vanrajparmar_753:Vanraj_753@myfreecluster.1sk2q.mongodb.net/Reden?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
)
.then(() => {
  server.listen(5000, () => { // Listen on the server instance
    console.log("MongoDB connected and server is running on port 5000");
  });
})
.catch((err) => {
  console.log(err);
});
