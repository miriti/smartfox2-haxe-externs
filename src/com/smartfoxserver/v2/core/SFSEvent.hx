package com.smartfoxserver.v2.core;

#if html5
@:native('SFS2X.SFSEvent') extern class SFSEvent {
	public function new(type:String, params:Dynamic):Void;
	public var params:Dynamic;
	public static var CONNECTION:String;
	public static var CONNECTION_LOST:String;
	public static var UDP_INIT:String;
	public static var CONNECTION_ATTEMPT_HTTP:String;
	public static var LOGIN:String;
	public static var LOGIN_ERROR:String;

	public static var OBJECT_MESSAGE:String;
	public static var ROOM_ADD:String;
	public static var ROOM_JOIN:String;
	public static var USER_ENTER_ROOM:String;
	public static var USER_EXIT_ROOM:String;
	public static var EXTENSION_RESPONSE:String;
	public static var ROOM_VARIABLES_UPDATE:String;
	public static var USER_VARIABLES_UPDATE:String;
	public static var ADMIN_MESSAGE:String;
}
#else
class SFSEvent {}
#end
