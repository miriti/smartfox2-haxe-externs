package com.smartfoxserver.v2.entities.data;

#if html5
@:native('SFS2X.SFSObject') extern class SFSObject {
	inline static function newInstance():SFSObject {
		return new SFSObject();
	}
	function new();
	function get(key:Dynamic, ?typeId:Int):Dynamic;
	function getBool(key:String):Bool;
	function getBoolArray(key:String):Array<Bool>;
	function getByte(key:String):Int;
	inline function getByteArray(key:String):openfl.utils.ByteArray {
		var arrInt:Array<Int> = this.get(key, SFSDataType.BYTE_ARRAY);
		var bt:haxe.io.Bytes = haxe.io.Bytes.alloc(arrInt.length);
		for (i in 0...arrInt.length)
			bt.set(i, arrInt[i]);
		return openfl.utils.ByteArray.fromBytes(bt);
	}
	inline function getData(key:String):SFSDataWrapper {
		return getWrappedItem(key);
	}
	function getDouble(key:String):Int;
	function getDoubleArray(key:String):Array<Int>;
	function getDump(?format:Dynamic):String;
	function getFloat(key:String):Float;
	function getFloatArray(key:String):Array<Float>;
	function getHexDump():String;
	function getInt(key:String):Int;
	function getIntArray(key:String):Array<Int>;
	function getKeysArray():Array<String>;
	inline function getKeys():Array<String> {
		return getKeysArray();
	}
	function getLong(key:String):Float;

	function getLongArray(key:String):Array<Float>;
	function getSFSArray(key:String):SFSArray;
	function getSFSObject(key:String):SFSObject;
	function getShort(key:String):Int;
	function getShortArray(key:String):Array<Int>;
	function getText(key:String):String;
	function getUtfString(key:String):String;
	function getUtfStringArray(key:String):Array<String>;
	function getWrappedItem(key:String):SFSDataWrapper;
	function isNull(key:String):Bool;
	@:overload(function(key:String, value:Dynamic, typeId:Int):Void {})
	inline function put(key:String, dataWrapper:SFSDataWrapper):Void {
		put(key, dataWrapper.data, dataWrapper.type);
	}
	function putBool(key:String, value:Bool):Void;
	function putBoolArray(key:String, array:Array<Bool>):Void;
	function putByte(key:String, value:Int):Void;
	function putByteArray(key:String, array:Array<Int>):Void;
	function putDouble(key:String, value:Float):Void;
	function putDoubleArray(key:String, array:Array<Float>):Void;

	function putFloat(key:String, value:Float):Void;
	function putFloatArray(key:String, array:Array<Float>):Void;
	function putInt(key:String, value:Int):Void;
	function putIntArray(key:String, array:Array<Int>):Void;
	function putLong(key:String, value:Float):Void;
	function putLongArray(key:String, array:Array<Float>):Void;
	function putNull(key:String):Void;
	function putSFSArray(key:String, value:SFSArray):Void;
	function putSFSObject(key:String, value:SFSObject):Void;
	function putShort(key:String, value:Int):Void;
	function putShortArray(key:String, array:Array<Int>):Void;
	function putText(key:String, value:String):Void;
	function putUtfString(key:String, value:String):Void;
	function putUtfStringArray(key:String, array:Array<String>):Void;
	function size():Int;

	function containsKey(key:String):Bool;

	inline function toObject():Dynamic {
		return this;
	}
}
#else
class SFSObject {}
#end
