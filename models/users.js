const Connection=require('../dbconfig');
const {DataTypes}=require('sequelize');



const dbconnection=Connection.connect;

const users=dbconnection.define('users',{
    user_id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    name:{
        type:DataTypes.STRING
    },
    email:{
        type:DataTypes.STRING
    },
    username:{
        type:DataTypes.STRING,
    },
    username:{
        type:DataTypes.STRING,
    },
    password:{
        type:DataTypes.STRING
    },
    phoneno:{
        type:DataTypes.STRING
    },
},{
    freezeTableName:true,
    timestamps:false
});



module.exports.createUser=async function(name,email,username,password,phoneno){
    users.sync();
    const [results,metadata]=await Connection.connect.query(`SELECT username from users WHERE username='${username}'`);
    console.log(results);
    if(results[0]?.username){
        return false;
    }
    else{
        await users.create({name,email,username,password,phoneno}).then((data)=>{
            console.log(data.toJSON());
        });
        const book=await dbconnection.define(`${username}`,{
            user_id:{
                type:DataTypes.INTEGER,
                primaryKey:true,
                autoIncrement:true,
            },
            username:{
                type:DataTypes.STRING
            },
            bookName:{
                type:DataTypes.STRING
            },
            buyDate:{
                type:DataTypes.STRING
            },
            returnDate:{
                type:DataTypes.STRING,
            },
        },{
            freezeTableName:true,
            timestamps:false
        });
        book.sync();
        return true;
    }
    
}

module.exports.loginCheck=async (username,password)=>{
    const [results,metaData]=await Connection.connect.query(`SELECT * FROM users WHERE username='${username}' AND password='${password}'`);
    if(results[0]?.username){
        return {login:true,name:results[0].name,email:results[0].email,username:results[0].username,phoneno:results[0].phoneno};
    }
    return {login:false};
}

module.exports.allBooks=async (username)=>{
    const [results,metaData]=await Connection.connect.query('SELECT * FROM books');
    
    return results;
}
