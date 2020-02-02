package com.smartfoxserver.v2.entities.data;

#if html5
@:native('SFS2X.SFSArray')
extern class SFSArray {
	static function newFromArray(array:Array<Dynamic>):SFSArray;
	inline static function newInstance():SFSArray {
		return new SFSArray();
	}
	function new();
	function contains(object:Dynamic):Bool;
	function get(key:Int, ?typeId:Int):Dynamic;
	function getBool(index:Int):Bool;
	function getBoolArray(index:Int):Array<Bool>;
	function getByte(index:Int):Int;
	inline function getByteArray(key:Int):openfl.utils.ByteArray {
		var arrInt:Array<Int> = this.get(key, SFSDataType.BYTE_ARRAY);
		var bt:haxe.io.Bytes = haxe.io.Bytes.alloc(arrInt.length);
		for (i in 0...arrInt.length)
			bt.set(i, arrInt[i]);
		return openfl.utils.ByteArray.fromBytes(bt);
	}
	function getDouble(index:Int):Int;
	function getDoubleArray(index:Int):Array<Int>;
	function getDump(?format:Dynamic):String;
	function getFloat(index:Int):Float;
	function getFloatArray(index:Int):Array<Float>;
	function getHexDump():String;
	function getInt(index:Int):Int;
	function getIntArray(index:Int):Array<Int>;
	function getKeysArray():Array<String>;
	function getLong(index:Int):Float;

	function getLongArray(index:Int):Array<Float>;
	function getSFSArray(index:Int):SFSArray;
	function getSFSObject(index:Int):SFSObject;
	function getShort(index:Int):Int;
	function getShortArray(index:Int):Array<Int>;
	function getText(index:Int):String;
	function getUtfString(index:Int):String;
	function getUtfStringArray(index:Int):Array<String>;
	inline function getWrappedElementAt(index:Int):Dynamic {
		return getWrappedItem(index);
	}
	function getWrappedItem(index:Int):Dynamic;
	@:overload(function(value:Dynamic, typeId:Int):Void {})
	inline function add(data:SFSDataWrapper):Void {
		add(data.data, data.type);
	}

	function addBool(value:Bool):Void;
	function addBoolArray(array:Array<Bool>):Void;
	function addByte(value:Int):Void;
	function addByteArray(array:haxe.io.Bytes):Void;
	function addDouble(value:Float):Void;
	function addDoubleArray(array:Array<Float>):Void;

	function addFloat(value:Float):Void;
	function addFloatArray(array:Array<Float>):Void;
	function addInt(value:Int):Void;
	function addIntArray(array:Array<Int>):Void;
	function addLong(value:Float):Void;
	function addLongArray(array:Array<Float>):Void;
	function addNull():Void;
	function addSFSArray(value:SFSArray):Void;
	function addSFSObject(value:SFSObject):Void;
	function addShort(value:Int):Void;
	function addShortArray(array:Array<Int>):Void;
	function addText(value:String):Void;
	function addUtfString(value:String):Void;
	function addUtfStringArray(array:Array<String>):Void;
	function size():Int;

	function isNull(index:Int):Bool;
	inline function toArray():Array<Dynamic> {
		return [];
	}
}
#else

/**
	* The<em>SFSArray</em>class is used by SmartFoxServer in client-server data transfer.
	* It can be thought of as a specialized Array/List object that can contain any type of data.
	*
	*<p>The advantage of using the<em>SFSArray</em>class(for example as a nested object inside a<em>SFSObject</em>object)is that you can fine tune the way your data is transmitted over the network.
	* For instance, when transmitting a list of numbers between<code>0</code>and<code>100</code>, those values can be treated as normal Integers(which take 32 bits each), but also as shorts(16 bit)or even as bytes(8 bit).</p>
	*
	*<p><em>SFSArray</em>supports many primitive data types and related arrays of primitives(see the<em>SFSDataType</em>class). It also allows to serialize class instances and rebuild them on the other side(client or server).
	* Check the SmartFoxServer 2X documentation for more informations on this advanced topic.</p>
	*
	* @see 	SFSObject
	* @see 	SFSDataType
 */
class SFSArray {}
#end
