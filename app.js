const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const session = require("express-session");
const methodOverride = require("method-override");
const { flash } = require("express-flash-message");
const hbs = require("hbs")

const homeRouter = require("./routes/home");
const postsRouter = require("./routes/posts");
const sessionsRouter = require("./routes/sessions");
const usersRouter = require("./routes/users");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));

app.use(
  session({
    key: "user_sid",
    secret: "super_secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 600000,
    },
  })
);

//flash
app.use(flash({ sessionKeyName: 'flashMessage' }));


// clear the cookies after user logs out
app.use((req, res, next) => {
  if (req.cookies.user_sid && !req.session.user) {
    res.clearCookie("user_sid");
  }
  next();
});

// middleware function to check for logged-in users
const sessionChecker = (req, res, next) => {
  if (!req.session.user && !req.cookies.user_sid) {
    res.redirect("/sessions/new");
  } else {
    next();
  }
};

// route setup
app.use("/", homeRouter);
app.use("/posts", sessionChecker, postsRouter);
app.use("/sessions", sessionsRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

///hbs helper

hbs.registerHelper('show_edit_post_button', (userId, postUserId) => { 
  if (userId == postUserId) {
    return `<span id="edit_post"><button class="submit-button">Edit post</button></span>` }
});

hbs.registerHelper('show_delete_post_button', (userId, postUserId) => { 
  if (userId == postUserId) {
    return ` <span id="delete_post"><button class="submit-button">Delete post</button></span>` }
});

hbs.registerHelper('show_add_friend_button', (user, postUserId) => { 
  let friend, requested, receivedRequest
  for (i = 0; i < user.friends.length; i++) { if (user.friends[i]._id == postUserId) friend = true }
  for (i = 0; i < user.pendingRequests.length; i++) { if (user.pendingRequests[i].userId == postUserId) requested = true }
  for (i = 0; i < user.friendRequests.length; i++) { if (user.friendRequests[i]._id == postUserId) receivedRequest = true }

  if (user._id == postUserId) return
  if (friend) return '<button class="friend_badge">Friend</button>'
  if (requested) return '<button class="request_badge">Request Sent</button>'
  if (receivedRequest) return '<button class="request_badge">Received Friend Request</button>'
  return `<button class="add_friend_button">+ Add Friend</button>` 
});

module.exports = app;
