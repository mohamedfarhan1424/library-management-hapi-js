const Connection=require('../dbconfig');
const {DataTypes}=require('sequelize');



const dbconnection=Connection.connect;

module.exports.getBookTable=async function(username){
    const [results,metaData]=await Connection.connect.query(`SELECT * FROM ${username}`);
    console.log(results);
    return results;
}

module.exports.returnBook=async function(username,bookname){
    const [result,metaData]=await Connection.connect.query(`SELECT user_id from ${username} where bookName='${bookname}'`);
    const user_id=result[0].user_id;
    await Connection.connect.query(`DELETE FROM ${username} WHERE user_id=${user_id}`);
}
module.exports.createBookTable=async function(username,bookName,buyDate,returnDate){
    const book=dbconnection.define(`${username}`,{
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
    await book.create({username,bookName,buyDate,returnDate}).then((data)=>{
        console.log(data.toJSON());
    });

}



