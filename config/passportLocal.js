const tLocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const { initialize } = require('passport');


function initialize(passport, getUserByEmail, getUserById){
    const authenticator = async (email, password, done) => {
        const user = getUserByEmail(email);
        if(!user){   // the user is not having any user
            return done(null, false);
        }

        try{

        if(await bcrypt.compare(password, user.password)){//user access is granted
            return done(null , user);
        }else {
            return done(null, false); //password is incorrect
        }
    }catch(err){
            return done(err);
        }
    }

    passport.use(new LocalStrategy({usernameField: 'email'}, authenticator));
    passport.serializeUser(function(user, done){
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done){
        done(err, user.id)
    })
}



module.exports = initialize;