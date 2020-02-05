package com.smartfoxserver.v2.core;

import openfl.events.Event;

#if html5
class SFSEvent extends Event {
	public function new(type:String, params:Dynamic):Void {
		super(type);
		this.params = params;
	}

	public var params:Dynamic;

	public static inline var ADMIN_MESSAGE:String = "adminMessage";
	public static inline var CONNECTION:String = "connection";
	public static inline var CONNECTION_ATTEMPT_HTTP:String = "connectionAttemptHttp"; // WARNING@Michael: There's no such value in the smartfox js library (check SFS2X.SFSEvent)
	public static inline var CONNECTION_LOST:String = "connectionLost";
	public static inline var EXTENSION_RESPONSE:String = "extensionResponse";
	public static inline var HANDSHAKE:String = "handshake";
	public static inline var INVITATION:String = "invitation";
	public static inline var INVITATION_REPLY:String = "invitationReply";
	public static inline var INVITATION_REPLY_ERROR:String = "invitationReplyError";
	public static inline var LOGIN:String = "login";
	public static inline var LOGIN_ERROR:String = "loginError";
	public static inline var LOGOUT:String = "logout";
	public static inline var MMOITEM_VARIABLES_UPDATE:String = "mmoItemVariablesUpdate";
	public static inline var MODERATOR_MESSAGE:String = "moderatorMessage";
	public static inline var OBJECT_MESSAGE:String = "objectMessage";
	public static inline var PING_PONG:String = "pingPong";
	public static inline var PLAYER_TO_SPECTATOR:String = "playerToSpectator";
	public static inline var PLAYER_TO_SPECTATOR_ERROR:String = "playerToSpectatorError";
	public static inline var PRIVATE_MESSAGE:String = "privateMessage";
	public static inline var PROXIMITY_LIST_UPDATE:String = "proximityListUpdate";
	public static inline var PUBLIC_MESSAGE:String = "publicMessage";
	public static inline var ROOM_ADD:String = "roomAdd";
	public static inline var ROOM_CAPACITY_CHANGE:String = "roomCapacityChange";
	public static inline var ROOM_CAPACITY_CHANGE_ERROR:String = "roomCapacityChangeError";
	public static inline var ROOM_CREATION_ERROR:String = "roomCreationError";
	public static inline var ROOM_FIND_RESULT:String = "roomFindResult";
	public static inline var ROOM_GROUP_SUBSCRIBE:String = "roomGroupSubscribe";
	public static inline var ROOM_GROUP_SUBSCRIBE_ERROR:String = "roomGroupSubscribeError";
	public static inline var ROOM_GROUP_UNSUBSCRIBE:String = "roomGroupUnsubscribe";
	public static inline var ROOM_GROUP_UNSUBSCRIBE_ERROR:String = "roomGroupUnsubscribeError";
	public static inline var ROOM_JOIN:String = "roomJoin";
	public static inline var ROOM_JOIN_ERROR:String = "roomJoinError";
	public static inline var ROOM_NAME_CHANGE:String = "roomNameChange";
	public static inline var ROOM_NAME_CHANGE_ERROR:String = "roomNameChangeError";
	public static inline var ROOM_PASSWORD_STATE_CHANGE:String = "roomPasswordStateChange";
	public static inline var ROOM_PASSWORD_STATE_CHANGE_ERROR:String = "roomPasswordStateChangeError";
	public static inline var ROOM_REMOVE:String = "roomRemove";
	public static inline var ROOM_VARIABLES_UPDATE:String = "roomVariablesUpdate";
	public static inline var SOCKET_ERROR:String = "socketError";
	public static inline var SPECTATOR_TO_PLAYER:String = "spectatorToPlayer";
	public static inline var SPECTATOR_TO_PLAYER_ERROR:String = "spectatorToPlayerError";
	public static inline var UDP_INIT:String = "udpInit"; // WARNING@Michael: There's no such value in the smartfox js library (check SFS2X.SFSEvent)
	public static inline var USER_COUNT_CHANGE:String = "userCountChange";
	public static inline var USER_ENTER_ROOM:String = "userEnterRoom";
	public static inline var USER_EXIT_ROOM:String = "userExitRoom";
	public static inline var USER_FIND_RESULT:String = "userFindResult";
	public static inline var USER_VARIABLES_UPDATE:String = "userVariablesUpdate";
}
#else
class SFSEvent {}
#end
