/* eslint-disable no-undef */
const db = require('./models');

module.exports= async ({ req }) => {
  const token = req.headers && req.headers.authorization || null;
  const user = await verifyToken(token);

  return user?{ user }:null;
};

const verifyToken = async(token)=>{

  if(!token) return null;

  const tokenData = Buffer.from(token, 'base64').toString('ascii');
  const[email, id] = tokenData.split(',');

  try {
    const user = await db.User.findAll({ where: { email, id } });
  
    return user.length?{ email,id }:null;     
  } catch (error) {
    return null;
  }
};