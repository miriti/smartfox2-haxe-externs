package com.smartfoxserver.v2;
import com.smartfoxserver.v2.entities.managers.SFSUserManager;
import com.smartfoxserver.v2.entities.Room;
import com.smartfoxserver.v2.entities.User;
import com.smartfoxserver.v2.core.SFSEvent;


class SmartFoxWrapper //extends SmartFox
{
    var sfsExt:SmartFox = new SmartFox();
    public var currentPort:Int;
    public var currentIp:String;
    public var isJoining:Bool;
    public var currentZone:String;
    public var useSSL:Bool;

    public function new()
    {
        sfsExt.addEventListener(SFSEvent.LOGIN, onSFSLoginSuccess);
    }
//    var data:Dynamic = {};
//    public var currentPort(get, null):Int;
//    inline function get_currentPort():Int
//    {
//        return data.currentPort;
//    }
    public var isConnected(get, null):Bool;
     function get_isConnected():Bool
    {
        return sfsExt.isConnected;
    }

    public var lastJoinedRoom(get, never):Room;
    function get_lastJoinedRoom():Room
    {
        return sfsExt.lastJoinedRoom;
    }
    public var userManager(get, never):SFSUserManager;
    function get_userManager():SFSUserManager
    {
        return sfsExt.userManager;
    }

    public function getRoomListFromGroup(groupId:String):Array<Room>
    {
        return sfsExt.getRoomListFromGroup(groupId);
    }

    public var mySelf(get, never):User;
    function get_mySelf():User
    {
        return sfsExt.mySelf;
    }
    public var debug(get, set):Bool;
    function get_debug():Bool
    {
        return sfsExt.debug;
    }

    function set_debug(val:Bool):Bool
    {
        sfsExt.debug = val;
        return val;
    }

    public function  disconnect():Void
    {
        sfsExt.disconnect();
    }
    public function addEventListener(type:String, handler:Dynamic, ?scope:Dynamic):Void
    {
        sfsExt.addEventListener(type, handler, scope);
    }

    public function removeEventListener(type:String, handler:Dynamic, ?scope:Dynamic):Void
    {
        sfsExt.removeEventListener(type, handler);
    }
    public function send(request:Dynamic):Void
    {
        if (request._extCmd != "U")
        {
            trace("SmartFoxWrapper :: send " + request);

        }
        sfsExt.send(request);
    }
	public function connect(?host:String, ?port:Int, ?useSSL_:Bool):Void
	{

		currentPort = port;
		currentIp = host;
		useSSL = useSSL_;
        sfsExt.connect(host, port, useSSL_);
	}

    private function onSFSLoginError(event:SFSEvent):Void {
        currentZone = null;

    }
    private function onSFSLoginSuccess(event:SFSEvent):Void {
        currentZone  = event.zone;

    }
}