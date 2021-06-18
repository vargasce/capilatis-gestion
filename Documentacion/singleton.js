
const mySingleton = (function () {
 
    var instance;
 
    function init() {
 
    // Singleton
 
    // Private methods and variables
    function privateMethod(){
        console.log( "I am private" );
    }
 
    var privateVariable = "Im also private";
 
    var privateRandomNumber = Math.random();
 
    return {
      publicMethod: function () {
        console.log( "The public can see me!" );
      },
 
      publicProperty: "I am also public",
 
      getRandomNumber: function() {
        return privateRandomNumber;
      }
 
    };
 
  }
 
  return {
 
    // Get the Singleton instance if one exists
    // or create one if it doesn't
    getInstance: function () {
 
      if ( !instance ) {
        instance = init();
      }
 
      return instance;
    }
 
  };
 
})();

console.log(mySingleton.getInstance().getRandomNumber());


// OTRA FORMA
const SingletonTester = (function () {

    // our instance holder
    var instance;

    // options: an object containing configuration options for the singleton
    // e.g var options = { name: "test", pointX: 5};
    function Singleton( options ) {
 
      // set options to the options supplied
      // or an empty object if none are provided
      options = options || {};
   
      // set some properties for our singleton
      this.name = "SingletonTester";
   
      this.pointX = options.pointX || 6;
   
      this.pointY = options.pointY || 10;

      return {
	getPointX : ()=>{
	  console.log(this.pointX);
      }
    };
      
  }
 
  const _static = {
    // Method for getting an instance. It returns
    // a singleton instance of a singleton object
    getInstance: ( options ) => {
      if( instance === undefined ) {
        instance = new Singleton( options );
      }
 
      return instance;
 
    }
  };
 
  //retorna objeta para la instance unica de clase
  return _static;
 
})();
 
var singletonTest = SingletonTester.getInstance({
  pointX: 5
});

SingletonTester.getInstance({  }).getPointX();

singletonTest.getPointX();


