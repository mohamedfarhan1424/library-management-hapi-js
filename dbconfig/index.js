const Sequelize=require('sequelize');

const sequelize=new Sequelize('hapi_tutorial','root','@1424Farhan',{
    host:'localhost',
    port:3306,
    dialect:'mysql',
});

// const sequelize=new Sequelize('sql6480066','sql6480066','Hxai4ttrur',{
//     host:'sql6.freesqldatabase.com',
//     port:3306,
//     dialect:'mysql',
// });
module.exports.connect=sequelize;
module.exports.getUsers=async function(){
    try{
        await sequelize.authenticate();
        const [results,metadata]=await sequelize.query('SELECT * FROM users');
        return results;
    }catch(err){
        console.log('Cannot Connect!');
    }
}