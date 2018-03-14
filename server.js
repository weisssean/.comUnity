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
    , axios = require("axios");

const fs = require('fs');
const mv = require('mv');


const corsPrefetch = require("cors-prefetch-middleware");
const imagesUpload = require("images-upload-middleware");

const port = process.env.PORT || 9090;

// if (process.env.NODE_ENV === 'production') {
//     app.use(express.static('raptor-image-mapping/build'));
//
// }
// Add headers

/**
 * Serve all files from the images directory
 */
app.use("/temp", express.static('static/temp'));
app.use("/images",express.static('static/uploaded'));

app.use(corsPrefetch,()=>{});

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

        if (req.method === 'OPTIONS') return res.send(200)
    }
    next()
});

/**
 * setting up for google login
 */
passport.use(new GoogleStrategy({
        clientID: "1028091578492-r8k4erb004a3mm35gh67rfm8nrm2gaca.apps.googleusercontent.com",
        clientSecret: "JJoCypO-aTPe47O3HGfilqHI",
        callbackURL: "http://localhost:9090/auth/google/callback",
        accessType: 'offline',
        passReqToCallback: true
    },

    function (req, accessToken, refreshToken, profile, done) {
        findOrCreateUser(profile).then(user => {
            done(null, profile);
        }).catch(error => {
            done(error, false);
        });
    }
));

function findOrCreateUser(profile) {
    return new Promise((resolve, reject) => {
        const url = "http://localhost:3006/users-result";

        axios.get(url, {
            params: {}
        }).then(response => {
            let users = response.data.users;
            const _user = users.filter(u => u.id === profile.id)[0];
            if (!_user) {

                const user = Object.assign({},
                    {
                        provider: profile.provider,
                        id: profile.id,
                        displayName: profile.displayName,
                        name: profile.name,
                        language: profile.language,
                        email: profile.email,
                        gender: profile.gender,
                        photos: profile.photos,
                    });

                users.push(user);

                axios.put(url, {users: users}, {
                    params: {
                        id: user.id
                    }
                })
                    .then(function (response) {
                        //check response
                        resolve(profile);
                    })
                    .catch(function (error) {

                        console.log("catch", error);
                        reject(error);

                    });
            } else {
                resolve(profile);

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
    passport.authenticate('google', {failureRedirect: '/login'}),
    function (req, res) {
        // console.log(req.user);
        // Authenticated successfully
        res.redirect('http://localhost:3001/');
    });

/**
 * google login end ===================================
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

app.get('/gettempfiles', (req, res)=>{
    if(fs.existsSync("static/temp"))
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
    if(fs.existsSync("static/temp"))
        fs.delete('static/temp');
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


app.get("/user",  (req, res) => {
    // console.log("req.session", req.session.passport);
    // console.log("user", req.user);

    if (req.user && req.user.id) {
        const url = "http://localhost:3006/users-result";

        axios.get(url, {
            params: {}
        }).then(response => {
            let users = response.data.users;
            const _user = users.filter(u => u.id === req.user.id)[0];
            console.log("user", _user);
            if (_user) {
                res.json({user: _user});
            } else {
                sendError(res, "user not found");
            }
        });
    } else
        sendError(res, "user not found");

});



/**
 * general start listening command to process the requests
 */
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
