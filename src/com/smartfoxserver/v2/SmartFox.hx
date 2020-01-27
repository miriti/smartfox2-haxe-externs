package com.smartfoxserver.v2;

#if html5
import com.smartfoxserver.v2.entities.Room;
import com.smartfoxserver.v2.entities.User;
import com.smartfoxserver.v2.entities.managers.IBuddyManager;
import com.smartfoxserver.v2.entities.managers.IRoomManager;
import com.smartfoxserver.v2.util.ConnectionMode;

typedef ConfigObj = {
	var host:String;
	var port:Int;
	var useSSL:Bool;
	var zone:String;
	var debug:Bool;
}

@:native('SFS2X.SmartFox') extern class SmartFox {
	public var buddyManager:IBuddyManager;
	public var config:Dynamic;
	public var debug:Bool;
	public var useBlueBox:Bool;
	public var lastJoinedRoom:Room;
	public var logger:Dynamic;
	public var mySelf:User;
	public var roomManager:IRoomManager;
	public var sessionToken:Dynamic;
	public var userManager:com.smartfoxserver.v2.entities.managers.SFSUserManager;
	public var version:String;
	public var isConnected:Bool;
	public var currentIp(get, null):String;
	public var currentPort(get, null):Int;
	public var currentZone(get, null):String;
	public var isJoining(get, set):Bool;
	public function new(?configObj:ConfigObj):Void;
	inline function addEventListener(evtType:String, listener:Dynamic, ?scope:Dynamic):Void {
		addEventListener(evtType, listener, untyped __js__('this'));
	}
	public function connect(?host:String, ?port:Float, ?useSSL:Bool):Void;
	public function disconnect():Void;
	public function enableLagMonitor(enabled:Bool, interval:Float, queueSize:Float):Void;
	public function getJoinedRooms():Dynamic;
	public function getMaxMessageSize():Float;
	public function getRoomById(id:Int):Dynamic;
	public function getRoomByName(name:String):Dynamic;
	public function getRoomList():Array<Room>;
	public function getRoomListFromGroup(groupId:Int):Array<Room>;
	public function removeEventListener(evtType:Dynamic, listener:Dynamic):Void;
	public function send(request:Dynamic):Void;
	public function setClientDetails(platformId:Int, version:String):Void;
	public var roomList(get, null):Array<Room>;
	inline function get_roomList():Array<Room> {
		return this.getRoomList();
	}
	public var connectionMode(get, null):String;
	inline function get_connectionMode():String {
		return ConnectionMode.SOCKET;
	}
}
#else
class SmartFox {
	public function new(?configObj:Dynamic) {}

	public function connect():Void {}
}
#end
