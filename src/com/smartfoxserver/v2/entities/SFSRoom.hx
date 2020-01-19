package com.smartfoxserver.v2.entities;

#if html5
import com.smartfoxserver.v2.entities.managers.IRoomManager;
import com.smartfoxserver.v2.entities.managers.SFSRoomManager;
import com.smartfoxserver.v2.entities.variables.RoomVariable;

@:native('SFS2X.SFSRoom') extern class SFSRoom {
	var capacity:Int;
	var groupId:Int;
	var id:Int;
	var isGame:Bool;
	var isHidden:Bool;
	var isJoined:Bool;
	var isPasswordProtected:Bool;
	var maxSpectators:Int;
	var maxUsers:Int;
	var name:String;
	var properties:Dynamic;
	var spectatorCount:Int;
	var userCount:Int;

	public function new();

	function containsUser(user:SFSUser):Bool;
	function containsVariable(varName:String):Bool;
	function getPlayerList():Array<SFSUser>;
	function getRoomManager():SFSRoomManager;
	function getSpectatorList():Array<SFSUser>;
	function getUserById(id:Int):SFSUser;
	function getUserByName(name:String):SFSUser;
	function getUserList():Array<SFSUser>;
	function getVariable(varName:String):RoomVariable;
	function getVariables():Array<RoomVariable>;
	function toString():String;
	public var roomManager(get, set):IRoomManager;
	inline private function get_roomManager():IRoomManager {
		return getRoomManager();
	}
}
#else
class SFSRoom {}
#end
