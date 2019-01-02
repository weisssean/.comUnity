var express = require('express')
  , app = express()
  , server = require('http').createServer(app)
  , passport = require('passport')
  , util = require('util')
  , bodyParser = require('body-parser')
  , cookieParser = require('cookie-parser')
  , session = require('express-session')
  // , RedisStore = require('connect-redis')(session)
  , GoogleStrategy = require('passport-google-oauth2').Strategy
  , FacebookStrategy = require('passport-facebook').Strategy
  , axios = require("axios");

const fs = require('fs');
const mv = require('mv');


const corsPrefetch = require("cors-prefetch-middleware");
const imagesUpload = require("images-upload-middleware");

const port = process.env.PORT || 9090;

require('./database');
var ComLocation = require('./models/ComLocation');
var ComUser = require('./models/ComUser');
var ComComment = require('./models/ComComment');
var ComImage = require('./models/ComImage');

const LOG_LEVEL = 2;

// if (process.env.NODE_ENV === 'production') {
//     app.use(express.static('raptor-image-mapping/build'));
//
// }
// Add headers

/**
 * Serve all files from the images directory
 */
app.use("/temp", express.static('static/temp'));
app.use("/images", express.static('static/uploaded'));

app.use(corsPrefetch, () => {
});

//
// let dir = path.join("temp", './client/public/static');
//
// app.use(express.static(dir));
//

/**
 * Allow my app to access this API from a different URL
 */
app.use(function (req, res, next) {
  if (req.headers.origin) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3001');
    // res.header('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type,Authorization');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,PATCH,POST,DELETE');

    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Credentials", "true");
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)

    if (req.method === 'OPTIONS') return res.sendStatus(200)
  }
  next()
});


/**
 * =====================setting up for facebook login=====================
 */

passport.use(new FacebookStrategy({
    clientID: "580490618964773",
    clientSecret: "d8f0fc0ec63b0067eb16fa92eab5a1ff",
    callbackURL: "http://localhost:9090/auth/facebook/callback",
    profileFields: ['id', 'displayName', 'name', 'gender', 'photos']
  },
  function (accessToken, refreshToken, profile, done) {
    if (LOG_LEVEL >= 2)
      console.log("facebook user", profile);
    findOrCreateUser(profile).then(user => {
      done(null, user);
    }).catch(error => {
      done(error, false);
    });
  }
));
/**
 * =====================setting up for google login=====================
 */
passport.use(new GoogleStrategy({
    clientID: "1028091578492-r8k4erb004a3mm35gh67rfm8nrm2gaca.apps.googleusercontent.com",
    clientSecret: "JJoCypO-aTPe47O3HGfilqHI",
    callbackURL: "http://localhost:9090/auth/google/callback",
    accessType: 'offline',
    passReqToCallback: true
  },

  function (req, accessToken, refreshToken, profile, done) {
    if (LOG_LEVEL >= 2)
      console.log("google user", profile);

    findOrCreateUser(profile).then(user => {
      if (user)
        done(null, user);
    }).catch(error => {
      done(error, false);
    });
  }
));

function findOrCreateUser(profile) {
  return new Promise((resolve, reject) => {
    ComUser.findOne({email: profile.email}, (err, user) => {
      console.log("Found User", user);
      if (!user) {
        console.log("User not found");
        const _user = Object.assign({},
          {
            provider: profile.provider,
            displayName: profile.displayName,
            name: profile.name,
            language: profile.language,
            email: profile.email,
            gender: profile.gender,
            photos: profile.photos.map(pic => pic.value),
            lastLogin: new Date()
          });

        const item = new ComUser(_user);
        console.log('saving user ', item);
        item.save((err, data) => {
          console.log('new user saved', err, data);
          resolve(item);
        });
      } else {
        console.log('Existing user found', user);
        resolve(user);
      }
    });
  });
}

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

//trying this out
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(session({
  secret: 'cookie_secret',
  name: 'kaas',
  // store: new RedisStore({
  //     host: 'localhost',
  //     port: port
  // }),
  proxy: true,
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

function ensureAuthenticated(req, res, next) {
  // console.log((req.isAuthenticated()));
  if (req.isAuthenticated()) {
    console.log("authenticated");
    return next();
  }
  res.redirect('login');
}

app.get('/', ensureAuthenticated, function (req, res) {
  // console.log(req.user);
  res.redirect('http://localhost:3001');
});

app.get('/login', function (req, res) {
  // console.log(req.user);
  res.redirect('http://localhost:3000');
  // res.render('login', { user: req.user });
});

app.get('/auth/google',
  passport.authenticate('google',
    {scope: ['email profile']}
  ));


app.get('/auth/google/callback',
  passport.authenticate('google', {successRedirect: '/', failureRedirect: '/login'}),
  function (req, res) {
    // console.log(req.user);
    // Authenticated successfully
    // res.redirect('http://localhost:3001/');
  });

/**
 * google login end ===================================
 */


// Redirect the user to Facebook for authentication.  When complete,
// Facebook will redirect the user back to the application at
//     /auth/facebook/callback
app.get('/auth/facebook', passport.authenticate('facebook'));

// Facebook will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.
app.get('/auth/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: '/login'
  }));


/**
 * facebook login end ===================================
 */

app.post('/multiple', function (req, res) {
    if (!fs.existsSync('./static/temp')) {
      fs.mkdirSync('./static/temp');
    }
    return imagesUpload.default(
      './static/temp',
      'http://localhost:9090/temp',
      true
    )(req, res)
  }
);

app.get('/gettempfiles', (req, res) => {
  if (fs.existsSync("static/temp"))
    res.send(fs.readdirSync('static/temp'));
  else
    send([])
});

app.get("/move", (req, res) => {
  // console.log("path",path)
  mv('./static/temp', './static/uploaded', {mkdirp: false, clobber: false}, function (err) {
    if (err) {
      sendError(res, err);
    } else {
      console.log("success");
      res.sendStatus(200);
    }
  });
});


function sendError(res, error) {
  const err = new Error(error);
  console.error(err);
  res.sendStatus(400);
}


app.get("/cleartemp", () => {
  if (fs.existsSync("static/temp"))
    fs.unlink('static/temp');
});

// module.exports =
function move(oldPath, newPath, callback) {

  fs.rename(oldPath, newPath, function (err) {
    if (err) {
      if (err.code === 'EXDEV') {
        copy();
      } else {
        callback(err);
      }
      return;
    }
    callback();
  });

  function copy() {
    const readStream = fs.createReadStream(oldPath);
    const writeStream = fs.createWriteStream(newPath);

    readStream.on('error', callback);
    writeStream.on('error', callback);

    readStream.on('close', function () {
      fs.unlink(oldPath, callback);
    });

    readStream.pipe(writeStream);
  }
}

app.route("/user").get((req, res) => {
  console.log("Req user", req.user);
  if (req.user && req.user.email) {
    ComUser.findOne({email: req.user.email}, (err, user) => {
      if (LOG_LEVEL >= 2)
        console.log("user", user);
      if (user) {
        res.send(user);
      } else {
        sendError(err, "user not found");
      }
    });
  } else
    sendError(res, "Request user not found");
});

app.route('/api/users/:uid')
  .get((req, res) => {
    console.log(req.params.uid);
    ComUser.findOne({id: req.params.uid}, (error, doc) => {
      if (LOG_LEVEL >= 2)
        console.log("user", doc);
      res.send(doc)
    })
  });


app.route('/api/locations')
  .get((req, res) => {
    ComLocation.find((error, doc) => {
      if (LOG_LEVEL >= 2)
        console.log("locations", doc);
      res.send(doc)
    }).populate('user')
  })
  .post((req, res) => {
    const item = new ComLocation(req.body);
    item.save((err, data) => {


      // console.log('new item saved');
      // res.send(item);
      // ComLocation.findById(data._id,(error, doc) => {
        if (LOG_LEVEL >= 2)
          console.log("saved location", item);
        item.populate('user',(error,doc)=>{res.send(doc)})
      })
    // });
  });

app.route('/api/locations/:id')
  .delete((req, res) => {
    ComLocation
      .findById(req.params.id)
      .remove();
  })
  .put((req, res) => {
    ComLocation
      .findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, data) {
        res.send(data);
      }).populate('user');
  })
  .patch((req, res) => {
    console.log(req);
    ComLocation
      .findById(req.params.id, (error, doc) => {
        for (let key in req.body)
          doc[key] = req.body.key
        doc.save();
        res.sendStatus(200);
      }).populate('user')
  });

//=============Comments==================

app.route('/api/comments')
  .get((req, res) => {
    // if (req.params.locationId) {
    ComComment.find(req.query, (error, comment) => {
      if (LOG_LEVEL >= 2)
        console.log('comment', comment);
      res.send(comment)
    }).populate('user')
  })
  .post((req, res) => {
    // console.log('saving comment', req);
    const item = new ComComment(req.body);
    item.save((err, data) => {
      data.populate('user', (error, doc) => {
        res.send(data);
      })
    });
  });


app.route('/api/comments/:id')
  .delete((req, res) => {
    ComComment
      .findById(req.params.id)
      .remove();
  })
  .put((req, res) => {
    console.log(req.body);
    ComComment
      .findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, data) {
        res.send(data);
      });
  })
  .patch((req, res) => {
    console.log(req);
    ComComment
      .findById(req.params.id, (error, doc) => {
        for (let key in req.body)
          doc[key] = req.body.key
        doc.save();
        res.sendStatus(200);
      })
  });
//=============Images==================

app.route('/api/images')
  .get((req, res) => {
    ComImage.find((error, doc) => {
      if (LOG_LEVEL >= 2)
        console.log("images", doc);
      res.send(doc)
    })
  })
  .post((req, res) => {
    console.log(req);
    const item = new ComImage(req.body);
    item.save((err, data) => {
      console.log('new image saved');
      res.send(data);
    });
  });


app.route('/api/comments/:id')
  .delete((req, res) => {
    ComImage
      .findById(req.params.id)
      .remove();
  })
  .put((req, res) => {
    console.log(req.body);
    ComImage
      .findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, data) {
        res.send(data);
      });
  })
  .patch((req, res) => {
    console.log(req);
    ComImage
      .findById(req.params.id, (error, doc) => {
        for (let key in req.body)
          doc[key] = req.body.key
        doc.save();
        res.sendStatus(200);
      })
  });


/**
 * general start listening command to process the requests
 */
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});

