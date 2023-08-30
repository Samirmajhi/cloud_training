let getStudentsdatafromRDS = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            var mysql      = require('mysql');
            var connection = mysql.createConnection({
                host     : 'database-rds.c45qhrcvcdy2.ap-south-1.rds.amazonaws.com',
                user     : 'admin',
                password : '20011028',
                database : 'cgu_training'
            });
            
            connection.connect();
            
            connection.query('SELECT * from students', function (error, results, fields) {
            if (error) return reject(error);
            console.log('The solution is: ', results);
            return resolve(results);
            });
 
            connection.end();
        } catch (error) {
            console.log(`Error: ${error}`);
            return reject(error);
        }
    });
}

module.exports = {
    getStudentsdatafromRDS
}
