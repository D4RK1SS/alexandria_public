const LocalStrategy = require("passport-local").Strategy;
const { pool } = require("./dbConfig");
const bcrypt = require("bcrypt");

function initialize(passport) {

 

  const authenticateUser = (email, senha, done) => {
    pool.query(
      `SELECT * FROM alunos WHERE email = $1`,
      [email],
      (err, results) => {
        if (err) {
          throw err;
        }

        if (results.rows.length > 0) {
          const user = results.rows[0];


          bcrypt.compare(senha, user.senha, (err, isMatch) => {
            if (err) {senha
            }
            if (isMatch) {
              return done(null, user);
            } else {
              //password is incorrect
              return done(null, false, { message: "A senha esta incorreta" });
            }
          });
        } else {
          // No user
          return done(null, false, {
            message: "Email não registrado"
          });
        }
      }
    );
  };

  passport.use(
    new LocalStrategy(
      { usernameField: "email", passwordField: "senha" },
      authenticateUser
    )
  );

 
  passport.serializeUser((user, done) => done(null, user.id));


  passport.deserializeUser((id, done) => {
    pool.query(`SELECT * FROM alunos WHERE id = $1`, [id], (err, results) => {
      if (err) {
        return done(err);
      }
      
      return done(null, results.rows[0]);
    });
  });
}

module.exports = initialize;

