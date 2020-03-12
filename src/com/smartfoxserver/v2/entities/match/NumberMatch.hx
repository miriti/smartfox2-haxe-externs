package com.smartfoxserver.v2.entities.match;

/**
 * The<em>NumberMatch</em>class is used in matching expressions to check numeric conditions.
 * 
 * @see MatchExpression
 */
 #if html5 
 @:native('SFS2X.NumberMatch')
 extern #end class NumberMatch implements IMatcher
{
	private static inline var TYPE_ID:Int=1;
	
	private static var lock:Bool#if html5 ; #else=false;#end
	
	/**
	 * An instance of<em>NumberMatch</em>representing the following condition:<em>number1==number2</em>.
	 */
	public static var EQUALS:NumberMatch #if html5 ; #else =new NumberMatch("==");#end
	
	/**
	 * An instance of<em>NumberMatch</em>representing the following condition:<em>number1 !=number2</em>.
	 */
	public static var NOT_EQUALS:NumberMatch#if html5 ; #else=new NumberMatch("!=");#end
	
	/**
	 * An instance of<em>NumberMatch</em>representing the following condition:<em>number1 &gt;number2</em>.
	 */
	public static var GREATER_THAN:NumberMatch#if html5 ; #else=new NumberMatch(">");#end
	
	/**
	 * An instance of<em>NumberMatch</em>representing the following condition:<em>number1 &gt;=number2</em>.
	 */
	public static var GREATER_THAN_OR_EQUAL_TO:NumberMatch#if html5 ; #else=new NumberMatch(">=");#end
	
	/**
	 * An instance of<em>NumberMatch</em>representing the following condition:<em>number1 &lt;number2</em>.
	 */
	public static var LESS_THAN:NumberMatch#if html5 ; #else=new NumberMatch("<");#end
	
	/**
	 * An instance of<em>NumberMatch</em>representing the following condition:<em>number1 &lt;=number2</em>.
	 */
	public static var LESS_THAN_OR_EQUAL_TO:NumberMatch#if html5 ; #else=new NumberMatch("<=");#end
	
	#if !html5
	private static var init = {
        lock = true;
    }
	#end
	public var symbol:String;
	
	/** @private */
	function new(symbol:String)
	{
		if(lock)
			throw "Cannot instantiate Enum!";
			
		this.symbol=symbol;
		type = TYPE_ID;
	}

	public var type:Int;

}