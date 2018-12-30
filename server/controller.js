const bcrypt = require('bcryptjs');

module.exports = {
  register: async (req, res) => {
    try {
        const db = req.app.get('db')
        const { username, password } = req.body;

        let userResponse = await db.getUserByUsername(username);
        
        if (userResponse[0]) {
            return res.status(409).send('username is already taken')
          }

          const salt = bcrypt.genSaltSync(10)
          const hash = bcrypt.hashSync(password, salt)

          let response = await db.createUser([username, hash])

          let newUser = response[0]
          delete newUser.password
    
          req.session.user = newUser
          res.send(newUser)

        } catch (error) {
          console.log('error registering user:', error)
          res.status(500).send(error)
        }
  },

  login: async (req, res) => {
        try {
          const db = req.app.get('db')
          const { username, password } = req.body
    
          let userResponse = await db.getUserByUsername(username)
          let user = userResponse[0]
    
          if (!user) {
            return res.status(401).send('username not found')
          }
    
          const isAuthenticated = bcrypt.compareSync(password, user.password)
    
          if (!isAuthenticated) {
            return res.status(403).send('incorrect password')
          }
    
          delete user.password
          req.session.user = user
         
          res.send(req.session.user)


      

    } catch(error) {
      console.log('error Loggingin user:', error)
      res.status(500).send(error)
    }
  }

}
