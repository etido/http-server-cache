#http server cache

## A nodejs app running a simple http server cache

* Nodejs = 0.10.16 
* Express.js = 3.x.x 
* Git for deploy

1.Run the server:
<pre>
node server.js 
</pre>

2. Put cache pair key-value with TTL(in ms):
<pre>
POST http://http-server-cache.eu01.aws.af.cm/?key=isitchristmas&ttl=86400000 HTTP / 1.1
User - Agent : Fiddler
Host: http - server - cache.eu01.aws.af.cm
Content - Length: 23
{
    "isitchristmas": "NO"
} 
</pre>

3. Get cache value with:
<pre>
http://http-server-cache.eu01.aws.af.cm/?key=isitchristmas&ttl=86400000 HTTP / 1.1 
</pre>

4. Check results:
<pre>
{"Error": "cache missed","HasError": true,"ElapsedTime": "6.4 ms"}
or
{"isitchristmas": "NO"}
</pre >

##Try the demo site : 
<pre> 
<a href="http://http-server-cache.eu01.aws.af.cm/?key=isitchristmas" title= "is it christmas" > Demo: get cache for isitchristmas key </a>
</pre>