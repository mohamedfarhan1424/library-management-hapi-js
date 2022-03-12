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
        type:DataTypes.INTEGER
    },
},{
    freezeTableName:true,
    timestamps:false
});

module.exports.createUser=function(username,password){
    users.create({username,password}).then((data)=>{
        console.log(data.toJSON());
    });
}

