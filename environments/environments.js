// I will be very brief on this part as I am not the most comfortable with it and it's well explained on the original wiki, the only thing I will add is how to incorporate it with the script.

// If you have my script you can just write the following:

_environment.push() 

// And you're good to start working

// Let's make an example environment enhancements

_environment.push(
    {
        "_id" : "DragonsEnvironment.[0]Environment.[15]BigSmokePS",
        "_lookupMethod" : "Contains",
        "_active" : false
    }
)

// To quickly explain this, basically what we are doing here is writing environment data into the difficulty file. This will look for that exact id, more can be found [here](link), there are three lookup methods
// As I said I'm not the most comfortable with this so I use Contains, there are also Regex and Exact
// And with _active we are telling it to disable that game object. You can mess around with the settings to your liking to get the perfect environment you want! Good luck on making the next big thing