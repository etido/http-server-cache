/**
 * The zon.stb.api Module 
 *
 * @module zon.stb.api
 * @since 1.0.0
 */
/**
A class with the funcionality that notifies the STB ZonShare App that the share has ended 

@class getbodyrequest 
@constructor
**/
/**
@class getbodyrequest
@main zon.stb.api

*/


/**
 * getbodyrequest description. This functionality is invoked when the process share ended
 * This function allow to notifies the STB that the share process ended. 
 * @method getbodyrequest
 * @param {Object} req The server response sent to the client
 * @param {Object} res The querystring object  
 * @param {Object} next the config object
 */

module.exports = function(req, res, next) {	


    var bodyrequest = '';
   // req.rawBodyRequest = '';
    //req.headeroptions = '';
    //req.setEncoding('utf8');

          console.log('qwerty ');
       
    req.on('data', function (chunk) {

     if(req.method!='SUBSCRIBE' )
    {
        bodyrequest += chunk;
    }
    else{
  bodyrequest += null;
    }

    });
    req.on('end', function () {
        req.rawBodyRequest = bodyrequest;
          console.log('req.rawBodyRequest '+req.rawBodyRequest);
        next();
    });

}