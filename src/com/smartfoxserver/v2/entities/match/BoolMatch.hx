package com.smartfoxserver.v2.entities.match;

/**
 * The<em>BoolMatch</em>class is used in matching expressions to check boolean conditions.
 * 
 * @see MatchExpression
 */
#if html5 
 @:native('SFS2X.BoolMatch')
extern #end class BoolMatch implements IMatcher
{
	private static inline var TYPE_ID:Int = 0;

	
	/**
	 * An instance of<em>BoolMatch</em>representing the following condition:<em>bool1==bool2</em>.
	 */
	public static var EQUALS:BoolMatch #if html5 ; #else = new BoolMatch("==");#end

	/**
	 * An instance of<em>BoolMatch</em>representing the following condition:<em>bool1 !=bool2</em>.
	 */
	public static var NOT_EQUALS:BoolMatch #if html5 ; #else = new BoolMatch("!=");#end
	
	
	/** @private */
	function new(symbol:String)
	{
		this.symbol = symbol;
		type = TYPE_ID;	
	}
	
	/** @inheritDoc */
	public var symbol:String;

	
	/** @inheritDoc */
	public var type:Int;

}
