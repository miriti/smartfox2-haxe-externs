/**
 * The SmartFoxServer 2X JavaScript API main class.
 *
 * @example
 * <caption>This example instantiates the SmartFox class passing a configuration object.</caption>
 * function init()
 * {
 * 	// Create configuration object
 * 	var config = {};
 * 	config.host = "127.0.0.1";
 * 	config.port = 8080;
 * 	config.useSSL = false;
 * 	config.zone = "BasicExamples";
 * 	config.debug = false;
 *
 * 	// Create SmartFox client instance
 * 	sfs = new SFS2X.SmartFox(config);
 * }
 *
 * @extends EventDispatcher
 */
export class SmartFox extends EventDispatcher {
    constructor(configObj?: any);
    /**
     * Indicates whether the client-server messages console debug is enabled or not.
     * <p>If set to <code>true</code>, detailed debugging informations for all the incoming and outgoing messages are provided in the browser's debug console (if available).
     * Debugging can be enabled when instantiating the <em>SmartFox</em> class too by means of the configuration object.</p>
     *
     * @type boolean
     */
    debug: boolean;
    /**
     * Returns the current version of the SmartFoxServer 2X JavaScript API.
     *
     * @type string
     *
     * @readonly
     */
    readonly version: string;
    /**
     * Returns the client configuration object passed during the <em>SmartFox</em> instance creation.
     *
     * @type object
     *
     * @readonly
     */
    readonly config: any;
    /**
     * Returns a reference to the internal <em>Logger</em> instance used by SmartFoxServer 2X.
     *
     * @type Logger
     *
     * @readonly
     */
    readonly logger: Logger;
    /**
     * Returns the unique session token of the client.
     * <p>The session token is a string sent by the server to the client after the initial handshake.<br/>
     * It is required as mean of identification when uploading files to the server (see specific documentation).</p>
     *
     * @type string
     *
     * @readonly
     */
    readonly sessionToken: string;
    /**
     * Returns a reference to the Room Manager.
     * <p>This manager is used internally by the SmartFoxServer 2X API; the reference returned by this property
     * gives access to the Rooms list and Groups, allowing interaction with <em>SFSRoom</em> objects.</p>
     *
     * @type SFSRoomManager
     *
     * @readonly
     */
    readonly roomManager: SFSRoomManager;
    /**
     * Returns a reference to the User Manager.
     * <p>This manager is used internally by the SmartFoxServer 2X API; the reference returned by this property
     * gives access to the users list, allowing interaction with <em>SFSUser</em> objects.</p>
     *
     * @type SFSUserManager
     *
     * @readonly
     */
    readonly userManager: SFSUserManager;
    /**
     * Returns a reference to the Buddy Manager.
     * <p>This manager is used internally by the SmartFoxServer 2X API; the reference returned by this property
     * gives access to the buddies list, allowing interaction with <em>Buddy</em> and <em>BuddyVariable</em> objects and access to user properties in the <b>Buddy List</b> system.</p>
     *
     * @type SFSBuddyManager
     *
     * @readonly
     */
    readonly buddyManager: SFSBuddyManager;
    /**
     * Returns the <em>SFSUser</em> object representing the client itself when connected to a SmartFoxServer 2X instance.
     *
     * <p>This object is generated upon successful login only, so it is <code>null</code> if login was not performed yet.</p>
     *
     * <p><b>NOTE</b>: setting the <em>mySelf</em> property manually can disrupt the API functioning.</p>
     *
     * @type SFSUser
     *
     * @see	SFSUser#isItMe
     * @see	LoginRequest
     *
     * @readonly
     */
    readonly mySelf: SFSUser;
    /**
     * Returns the object representing the last Room joined by the client, if any.
     *
     * <p>This property is <code>null</code> if no Room was joined.</p>
     *
     * @type SFSRoom
     *
     * @see	#getJoinedRooms
     * @see	JoinRoomRequest
     *
     * @readonly
     */
    readonly lastJoinedRoom: SFSRoom;
    /**
     * Indicates whether the client is connected to the server or not.
     *
     * @example
     * <caption>This example checks the connection status.</caption>
     * console.log("Am I connected? " + sfs.isConnected);
     *
     * @type boolean
     *
     * @readonly
     */
    readonly isConnected: boolean;
    /**
     * Returns the maximum size of messages allowed by the server.
     * <p>Any request exceeding this size will not be sent. The value is determined by the server configuration.</p>
     *
     * @type number
     *
     * @readonly
     */
    readonly maxMessageSize: number;
    /**
     * Allows to specify custom client details that will be used to gather statistics about the client platform via the AdminTool's Analytics Module.
     *
     * <p>By default no details are sent and the client type is the generic "JavaScript".</p>
     *
     * <p><b>NOTE</b>: this method must be called before the connection is started. The length of the two strings combined must be less than 512 characters.</p>
     *
     * @param	{string} platformId	An identification string for the client, like the browser name for example.
     * @param	{string} version	An additional string to describe the client version, like the browser version for example.
     */
    setClientDetails(platformId: string, version: string): void;
    /**
     * Establishes a connection between the client and a SmartFoxServer 2X instance.
     *
     * <p>If one or more arguments are missing, the client will use the corresponding settings passed during the <em>SmartFox</em> class instantiation.</p>
     *
     * @example
     * <caption>This example connects to a local SmartFoxServer 2X instance.</caption>
     * function someMethod()
     * {
     * 	sfs = new SFS2X.SmartFox();
     * 	sfs.addEventListener(SFS2X.SFSEvent.CONNECTION, onConnection, this);
     *
     * 	// Connect
     * 	sfs.connect(127.0.0.1, 8080);
     * }
     *
     * function onConnection(evtParams)
     * {
     * 	if (evtParams.success)
     * 		console.log("Connection established");
     * 	else
     * 		console.log("Connection failed");
     * }
     *
     * @param	{string} [host=null]		The address of the server to connect to.
     * @param	{number} [port=-1]			The TCP port to connect to.
     * @param	{boolean} [useSSL=null]		Use an encrypted SSL connection.
     *
     * @see	#disconnect
     * @see	SFSEvent.CONNECTION
     */
    connect(host?: string, port?: number, useSSL?: boolean): void;
    /**
     * Closes the connection between the client and the SmartFoxServer 2X instance.
     *
     * @see	#connect
     * @see	SFSEvent.CONNECTION_LOST
     */
    disconnect(): void;
    /**
     * Enables the automatic realtime monitoring of the lag between the client and the server (round robin).
     *
     * <p>When turned on, the <em>pingPong</em> event type is dispatched continuously, providing the average of the last ten measured lag values.
     * The lag monitoring is automatically halted when the user logs out of a Zone or gets disconnected.</p>
     *
     * <p><b>NOTE</b>: the lag monitoring can be enabled after the login has been completed successfully only.</p>
     *
     * @param	{boolean} enabled		The lag monitoring status: <code>true</code> to start the monitoring, <code>false</code> to stop it.
     * @param	{number} [interval=4] 	The amount of seconds to wait between each query (recommended 3-4s).
     * @param	{number} [queueSize=10]	The amount of values stored temporarily and used to calculate the average lag.
     *
     * @see	SFSEvent.PING_PONG
     */
    enableLagMonitor(enabled: boolean, interval?: number, queueSize?: number): void;
    /**
     * Sends a request to the server.
     *
     * @example
     * <caption>This example shows how to send a login request.</caption>
     * sfs.send(new SFS2X.LoginRequest("KermitTheFrog", "kermitPwd", null, "TheMuppetZone"));
     *
     * @example
     * <caption>This example sends a "join room" request.</caption>
     * sfs.send(new SFS2X.JoinRoomRequest("Lobby"));
     *
     * @example
     * <caption>This example creates an object containing some parameters and sends it to the server-side Extension.</caption>
     * var params = new SFS2X.SFSObject();
     * params.putInt("x", 10);
     * params.putInt("y", 37);
     *
     * sfs.send(new SFS2X.ExtensionRequest("setPosition", params));
     *
     * @param	{BaseRequest} request	A request object.
     */
    send(request: BaseRequest): void;
    /**
     * Retrieves a <em>SFSRoom</em> object from its id.
     *
     * <p><b>NOTE</b>: the same object is returned by the <em>SFSRoomManager.getRoomById()</em> method, accessible through the <em>roomManager</em> property;
     * this was replicated on the <em>SmartFox</em> class for handy access due to its usually frequent usage.</p>
     *
     * @example
     * <caption>This example retrieves a SFSRoom object and traces its name.</caption>
     * var roomId = 3;
     * var room = sfs.getRoomById(roomId);
     * console.log("The name of Room " + roomId + " is " + room.name);
     *
     * @param	{number} id	The id of the Room.
     *
     * @returns {SFSRoom} The object representing the requested Room; <code>undefined</code> if no <em>SFSRoom</em> object with the passed id exists in the Rooms list.
     *
     * @see	#getRoomByName
     * @see	SFSRoomManager#getRoomById
     * @see	SFSRoom
     */
    getRoomById(id: number): SFSRoom;
    /**
     * Retrieves a <em>SFSRoom</em> object from its name.
     *
     * <p><b>NOTE</b>: the same object is returned by the <em>SFSRoomManager.getRoomByName()</em> method, accessible through the <em>roomManager</em> property;
     * this was replicated on the <em>SmartFox</em> class for handy access due to its usually frequent usage.</p>
     *
     * @example
     * <caption>This example retrieves a SFSRoom object and traces its id.</caption>
     * var roomName = "The Lobby";
     * var room = sfs.getRoomByName(roomName);
     * console.log("The ID of Room '" + roomName + "' is " + room.id);
     *
     * @param	{string} name	The name of the Room.
     *
     * @returns	{SFSRoom} The object representing the requested Room; <code>undefined</code> if no <em>SFSRoom</em> object with the passed name exists in the Rooms list.
     *
     * @see	#getRoomById
     * @see	SFSRoomManager#getRoomByName
     * @see	SFSRoom
     */
    getRoomByName(name: string): SFSRoom;
    /**
     * Returns the list of <em>SFSRoom</em> objects representing the Rooms currently "watched" by the client.
     *
     * <p>The list contains all the Rooms that are currently joined and all the Rooms belonging to the Room Groups that have been subscribed by the client.</p>
     *
     * <p><b>NOTE 1</b>: at login time, the client automatically subscribes all the Room Groups specified in the Zone's <b>Default Room Groups</b> setting.</p>
     *
     * <p><b>NOTE 2</b>: the same list is returned by the <em>SFSRoomManager.getRoomList()</em> method, accessible through the <em>roomManager</em> property;
     * this was replicated on the <em>SmartFox</em> class for handy access due to its usually frequent usage.</p>
     *
     * @returns	{SFSRoom[]} The list of <em>SFSRoom</em> objects representing the Rooms available on the client.
     *
     * @see	#roomManager
     * @see JoinRoomRequest
     * @see SubscribeRoomGroupRequest
     * @see UnsubscribeRoomGroupRequest
     */
    getRoomList(): SFSRoom[];
    /**
     * Retrieves the list of Rooms which are part of the specified Room Group.
     *
     * <p><b>NOTE</b>: the same list is returned by the <em>SFSRoomManager.getRoomListFromGroup()</em> method, accessible through the <em>roomManager</em> property;
     * this was replicated on the <em>SmartFox</em> class for handy access due to its usually frequent usage.</p>
     *
     * @param	{string} groupId	The name of the Group.
     *
     * @returns	{SFSRoom[]} The list of <em>SFSRoom</em> objects belonging to the passed Group.
     *
     * @see	SFSRoomManager#getRoomListFromGroup
     * @see	SFSRoom
     */
    getRoomListFromGroup(groupId: string): SFSRoom[];
    /**
     * Returns a list of <em>SFSRoom</em> objects representing the Rooms currently joined by the client.
     *
     * <p><b>NOTE</b>: the same list is returned by the <em>SFSRoomManager.getJoinedRooms()</em> method, accessible through the <em>roomManager</em> property;
     * this was replicated on the <em>SmartFox</em> class for handy access due to its usually frequent usage.</p>
     *
     * @returns	{SFSRoom[]} The list of <em>SFSRoom</em> objects representing the Rooms joined by the client.
     *
     * @see	#lastJoinedRoom
     * @see	#roomManager
     * @see	SFSRoom
     * @see	JoinRoomRequest
     */
    getJoinedRooms(): SFSRoom[];
    /**
     * Registers an event listener function that will receive notification of an event.
     *
     * <p>If you no longer need an event listener, remove it by calling the <em>removeEventListener()</em> method, or memory issues could arise.
     * In fact event listeners are not automatically removed from memory.</p>
     *
     * @example
     * <caption>This example shows how to add a number of common event listeners to the SmartFox instance, usually during initialization:</caption>
     * function init()
     * {
     * 	sfs = new SFS2X.SmartFox();
     *
     * 	// Add LoggerEvent listeners
     * 	sfs.logger.addEventListener(SFS2X.LoggerEvent.DEBUG, onDebugMessage, this);
     * 	sfs.logger.addEventListener(SFS2X.LoggerEvent.INFO, onInfoMessage, this);
     * 	sfs.logger.addEventListener(SFS2X.LoggerEvent.WARNING, onWarningMessage, this);
     * 	sfs.logger.addEventListener(SFS2X.LoggerEvent.ERROR, onErrorMessage, this);
     *
     * 	// Add SFSEvent listeners
     * 	sfs.addEventListener(SFS2X.SFSEvent.CONNECTION, onConnection, this);
     * 	sfs.addEventListener(SFS2X.SFSEvent.CONNECTION_LOST, onConnectionLost, this);
     * 	sfs.addEventListener(SFS2X.SFSEvent.LOGIN_ERROR, onLoginError, this);
     * 	sfs.addEventListener(SFS2X.SFSEvent.LOGIN, onLogin, this);
     * 	sfs.addEventListener(SFS2X.SFSEvent.LOGOUT, onLogout, this);
     * 	sfs.addEventListener(SFS2X.SFSEvent.ROOM_JOIN_ERROR, onRoomJoinError, this);
     * 	sfs.addEventListener(SFS2X.SFSEvent.ROOM_JOIN, onRoomJoin, this);
     * }
     *
     * @param	{string} evtType	The type of event to listen to, among those available in the <em>SFSEvent</em>, <em>SFSBuddyEvent</em> and <em>LoggerEvent</em> classes.
     * @param	{function} callback	The listener function that processes the event. This function should accept an object as its only parameter, which in turn contains the event parameters.
     * @param	{object} scope		The object that acts as a context for the event listener: it is the object that acts as a "parent scope" for the callback function, thus providing context (i.e. access to variables and other mehtods) to the function itself.
     *
     * @see		SFSEvent
     * @see		SFSBuddyEvent
     * @see		LoggerEvent
     * @see		#removeEventListener
     */
    addEventListener(evtType: string, callback: (...params: any[]) => any, scope: any): void;
    /**
     * Removes an event listener.
     *
     * @param	{string} evtType	The type of event to remove, among those available in the <em>SFSevent</em>, <em>SFSBuddyEvent</em> and <em>LoggerEvent</em> classes.
     * @param	{function} callback	The listener function to be removed.
     *
     * @see		SFSEvent
     * @see		SFSBuddyEvent
     * @see		#addEventListener
     */
    removeEventListener(evtType: string, callback: (...params: any[]) => any): void;
}

/**
 * The EventDispatcher class is the base class for all classes that dispatch events.
 */
export class EventDispatcher {
    constructor();
    /**
     * Registers an event listener function that will receive notification of an event.
     *
     * <p>If you no longer need an event listener, remove it by calling the <em>removeEventListener()</em> method, or memory issues could arise.
     * In fact event listeners are not automatically removed from memory.</p>
     *
     * @example
     * <caption>This example shows how to add a number of common event listeners to the SmartFox instance, usually during initialization:</caption>
     * function init()
     * {
     * 	sfs = new SFS2X.SmartFox();
     *
     * 	// Add LoggerEvent listeners
     * 	sfs.logger.addEventListener(SFS2X.LoggerEvent.DEBUG, onDebugMessage, this);
     * 	sfs.logger.addEventListener(SFS2X.LoggerEvent.INFO, onInfoMessage, this);
     * 	sfs.logger.addEventListener(SFS2X.LoggerEvent.WARNING, onWarningMessage, this);
     * 	sfs.logger.addEventListener(SFS2X.LoggerEvent.ERROR, onErrorMessage, this);
     *
     * 	// Add SFSEvent listeners
     * 	sfs.addEventListener(SFS2X.SFSEvent.CONNECTION, onConnection, this);
     * 	sfs.addEventListener(SFS2X.SFSEvent.CONNECTION_LOST, onConnectionLost, this);
     * 	sfs.addEventListener(SFS2X.SFSEvent.LOGIN_ERROR, onLoginError, this);
     * 	sfs.addEventListener(SFS2X.SFSEvent.LOGIN, onLogin, this);
     * 	sfs.addEventListener(SFS2X.SFSEvent.LOGOUT, onLogout, this);
     * 	sfs.addEventListener(SFS2X.SFSEvent.ROOM_JOIN_ERROR, onRoomJoinError, this);
     * 	sfs.addEventListener(SFS2X.SFSEvent.ROOM_JOIN, onRoomJoin, this);
     * }
     *
     * @param	{string} evtType	The type of event to listen to, among those available in the <em>SFSEvent</em>, <em>SFSBuddyEvent</em> and <em>LoggerEvent</em> classes.
     * @param	{function} callback	The listener function that processes the event. This function should accept an object as its only parameter, which in turn contains the event parameters.
     * @param	{object} scope		The object that acts as a context for the event listener: it is the object that acts as a "parent scope" for the callback function, thus providing context (i.e. access to variables and other mehtods) to the function itself.
     *
     * @see		SFSEvent
     * @see		SFSBuddyEvent
     * @see		LoggerEvent
     * @see		#removeEventListener
     */
    addEventListener(evtType: string, callback: (...params: any[]) => any, scope: any): void;
    /**
     * Removes an event listener.
     *
     * @param	{string} evtType	The type of event to remove, among those available in the <em>SFSevent</em>, <em>SFSBuddyEvent</em> and <em>LoggerEvent</em> classes.
     * @param	{function} callback	The listener function to be removed.
     *
     * @see		SFSEvent
     * @see		SFSBuddyEvent
     * @see		#addEventListener
     */
    removeEventListener(evtType: string, callback: (...params: any[]) => any): void;
}

/**
 * <b>Developers never istantiate the <em>SFSEvent</em> class</b>: only use its static properties.
 *
 * <p>The constants contained in this class are used to register the event listeners; when an event is dispatched, an object containing event-specific parameters is passed to the listener.
 * See the documentation below for a description of the parameters available for each event.</p>
 *
 * @example
 * <caption>This example shows the generic approach to be implemented to listen to events; please refer to the specific event types for the parameters object content.</caption>
 * var sfs = null;
 *
 * function init()
 * {
 * 	// Create SmartFox client instance
 * 	sfs = new SFS2X.SmartFox();
 *
 * 	// Add event listener for connection
 * 	sfs.addEventListener(SFS2X.SFSEvent.CONNECTION, onConnection, this);
 *
 * 	// Connect to the server
 * 	sfs.connect("127.0.0.1", 8080);
 * }
 *
 * // Handle connection event
 * function onConnection(evtParams)
 * {
 * 	if (evtParams.success)
 * 		console.log("Connected to SmartFoxServer 2X!");
 * 	else
 * 		console.log("Connection failed. Is the server running at all?");
 * }
 *
 * @class
 * The main event types dispatched by the SmartFoxServer 2X JavaScript API.
 */
export class SFSEvent {
    constructor();
    /**
     * The <em>connection</em> event type, dispatched when a connection between the client and a SmartFoxServer 2X instance is attempted.
     *
     * <p>This event is fired in response to a call to the <em>SmartFox.connect()</em> method.</p>
     *
     * <table class="jsdoc-details-table">
     * <caption>The object passed to the listener contains the following parameters:</caption>
     * <tr><th>Property</th><th>Type</th><th>Description</th></tr>
     * <tr><td>success</td><td>boolean</td><td>The connection result: <code>true</code> if a connection was established, <code>false</code> otherwise.</td></tr>
     * </table>
     *
     * @example
     * <caption>This example starts a connection.</caption>
     * function someMethod()
     * {
     * 	sfs = new SFS2X.SmartFox();
     * 	sfs.addEventListener(SFS2X.SFSEvent.CONNECTION, onConnection, this);
     *
     * 	sfs.connect(127.0.0.1, 8080);
     * }
     *
     * function onConnection(evtParams)
     * {
     * 	if (evtParams.success)
     * 		console.log("Connection established");
     * 	else
     * 		console.log("Connection failed");
     * }
     *
     * @constant {string}
     * @memberof SFSEvent
     *
     * @see	SmartFox#connect
     * @see	SFSEvent.CONNECTION_LOST
     */
    static readonly CONNECTION: string;
    /**
     * The <em>connectionLost</em> event type, dispatched when the connection between the client and the SmartFoxServer 2X instance is interrupted.
     *
     * <p>This event is fired in response to a call to the <em>SmartFox.disconnect()</em> method.</p>
     *
     * <table class="jsdoc-details-table">
     * <caption>The object passed to the listener contains the following parameters:</caption>
     * <tr><th>Property</th><th>Type</th><th>Description</th></tr>
     * <tr><td>reason</td><td>string</td><td>The reason of the disconnection, among those available in the <em>ClientDisconnectionReason</em> class.</td></tr>
     * </table>
     *
     * @example
     * <caption>This example handles a disconnection event:</caption>
     * function someMethod()
     * {
     * 	sfs.addEventListener(SFS2X.SFSEvent.CONNECTION_LOST, onConnectionLost, this);
     * }
     *
     * function onConnectionLost(evtParams)
     * {
     * 	var reason = evtParams.reason;
     *
     * 	if (reason != SFS2X.ClientDisconnectionReason.MANUAL)
     * 	{
     * 		if (reason == SFS2X.ClientDisconnectionReason.IDLE)
     * 			console.log("A disconnection occurred due to inactivity");
     * 		else if (reason == SFS2X.ClientDisconnectionReason.KICK)
     * 			console.log("You have been kicked by the moderator");
     * 		else if (reason == SFS2X.ClientDisconnectionReason.BAN)
     * 			console.log("You have been banned by the moderator");
     * 		else
     * 			console.log("A disconnection occurred due to unknown reason; please check the server log");
     * 	}
     * 	else
     * 	{
     * 		// Manual disconnection is usually ignored
     * 	}
     * }
     *
     * @constant {string}
     * @memberof SFSEvent
     *
     * @see	SmartFox#disconnect
     * @see	ClientDisconnectionReason
     * @see	SFSEvent.CONNECTION
     */
    static readonly CONNECTION_LOST: string;
    /**
     * The <em>login</em> event type, dispatched when the current user performs a successful login in a server Zone.
     *
     * <p>This event is fired in response to the <em>LoginRequest</em> request.</p>
     *
     * <table class="jsdoc-details-table">
     * <caption>The object passed to the listener contains the following parameters:</caption>
     * <tr><th>Property</th><th>Type</th><th>Description</th></tr>
     * <tr><td>user</td><td>{@link SFSUser}</td><td>An object representing the user who performed the login.</td></tr>
     * <tr><td>data</td><td>{@link SFSObject}</td><td>A <em>SFSObject</em> containing custom parameters returned by a custom login system, if any.</td></tr>
     * </table>
     *
     * @example
     * <caption>This example performs a login in the "BasicExamples" Zone:</caption>
     * function someMethod()
     * {
     * 	sfs.addEventListener(SFS2X.SFSEvent.LOGIN, onLogin, this);
     * 	sfs.addEventListener(SFS2X.SFSEvent.LOGIN_ERROR, onLoginError, this);
     *
     * 	// Login
     * 	sfs.send(new SFS2X.LoginRequest("FozzieTheBear", "", "BasicExamples"));
     * }
     *
     * function onLogin(evtParams)
     * {
     * 	console.log("Login successful!");
     * }
     *
     * function onLoginError(evtParams
     * {
     * 	console.log("Login failure: " + evtParams.errorMessage);
     * }
     *
     * @constant {string}
     * @memberof SFSEvent
     *
     * @see LoginRequest
     */
    static readonly LOGIN: string;
    /**
     * The <em>loginError</em> event type, dispatched if an error occurs while the user login is being performed.
     *
     * <p>This event is fired in response to the <em>LoginRequest</em> request in case the operation failed.</p>
     *
     * <table class="jsdoc-details-table">
     * <caption>The object passed to the listener contains the following parameters:</caption>
     * <tr><th>Property</th><th>Type</th><th>Description</th></tr>
     * <tr><td>errorMessage</td><td>string</td><td>A message containing the description of the error.</td></tr>
     * <tr><td>errorCode</td><td>number</td><td>The error code.</td></tr>
     * </table>
     *
     * <p>See the example provided in the <em>LOGIN</em> constant description.</p>
     *
     * @constant {string}
     * @memberof SFSEvent
     *
     * @see		LoginRequest
     * @see		SFSEvent.LOGIN
     */
    static readonly LOGIN_ERROR: string;
    /**
     * The <em>logout</em> event type, dispatched when the current user performs logs out of the server Zone.
     *
     * <p>This event is fired in response to the <em>LogoutRequest</em> request.</p>
     *
     * <table class="jsdoc-details-table">
     * <caption>No parameters are available for this event object.</caption>
     * </table>
     *
     * @example
     * <caption>This example performs a logout from the current Zone.</caption>
     * function someMethod()
     * {
     * 	sfs.addEventListener(SFS2X.SFSEvent.LOGOUT, onLogout, this);
     *
     * 	// Logout
     * 	sfs.send(new SFS2X.Requests.System.LogoutRequest());
     * }
     *
     * function onLogout(evtParams)
     * {
     * 	console.log("Logout executed!");
     * }
     *
     * @constant {string}
     * @memberof SFSEvent
     *
     * @see		LogoutRequest
     * @see		SFSEvent.LOGIN
     */
    static readonly LOGOUT: string;
    /**
     * The <em>roomAdd</em> event type, dispatched when a new Room is created inside the Zone under any of the Room Groups that the client subscribed.
     *
     * <p>This event is fired in response to the <em>CreateRoomRequest</em> and <em>CreateSFSGameRequest</em> requests in case the operation is executed successfully.</p>
     *
     * <table class="jsdoc-details-table">
     * <caption>The object passed to the listener contains the following parameters:</caption>
     * <tr><th>Property</th><th>Type</th><th>Description</th></tr>
     * <tr><td>room</td><td>{@link SFSRoom}</td><td>An object representing the Room that was created.</td></tr>
     * </table>
     *
     * @example
     * <caption>This example creates a new chat Room.</caption>
     * function someMethod()
     * {
     * 	sfs.addEventListener(SFS2X.SFSEvent.ROOM_ADD, onRoomCreated, this);
     * 	sfs.addEventListener(SFS2X.SFSEvent.ROOM_CREATION_ERROR, onRoomCreationError, this);
     *
     * 	// Define the settings of a new chat Room
     * 	var settings = new SFS2X.RoomSettings("My Chat Room");
     * 	settings.maxUsers = 40;
     * 	settings.groupId = "chats";
     *
     * 	// Create the Room
     * 	sfs.send(new SFS2X.CreateRoomRequest(settings));
     * }
     *
     * function onRoomCreated(evtParams)
     * {
     * 	console.log("Room created: " + evtParams.room);
     * }
     *
     * function onRoomCreationError(evtParams)
     * {
     * 	console.log("Room creation failure: " + evtParams.errorMessage);
     * }
     *
     * @constant {string}
     * @memberof SFSEvent
     *
     * @see	CreateRoomRequest
     * @see	CreateSFSGameRequest
     * @see	SFSEvent.ROOM_REMOVE
     * @see	SFSEvent.ROOM_CREATION_ERROR
     */
    static readonly ROOM_ADD: string;
    /**
     * The <em>roomCreationError</em> event type, dispatched if an error occurs while creating a new Room.
     *
     * <p>This event is fired in response to the <em>CreateRoomRequest</em> and <em>CreateSFSGameRequest</em> requests in case the operation failed.</p>
     *
     * <table class="jsdoc-details-table">
     * <caption>The object passed to the listener contains the following parameters:</caption>
     * <tr><th>Property</th><th>Type</th><th>Description</th></tr>
     * <tr><td>errorMessage</td><td>string</td><td>A message containing the description of the error.</td></tr>
     * <tr><td>errorCode</td><td>number</td><td>The error code.</td></tr>
     * </table>
     *
     * <p>See the example provided in the <em>ROOM_ADD</em> constant description.</p>
     *
     * @constant {string}
     * @memberof SFSEvent
     *
     * @see	CreateRoomRequest
     * @see	CreateSFSGameRequest
     * @see	SFSEvent.ROOM_ADD
     */
    static readonly ROOM_CREATION_ERROR: string;
    /**
     * The <em>roomRemove</em> event type, dispatched when a Room belonging to one of the Groups subscribed by the client is removed from the Zone.
     *
     * <table class="jsdoc-details-table">
     * <caption>The object passed to the listener contains the following parameters:</caption>
     * <tr><th>Property</th><th>Type</th><th>Description</th></tr>
     * <tr><td>room</td><td>{@link SFSRoom}</td><td>An object representing the Room that was removed.</td></tr>
     * </table>
     *
     * @example
     * <caption>This example shows how to handle this event type.</caption>
     * function someMethod()
     * {
     * 	sfs.addEventListener(SFS2X.SFSEvent.ROOM_REMOVE, onRoomRemoved, this);
     * }
     *
     * function onRoomRemoved(evtParams)
     * {
     * 	console.log("The following Room was removed: " + evtParams.room);
     * }
     *
     * @constant {string}
     * @memberof SFSEvent
     *
     * @see	SFSEvent.ROOM_ADD
     */
    static readonly ROOM_REMOVE: string;
    /**
     * The <em>roomJoin</em> event type, dispatched when a Room is joined by the current user.
     *
     * <p>This event is fired in response to the <em>JoinRoomRequest</em> and <em>QuickJoinGameRequest</em> requests in case the operation is executed successfully.</p>
     *
     * <table class="jsdoc-details-table">
     * <caption>The object passed to the listener contains the following parameters:</caption>
     * <tr><th>Property</th><th>Type</th><th>Description</th></tr>
     * <tr><td>room</td><td>{@link SFSRoom}</td><td>An object representing the Room that was joined.</td></tr>
     * </table>
     *
     * @example
     * <caption>This example makes the user join an existing Room.</caption>
     * function someMethod()
     * {
     * 	sfs.addEventListener(SFS2X.SFSEvent.ROOM_JOIN, onRoomJoined, this);
     * 	sfs.addEventListener(SFS2X.SFSEvent.ROOM_JOIN_ERROR, onRoomJoinError, this);
     *
     * 	// Join a Room called "Lobby"
     * 	sfs.send(new SFS2X.JoinRoomRequest("Lobby"));
     * }
     *
     * function onRoomJoined(evtParams)
     * {
     * 	console.log("Room joined successfully: " + evtParams.room);
     * }
     *
     * function onRoomJoinError(evtParams)
     * {
     * 	console.log("Room joining failed: " + evtParams.errorMessage);
     * }
     *
     * @constant {string}
     * @memberof SFSEvent
     *
     * @see	JoinRoomRequest
     * @see	QuickJoinGameRequest
     * @see	SFSEvent.ROOM_JOIN_ERROR
     */
    static readonly ROOM_JOIN: string;
    /**
     * The <em>roomJoinError</em> event type, dispatched when an error occurs while the current user is trying to join a Room.
     *
     * <p>This event is fired in response to the <em>JoinRoomRequest</em> request in case the operation failed.</p>
     *
     * <table class="jsdoc-details-table">
     * <caption>The object passed to the listener contains the following parameters:</caption>
     * <tr><th>Property</th><th>Type</th><th>Description</th></tr>
     * <tr><td>errorMessage</td><td>string</td><td>A message containing the description of the error.</td></tr>
     * <tr><td>errorCode</td><td>number</td><td>The error code.</td></tr>
     * </table>
     *
     * <p>See the example provided in the <em>ROOM_JOIN</em> constant description.</p>
     *
     * @constant {string}
     * @memberof SFSEvent
     *
     * @see JoinRoomRequest
     * @see	SFSEvent.ROOM_JOIN
     */
    static readonly ROOM_JOIN_ERROR: string;
    /**
     * The <em>userEnterRoom</em> event type, dispatched when one of the Rooms joined by the current user is entered by another user.
     *
     * <p>This event is caused by a <em>JoinRoomRequest</em> request; it might be fired or not depending on the Room configuration defined upon its creation (see the <em>RoomSettings.events</em> setting).</p>
     *
     * <p><b>NOTE</b>: if the Room is of type <em>MMORoom</em>, this event is never fired and it is substituted by the <em>proximityListUpdate</em> event.</p>
     *
     * <table class="jsdoc-details-table">
     * <caption>The object passed to the listener contains the following parameters:</caption>
     * <tr><th>Property</th><th>Type</th><th>Description</th></tr>
     * <tr><td>user</td><td>{@link SFSUser}</td><td>An object representing the user who joined the Room.</td></tr>
     * <tr><td>room</td><td>{@link SFSRoom}</td><td>An object representing the Room that was joined by a user.</td></tr>
     * </table>
     *
     * @example
     * <caption>This example shows how to handle this event type.</caption>
     * function someMethod()
     * {
     * 	sfs.addEventListener(SFS2X.SFSEvent.USER_ENTER_ROOM, onUserEnterRoom, this);
     * }
     *
     * function onUserEnterRoom(evtParams)
     * {
     * 	var room = evtParams.room;
     * 	var user = evtParams.user;
     *
     * 	console.log("User " + user.name + " just joined Room " + room.name);
     * }
     *
     * @constant {string}
     * @memberof SFSEvent
     *
     * @see	JoinRoomRequest
     * @see	RoomSettings#events
     * @see	MMORoom
     * @see	SFSEvent.USER_EXIT_ROOM
     * @see	SFSEvent.USER_COUNT_CHANGE
     * @see	SFSEvent.PROXIMITY_LIST_UPDATE
     */
    static readonly USER_ENTER_ROOM: string;
    /**
     * The <em>userExitRoom</em> event type, dispatched when one of the Rooms joined by the current user is left by another user, or by the current user himself.
     *
     * <p>This event is caused by a <em>LeaveRoomRequest</em> request; it  might be fired or not depending on the Room configuration defined upon its creation (see the <em>RoomSettings.events</em> setting).</p>
     *
     * <p><b>NOTE</b>: if the Room is of type <em>MMORoom</em>, this event is fired when the current user leaves the Room only.
     * For the other users leaving the Room it is substituted by the <em>proximityListUpdate</em> event.</p>
     *
     * <table class="jsdoc-details-table">
     * <caption>The object passed to the listener contains the following parameters:</caption>
     * <tr><th>Property</th><th>Type</th><th>Description</th></tr>
     * <tr><td>user</td><td>{@link SFSUser}</td><td>An object representing the user who left the Room.</td></tr>
     * <tr><td>room</td><td>{@link SFSRoom}</td><td>An object representing the Room that was left by a user.</td></tr>
     * </table>
     *
     * @example
     * <caption>This example shows how to handle this event type.</caption>
     * function someMethod()
     * {
     * 	sfs.addEventListener(SFS2X.SFSEvent.USER_EXIT_ROOM, onUserExitRoom, this);
     * }
     *
     * function onUserExitRoom(evtParams)
     * {
     * 	var room = evtParams.room;
     * 	var user = evtParams.user;
     *
     * 	console.log("User " + user.name + " just left Room " + room.name);
     * }
     *
     * @constant {string}
     * @memberof SFSEvent
     *
     * @see	LeaveRoomRequest
     * @see	RoomSettings#events
     * @see	MMORoom
     * @see	SFSEvent.USER_ENTER_ROOM
     * @see	SFSEvent.USER_COUNT_CHANGE
     * @see	SFSEvent.PROXIMITY_LIST_UPDATE
     */
    static readonly USER_EXIT_ROOM: string;
    /**
     * The <em>userCountChange</em> event type, dispatched when the number of users/players or spectators inside a Room changes.
     *
     * <p>This event is caused by a <em>JoinRoomRequest</em> request or a <em>LeaveRoomRequest</em> request.
     * The Room must belong to one of the Groups subscribed by the current client; also this event might be fired or not depending on
     * the Room configuration defined upon its creation (see the <em>RoomSettings.events</em> setting).</p>
     *
     * <table class="jsdoc-details-table">
     * <caption>The object passed to the listener contains the following parameters:</caption>
     * <tr><th>Property</th><th>Type</th><th>Description</th></tr>
     * <tr><td>room</td><td>{@link SFSRoom}</td><td>An object representing the Room in which the users count changed.</td></tr>
     * <tr><td>uCount</td><td>number</td><td>The new users count (players in case of Game Room).</td></tr>
     * <tr><td>sCount</td><td>number</td><td>The new spectators count (Game Room only).</td></tr>
     * </table>
     *
     * @example
     * <caption>This example shows how to handle this event type.</caption>
     * function someMethod()
     * {
     * 	sfs.addEventListener(SFS2X.SFSEvent.USER_COUNT_CHANGE, onUserCountChange, this);
     * }
     *
     * function onUserCountChange(evtParams)
     * {
     * 	var room = evtParams.room;
     * 	var uCount = evtParams.uCount;
     * 	var sCount = evtParams.sCount;
     *
     * 	console.log("Room: " + room.name + " now contains " + uCount + " users and " + sCount + " spectators");
     * }
     *
     * @constant {string}
     * @memberof SFSEvent
     *
     * @see	JoinRoomRequest
     * @see	LeaveRoomRequest
     * @see	RoomSettings#events
     * @see	SFSEvent.USER_ENTER_ROOM
     * @see	SFSEvent.USER_EXIT_ROOM
     */
    static readonly USER_COUNT_CHANGE: string;
    /**
     * The <em>proximityListUpdate</em> event type, dispatched when one more users or one or more <em>MMOItem</em> objects enter/leave the current user's Area of Interest in a <em>MMORoom</em>.
     *
     * <p>This event is fired after an <em>MMORoom</em> is joined and the <em>SetUserPositionRequest</em> request is sent at least one time.</p>
     *
     * <p><b>NOTE</b>: this event substitutes the default <em>userEnterRoom</em> and <em>userExitRoom</em> events available in regular Rooms.</p>
     *
     * <table class="jsdoc-details-table">
     * <caption>The object passed to the listener contains the following parameters:</caption>
     * <tr><th>Property</th><th>Type</th><th>Description</th></tr>
     * <tr><td>addedUsers</td><td><code>Array of {@link SFSUser}</code></td><td>A list of <em>SFSUser</em> objects representing the users who entered the current user's Area of Interest.</td></tr>
     * <tr><td>removedUsers</td><td><code>Array of {@link SFSUser}</code></td><td>A list of <em>SFSUser</em> objects representing the users who left the current user's Area of Interest.</td></tr>
     * <tr><td>addedItems</td><td><code>Array of {@link MMOItem}</code></td><td>A list of <em>MMOItem</em> objects which entered the current user's Area of Interest.</td></tr>
     * <tr><td>removedItems</td><td><code>Array of {@link MMOItem}</code></td><td>A list of <em>MMOItem</em> objects which left the current user's Area of Interest.</td></tr>
     * </table>
     *
     * @example
     * <caption>This example shows how to handle the proximity user list provided by the event in order to add new avatars on the screen and remove those who left the current user's proximity range.</caption>
     * function onProximityListUpdate(evtParams)
     * {
     * 	var added = evtParams.addedUsers;
     * 	var removed = evtParams.removedUsers;
     *
     * 	// Add users that entered the proximity list
     * 	for (var i = 0; i < added.length; i++)
     * 	{
     * 		var user = added[i];
     *
     * 		// Obtain the coordinates at which the user "appeared" in our range
     * 		var entryPoint = user.aoiEntryPoint;
     *
     * 		// Add new avatar on screen
     * 		var avatarSprite = new AvatarSprite();
     * 		avatarSprite.x = entryPoint.px;
     * 		avatarSprite.y = entryPoint.py;
     * 		...
     * 	}
     *
     * 	// Remove users that left the proximity list
     * 	for (var j = 0; j < removed.length; j++)
     * 	{
     * 		var user = removed[j];
     *
     * 		// Remove the avatar from screen
     * 		...
     * 	}
     * }
     *
     * @constant {string}
     * @memberof SFSEvent
     *
     * @see	SetUserPositionRequest
     * @see	MMORoom
     */
    static readonly PROXIMITY_LIST_UPDATE: string;
    /**
     * The <em>playerToSpectator</em> event type, dispatched when a player is turned to a spectator inside a Game Room.
     *
     * <p>This event is fired in response to the <em>PlayerToSpectatorRequest</em>> request if the operation is executed successfully.</p>
     *
     * <table class="jsdoc-details-table">
     * <caption>The object passed to the listener contains the following parameters:</caption>
     * <tr><th>Property</th><th>Type</th><th>Description</th></tr>
     * <tr><td>room</td><td>{@link SFSRoom}</td><td>An object representing the Room in which the player is turned to spectator.</td></tr>
     * <tr><td>user</td><td>{@link SFSUser}</td><td>An object representing the player who was turned to spectator.</td></tr>
     * </table>
     *
     * @example
     * <caption>This example turns the current user from player to spectator in the last joined Game Room.</caption>
     * function someMethod()
     * {
     * 	sfs.addEventListener(SFS2X.SFSEvent.PLAYER_TO_SPECTATOR, onPlayerToSpectatorSwitch, this);
     * 	sfs.addEventListener(SFS2X.SFSEvent.PLAYER_TO_SPECTATOR_ERROR, onPlayerToSpectatorSwitchError, this);
     *
     * 	// Switch player to spectator
     * 	sfs.send(new SFS2X.PlayerToSpectatorRequest());
     * }
     *
     * function onPlayerToSpectatorSwitch(evtParams)
     * {
     * 	console.log("Player " + evtParams.user + " is now a spectator");
     * }
     *
     * function onPlayerToSpectatorSwitchError(evtParams)
     * {
     * 	console.log("Unable to become a spectator due to the following error: " + evtParams.errorMessage);
     * }
     *
     * @constant {string}
     * @memberof SFSEvent
     *
     * @see	PlayerToSpectatorRequest
     * @see	SFSEvent.PLAYER_TO_SPECTATOR_ERROR
     * @see	SFSEvent.SPECTATOR_TO_PLAYER
     */
    static readonly PLAYER_TO_SPECTATOR: string;
    /**
     * The <em>playerToSpectatorError</em> event type, dispatched when an error occurs while the current user is being turned from player to spectator in a Game Room.
     *
     * <p>This event is fired in response to the <em>PlayerToSpectatorRequest</em> request in case the operation failed.</p>
     *
     * <table class="jsdoc-details-table">
     * <caption>The object passed to the listener contains the following parameters:</caption>
     * <tr><th>Property</th><th>Type</th><th>Description</th></tr>
     * <tr><td>errorMessage</td><td>string</td><td>A message containing the description of the error.</td></tr>
     * <tr><td>errorCode</td><td>number</td><td>The error code.</td></tr>
     * </table>
     *
     * <p>See the example provided in the <em>PLAYER_TO_SPECTATOR</em> constant description.</p>
     *
     * @constant {string}
     * @memberof SFSEvent
     *
     * @see	PlayerToSpectatorRequest
     * @see	SFSEvent.PLAYER_TO_SPECTATOR
     */
    static readonly PLAYER_TO_SPECTATOR_ERROR: string;
    /**
     * The <em>spectatorToPlayer</em> event type, dispatched when a spectator is turned to a player inside a Game Room.
     *
     * <p>This event is fired in response to the <em>SpectatorToPlayerRequest</em>> request if the operation is executed successfully.</p>
     *
     * <table class="jsdoc-details-table">
     * <caption>The object passed to the listener contains the following parameters:</caption>
     * <tr><th>Property</th><th>Type</th><th>Description</th></tr>
     * <tr><td>room</td><td>{@link SFSRoom}</td><td>An object representing the Room in which the spectator is turned to player.</td></tr>
     * <tr><td>user</td><td>{@link SFSUser}</td><td>An object representing the spectator who was turned to player.</td></tr>
     * <tr><td>playerId</td><td>number</td><td>The player id of the user.</td></tr>
     * </table>
     *
     * @example
     * <caption>This example turns the current user from spectator to player in the last joined Game Room.</caption>
     * function someMethod()
     * {
     * 	sfs.addEventListener(SFS2X.SFSEvent.SPECTATOR_TO_PLAYER, onSpectatorToPlayerSwitch, this);
     * 	sfs.addEventListener(SFS2X.SFSEvent.SPECTATOR_TO_PLAYER_ERROR, onSpectatorToPlayerSwitchError, this);
     *
     * 	// Switch spectator to player
     * 	sfs.send(new SFS2X.SpectatorToPlayerRequest());
     * }
     *
     * function onSpectatorToPlayerSwitch(evtParams)
     * {
     * 	console.log("Spectator " + evtParams.user + " is now a player");
     * }
     *
     * function onSpectatorToPlayerSwitchError(evtParams)
     * {
     * 	console.log("Unable to become a player due to the following error: " + evtParams.errorMessage);
     * }
     *
     * @constant {string}
     * @memberof SFSEvent
     *
     * @see	SpectatorToPlayerRequest
     * @see	SFSEvent.SPECTATOR_TO_PLAYER_ERROR
     * @see	SFSEvent.PLAYER_TO_SPECTATOR
     */
    static readonly SPECTATOR_TO_PLAYER: string;
    /**
     * The <em>spectatorToPlayerError</em> event type, dispatched when an error occurs while the current user is being turned from spectator to player in a Game Room.
     *
     * <p>This event is fired in response to the <em>SpectatorToPlayerRequest</em> request in case the operation failed.</p>
     *
     * <table class="jsdoc-details-table">
     * <caption>The object passed to the listener contains the following parameters:</caption>
     * <tr><th>Property</th><th>Type</th><th>Description</th></tr>
     * <tr><td>errorMessage</td><td>string</td><td>A message containing the description of the error.</td></tr>
     * <tr><td>errorCode</td><td>number</td><td>The error code.</td></tr>
     * </table>
     *
     * <p>See the example provided in the <em>SPECTATOR_TO_PLAYER</em> constant description.</p>
     *
     * @constant {string}
     * @memberof SFSEvent
     *
     * @see	SpectatorToPlayerRequest
     * @see	SFSEvent.SPECTATOR_TO_PLAYER
     */
    static readonly SPECTATOR_TO_PLAYER_ERROR: string;
    /**
     * The <em>roomNameChange</em> event type, dispatched when the name of a Room is changed.
     *
     * <p>This event is fired in response to the <em>ChangeRoomNameRequest</em> request if the operation is executed successfully.</p>
     *
     * <table class="jsdoc-details-table">
     * <caption>The object passed to the listener contains the following parameters:</caption>
     * <tr><th>Property</th><th>Type</th><th>Description</th></tr>
     * <tr><td>room</td><td>{@link SFSRoom}</td><td>An object representing the Room which was renamed.</td></tr>
     * <tr><td>oldName</td><td>string</td><td>The previous name of the Room.</td></tr>
     * </table>
     *
     * @example
     * <caption>This example renames an existing Room.</caption>
     * function someMethod()
     * {
     * 	sfs.addEventListener(SFS2X.SFSEvent.ROOM_NAME_CHANGE, onRoomNameChanged, this);
     * 	sfs.addEventListener(SFS2X.SFSEvent.ROOM_NAME_CHANGE_ERROR, onRoomNameChangeError, this);
     *
     * 	var theRoom = sfs.getRoomByName("Gonzo's Room");
     * 	sfs.send(new SFS2X.ChangeRoomNameRequest(theRoom, "Gonzo The Great's Room"));
     * }
     *
     * function onRoomNameChanged(evtParams)
     * {
     * 	console.log("Room " + evtParams.oldName + " was successfully renamed to " + evtParams.room.name);
     * }
     *
     * function onRoomNameChangeError(evtParams)
     * {
     * 	console.log("Room name change failed: " + evtParams.errorMessage);
     * }
     *
     * @constant {string}
     * @memberof SFSEvent
     *
     * @see ChangeRoomNameRequest
     * @see SFSEvent.ROOM_NAME_CHANGE_ERROR
     */
    static readonly ROOM_NAME_CHANGE: string;
    /**
     * The <em>roomNameChangeError</em> event type, dispatched when an error occurs while attempting to change the name of a Room.
     *
     * <p>This event is fired in response to the <em>ChangeRoomNameRequest</em> request in case the operation failed.</p>
     *
     * <table class="jsdoc-details-table">
     * <caption>The object passed to the listener contains the following parameters:</caption>
     * <tr><th>Property</th><th>Type</th><th>Description</th></tr>
     * <tr><td>errorMessage</td><td>string</td><td>A message containing the description of the error.</td></tr>
     * <tr><td>errorCode</td><td>number</td><td>The error code.</td></tr>
     * </table>
     *
     * <p>See the example provided in the <em>ROOM_NAME_CHANGE</em> constant description.</p>
     *
     * @constant {string}
     * @memberof SFSEvent
     *
     * @see	ChangeRoomNameRequest
     * @see	SFSEvent.ROOM_NAME_CHANGE
     */
    static readonly ROOM_NAME_CHANGE_ERROR: string;
    /**
     * The <em>roomPasswordStateChange</em> event type, dispatched when the password of a Room is set, changed or removed.
     *
     * <p>This event is fired in response to the <em>ChangeRoomPasswordStateRequest</em>> request if the operation is executed successfully.</p>
     *
     * <table class="jsdoc-details-table">
     * <caption>The object passed to the listener contains the following parameters:</caption>
     * <tr><th>Property</th><th>Type</th><th>Description</th></tr>
     * <tr><td>room</td><td>{@link SFSRoom}</td><td>An object representing the Room whose password was changed.</td></tr>
     * </table>
     *
     * @example
     * <caption>This example changes the password of an existing Room.</caption>
     * function someMethod()
     * {
     * 	sfs.addEventListener(SFS2X.SFSEvent.ROOM_PASSWORD_STATE_CHANGE, onRoomPasswordStateChanged, this);
     * 	sfs.addEventListener(SFS2X.SFSEvent.ROOM_PASSWORD_STATE_CHANGE_ERROR, onRoomPasswordStateChangeError, this);
     *
     * 	var theRoom = sfs.getRoomByName("Gonzo's Room");
     * 	sfs.send(new SFS2X.ChangeRoomPasswordStateRequest(theRoom, "mammamia"));
     * }
     *
     * function onRoomPasswordStateChanged(evtParams)
     * {
     * 	console.log("The password of Room " + evtParams.room.name + " was changed successfully");
     * }
     *
     * function onRoomPasswordStateChangeError(evtParams)
     * {
     * 	console.log("Room password change failed: " + evtParams.errorMessage);
     * }
     *
     * @constant {string}
     * @memberof SFSEvent
     *
     * @see ChangeRoomPasswordStateRequest
     * @see	SFSEvent.ROOM_PASSWORD_STATE_CHANGE_ERROR
     */
    static readonly ROOM_PASSWORD_STATE_CHANGE: string;
    /**
     * The <em>roomPasswordStateChangeError</em> event type, dispatched when an error occurs while attempting to set, change or remove the password of a Room.
     *
     * <p>This event is fired in response to the <em>ChangeRoomPasswordStateRequest</em> request in case the operation failed.</p>
     *
     * <table class="jsdoc-details-table">
     * <caption>The object passed to the listener contains the following parameters:</caption>
     * <tr><th>Property</th><th>Type</th><th>Description</th></tr>
     * <tr><td>errorMessage</td><td>string</td><td>A message containing the description of the error.</td></tr>
     * <tr><td>errorCode</td><td>number</td><td>The error code.</td></tr>
     * </table>
     *
     * <p>See the example provided in the <em>ROOM_PASSWORD_STATE_CHANGE</em> constant description.</p>
     *
     * @constant {string}
     * @memberof SFSEvent
     *
     * @see ChangeRoomPasswordStateRequest
     * @see SFSEvent.ROOM_PASSWORD_STATE_CHANGE
     */
    static readonly ROOM_PASSWORD_STATE_CHANGE_ERROR: string;
    /**
     * The <em>roomCapacityChange</em> event type, dispatched when the capacity of a Room is changed.
     *
     * <p>This event is fired in response to the <em>ChangeRoomCapacityRequest</em>> request if the operation is executed successfully.</p>
     *
     * <table class="jsdoc-details-table">
     * <caption>The object passed to the listener contains the following parameters:</caption>
     * <tr><th>Property</th><th>Type</th><th>Description</th></tr>
     * <tr><td>room</td><td>{@link SFSRoom}</td><td>An object representing the Room whose capacity was changed.</td></tr>
     * </table>
     *
     * @example
     * <caption>This example changes the capacity of an existing Room.</caption>
     * function someMethod()
     * {
     * 	sfs.addEventListener(SFS2X.SFSEvent.ROOM_CAPACITY_CHANGE, onRoomCapacityChanged, this);
     * 	sfs.addEventListener(SFS2X.SFSEvent.ROOM_CAPACITY_CHANGE_ERROR, onRoomCapacityChangeError, this);
     *
     * 	var theRoom = sfs.getRoomByName("Gonzo's Room");
     *
     * 	// Resize the Room so that it allows a maximum of 100 users and zero spectators
     * 	sfs.send(new SFS2X.ChangeRoomCapacityRequest(theRoom, 100, 0));
     * }
     *
     * function onRoomCapacityChanged(evtParams)
     * {
     * 	console.log("The capacity of Room " + evtParams.room.name + " was changed successfully");
     * }
     *
     * function onRoomCapacityChangeError(evtParams)
     * {
     * 	console.log("Room capacity change failed: " + evtParams.errorMessage);
     * }
     *
     * @constant {string}
     * @memberof SFSEvent
     *
     * @see ChangeRoomCapacityRequest
     * @see SFSEvent.ROOM_CAPACITY_CHANGE_ERROR
     */
    static readonly ROOM_CAPACITY_CHANGE: string;
    /**
     * The <em>roomCapacityChangeError</em> event type, dispatched when an error occurs while attempting to change the capacity of a Room.
     *
     * <p>This event is fired in response to the <em>ChangeRoomCapacityRequest</em> request in case the operation failed.</p>
     *
     * <table class="jsdoc-details-table">
     * <caption>The object passed to the listener contains the following parameters:</caption>
     * <tr><th>Property</th><th>Type</th><th>Description</th></tr>
     * <tr><td>errorMessage</td><td>string</td><td>A message containing the description of the error.</td></tr>
     * <tr><td>errorCode</td><td>number</td><td>The error code.</td></tr>
     * </table>
     *
     * <p>See the example provided in the <em>ROOM_CAPACITY_CHANGE</em> constant description.</p>
     *
     * @constant {string}
     * @memberof SFSEvent
     *
     * @see ChangeRoomCapacityRequest
     * @see SFSEvent.ROOM_CAPACITY_CHANGE
     */
    static readonly ROOM_CAPACITY_CHANGE_ERROR: string;
    /**
     * The <em>publicMessage</em> event type, dispatched when a public message is received by the current user.
     *
     * <p>This event is caused by a <em>PublicMessageRequest</em> request sent by any user in the target Room, including the current user himself.</p>
     *
     * <table class="jsdoc-details-table">
     * <caption>The object passed to the listener contains the following parameters:</caption>
     * <tr><th>Property</th><th>Type</th><th>Description</th></tr>
     * <tr><td>room</td><td>{@link SFSRoom}</td><td>An object representing the Room at which the message is targeted.</td></tr>
     * <tr><td>sender</td><td>{@link SFSUser}</td><td>An object representing the user who sent the message.</td></tr>
     * <tr><td>message</td><td>string</td><td>The message sent by the user.</td></tr>
     * <tr><td>data</td><td>{@link SFSObject}</td><td>A <em>SFSObject</em> containing custom parameters which might accompany the message.</td></tr>
     * </table>
     *
     * @example
     * <caption>This example sends a public message and handles the respective event.</caption>
     * function someMethod()
     * {
     * 	sfs.addEventListener(SFS2X.SFSEvent.PUBLIC_MESSAGE, onPublicMessage, this);
     *
     * 	// Send a public message
     * 	sfs.send(new SFS2X.PublicMessageRequest("Hello everyone!"));
     * }
     *
     * function onPublicMessage(evtParams)
     * {
     * 	// As messages are forwarded to the sender too,
     * 	// I have to check if I am the sender
     *
     * 	var sender = evtParams.sender;
     *
     * 	if (sender == sfs.mySelf)
     * 		console.log("I said: " + evtParams.message);
     * 	else
     * 		console.log("User " + sender.name + " said: " + evtParams.message);
     * }
     *
     * @constant {string}
     * @memberof SFSEvent
     *
     * @see PublicMessageRequest
     * @see	SFSEvent.PRIVATE_MESSAGE
     */
    static readonly PUBLIC_MESSAGE: string;
    /**
     * The <em>privateMessage</em> event type, dispatched when a private message is received by the current user.
     *
     * <p>This event is caused by a <em>PrivateMessageRequest</em> request sent by any user in the Zone.</p>
     *
     * <p><b>NOTE</b>: the same event is fired by the sender's client too, so that the user is aware that the message was delivered successfully to the recipient,
     * and it can be displayed in the private chat area keeping the correct message ordering. In this case there is no default way to know who the message was originally sent to.
     * As this information can be useful in scenarios where the sender is chatting privately with more than one user at the same time in separate windows or tabs
     * (and we need to write his own message in the proper one), the <em>data</em> parameter can be used to store, for example, the id of the recipient user.</p>
     *
     * <table class="jsdoc-details-table">
     * <caption>The object passed to the listener contains the following parameters:</caption>
     * <tr><th>Property</th><th>Type</th><th>Description</th></tr>
     * <tr><td>sender</td><td>{@link SFSUser}</td><td>An object representing the user who sent the message.</td></tr>
     * <tr><td>message</td><td>string</td><td>The message sent by the user.</td></tr>
     * <tr><td>data</td><td>{@link SFSObject}</td><td>A <em>SFSObject</em> containing custom parameters which might accompany the message.</td></tr>
     * </table>
     *
     * @example
     * <caption>This example sends a private message and handles the respective event.</caption>
     * function someMethod()
     * {
     * 	sfs.addEventListener(SFS2X.SFSEvent.PRIVATE_MESSAGE, onPrivateMessage, this);
     *
     * 	// Send a private message to Jack
     * 	var user = sfs.usermanager.getUserByName("Jack");
     * 	sfs.send(new SFS2X.PrivateMessageRequest("Hello my friend!", user.id));
     * }
     *
     * function onPrivateMessage(evtparams)
     * {
     * 	// As messages are forwarded to the sender too,
     * 	// I have to check if I am the sender
     *
     * 	var sender = evtParams.sender;
     *
     * 	if (sender != sfs.mySelf)
     * 		console.log("User " + sender.name + " sent me this PM: " + evtParams.message);
     * }
     *
     * @constant {string}
     * @memberof SFSEvent
     *
     * @see	PrivateMessageRequest
     * @see	SFSEvent.PUBLIC_MESSAGE
     */
    static readonly PRIVATE_MESSAGE: string;
    /**
     * The <em>objectMessage</em> event type, dispatched when an object containing custom data is received by the current user.
     *
     * <p>This event is caused by an <em>ObjectMessageRequest</em> request sent by any user in the target Room.</p>
     *
     * <table class="jsdoc-details-table">
     * <caption>The object passed to the listener contains the following parameters:</caption>
     * <tr><th>Property</th><th>Type</th><th>Description</th></tr>
     * <tr><td>sender</td><td>{@link SFSUser}</td><td>An object representing the user who sent the message.</td></tr>
     * <tr><td>message</td><td>{@link SFSObject}</td><td>The content of the message: a <em>SFSObject</em> containing the custom parameters sent by the sender.</td></tr>
     * </table>
     *
     * @example
     * <caption>This example sends the player's avatar movement coordinates and handles the respective event (note: the myAvatar instance is supposed to be the user sprite on the stage, while the getUserAvatar method retrieves the sprite of other users' characters).</caption>
     * function someMethod()
     * {
     * 	sfs.addEventListener(SFS2X.SFSEvent.OBJECT_MESSAGE, onObjectMessage, this);
     *
     * 	// Send my movement to all players
     * 	var dataObj = new SFSObject();
     * 	dataObj.putInt("x", myAvatar.x);
     * 	dataObj.putInt("y", myAvatar.y);
     *
     * 	sfs.send(new SFS2X.ObjectMessageRequest(dataObj));
     * }
     *
     * private function onObjectMessage(evtParams)
     * {
     * 	var dataObj = evtParams.message; // This is a SFSObject!
     *
     * 	var sender = evtParams.sender;
     * 	var avatar = getUserAvatar(sender.id);
     *
     * 	avatar.x = dataObj.get("x");
     * 	avatar.y = dataObj.get.("y");
     * }
     *
     * @constant {string}
     * @memberof SFSEvent
     *
     * @see ObjectMessageRequest
     */
    static readonly OBJECT_MESSAGE: string;
    /**
     * The <em>moderatorMessage</em> event type, dispatched when the current user receives a message from a moderator user.
     *
     * <p>This event can be caused by either the <em>ModeratorMessageRequest</em>, <em>KickUserRequest</em> or
     * <em>BanUserRequest</em> requests sent by a user with at least moderation privileges.
     * Also, this event can be caused by a kick/ban action executed through the SmartFoxServer 2X Administration Tool.</p>
     *
     * <table class="jsdoc-details-table">
     * <caption>The object passed to the listener contains the following parameters:</caption>
     * <tr><th>Property</th><th>Type</th><th>Description</th></tr>
     * <tr><td>sender</td><td>{@link SFSUser}</td><td>An object representing the moderator user who sent the message.</td></tr>
     * <tr><td>message</td><td>string</td><td>The message sent by the moderator.</td></tr>
     * <tr><td>data</td><td>{@link SFSObject}</td><td>A <em>SFSObject</em> containing custom parameters which might accompany the message.</td></tr>
     * </table>
     *
     * @example
     * <caption>This example sends a moderator message to all the users in the last joned Room; it also shows how to handle the related event.</caption>
     * function someMethod()
     * {
     * 	sfs.addEventListener(SFS2X.SFSEvent.MODERATOR_MESSAGE, onModeratorMessage, this);
     *
     * 	// Set the message recipients: all users in the current Room
     * 	var recipMode = new SFS2X.MessageRecipientMode(SFS2X.MessageRecipientMode.TO_ROOM, sfs.lastJoinedRoom);
     *
     * 	// Send the moderator message
     * 	sfs.send(new SFS2X.ModeratorMessageRequest("Hello everybody, I'm the Moderator!", recipMode));
     * }
     *
     * function onModeratorMessage(evtParams)
     * {
     * 	console.log("The moderator sent the following message: " + evtParams.message);
     * }
     *
     * @constant {string}
     * @memberof SFSEvent
     *
     * @see	ModeratorMessageRequest
     * @see	KickUserRequest
     * @see	BanUserRequest
     * @see	SFSEvent.ADMIN_MESSAGE
     */
    static readonly MODERATOR_MESSAGE: string;
    /**
     * The <em>adminMessage</em> event type, dispatched when the current user receives a message from an administrator user.
     *
     * <p>This event is caused by the <em>AdminMessageRequest</em> request sent by a user with administration privileges.</p>
     *
     * <table class="jsdoc-details-table">
     * <caption>The object passed to the listener contains the following parameters:</caption>
     * <tr><th>Property</th><th>Type</th><th>Description</th></tr>
     * <tr><td>sender</td><td>{@link SFSUser}</td><td>An object representing the administrator user who sent the message.</td></tr>
     * <tr><td>message</td><td>string</td><td>The message sent by the administrator.</td></tr>
     * <tr><td>data</td><td>{@link SFSObject}</td><td>A <em>SFSObject</em> containing custom parameters which might accompany the message.</td></tr>
     * </table>
     *
     * @example
     * <caption>This example sends an administration message to all the users in the Zone; it also shows how to handle the related event.</caption>
     * function someMethod()
     * {
     * 	sfs.addEventListener(SFS2X.SFSEvent.ADMIN_MESSAGE, onAdminMessage, this);
     *
     * 	// Set the message recipients: all users in the Zone
     * 	var recipMode = new SFS2X.MessageRecipientMode(SFS2X.MessageRecipientMode.TO_ZONE, null);
     *
     * 	// Send the administrator message
     * 	sfs.send(new SFS2X.AdminMessageRequest("Hello to everybody from the Administrator!", recipMode));
     * }
     *
     * function onAdminMessage(evtParams)
     * {
     * 	console.log("The administrator sent the following message: " + evtParams.message);
     * }
     *
     * @constant {string}
     * @memberof SFSEvent
     *
     * @see AdminMessageRequest
     * @see	SFSEvent.MODERATOR_MESSAGE
     */
    static readonly ADMIN_MESSAGE: string;
    /**
     * The <em>extensionResponse</em> event type, dispatched when data coming from a server-side Extension is received by the current user.
     *
     * <p>Data is usually sent by the server to one or more clients in response to an <em>ExtensionRequest</em> request, but not necessarily.</p>
     *
     * <table class="jsdoc-details-table">
     * <caption>The object passed to the listener contains the following parameters:</caption>
     * <tr><th>Property</th><th>Type</th><th>Description</th></tr>
     * <tr><td>cmd</td><td>string</td><td>The name of the command which identifies an action that should be executed by the client.
     * 												If this event is fired in response to a request sent by the client, it is a common practice
     * 												to use the same command name passed to the request also in the response.</td></tr>
     * <tr><td>params</td><td>{@link SFSObject}</td><td>A <em>SFSObject</em> containing custom data sent by the Extension.</td></tr>
     * <tr><td>room</td><td>{@link SFSRoom}</td><td>An object representing the Room which the Extension is attached to (for Room Extensions only).</td></tr>
     * </table>
     *
     * @example
     * <caption>This example sends a command to the Zone Extension; it also handles responses coming from the Extension by implementing the EXTENSION_RESPONSE listener (the same command name is used in both the request and the response).</caption>
     * function someMethod()
     * {
     * 	sfs.addEventListener(SFS2X.SFSEvent.EXTENSION_RESPONSE, onExtensionResponse, this);
     *
     * 	// Send two integers to the Zone extension and get their sum in return
     * 	var params = new SFSObject();
     * 	params.putInt("n1", 26);
     * 	params.putInt("n2", 16);
     *
     * 	sfs.send(new SFS2X.ExtensionRequest("add", params));
     * }
     *
     * function onExtensionResponse(evtParams)
     * {
     * 	if (evtParams.cmd == "add")
     * 	{
     * 		var responseParams = evtParams.params;
     *
     * 		// We expect a number called "sum"
     * 		console.log("The sum is: " + responseParams.get("sum"));
     * 	}
     * }
     *
     * @constant {string}
     * @memberof SFSEvent
     *
     * @see	ExtensionRequest
     */
    static readonly EXTENSION_RESPONSE: string;
    /**
     * The <em>roomVariablesUpdate</em> event type, dispatched when a Room Variable is updated.
     *
     * <p>This event is caused by the <em>SetRoomVariablesRequest</em> request. The request could have been sent by a user in the same Room of the current user or,
     * in case of a global Room Variable, by a user in a Room belonging to one of the Groups subscribed by the current client.</p>
     *
     * <table class="jsdoc-details-table">
     * <caption>The object passed to the listener contains the following parameters:</caption>
     * <tr><th>Property</th><th>Type</th><th>Description</th></tr>
     * <tr><td>room</td><td>{@link SFSRoom}</td><td>An object representing the Room where the Room Variable update occurred.</td></tr>
     * <tr><td>changedVars</td><td><code>Array of string</code></td><td>The list of names of the Room Variables that were changed (or created for the first time).</td></tr>
     * </table>
     *
     * @example
     * <caption>This example sets a number of Room Variables and handles the respective update event.</caption>
     * function someMethod()
     * {
     * 	sfs.addEventListener(SFS2X.SFSEvent.ROOM_VARIABLES_UPDATE, onRoomVarsUpdate, this);
     *
     * 	// Create some Room Variables
     * 	var roomVars = [];
     * 	roomVars.push(new SFS2X.SFSRoomVariable("gameStarted", false));
     * 	roomVars.push(new SFS2X.SFSRoomVariable("gameType", "Snooker"));
     * 	roomVars.push(new SFS2X.SFSRoomVariable("minRank", 10));
     *
     * 	sfs.send(new SFS2X.SetRoomVariablesRequest(roomVars));
     * }
     *
     * function onRoomVarsUpdate(evtParams)
     * {
     * 	var changedVars = evtParams.changedVars;
     * 	var room = evtParams.room;
     *
     * 	// Check if the "gameStarted" variable was changed
     * 	if (changedVars.indexOf("gameStarted") != -1)
     * 	{
     * 		if (room.getVariable("gameStarted") == true)
     * 			console.log("Game started");
     * 		else
     * 			console.log("Game stopped");
     * 	}
     * }
     *
     * @constant {string}
     * @memberof SFSEvent
     *
     * @see	SetRoomVariablesRequest
     * @see SFSRoomVariable
     */
    static readonly ROOM_VARIABLES_UPDATE: string;
    /**
     * The <em>userVariablesUpdate</em> event type, dispatched when a User Variable is updated.
     *
     * <p>This event is caused by the <em>SetUserVariablesRequest</em> request sent by a user in one of the Rooms joined by the current user.</p>
     *
     * <table class="jsdoc-details-table">
     * <caption>The object passed to the listener contains the following parameters:</caption>
     * <tr><th>Property</th><th>Type</th><th>Description</th></tr>
     * <tr><td>user</td><td>{@link SFSUser}</td><td>An object representing the user who updated his own User Variables.</td></tr>
     * <tr><td>changedVars</td><td><code>Array of string</code></td><td>The list of names of the User Variables that were changed (or created for the first time).</td></tr>
     * </table>
     *
     * @example
     * <caption>This example sets a number of User Variables and handles the respective update event.</caption>
     * function someMethod()
     * {
     * 	sfs.addEventListener(SFS2X.SFSEvent.USER_VARIABLES_UPDATE, onUserVarsUpdate, this);
     *
     * 	// Create some User Variables
     * 	var userVars = [];
     * 	userVars.push(new SFS2X.SFSUserVariable("avatarType", "SwedishCook"));
     * 	userVars.push(new SFS2X.SFSUserVariable("country", "Sweden"));
     * 	userVars.push(new SFS2X.SFSUserVariable("x", 10));
     * 	userVars.push(new SFS2X.SFSUserVariable("y", 5));
     *
     * 	sfs.send(new SFS2X.SetUserVariablesRequest(userVars));
     * }
     *
     * function onUserVarsUpdate(evtParams)
     * {
     * 	var changedVars = evtParams.changedVars;
     * 	var user = evtParams.user;
     *
     * 	// Check if the user changed his x and y user variables
     * 	if (changedVars.indexOf("x") != -1 || changedVars.indexOf("y") != -1)
     * 	{
     * 		// Move the user avatar to a new position
     * 		...
     * 	}
     * }
     *
     * @constant {string}
     * @memberof SFSEvent
     *
     * @see	SetUserVariablesRequest
     * @see SFSUserVariable
     */
    static readonly USER_VARIABLES_UPDATE: string;
    /**
     * The <em>mmoItemVariablesUpdate</em> event type, dispatched when an MMOItem Variable is updated in an <em>MMORoom</em>.
     *
     * <p>This event is caused by an MMOItem Variable being set, updated or deleted in a server side Extension, and it is received only if the current user
     * has the related <em>MMOItem</em> in his Area of Interest.</p>
     *
     * <table class="jsdoc-details-table">
     * <caption>The object passed to the listener contains the following parameters:</caption>
     * <tr><th>Property</th><th>Type</th><th>Description</th></tr>
     * <tr><td>room</td><td>{@link MMORoom}</td><td>The <em>MMORoom</em> where the <em>MMOItem</em> whose Variables have been updated is located.</td></tr>
     * <tr><td>mmoItem</td><td>{@link MMOItem}</td><td>The <em>MMOItem</em> whose variables have been updated.</td></tr>
     * <tr><td>changedVars</td><td><code>Array of string</code></td><td>The list of names of the MMOItem Variables that were changed (or created for the first time).</td></tr>
     * </table>
     *
     * @example
     * <caption>This example shows how to handle the MMOItem Variable update.</caption>
     * function onMMOItemVarsUpdate(evtParams)
     * {
     * 	var changedVars = evtParams.changedVars;
     * 	var item = evtParams.mmoItem;
     *
     * 	// Check if the MMOItem was moved
     * 	if (changedVars.indexOf("x") != -1 || changedVars.indexOf("y") != -1)
     * 	{
     * 		// Move the sprite representing the MMOItem on screen
     * 		...
     * 	}
     * }
     *
     * @constant {string}
     * @memberof SFSEvent
     *
     * @see MMOItemVariable
     */
    static readonly MMOITEM_VARIABLES_UPDATE: string;
    /**
     * The <em>roomGroupSubscribe</em> event type, dispatched when a Group is subscribed by the current user.
     *
     * <p>This event is fired in response to the <em>SubscribeRoomGroupRequest</em>> request if the operation is executed successfully.</p>
     *
     * <table class="jsdoc-details-table">
     * <caption>The object passed to the listener contains the following parameters:</caption>
     * <tr><th>Property</th><th>Type</th><th>Description</th></tr>
     * <tr><td>groupId</td><td>string</td><td>The name of the Group that was subscribed.</td></tr>
     * <tr><td>newRooms</td><td><code>Array of {@link SFSRoom}</code></td><td>A list of <em>SFSRoom</em> objects representing the Rooms belonging to the subscribed Group.</td></tr>
     * </table>
     *
     * @example
     * <caption>This example makes the current user subscribe a Group.</caption>
     * function someMethod()
     * {
     * 	sfs.addEventListener(SFS2X.SFSEvent.ROOM_GROUP_SUBSCRIBE, onGroupSubscribed, this);
     * 	sfs.addEventListener(SFS2X.SFSEvent.ROOM_GROUP_SUBSCRIBE_ERROR, onGroupSubscribeError, this);
     *
     * 	// Subscribe the "cardGames" group
     * 	sfs.send(new SFS2X.SubscribeRoomGroupRequest("cardGames"));
     * }
     *
     * function onGroupSubscribed(evtParams)
     * {
     * 	console.log("Group subscribed. The following rooms are now accessible: " + evtParams.newRooms);
     * }
     *
     * function onGroupSubscribeError(evtParams)
     * {
     * 	console.log("Group subscription failed: " + evtParams.errorMessage);
     * }
     *
     * @constant {string}
     * @memberof SFSEvent
     *
     * @see	SubscribeRoomGroupRequest
     * @see	SFSEvent.ROOM_GROUP_SUBSCRIBE_ERROR
     * @see	SFSEvent.ROOM_GROUP_UNSUBSCRIBE
     */
    static readonly ROOM_GROUP_SUBSCRIBE: string;
    /**
     * The <em>roomGroupSubscribeError</em> event type, dispatched when an error occurs while a Room Group is being subscribed.
     *
     * <p>This event is fired in response to the <em>SubscribeRoomGroupRequest</em> request in case the operation failed.</p>
     *
     * <table class="jsdoc-details-table">
     * <caption>The object passed to the listener contains the following parameters:</caption>
     * <tr><th>Property</th><th>Type</th><th>Description</th></tr>
     * <tr><td>errorMessage</td><td>string</td><td>A message containing the description of the error.</td></tr>
     * <tr><td>errorCode</td><td>number</td><td>The error code.</td></tr>
     * </table>
     *
     * <p>See the example provided in the <em>ROOM_GROUP_SUBSCRIBE</em> constant description.</p>
     *
     * @constant {string}
     * @memberof SFSEvent
     *
     * @see	SubscribeRoomGroupRequest
     * @see	SFSEvent.ROOM_GROUP_SUBSCRIBE
     */
    static readonly ROOM_GROUP_SUBSCRIBE_ERROR: string;
    /**
     * The <em>roomGroupUnsubscribe</em> event type, dispatched when a Group is unsubscribed by the current user.
     *
     * <p>This event is fired in response to the <em>UnsubscribeRoomGroupRequest</em> request if the operation is executed successfully.</p>
     *
     * <table class="jsdoc-details-table">
     * <caption>The object passed to the listener contains the following parameters:</caption>
     * <tr><th>Property</th><th>Type</th><th>Description</th></tr>
     * <tr><td>groupId</td><td>string</td><td>The name of the Group that was unsubscribed.</td></tr>
     * </table>
     *
     * @example
     * <caption>This example makes the current user unsubscribe a Group.</caption>
     * function someMethod()
     * {
     * 	sfs.addEventListener(SFS2X.SFSEvent.ROOM_GROUP_UNSUBSCRIBE, onGroupUnsubscribed, this);
     * 	sfs.addEventListener(SFS2X.SFSEvent.ROOM_GROUP_UNSUBSCRIBE_ERROR, onGroupUnsubscribeError, this);
     *
     * 	// Unsubscribe the "cardGames" group
     * 	sfs.send(new SFS2X.UnsubscribeRoomGroupRequest("cardGames"));
     * }
     *
     * function onGroupUnsubscribed(evtParams)
     * {
     * 	console.log("Group unsubscribed: " + evtParams.groupId);
     * }
     *
     * function onGroupUnsubscribeError(evtParams)
     * {
     * 	console.log("Group unsubscribing failed: " + evtParams.errorMessage);
     * }
     *
     * @constant {string}
     * @memberof SFSEvent
     *
     * @see	UnsubscribeRoomGroupRequest
     * @see	SFSEvent.ROOM_GROUP_UNSUBSCRIBE_ERROR
     * @see	SFSEvent.ROOM_GROUP_SUBSCRIBE
     */
    static readonly ROOM_GROUP_UNSUBSCRIBE: string;
    /**
     * The <em>roomGroupUnsubscribeError</em> event type, dispatched when an error occurs while a Room Group is being unsubscribed.
     *
     * <p>This event is fired in response to the <em>UnsubscribeRoomGroupRequest</em> request in case the operation failed.</p>
     *
     * <table class="jsdoc-details-table">
     * <caption>The object passed to the listener contains the following parameters:</caption>
     * <tr><th>Property</th><th>Type</th><th>Description</th></tr>
     * <tr><td>errorMessage</td><td>string</td><td>A message containing the description of the error.</td></tr>
     * <tr><td>errorCode</td><td>number</td><td>The error code.</td></tr>
     * </table>
     *
     * <p>See the example provided in the <em>ROOM_GROUP_UNSUBSCRIBE</em> constant description.</p>
     *
     * @constant {string}
     * @memberof SFSEvent
     *
     * @see	UnsubscribeRoomGroupRequest
     * @see	SFSEvent.ROOM_GROUP_UNSUBSCRIBE
     */
    static readonly ROOM_GROUP_UNSUBSCRIBE_ERROR: string;
    /**
     * The <em>roomFindResult</em> event type, dispatched when a Rooms search is completed.
     *
     * <p>This event is fired in response to the <em>FindRoomsRequest</em> request to return the search result.</p>
     *
     * <table class="jsdoc-details-table">
     * <caption>The object passed to the listener contains the following parameters:</caption>
     * <tr><th>Property</th><th>Type</th><th>Description</th></tr>
     * <tr><td>rooms</td><td><code>Array of {@link SFSRoom}</code></td><td>A list of <em>SFSRoom</em> objects representing the Rooms matching the search criteria. If no Room is found, the list is empty.</td></tr>
     * </table>
     *
     * @example
     * <caption>This example looks for all the server Rooms whose "country" Room Variable is set to "Sweden".</caption>
     * function someMethod()
     * {
     * 	sfs.addEventListener(SFS2X.SFSEvent.ROOM_FIND_RESULT, onRoomFindResult, this);
     *
     * 	// Create a matching expression to find Rooms with a "country" variable equal to "Sweden"
     * 	var exp = new SFS2X.MatchExpression("country", SFS2X.Entities.Match.StringMatch.EQUALS, "Sweden");
     *
     * 	// Find the Rooms
     * 	sfs.send(new SFS2X.FindRoomsRequest(exp));
     * }
     *
     * function onRoomFindResult(evtParams)
     * {
     * 	console.log("Rooms found: " + evtParams.rooms);
     * }
     *
     * @constant {string}
     * @memberof SFSEvent
     *
     * @see	FindRoomsRequest
     * @see	MatchExpression
     */
    static readonly ROOM_FIND_RESULT: string;
    /**
     * The <em>userFindResult</em> event type, dispatched when a users search is completed.
     *
     * <p>This event is fired in response to the <em>FindUsersRequest</em> request to return the search result.</p>
     *
     * <table class="jsdoc-details-table">
     * <caption>The object passed to the listener contains the following parameters:</caption>
     * <tr><th>Property</th><th>Type</th><th>Description</th></tr>
     * <tr><td>users</td><td><code>Array of {@link SFSUser}</code></td><td>A list of <em>SFSUser</em> objects representing the users matching the search criteria. If no user is found, the list is empty.</td></tr>
     * </table>
     *
     * @example
     * <caption>This example looks for all the users whose "age" User Variable is greater than 29.</caption>
     * function someMethod()
     * {
     * 	sfs.addEventListener(SFS2X.SFSEvent.USER_FIND_RESULT, onUserFindResult, this);
     *
     * 	// Create a matching expression to find users with an "age" variable greater than 29:
     * 	var exp = new SFS2X.MatchExpression("age", SFS2X.NumberMatch.GREATER_THAN, 29);
     *
     * 	// Find the users
     * 	sfs.send(new SFS2X.FindUsersRequest(exp));
     * }
     *
     * function onUserFindResult(evtParams)
     * {
     * 	console.log("Users found: " + evtParams.users);
     * }
     *
     * @constant {string}
     * @memberof SFSEvent
     *
     * @see	FindUsersRequest
     * @see	MatchExpression
     */
    static readonly USER_FIND_RESULT: string;
    /**
     * The <em>invitation</em> event type, dispatched when the current user receives an invitation from another user.
     *
     * <p>This event is caused by the <em>InviteUsersRequest</em> and <em>CreateSFSGameRequest</em> requests; the user is supposed to reply using the <em>InvitationReplyRequest</em> request.</p>
     *
     * <table class="jsdoc-details-table">
     * <caption>The object passed to the listener contains the following parameters:</caption>
     * <tr><th>Property</th><th>Type</th><th>Description</th></tr>
     * <tr><td>invitation</td><td>{@link SFSInvitation}</td><td>An object representing the invitation received by the current user.</td></tr>
     * </table>
     *
     * @example
     * <caption>This example receives an invitation and accepts it automatically; in a real case scenario, the application interface usually allows the user choosing to accept or refuse the invitation, or even ignore it.</caption>
     * function someMethod()
     * {
     * 	sfs.addEventListener(SFS2X.SFSEvent.INVITATION, onInvitationReceived, this);
     * 	sfs.addEventListener(SFS2X.SFSEvent.INVITATION_REPLY_ERROR, onInvitationReplyError, this);
     * }
     *
     * function onInvitationReceived(evtParams)
     * {
     * 	// Let's accept this invitation
     * 	sfs.send(new SFS2X.InvitationReplyRequest(evtParams.invitation, SFS2X.InvitationReply.ACCEPT));
     * }
     *
     * function onInvitationReplyError(evtParams)
     * {
     * 	console.log("Failed to reply to invitation due to the following problem: " + evtParams.errorMessage);
     * }
     *
     * @constant {string}
     * @memberof SFSEvent
     *
     * @see	InviteUsersRequest
     * @see	InvitationReplyRequest
     * @see	SFSEvent.INVITATION_REPLY
     */
    static readonly INVITATION: string;
    /**
     * The <em>invitationReply</em> event type, dispatched when the current user receives a reply to an invitation he sent previously.
     *
     * <p>This event is caused by the <em>InvitationReplyRequest</em> request sent by the invitee.</p>
     *
     * <table class="jsdoc-details-table">
     * <caption>The object passed to the listener contains the following parameters:</caption>
     * <tr><th>Property</th><th>Type</th><th>Description</th></tr>
     * <tr><td>invitee</td><td>{@link SFSUser}</td><td>An object representing the user who replied to the invitation.</td></tr>
     * <tr><td>reply</td><td>number</td><td>The answer to the invitation among those available as constants in the <em>InvitationReply</em> class.</td></tr>
     * <tr><td>data</td><td>{@link SFSObject}</td><td>A <em>SFSObject</em> containing custom parameters, for example a message describing the reason of refusal.</td></tr>
     * </table>
     *
     * <p>See the example provided in the <em>INVITATION</em> constant description.</p>
     *
     * @constant {string}
     * @memberof SFSEvent
     *
     * @see	InvitationReplyRequest
     * @see	InvitationReply
     * @see	SFSEvent.INVITATION
     * @see	SFSEvent.INVITATION_REPLY_ERROR
     */
    static readonly INVITATION_REPLY: string;
    /**
     * The <em>invitationReplyError</em> event type, dispatched when an error occurs while the current user is sending a reply to an invitation he received.
     *
     * <p>This event is fired in response to the <em>InvitationReplyRequest</em> request in case the operation failed.</p>
     *
     * <table class="jsdoc-details-table">
     * <caption>The object passed to the listener contains the following parameters:</caption>
     * <tr><th>Property</th><th>Type</th><th>Description</th></tr>
     * <tr><td>errorMessage</td><td>string</td><td>A message containing the description of the error.</td></tr>
     * <tr><td>errorCode</td><td>number</td><td>The error code.</td></tr>
     * </table>
     *
     * <p>See the example provided in the <em>INVITATION</em> constant description.</p>
     *
     * @constant {string}
     * @memberof SFSEvent
     *
     * @see	InvitationReplyRequest
     * @see	SFSEvent.INVITATION_REPLY
     * @see	SFSEvent.INVITATION
     */
    static readonly INVITATION_REPLY_ERROR: string;
    /**
     * The <em>pingPong</em> event type, dispatched when a new lag value measurement is available.
     *
     * <p>This event is fired when the automatic lag monitoring is turned on by passing <code>true</code> to the <em>enableLagMonitor()</em> method.</p>
     *
     * <table class="jsdoc-details-table">
     * <caption>The object passed to the listener contains the following parameters:</caption>
     * <tr><th>Property</th><th>Type</th><th>Description</th></tr>
     * <tr><td>lagValue</td><td>number</td><td>The average of the last ten measured lag values, expressed in milliseconds.</td></tr>
     * </table>
     *
     * @constant {string}
     * @memberof SFSEvent
     *
     * @see SmartFox#enableLagMonitor
     */
    static readonly PING_PONG: string;
    /**
     * The <em>socketError</em> event type, dispatched when a low level socket error is detected, for example bad/inconsistent data.
     *
     * <table class="jsdoc-details-table">
     * <caption>The object passed to the listener contains the following parameters:</caption>
     * <tr><th>Property</th><th>Type</th><th>Description</th></tr>
     * <tr><td>errorMessage</td><td>string</td><td>The description of the error.</td></tr>
     * </table>
     *
     * @constant {string}
     * @memberof SFSEvent
     */
    static readonly SOCKET_ERROR: string;
}

/**
 * <b>Developers never istantiate the <em>SFSBuddyEvent</em> class</b>: only use its static properties.
 *
 * <p>The constants contained in this class are used to register the event listeners; when an event is dispatched, an object containing event-specific parameters is passed to the listener.
 * See the documentation below for a description of the parameters available for each event.</p>
 *
 * @example
 * <caption>This example shows the approach to be implemented to listen to events; please refer to the specific event types for the parameters object content.</caption>
 * function someMethod()
 * {
 * 	sfs.addEventListener(SFS2X.SFSBuddyEvent.BUDDY_LIST_INIT, onBuddyListInitialized, this);
 * 	sfs.addEventListener(SFS2X.SFSBuddyEvent.BUDDY_ERROR, onBuddyError, this)
 *
 * 	// Initialize the Buddy List system
 * 	sfs.send(new SFS2X.InitBuddyListRequest());
 * }
 *
 * function onBuddyListInitialized(evtParams)
 * {
 * 	console.log("Buddy List system initialized successfully");
 *
 * 	// Retrieve my buddies list
 * 	var buddies = evtParams.buddyList;
 *
 * 	// Display the online buddies in a list component in the application interface
 * 	...
 * }
 *
 * function onBuddyError(evtParams)
 * {
 * 	console.log("The following error occurred while executing a buddy-related request: " + evtParams.errorMessage);
 * }
 *
 * @class
 * The Buddy List related event types dispatched by the SmartFoxServer 2X JavaScript API.
 */
export class SFSBuddyEvent {
    constructor();
    /**
     * The <em>buddyListInit</em> event type, dispatched if the Buddy List system is successfully initialized.
     *
     * <p>This event is fired in response to the <em>InitBuddyListRequest</em> request in case the operation is executed successfully.</p>
     *
     * <p>After the Buddy List system initialization, the user returns to his previous custom state (if any - see <em>SFSBuddyManager.getMyState()</em> method).
     * His online/offline state, his nickname and his persistent Buddy Variables are all loaded and broadcast in the system.
     * In particular, the online state (see <em>SFSBuddyManager.getMyOnlineState()</em> method) determines if the user will appear online or not to other users who have him in their buddies list.</p>
     *
     * <table class="jsdoc-details-table">
     * <caption>The object passed to the listener contains the following parameters:</caption>
     * <tr><th>Property</th><th>Type</th><th>Description</th></tr>
     * <tr><td>buddyList</td><td><code>Array of {@link SFSBuddy}</td><td>A list of <em>SFSBuddy</em> objects representing all the buddies in the current user's buddy list.</td></tr>
     * <tr><td>myVariables</td><td><code>Array of {@link SFSBuddyVariable}</td><td>A list of all the Buddy Variables associated with the current user.</td></tr>
     * </table>
     *
     * @example
     * <caption>This example initializes the Buddy List system.</caption>
     * function someMethod()
     * {
     * 	sfs.addEventListener(SFS2X.SFSBuddyEvent.BUDDY_LIST_INIT, onBuddyListInitialized, this);
     * 	sfs.addEventListener(SFS2X.SFSBuddyEvent.BUDDY_ERROR, onBuddyError, this)
     *
     * 	// Initialize the Buddy List system
     * 	sfs.send(new SFS2X.InitBuddyListRequest());
     * }
     *
     * function onBuddyListInitialized(evtParams)
     * {
     * 	console.log("Buddy List system initialized successfully");
     *
     * 	// Retrieve my buddies list
     * 	var buddies = evtParams.buddyList;
     *
     * 	// Display the online buddies in a list component in the application interface
     * 	...
     * }
     *
     * function onBuddyError(evtParams)
     * {
     * 	console.log("The following error occurred while executing a buddy-related request: " + evtParams.errorMessage);
     * }
     *
     * @constant {string}
     * @memberof SFSBuddyEvent
     *
     * @see	InitBuddyListRequest
     * @see	SFSBuddyManager
     * @see	SFSBuddyEvent.BUDDY_ERROR
     */
    static readonly BUDDY_LIST_INIT: string;
    /**
     * The <em>buddyAdd</em> event type, dispatched when a buddy is added successfully to the current user's buddy list.
     *
     * <p>This event is fired in response to the <em>AddBuddyRequest</em> request in case the operation is executed successfully.</p>
     *
     * <table class="jsdoc-details-table">
     * <caption>The object passed to the listener contains the following parameters:</caption>
     * <tr><th>Property</th><th>Type</th><th>Description</th></tr>
     * <tr><td>buddy</td><td>{@link SFSBuddy}</td><td>The <em>SFSBuddy</em> object corresponding to the buddy that was added.</td></tr>
     * </table>
     *
     * @example
     * <caption>This example sends a request to add a buddy.</caption>
     * function someMethod()
     * {
     * 	sfs.addEventListener(SFS2X.SFSBuddyEvent.BUDDY_ADD, onBuddyAdded, this);
     * 	sfs.addEventListener(SFS2X.SFSBuddyEvent.BUDDY_ERROR, onBuddyError, this);
     *
     * 	// Add Jack as a new buddy to my buddies list
     * 	sfs.send(new SFS2X.AddBuddyRequest("Jack"));
     * }
     *
     * function onBuddyAdded(evtParams)
     * {
     * 	console.log("This buddy was added: " + evtParams.buddy.name);
     * }
     *
     * function onBuddyError(evtParams)
     * {
     * 	console.log("The following error occurred while executing a buddy-related request: " + evtParams.errorMessage);
     * }
     *
     * @constant {string}
     * @memberof SFSBuddyEvent
     *
     * @see	AddBuddyRequest
     * @see	SFSBuddyEvent.BUDDY_ERROR
     */
    static readonly BUDDY_ADD: string;
    /**
     * The <em>buddyRemove</em> event type, dispatched when a buddy is removed successfully from the current user's buddy list.
     *
     * <p>This event is fired in response to the <em>RemoveBuddyRequest</em> request in case the operation is executed successfully.</p>
     *
     * <table class="jsdoc-details-table">
     * <caption>The object passed to the listener contains the following parameters:</caption>
     * <tr><th>Property</th><th>Type</th><th>Description</th></tr>
     * <tr><td>buddy</td><td>{@link SFSBuddy}</td><td>The <em>SFSBuddy</em> object corresponding to the buddy that was removed.</td></tr>
     * </table>
     *
     * @example
     * <caption>This example sends a request to remove a buddy.</caption>
     * function someMethod()
     * {
     * 	sfs.addEventListener(SFS2X.SFSBuddyEvent.BUDDY_REMOVE, onBuddyRemoved, this);
     * 	sfs.addEventListener(SFS2X.SFSBuddyEvent.BUDDY_ERROR, onBuddyError, this);
     *
     * 	// Remove Jack from my buddies list
     * 	sfs.send(new SFS2X.RemoveBuddyRequest("Jack"));
     * }
     *
     * function onBuddyRemoved(evtParams)
     * {
     * 	console.log("This buddy was removed: " + evtParams.buddy.name);
     * }
     *
     * function onBuddyError(evtParams)
     * {
     * 	console.log("The following error occurred while executing a buddy-related request: " + evtParams.errorMessage);
     * }
     *
     * @constant {string}
     * @memberof SFSBuddyEvent
     *
     * @see	RemoveBuddyRequest
     * @see	SFSBuddyEvent.BUDDY_ERROR
     */
    static readonly BUDDY_REMOVE: string;
    /**
     * The <em>buddyBlock</em> event type, dispatched when a buddy is blocked or unblocked successfully by the current user.
     *
     * <p>This event is fired in response to the <em>BlockBuddyRequest</em> request in case the operation is executed successfully.</p>
     *
     * <table class="jsdoc-details-table">
     * <caption>The object passed to the listener contains the following parameters:</caption>
     * <tr><th>Property</th><th>Type</th><th>Description</th></tr>
     * <tr><td>buddy</td><td>{@link SFSBuddy}</td><td>The <em>SFSBuddy</em> object corresponding to the buddy that was blocked/unblocked.</td></tr>
     * </table>
     *
     * @example
     * <caption>This example handles the possible events caused by a request to block a buddy.</caption>
     * function someMethod()
     * {
     * 	sfs.addEventListener(SFS2X.SFSBuddyEvent.BUDDY_BLOCK, onBuddyBlock, this);
     * 	sfs.addEventListener(SFS2X.SFSBuddyEvent.BUDDY_ERROR, onBuddyError, this);
     *
     * 	// Block user "Jack" in my buddies list
     * 	smartFox.send(new SFS2X.BlockBuddyRequest("Jack", true));
     * }
     *
     * function onBuddyBlock(evtParams)
     * {
     * 	var isBlocked = evtParams.buddy.isBlocked;
     * 	console.log("Buddy " + evtParams.buddy.name + " is now " + (isBlocked ? "blocked" : "unblocked"));
     * }
     *
     * function onBuddyError(evtParams)
     * {
     * 	console.log("The following error occurred while executing a buddy-related request: " + evtParams.errorMessage);
     * }
     *
     * @constant {string}
     * @memberof SFSBuddyEvent
     *
     * @see	BlockBuddyRequest
     * @see	SFSBuddyEvent.BUDDY_ERROR
     */
    static readonly BUDDY_BLOCK: string;
    /**
     * The <em>buddyError</em> event type, dispatched if an error occurs while executing a request related to the Buddy List system.
     *
     * <p>For example, this event is fired in response to the <em>AddBuddyRequest</em> request, the <em>BlockBuddyRequest</em>, etc.</p>
     *
     * <table class="jsdoc-details-table">
     * <caption>The object passed to the listener contains the following parameters:</caption>
     * <tr><th>Property</th><th>Type</th><th>Description</th></tr>
     * <tr><td>errorMessage</td><td>string</td><td>A message containing the description of the error.</td></tr>
     * <tr><td>errorCode</td><td>number</td><td>The error code.</td></tr>
     * </table>
     *
     * <p>See the example provided in the <em>BUDDY_ADD</em> constant description.</p>
     *
     * @constant {string}
     * @memberof SFSBuddyEvent
     *
     * @see	SFSBuddyEvent.BUDDY_ADD
     */
    static readonly BUDDY_ERROR: string;
    /**
     * The <em>buddyOnlineStateChange</em> event type, dispatched when a buddy in the current user's buddy list changes his online state in the Buddy List system.
     *
     * <p>This event is fired in response to the <em>GoOnlineRequest</em> request.</p>
     *
     * <p><b>NOTE</b>: this event is dispatched to those who have the user as a buddy, but also to the user himself.
     * As in this case the value of the <em>buddy</em> parameter is <code>null</code> (because the user is not buddy to himself of course),
     * the <em>isItMe</em> parameter should be used to check if the current user is the one who changed his own online state.</p>
     *
     * <table class="jsdoc-details-table">
     * <caption>The object passed to the listener contains the following parameters:</caption>
     * <tr><th>Property</th><th>Type</th><th>Description</th></tr>
     * <tr><td>buddy</td><td>{@link SFSBuddy}</td><td>The <em>SFSBuddy</em> object representing the buddy who changed his own online state. If the <em>isItMe</em> parameter is <code>true</code>, the value of this parameter is <code>null</code> (because a user is not buddy to himself).</td></tr>
     * <tr><td>isItMe</td><td>boolean</td><td><code>true</code> if the online state was changed by the current user himself (in this case this event is a sort of state change confirmation).</td></tr>
     * </table>
     *
     * @example
     * <caption>This example changes the online state of the user in the Buddy List system.</caption>
     * function someMethod()
     * {
     * 	sfs.addEventListener(SFS2X.SFSBuddyEvent.BUDDY_ONLINE_STATE_CHANGE, onBuddyOnlineStateChanged, this);
     *
     * 	// Put myself offline in the Buddy List system
     * 	sfs.send(new SFS2X.GoOnlineRequest(false));
     * }
     *
     * function onBuddyOnlineStateChanged(evtParams)
     * {
     * 	// As the state change event is dispatched to me too,
     * 	// I have to check if I am the one who changed his state
     *
     * 	var isItMe = evtParams.isItMe;
     *
     * 	if (isItMe)
     * 		console.log("I'm now " + (sfs.buddyManager.getMyOnlineState() ? "online" : "offline"));
     * 	else
     * 		console.log("My buddy " + evtParams.buddy.name + " is now " + (evtParams.buddy.isOnline ? "online" : "offline"));
     * }
     *
     * @constant {string}
     * @memberof SFSBuddyEvent
     *
     * @see	GoOnlineRequest
     */
    static readonly BUDDY_ONLINE_STATE_CHANGE: string;
    /**
     * The <em>buddyVariablesUpdate</em> event type, dispatched when a buddy in the current user's buddies list updates one or more Buddy Variables.
     *
     * <p>This event is fired in response to the <em>SetBuddyVariablesRequest</em> request.</p>
     *
     * <p><b>NOTE</b>: this event is dispatched to those who have the user as a buddy, but also to the user himself.
     * As in this case the value of the <em>buddy</em> parameter is <code>null</code> (because the user is not buddy to himself of course) and
     * the <em>isItMe</em> parameter should be used to check if the current user is the one who updated his own Buddy Variables.</p>
     *
     * <table class="jsdoc-details-table">
     * <caption>The object passed to the listener contains the following parameters:</caption>
     * <tr><th>Property</th><th>Type</th><th>Description</th></tr>
     * <tr><td>buddy</td><td>{@link SFSBuddy}</td><td>The <em>SFSBuddy</em> object representing the buddy who updated his own Buddy Variables. If the <em>isItMe</em> parameter is <code>true</code>, the value of this parameter is <code>null</code> (because a user is not buddy to himself).</td></tr>
     * <tr><td>isItMe</td><td>boolean</td><td><code>true</code> if the Buddy Variables were updated by the current user himself (in this case this event is a sort of update confirmation).</td></tr>
     * <tr><td>changedVars</td><td><code>Array of string</code></td><td>The list of names of the Buddy Variables that were changed (or created for the first time).</td></tr>
     * </table>
     *
     * @example
     * <caption>This example sets some Buddy Variables for the current user, one of which is persistent and another one is the reserved variable used to set the nickname; the example also handles changes made by the user or by his buddies.</caption>
     * function someMethod()
     * {
     * 	sfs.addEventListener(SFS2X.SFSBuddyEvent.BUDDY_VARIABLES_UPDATE, onBuddyVarsUpdate, this);
     *
     * 	// Create two Buddy Variables containing the title and artist of the song I'm listening to
     * 	var songTitle = new SFS2X.SFSBuddyVariable("songTitle", "Ascension");
     * 	var songAuthor = new SFS2X.SFSBuddyVariable("songAuthor", "Mike Oldfield");
     *
     * 	// Create a persistent Buddy Variable containing my mood message
     * 	var mood = new SFS2X.SFSBuddyVariable(SFS2X.SFSBuddyVariable.OFFLINE_PREFIX + "mood", "SFS2X rocks!");
     *
     * 	// Set my nickname
     * 	var nick = new SFS2X.SFSBuddyVariable(SFS2X.ReservedBuddyVariables.BV_NICKNAME, "Bax");
     *
     * 	// Set my Buddy Variables
     * 	var vars = [songTitle, songAuthor, mood, nick];
     * 	sfs.send(new SFS2X.SetBuddyVariablesRequest(vars));
     * }
     *
     * function onBuddyVarsUpdate(evtParams)
     * {
     * 	// As the update event is dispatched to me too,
     * 	// I have to check if I am the one who changed his Buddy Variables
     *
     * 	var isItMe = evtParams.isItMe;
     *
     * 	if (isItMe)
     * 	{
     * 		console.log("I've updated the following Buddy Variables:");
     *
     * 		for (var i = 0; i < evtParams.changedVars.length; i++)
     * 		{
     * 			var bVarName = evtParams.changedVars[i];
     * 			console.log(bVarName + " -->; " + sfs.buddyManager.getMyVariable(bVarName).value);
     * 		}
     * 	}
     * 	else
     * 	{
     * 		var buddyName = evtParams.buddy.name;
     *
     * 		console.log("My buddy " + buddyName + " updated the following Buddy Variables:");
     *
     * 		for (var i = 0; i < evtParams.changedVars.length; i++)
     * 		{
     * 			var bVarName = evtParams.changedVars[i];
     * 			console.log(bVarName + " --> " + sfs.buddyManager.getBuddyByName(buddyName).getVariable(bVarName).value);
     * 		}
     * 	}
     * }
     *
     * @constant {string}
     * @memberof SFSBuddyEvent
     *
     * @see	SetBuddyVariablesRequest
     * @see	SFSBuddyVariable
     */
    static readonly BUDDY_VARIABLES_UPDATE: string;
    /**
     * The <em>buddyMessage</em> event type, dispatched when a message from a buddy is received by the current user.
     *
     * <p>This event is fired in response to the <em>BuddyMessageRequest</em> request.</p>
     *
     * <p><b>NOTE</b>: the same event is fired by the sender's client too, so that the user is aware that the message was delivered successfully to the recipient,
     * and it can be displayed in the chat area keeping the correct message ordering. As in this case the value of the <em>buddy</em> parameter is <code>null</code>
     * (because, being the sender, the user is not buddy to himself of course), there is no default way to know who the message was originally sent to.
     * As this information can be useful in scenarios where the sender is chatting with more than one buddy at the same time in separate windows or tabs
     * (and we need to write his own message in the proper one), the <em>data</em> parameter can be used to store, for example, the id of the recipient buddy.</p>
     *
     * <table class="jsdoc-details-table">
     * <caption>The object passed to the listener contains the following parameters:</caption>
     * <tr><th>Property</th><th>Type</th><th>Description</th></tr>
     * <tr><td>buddy</td><td>{@link SFSBuddy}</td><td>The <em>SFSBuddy</em> object representing the message sender. If the <em>isItMe</em> parameter is <code>true</code>, the value of this parameter is <code>null</code> (because a user is not buddy to himself).</td></tr>
     * <tr><td>isItMe</td><td>boolean</td><td><code>true</code> if the message sender is the current user himself (in this case this event is a sort of message delivery confirmation).</td></tr>
     * <tr><td>message</td><td>string</td><td>The message text.</td></tr>
     * <tr><td>data</td><td>{@link SFSObject}</td><td>A <em>SFSObject</em> containing additional custom parameters (e.g. the message color, an emoticon id, etc).</td></tr>
     * </table>
     *
     * @example
     * <caption>This example sends a message to a buddy and handles the related event.</caption>
     * function someMethod()
     * {
     * 	sfs.addEventListener(SFS2X.SFSBuddyEvent.BUDDY_MESSAGE, onBuddyMessage, this);
     *
     * 	// Get the recipient of the message, in this case my buddy Jack
     * 	var buddy = sfs.buddyManager.getBuddyByName("Jack");
     *
     * 	// Send a message to Jack
     * 	sfs.send(new SFS2X.BuddyMessageRequest("Hello Jack!", buddy));
     * }
     *
     * function onBuddyMessage(evtParams)
     * {
     * 	// As messages are forwarded to the sender too,
     * 	// I have to check if I am the sender
     *
     * 	var isItMe = evtParams.isItMe;
     * 	var sender = evtParams.buddy;
     *
     * 	if (isItMe)
     * 		console.log("I said: " + evtParams.message);
     * 	else
     * 		console.log("My buddy " + sender.name + " said: " + evtParams.message);
     * }
     *
     * @constant {string}
     * @memberof SFSBuddyEvent
     *
     * @see	BuddyMessageRequest
     */
    static readonly BUDDY_MESSAGE: string;
}

/**
 * <b>Developers never istantiate the <em>SFSDataType</em> class</b>: only use its static properties.
 *
 * @class
 * The costants defining the data types supported by <em>SFSObject</em> and <em>SFSArray</em> classes.
 *
 * @see SFSObject
 * @see SFSArray
 */
export class SFSDataType {
    constructor();
    /**
     * A <code>null</code> value.
     *
     * @constant {number}
     * @memberof SFSDataType
     */
    static readonly NULL: number;
    /**
     * A boolean value.
     *
     * @constant {number}
     * @memberof SFSDataType
     */
    static readonly BOOL: number;
    /**
     * A byte (8 bit) value.
     *
     * @constant {number}
     * @memberof SFSDataType
     */
    static readonly BYTE: number;
    /**
     * A short integer (16 bit) value.
     *
     * @constant {number}
     * @memberof SFSDataType
     */
    static readonly SHORT: number;
    /**
     * An integer (32 bit) value.
     *
     * @constant {number}
     * @memberof SFSDataType
     */
    static readonly INT: number;
    /**
     * A long integer value.
     *
     * <p><b>IMPORTANT</b>: in JavaScript, long integer numbers are limited to {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER Number.MAX_SAFE_INTEGER} (positive and negative, inclusive).
     * This is inconsistent with the max and min Long values available in Java, which are down to <code>-2^63</code> and up to <code>2^63 - 1</code>.
     * So if you are developing your server side Extension in Java, make sure you take this limitation into account when dealing with integers.</p>
     *
     * @constant {number}
     * @memberof SFSDataType
     */
    static readonly LONG: number;
    /**
     * A floating point number (32 bit) value.
     *
     * @constant {number}
     * @memberof SFSDataType
     */
    static readonly FLOAT: number;
    /**
     * A double precision number (64 bit) value.
     *
     * @constant {number}
     * @memberof SFSDataType
     */
    static readonly DOUBLE: number;
    /**
     * A UTF-8 encoded string value, with length up to 32 KBytes.
     *
     * @constant {number}
     * @memberof SFSDataType
     */
    static readonly UTF_STRING: number;
    /**
     * An array of boolean values.
     *
     * @constant {number}
     * @memberof SFSDataType
     */
    static readonly BOOL_ARRAY: number;
    /**
     * An array of byte values.
     *
     * @constant {number}
     * @memberof SFSDataType
     */
    static readonly BYTE_ARRAY: number;
    /**
     * An array of short integer values.
     *
     * @constant {number}
     * @memberof SFSDataType
     */
    static readonly SHORT_ARRAY: number;
    /**
     * A short integer (16 bit) value.
     *
     * @constant {number}
     * @memberof SFSDataType
     */
    static readonly INT_ARRAY: number;
    /**
     * An array of long integer values.
     *
     * <p><b>IMPORTANT</b>: in JavaScript, long integer numbers are limited to {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER Number.MAX_SAFE_INTEGER} (positive and negative, inclusive).
     * This is inconsistent with the max and min Long values available in Java, which are down to <code>-2^63</code> and up to <code>2^63 - 1</code>.
     * So if you are developing your server side Extension in Java, make sure you take this limitation into account when dealing with integers.</p>
     *
     * @constant {number}
     * @memberof SFSDataType
     */
    static readonly LONG_ARRAY: number;
    /**
     * An array of floating point number values.
     *
     * @constant {number}
     * @memberof SFSDataType
     */
    static readonly FLOAT_ARRAY: number;
    /**
     * An array of double precision number values.
     *
     * @constant {number}
     * @memberof SFSDataType
     */
    static readonly DOUBLE_ARRAY: number;
    /**
     * An array of string values.
     *
     * @constant {number}
     * @memberof SFSDataType
     */
    static readonly UTF_STRING_ARRAY: number;
    /**
     * A nested <em>SFSArray</em> object.
     *
     * @constant {number}
     * @memberof SFSDataType
     *
     * @see SFSArray
     */
    static readonly SFS_ARRAY: number;
    /**
     * A nested <em>SFSObject</em> object.
     *
     * @constant {number}
     * @memberof SFSDataType
     *
     * @see SFSObject
     */
    static readonly SFS_OBJECT: number;
    /**
     * A UTF-8 encoded string value, with length up to 2 GBytes.
     *
     * @constant {number}
     * @memberof SFSDataType
     */
    static readonly TEXT: number;
}

/**
 * The <em>SFSObject</em> class is used by SmartFoxServer in client-server data transfer.
 *
 * @see ExtensionRequest
 * @see SFSDataType
 */
export class SFSObject {
    constructor();
    /**
     * Retrieves a list of all the keys contained in this object.
     *
     * @return {string[]} The list of all the keys in this object.
     */
    getKeysArray(): string[];
    /**
     * Returns the number of elements in this object.
     *
     * @return {number}	The number of elements in this object.
     */
    size(): number;
    /**
     * Indicates whether this object contains a mapping for the specified key.
     *
     * @param	{string} key	The key whose presence in this object is to be checked.
     *
     * @return	{boolean} <code>true</code> if this object contains a mapping for the passed key.
     */
    containsKey(key: string): boolean;
    /**
     * Returns the value assigned to the specified key.
     *
     * <p>If the <em>typeId</em> parameter is passed, this method also executes a type check, to make sure the requested value has the expected type.
     * In particular this is used by the other specialized <em>get...()</em> methods.</p>
     *
     * @param	{string} key		The key whose associated value is to be returned.
     * @param	{number} [typeId]	The identifier of the expected value's type; must be one of the constants set in the <em>SFSDataType</em> class.
     *                          	<br>If passed and the type is not corresponding, an error is thrown.
     *                          	<br>If not passed, no type check is executed and the value is returned immediately.
     *
     * @return {*} The value assigned to the specified key. <code>null</code> is returned if no value is associated with the passed key.
     */
    get(key: string, typeId?: number): any;
    /**
     * Indicates if the value mapped by the passed key is of type <em>SFSDataType.NULL</em>.
     *
     * @param	{string} key	The key to be checked.
     *
     * @return {boolean} <code>true</code> if the value mapped by the passed key is of type <em>SFSDataType.NULL</em>.
     */
    isNull(key: string): boolean;
    /**
     * Returns the boolean value corresponding to the passed key.
     *
     * @param	{string} key	The key whose associated value is to be returned.
     *
     * @return {boolean} The value assigned to the specified key.
     */
    getBool(key: string): boolean;
    /**
     * Returns the byte value corresponding to the passed key.
     *
     * @param	{string} key	The key whose associated value is to be returned.
     *
     * @return {number} The value assigned to the specified key.
     */
    getByte(key: string): number;
    /**
     * Returns the short integer corresponding to the passed key.
     *
     * @param	{string} key	The key whose associated value is to be returned.
     *
     * @return {number} The value assigned to the specified key.
     */
    getShort(key: string): number;
    /**
     * Returns the integer corresponding to the passed key.
     *
     * @param	{string} key	The key whose associated value is to be returned.
     *
     * @return {number} The value assigned to the specified key.
     */
    getInt(key: string): number;
    /**
     * Returns the long integer corresponding to the passed key.
     *
     * <p><b>IMPORTANT</b>: in JavaScript, long integer numbers are limited to {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER Number.MAX_SAFE_INTEGER} (positive and negative, inclusive).
     * This is inconsistent with the max and min Long values available in Java, which are down to <code>-2^63</code> and up to <code>2^63 - 1</code>.
     * In case a number greater than {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER Number.MAX_SAFE_INTEGER} is returned, this could differ from the actual value set on the server side (a warning will be logged on the client).</p>
     *
     * @param	{string} key	The key whose associated value is to be returned.
     *
     * @return {number} The value assigned to the specified key.
     */
    getLong(key: string): number;
    /**
     * Returns the floating point number corresponding to the passed key.
     *
     * @param	{string} key	The key whose associated value is to be returned.
     *
     * @return {number} The value assigned to the specified key.
     */
    getFloat(key: string): number;
    /**
     * Returns the double precision number corresponding to the passed key.
     *
     * @param	{string} key	The key whose associated value is to be returned.
     *
     * @return {number} The value assigned to the specified key.
     */
    getDouble(key: string): number;
    /**
     * Returns the UTF-8 string corresponding to the passed key.
     *
     * @param	{string} key	The key whose associated value is to be returned.
     *
     * @return {string} The value assigned to the specified key.
     */
    getUtfString(key: string): string;
    /**
     * Returns the UTF-8 string corresponding to the passed key.
     *
     * @param	{string} key	The key whose associated value is to be returned.
     *
     * @return {string} The value assigned to the specified key.
     */
    getText(key: string): string;
    /**
     * Returns the array of boolean values corresponding to the passed key.
     *
     * @param	{string} key	The key whose associated array is to be returned.
     *
     * @return {array} The array assigned to the specified key.
     */
    getBoolArray(key: string): array;
    /**
     * Returns the byte array corresponding to the passed key.
     *
     * @param	{string} key	The key whose associated byte array is to be returned.
     *
     * @return {Uint8Array} The byte array assigned to the specified key.
     */
    getByteArray(key: string): Uint8Array;
    /**
     * Returns the array of short integers corresponding to the passed key.
     *
     * @param	{string} key	The key whose associated array is to be returned.
     *
     * @return {array} The array assigned to the specified key.
     */
    getShortArray(key: string): array;
    /**
     * Returns the array of integers corresponding to the passed key.
     *
     * @param	{string} key	The key whose associated array is to be returned.
     *
     * @return {array} The array assigned to the specified key.
     */
    getIntArray(key: string): array;
    /**
     * Returns the array of long integers corresponding to the passed key.
     *
     * <p><b>IMPORTANT</b>: in JavaScript, long integer numbers are limited to {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER Number.MAX_SAFE_INTEGER} (positive and negative, inclusive).
     * This is inconsistent with the max and min Long values available in Java, which are down to <code>-2^63</code> and up to <code>2^63 - 1</code>.</p>
     *
     * @param	{string} key	The key whose associated array is to be returned.
     *
     * @return {array} The array assigned to the specified key.
     */
    getLongArray(key: string): array;
    /**
     * Returns the array of floating point numbers corresponding to the passed key.
     *
     * @param	{string} key	The key whose associated array is to be returned.
     *
     * @return {array} The array assigned to the specified key.
     */
    getFloatArray(key: string): array;
    /**
     * Returns the array of double precision numbers corresponding to the passed key.
     *
     * @param	{string} key	The key whose associated array is to be returned.
     *
     * @return {array} The array assigned to the specified key.
     */
    getDoubleArray(key: string): array;
    /**
     * Returns the array of UTF-8 strings corresponding to the passed key.
     *
     * @param	{string} key	The key whose associated array is to be returned.
     *
     * @return {array} The array assigned to the specified key.
     */
    getUtfStringArray(key: string): array;
    /**
     * Returns the SFSObject corresponding to the passed key.
     *
     * @param	{string} key	The key whose associated array is to be returned.
     *
     * @return {SFSObject} The <em>SFSObject</em> assigned to the specified key.
     */
    getSFSObject(key: string): SFSObject;
    /**
     * Returns the SFSArray corresponding to the passed key.
     *
     * @param	{string} key	The key whose associated array is to be returned.
     *
     * @return {SFSArray} The <em>SFSArray</em> assigned to the specified key.
     */
    getSFSArray(key: string): SFSArray;
    /**
     * Assign a value of the passed type to the passed key.
     *
     * @param	{string} key	The key to which the specified value has to be assigned.
     * @param	{*} value		The value to be assigned to the passed key.
     * @param	{number} typeId	The value's type identifier; must be one of the constants set in the <em>SFSDataType</em> class.
     *
     * @see SFSDataType
     */
    put(key: string, value: any, typeId: number): void;
    /**
     * Assigns a null value to the passed key.
     *
     * <p>This is a shortcut for the <em>put()</em> method.</p>
     *
     * @param	{string} key	The key to which the specified value has to be assigned.
     */
    putNull(key: string): void;
    /**
     * Assigns a boolean value to the passed key.
     *
     * <p>This is a shortcut for the <em>put()</em> method.</p>
     *
     * @param	{string} key		The key to which the specified value has to be assigned.
     * @param	{boolean} value		The value to be assigned to the passed key.
     */
    putBool(key: string, value: boolean): void;
    /**
     * Assigns a number to the passed key as a byte (8 bit).
     *
     * <p>This is a shortcut for the <em>put()</em> method.</p>
     *
     * @param	{string} key		The key to which the specified value has to be assigned.
     * @param	{number} value		The value to be assigned to the passed key.
     */
    putByte(key: string, value: number): void;
    /**
     * Assigns a number to the passed key as a short integer (16 bit).
     *
     * <p>This is a shortcut for the <em>put()</em> method.</p>
     *
     * @param	{string} key		The key to which the specified value has to be assigned.
     * @param	{number} value		The value to be assigned to the passed key.
     */
    putShort(key: string, value: number): void;
    /**
     * Assigns a number to the passed key as an integer (32 bit).
     *
     * <p>This is a shortcut for the <em>put()</em> method.</p>
     *
     * @param	{string} key		The key to which the specified value has to be assigned.
     * @param	{number} value		The value to be assigned to the passed key.
     */
    putInt(key: string, value: number): void;
    /**
     * Assigns a number to the passed key as a long integer.
     *
     * <p><b>IMPORTANT</b>: in JavaScript, long integer numbers are limited to {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER Number.MAX_SAFE_INTEGER} (positive and negative, inclusive).
     * This is inconsistent with the max and min Long values available in Java, which are down to <code>-2^63</code> and up to <code>2^63 - 1</code>.
     * So if you are developing your server side Extension in Java, make sure you take this limitation into account when dealing with integers.</p>
     *
     * <p>This is a shortcut for the <em>put()</em> method.</p>
     *
     * @param	{string} key		The key to which the specified value has to be assigned.
     * @param	{number} value		The value to be assigned to the passed key.
     */
    putLong(key: string, value: number): void;
    /**
     * Assigns a number to the passed key as a floating point value (32 bit).
     *
     * <p>This is a shortcut for the <em>put()</em> method.</p>
     *
     * @param	{string} key		The key to which the specified value has to be assigned.
     * @param	{number} value		The value to be assigned to the passed key.
     */
    putFloat(key: string, value: number): void;
    /**
     * Assigns a number to the passed key as a double precision value (64 bit).
     *
     * <p>This is a shortcut for the <em>put()</em> method.</p>
     *
     * @param	{string} key		The key to which the specified value has to be assigned.
     * @param	{number} value		The value to be assigned to the passed key.
     */
    putDouble(key: string, value: number): void;
    /**
     * Assigns a UTF-8 string to the passed key (max length: 32 KBytes).
     *
     * <p>This is a shortcut for the <em>put()</em> method.</p>
     *
     * @param	{string} key		The key to which the specified value has to be assigned.
     * @param	{string} value		The value to be assigned to the passed key.
     */
    putUtfString(key: string, value: string): void;
    /**
     * Assigns a UTF-8 text to the passed key (max length: 2 GBytes).
     *
     * <p>This is a shortcut for the <em>put()</em> method.</p>
     *
     * @param	{string} key		The key to which the specified value has to be assigned.
     * @param	{string} value		The value to be assigned to the passed key.
     */
    putText(key: string, value: string): void;
    /**
     * Assigns an array of booleans to the passed key.
     *
     * <p>This is a shortcut for the <em>put()</em> method.</p>
     *
     * @param	{string} key		The key to which the specified array has to be assigned.
     * @param	{boolean[]} array	The array to be assigned to the passed key.
     */
    putBoolArray(key: string, array: boolean[]): void;
    /**
     * Assigns a byte array to the passed key.
     *
     * <p>This is a shortcut for the <em>put()</em> method.</p>
     *
     * @param	{string} key		The key to which the specified byte array has to be assigned.
     * @param	{Uint8Array} array	The byte array to be assigned to the passed key.
     */
    putByteArray(key: string, array: Uint8Array): void;
    /**
     * Assigns an array of numbers to the passed key as short integers.
     *
     * <p>This is a shortcut for the <em>put()</em> method.</p>
     *
     * @param	{string} key		The key to which the specified array has to be assigned.
     * @param	{number[]} array	The array to be assigned to the passed key.
     */
    putShortArray(key: string, array: number[]): void;
    /**
     * Assigns an array of numbers to the passed key as integers.
     *
     * <p>This is a shortcut for the <em>put()</em> method.</p>
     *
     * @param	{string} key		The key to which the specified array has to be assigned.
     * @param	{number[]} array	The array to be assigned to the passed key.
     */
    putIntArray(key: string, array: number[]): void;
    /**
     * Assigns an array of numbers to the passed key as long integers.
     *
     * <p>This is a shortcut for the <em>put()</em> method.</p>
     *
     * <p><b>Read important note in the <em>put()</em> method description.</b></p>
     *
     * @param	{string} key		The key to which the specified array has to be assigned.
     * @param	{number[]} array	The array to be assigned to the passed key.
     */
    putLongArray(key: string, array: number[]): void;
    /**
     * Assigns an array of numbers to the passed key as floating point values.
     *
     * <p>This is a shortcut for the <em>put()</em> method.</p>
     *
     * @param	{string} key		The key to which the specified array has to be assigned.
     * @param	{number[]} array	The array to be assigned to the passed key.
     */
    putFloatArray(key: string, array: number[]): void;
    /**
     * Assigns an array of numbers to the passed key as double precision values.
     *
     * <p>This is a shortcut for the <em>put()</em> method.</p>
     *
     * @param	{string} key		The key to which the specified array has to be assigned.
     * @param	{number[]} array	The array to be assigned to the passed key.
     */
    putDoubleArray(key: string, array: number[]): void;
    /**
     * Assigns an array of UTF-8 strings to the passed key.
     *
     * <p>This is a shortcut for the <em>put()</em> method.</p>
     *
     * @param	{string} key		The key to which the specified array has to be assigned.
     * @param	{string[]} array	The array to be assigned to the passed key.
     */
    putUtfStringArray(key: string, array: string[]): void;
    /**
     * Assigns a nested <em>SFSArray</em> to the passed key.
     *
     * <p>This is a shortcut for the <em>put()</em> method.</p>
     *
     * @param	{string} key		The key to which the specified value has to be assigned.
     * @param	{SFSArray} value	The <em>SFSArray</em> to be assigned to the passed key.
     */
    putSFSArray(key: string, value: SFSArray): void;
    /**
     * Assigns a nested <em>SFSObject</em> to the passed key.
     *
     * <p>This is a shortcut for the <em>put()</em> method.</p>
     *
     * @param	{string} key		The key to which the specified value has to be assigned.
     * @param	{SFSObject} value	The <em>SFSObject</em> to be assigned to the passed key.
     */
    putSFSObject(key: string, value: SFSObject): void;
    /**
     * Provides a formatted string representing this object.
     *
     * <p>The returned string can be logged or traced in the console for debugging purposes.</p>
     *
     * @param	{boolean} [format=true]	If <code>true</code>, the output is formatted in a human-readable way.
     *
     * @return {string} The string representation of this object.
     */
    getDump(format?: boolean): string;
    /**
     * Provides a detailed hexadecimal representation of this object.
     *
     * <p>The returned string can be logged or traced in the console for debugging purposes.</p>
     *
     * @return {string} The hexadecimal string representation of this object.
     */
    getHexDump(): string;
}

/**
 * The <em>SFSArray</em> class is used by SmartFoxServer in client-server data transfer.
 *
 * @see SFSObject
 * @see SFSDataType
 */
export class SFSArray {
    constructor();
    /**
     * Indicates the number of elements in this array.
     *
     * @return {number} The number of elements in this array.
     */
    size(): number;
    /**
     * Indicates whether this SFSArray contains the specified object or not.
     *
     * <p><b>NOTE</b>: this method doesn't support checking the presence of a nested SFSObject or SFSArray.</p>
     *
     * @param	{*} object	The object whose presence in this array is to be tested.
     *
     * @return	{boolean} <code>true</code> if the specified object is present in the SFSArray.
     */
    contains(object: any): boolean;
    /**
     * Returns the element at the specified index.
     *
     * <p>If the <em>typeId</em> parameter is passed, this method also executes a type check, to make sure the requested value has the expected type.
     * In particular this is used by the other specialized <em>get...()</em> methods.</p>
     *
     * @param	{number} index		The position of the element to return.
     * @param	{number} [typeId]	The identifier of the expected value's type; must be one of the constants set in the <em>SFSDataType</em> class.
     *                          	<br>If passed and the type is not corresponding, an error is thrown.
     *                          	<br>If not passed, no type check is executed and the value is returned immediately.
     *
     * @return {*} The element of this array at the specified index.
     */
    get(index: number, typeId?: number): any;
    /**
     * Indicates if the element at the specified index is of type <em>SFSDataType.NULL</em>.
     *
     * @param	{number} index	The position of the element to be checked.
     *
     * @return {boolean} <code>true</code> if the element at the specified index is of type <em>SFSDataType.NULL</em>.
     */
    isNull(index: number): boolean;
    /**
     * Returns the boolean value at the specified index.
     *
     * @param	{number} index	The position of the element to return.
     *
     * @return {boolean} The element of this array at the specified index.
     */
    getBool(index: number): boolean;
    /**
     * Returns the byte value at the specified index.
     *
     * @param	{number} index	The position of the element to return.
     *
     * @return {number} The element of this array at the specified index.
     */
    getByte(index: number): number;
    /**
     * Returns the short integer at the specified index.
     *
     * @param	{number} index	The position of the element to return.
     *
     * @return {number} The element of this array at the specified index.
     */
    getShort(index: number): number;
    /**
     * Returns the integer at the specified index.
     *
     * @param	{number} index	The position of the element to return.
     *
     * @return {number} The element of this array at the specified index.
     */
    getInt(index: number): number;
    /**
     * Returns the long at the specified index.
     *
     * <p><b>IMPORTANT</b>: in JavaScript, long integer numbers are limited to {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER Number.MAX_SAFE_INTEGER} (positive and negative, inclusive).
     * This is inconsistent with the max and min Long values available in Java, which are down to <code>-2^63</code> and up to <code>2^63 - 1</code>.
     * In case a number greater than {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER Number.MAX_SAFE_INTEGER} is returned, this could differ from the actual value set on the server side (a warning will be logged on the client).</p>
     *
     * @param	{number} index	The position of the element to return.
     *
     * @return {number} The element of this array at the specified index.
     */
    getLong(index: number): number;
    /**
     * Returns the floating point number at the specified index.
     *
     * @param	{number} index	The position of the element to return.
     *
     * @return {number} The element of this array at the specified index.
     */
    getFloat(index: number): number;
    /**
     * Returns the double precision number at the specified index.
     *
     * @param	{number} index	The position of the element to return.
     *
     * @return {number} The element of this array at the specified index.
     */
    getDouble(index: number): number;
    /**
     * Returns the UTF-8 string at the specified index.
     *
     * @param	{number} index	The position of the element to return.
     *
     * @return {string} The element of this array at the specified index.
     */
    getUtfString(index: number): string;
    /**
     * Returns the UTF-8 string at the specified index.
     *
     * @param	{number} index	The position of the element to return.
     *
     * @return {string} The element of this array at the specified index.
     */
    getText(index: number): string;
    /**
     * Returns the array of boolean values at the specified index.
     *
     * @param	{number} index	The position of the array to return.
     *
     * @return {array} The array at the specified index.
     */
    getBoolArray(index: number): array;
    /**
     * Returns the byte array at the specified index.
     *
     * @param	{number} index	The position of the byte array to return.
     *
     * @return {Uint8Array} The byte array at the specified index.
     */
    getByteArray(index: number): Uint8Array;
    /**
     * Returns the array of short integers at the specified index.
     *
     * @param	{number} index	The position of the array to return.
     *
     * @return {array} The array at the specified index.
     */
    getShortArray(index: number): array;
    /**
     * Returns the array of integers at the specified index.
     *
     * @param	{number} index	The position of the array to return.
     *
     * @return {array} The array at the specified index.
     */
    getIntArray(index: number): array;
    /**
     * Returns the array of long integers at the specified index.
     *
     * <p><b>IMPORTANT</b>: in JavaScript, long integer numbers are limited to {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER Number.MAX_SAFE_INTEGER} (positive and negative, inclusive).
     * This is inconsistent with the max and min Long values available in Java, which are down to <code>-2^63</code> and up to <code>2^63 - 1</code>.</p>
     *
     * @param	{number} index	The position of the array to return.
     *
     * @return {array} The array at the specified index.
     */
    getLongArray(index: number): array;
    /**
     * Returns the array of floating point numbers at the specified index.
     *
     * @param	{number} index	The position of the array to return.
     *
     * @return {array} The array at the specified index.
     */
    getFloatArray(index: number): array;
    /**
     * Returns the array of double precision numbers at the specified index.
     *
     * @param	{number} index	The position of the array to return.
     *
     * @return {array} The array at the specified index.
     */
    getDoubleArray(index: number): array;
    /**
     * Returns the array of UTF-8 strings at the specified index.
     *
     * @param	{number} index	The position of the array to return.
     *
     * @return {array} The array at the specified index.
     */
    getUtfStringArray(index: number): array;
    /**
     * Returns the SFSObject at the specified index.
     *
     * @param	{number} index	The position of the array to return.
     *
     * @return {SFSObject} The <em>SFSObject</em> at the specified index.
     */
    getSFSObject(index: number): SFSObject;
    /**
     * Returns the SFSArray at the specified index.
     *
     * @param	{number} index	The position of the array to return.
     *
     * @return {SFSArray} The <em>SFSArray</em> at the specified index.
     */
    getSFSArray(index: number): SFSArray;
    /**
     * Appends a value of the passed type to the end of this array.
     *
     * @param	{*} value		The value to be appended to this array.
     * @param	{number} typeId	The value's type identifier; must be one of the constants set in the <em>SFSDataType</em> class.
     *
     * @see SFSDataType
     */
    add(value: any, typeId: number): void;
    /**
     * Appends a null value to the end of this array.
     *
     * <p>This is a shortcut for the <em>add()</em> method.</p>
     */
    addNull(): void;
    /**
     * Appends a boolean value to the end of this array.
     *
     * <p>This is a shortcut for the <em>add()</em> method.</p>
     *
     * @param	{boolean} value		The value to be appended to this array.
     */
    addBool(value: boolean): void;
    /**
     * Appends a number to the end of this array as a byte (8 bit).
     *
     * <p>This is a shortcut for the <em>add()</em> method.</p>
     *
     * @param	{number} value		The value to be appended to this array.
     */
    addByte(value: number): void;
    /**
     * Appends a number to the end of this array as a short integer (16 bit).
     *
     * <p>This is a shortcut for the <em>add()</em> method.</p>
     *
     * @param	{number} value		The value to be appended to this array.
     */
    addShort(value: number): void;
    /**
     * Appends a number to the end of this array as an integer (32 bit).
     *
     * <p>This is a shortcut for the <em>add()</em> method.</p>
     *
     * @param	{number} value		The value to be appended to this array.
     */
    addInt(value: number): void;
    /**
     * Appends a number to the end of this array as a long integer.
     *
     * <p><b>IMPORTANT</b>: in JavaScript, long integer numbers are limited to {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER Number.MAX_SAFE_INTEGER} (positive and negative, inclusive).
     * This is inconsistent with the max and min Long values available in Java, which are down to <code>-2^63</code> and up to <code>2^63 - 1</code>.
     * So if you are developing your server side Extension in Java, make sure you take this limitation into account when dealing with integers.</p>
     *
     * <p>This is a shortcut for the <em>add()</em> method.</p>
     *
     * @param	{number} value		The value to be appended to this array.
     */
    addLong(value: number): void;
    /**
     * Appends a number to the end of this array as a floating point value (32 bit).
     *
     * <p>This is a shortcut for the <em>add()</em> method.</p>
     *
     * @param	{number} value		The value to be appended to this array.
     */
    addFloat(value: number): void;
    /**
     * Appends a number to the end of this array as a double precision value (64 bit).
     *
     * <p>This is a shortcut for the <em>add()</em> method.</p>
     *
     * @param	{number} value		The value to be appended to this array.
     */
    addDouble(value: number): void;
    /**
     * Appends a UTF-8 string to the end of this array (max length: 32 KBytes).
     *
     * <p>This is a shortcut for the <em>add()</em> method.</p>
     *
     * @param	{string} value		The value to be appended to this array.
     */
    addUtfString(value: string): void;
    /**
     * Appends a UTF-8 string to the end of this array (max length: 2 GBytes).
     *
     * <p>This is a shortcut for the <em>add()</em> method.</p>
     *
     * @param	{string} value		The value to be appended to this array.
     */
    addText(value: string): void;
    /**
     * Appends an array of booleans to the end of this array.
     *
     * <p>This is a shortcut for the <em>add()</em> method.</p>
     *
     * @param	{boolean[]} array	The array to be appended to this array.
     */
    addBoolArray(array: boolean[]): void;
    /**
     * Appends a byte array to the end of this array.
     *
     * <p>This is a shortcut for the <em>add()</em> method.</p>
     *
     * @param	{Uint8Array} array	The byte array to be appended to this array.
     */
    addByteArray(array: Uint8Array): void;
    /**
     * Appends an array of numbers to the end of this array as short integers.
     *
     * <p>This is a shortcut for the <em>add()</em> method.</p>
     *
     * @param	{number[]} array	The array to be appended to this array.
     */
    addShortArray(array: number[]): void;
    /**
     * Appends an array of numbers to the end of this array as integers.
     *
     * <p>This is a shortcut for the <em>add()</em> method.</p>
     *
     * @param	{number[]} array	The array to be appended to this array.
     */
    addIntArray(array: number[]): void;
    /**
     * Appends an array of numbers to the end of this array as long integers.
     *
     * <p>This is a shortcut for the <em>add()</em> method.</p>
     *
     * <p><b>Read important note in the <em>add()</em> method description.</b></p>
     *
     * @param	{number[]} array	The array to be appended to this array.
     */
    addLongArray(array: number[]): void;
    /**
     * Appends an array of numbers to the end of this array as floating point values.
     *
     * <p>This is a shortcut for the <em>add()</em> method.</p>
     *
     * @param	{number[]} array	The array to be appended to this array.
     */
    addFloatArray(array: number[]): void;
    /**
     * Appends an array of numbers to the end of this array as double precision values.
     *
     * <p>This is a shortcut for the <em>add()</em> method.</p>
     *
     * @param	{number[]} array	The array to be appended to this array.
     */
    addDoubleArray(array: number[]): void;
    /**
     * Appends an array of UTF-8 strings to the end of this array.
     *
     * <p>This is a shortcut for the <em>add()</em> method.</p>
     *
     * @param	{string[]} array	The array to be appended to this array.
     */
    addUtfStringArray(array: string[]): void;
    /**
     * Appends a nested <em>SFSArray</em> to the end of this array.
     *
     * <p>This is a shortcut for the <em>add()</em> method.</p>
     *
     * @param	{SFSArray} value	The <em>SFSArray</em> to be appended to this array.
     */
    addSFSArray(value: SFSArray): void;
    /**
     * Appends a nested <em>SFSObject</em> to the end of this array.
     *
     * <p>This is a shortcut for the <em>add()</em> method.</p>
     *
     * @param	{SFSObject} value	The <em>SFSObject</em> to be appended to this array.
     */
    addSFSObject(value: SFSObject): void;
    /**
     * Provides a formatted string representing this array.
     *
     * <p>The returned string can be logged or traced in the console for debugging purposes.</p>
     *
     * @param	{boolean} [format=true]	If <code>true</code>, the output is formatted in a human-readable way.
     *
     * @return {string} The string representation of this array.
     */
    getDump(format?: boolean): string;
    /**
     * Provides a detailed hexadecimal representation of this array.
     *
     * <p>The returned string can be logged or traced in the console for debugging purposes.</p>
     *
     * @return {string} The hexadecimal string representation of this array.
     */
    getHexDump(): string;
}

/**
 * The position in a 2D or 3D space.
 *
 * @see SetUserPositionRequest
 * @see MMORoomSettings#defaultAOI
 * @see SFSUser#aoiEntryPoint
 * @see MMOItem#aoiEntryPoint
 */
export class Vec3D {
    constructor(px: number, py: number, pz?: number, useFloats?: boolean);
    /**
     * Returns the position along the X axis.
     *
     * @type number
     */
    px: number;
    /**
     * Returns the position along the Y axis.
     *
     * @type number
     */
    py: number;
    /**
     * Returns the position along the Z axis.
     *
     * @type number
     */
    pz: number;
}

/**
 * The details of an invitation received by the current user.
 *
 * @see	InviteUsersRequest
 * @see	InvitationReplyRequest
 * @see	SFSEvent.INVITATION
 */
export class SFSInvitation {
    constructor();
    /**
     * Indicates the id of the invitation.
     * It is generated by the server when the invitation is sent.
     *
     * @type number
     *
     * @readonly
     */
    readonly id: number;
    /**
     * Returns the <em>SFSUser</em> object corresponding to the user who sent the invitation.
     *
     * @type SFSUser
     *
     * @readonly
     */
    readonly inviter: SFSUser;
    /**
     * Returns the <em>SFSUser</em> object corresponding to the user who received the invitation.
     *
     * @type SFSUser
     *
     * @readonly
     */
    readonly invitee: SFSUser;
    /**
     * Returns the number of seconds available to the invitee to reply to the invitation, after which the invitation expires.
     *
     * @type number
     *
     * @readonly
     */
    readonly secondsForAnswer: number;
    /**
     * Returns a <em>SFSObject</em> containing a custom set of parameters.
     * It usually stores invitation details, like a message to the invitee and any other relevant data.
     *
     * @type SFSObject
     *
     * @readonly
     */
    readonly params: SFSObject;
}

/**
 * @class
 * The possible replies to an invitation.
 */
export class InvitationReply {
    constructor();
    /**
     * Invitation is accepted.
     *
     * @constant {number}
     * @memberof InvitationReply
     *
     * @see	InvitationReplyRequest
     */
    static readonly ACCEPT: number;
    /**
     * Invitation is refused.
     *
     * @constant {number}
     * @memberof InvitationReply
     *
     * @see	InvitationReplyRequest
     */
    static readonly REFUSE: number;
    /**
     * Invitation expired.
     *
     * @constant {number}
     * @memberof InvitationReply
     */
    static readonly EXPIRED: number;
}

/**
 * The base class for conditions in matching expressions.
 *
 * @see BoolMatch
 * @see NumberMatch
 * @see StringMatch
 */
export class Matcher {
    constructor();
    /**
     * Returns the type id of this matcher.
     *
     * @type number
     *
     * @readonly
     */
    readonly type: number;
    /**
     * Returns the condition symbol of this matcher.
     *
     * @type string
     *
     * @readonly
     */
    readonly symbol: string;
}

/**
 * Check boolean conditions in matching expressions.
 *
 * @extends Matcher
 *
 * @see MatchExpression
 * @see NumberMatch
 * @see StringMatch
 */
export class BoolMatch extends Matcher {
    constructor();
    /**
     * An instance of <em>BoolMatch</em> representing the following condition: <em>bool1 == bool2</em>.
     *
     * @constant {BoolMatch}
     */
    static readonly EQUALS: BoolMatch;
    /**
     * An instance of <em>BoolMatch</em> representing the following condition: <em>bool1 != bool2</em>.
     *
     * @constant {BoolMatch}
     */
    static readonly NOT_EQUALS: BoolMatch;
    /**
     * Returns the type id of this matcher.
     *
     * @type number
     *
     * @readonly
     */
    readonly type: number;
    /**
     * Returns the condition symbol of this matcher.
     *
     * @type string
     *
     * @readonly
     */
    readonly symbol: string;
}

/**
 * Check numeric conditions in matching expressions.
 *
 * @extends Matcher
 *
 * @see MatchExpression
 * @see BoolMatch
 * @see StringMatch
 */
export class NumberMatch extends Matcher {
    constructor();
    /**
     * An instance of <em>NumberMatch</em> representing the following condition: <em>number1 == number2</em>.
     *
     * @constant {NumberMatch}
     */
    static readonly EQUALS: NumberMatch;
    /**
     * An instance of <em>NumberMatch</em> representing the following condition: <em>number1 != number2</em>.
     *
     * @constant {NumberMatch}
     */
    static readonly NOT_EQUALS: NumberMatch;
    /**
     * An instance of <em>NumberMatch</em> representing the following condition: <em>number1 &gt; number2</em>.
     *
     * @constant {NumberMatch}
     */
    static readonly GREATER_THAN: NumberMatch;
    /**
     * An instance of <em>NumberMatch</em> representing the following condition: <em>number1 &gt;= number2</em>.
     *
     * @constant {NumberMatch}
     */
    static readonly GREATER_THAN_OR_EQUAL_TO: NumberMatch;
    /**
     * An instance of <em>NumberMatch</em> representing the following condition: <em>number1 &lt; number2</em>.
     *
     * @constant {NumberMatch}
     */
    static readonly LESS_THAN: NumberMatch;
    /**
     * An instance of <em>NumberMatch</em> representing the following condition: <em>number1 &lt;= number2</em>.
     *
     * @constant {NumberMatch}
     */
    static readonly LESS_THAN_OR_EQUAL_TO: NumberMatch;
    /**
     * Returns the type id of this matcher.
     *
     * @type number
     *
     * @readonly
     */
    readonly type: number;
    /**
     * Returns the condition symbol of this matcher.
     *
     * @type string
     *
     * @readonly
     */
    readonly symbol: string;
}

/**
 * Check string conditions in matching expressions.
 *
 * @extends Matcher
 *
 * @see MatchExpression
 * @see BoolMatch
 * @see NumberMatch
 */
export class StringMatch extends Matcher {
    constructor();
    /**
     * An instance of <em>StringMatch</em> representing the following condition: <em>string1 == string2</em>.
     *
     * @constant {StringMatch}
     */
    static readonly EQUALS: StringMatch;
    /**
     * An instance of <em>StringMatch</em> representing the following condition: <em>string1 != string2</em>.
     *
     * @constant {StringMatch}
     */
    static readonly NOT_EQUALS: StringMatch;
    /**
     * An instance of <em>StringMatch</em> representing the following condition: <em>string1.indexOf(string2) != -1</em>.
     *
     * @constant {StringMatch}
     */
    static readonly CONTAINS: StringMatch;
    /**
     * An instance of <em>StringMatch</em> representing the following condition: <em>string1</em> starts with characters contained in <em>string2</em>.
     *
     * @constant {StringMatch}
     */
    static readonly STARTS_WITH: StringMatch;
    /**
     * An instance of <em>StringMatch</em> representing the following condition: <em>string1</em> ends with characters contained in <em>string2</em>.
     *
     * @constant {StringMatch}
     */
    static readonly ENDS_WITH: StringMatch;
    /**
     * Returns the type id of this matcher.
     *
     * @type number
     *
     * @readonly
     */
    readonly type: number;
    /**
     * Returns the condition symbol of this matcher.
     *
     * @type string
     *
     * @readonly
     */
    readonly symbol: string;
}

/**
 * A matching expression used to compare custom variables or predefined properties when searching for users or Rooms.
 *
 * @example
 * <caption>This example shows how to create a simple matching expression made of two concatenated conditions: it compares the custom "rank" and "country" User Variables to the passed values. This expression could be used during the creation of a Game Room, to filter the users that the server should take into account when sending the invitations to join the game (only italian users with a ranking greater than 5 - whatever this number means to our game).</caption>
 * var exp = new SFS2X.MatchExpression('rank', SFS2X.NumberMatch.GREATER_THAN, 5)
 *                                .and('country', SFS2X.StringMatch.EQUALS, 'Italy');
 *
 * @example
 * <caption>This example creates a matching expression made of three concatenated conditions which compare two predefined Room properties and the custom "isGameStarted" Room Variable to the passed values; this expression could be used to retrieve all the Game Rooms still waiting for players to join them.</caption>
 * var exp = new SFS2X.MatchExpression(SFS2X.RoomProperties.IS_GAME, SFS2X.BoolMatch.EQUALS, true)
 *                                .and(SFS2X.RoomProperties.HAS_FREE_PLAYER_SLOTS, SFS2X.BoolMatch.EQUALS, true)
 *                                .and('isGameStarted', SFS2X.BoolMatch.EQUALS, false);
 *
 * @example
 * <caption>This example creates a matching expression which compares a nested property in a complex data structure; an object called "avatarData" (could be a User Variable for example) contains the "shield" object (a nested object) which in turn contains, among others, the "inUse" property which could be used to retrieve all user whose avatars are currently equipped with a shield.</caption>
 * var exp = new SFS2X.MatchExpression('avatarData.shield.inUse', SFS2X.BoolMatch.EQUALS, true);
 *
 * @example
 * <caption>This example is similar to the previous one, but it involves an array. The "avatarData" object contains the "weapons" array, from which the expression retrieves the third element (that ".3" means "give me the element at index == 3") that we know being the weapon the user avatar has in his right hand. Again, this element is an object containing, among the others, the "name" property which can be compared to the passed string. This example could be used to retrieve all users whose avatars have the Narsil sword in the right hand.</caption>
 * var exp = new SFS2X.MatchExpression('avatarData.weapons.3.name', SFS2X.StringMatch.EQUALS, "Narsil");
 *
 * @see RoomProperties
 * @see	UserProperties
 * @see	BoolMatch
 * @see	NumberMatch
 * @see	StringMatch
 * @see	CreateSFSGameRequest
 * @see	FindRoomsRequest
 * @see	FindUsersRequest
 */
export class MatchExpression {
    constructor(varName: string, condition: Matcher, value: boolean | number | string);
    /**
     * Returns the name of the variable or property against which the comparison is made.
     *
     * <p>Depending what the matching expression is used for (searching a user or a Room), this can be
     * the name of a User Variable or a Room Variable, or it can be one of the constants contained in the <em>UserProperties</em> or <em>RoomProperties</em> classes, representing some of the predefined properties of the user and Room entities respectively.</p>
     *
     * @type string
     *
     * @see	RoomProperties
     * @see	UserProperties
     * @see	SFSRoomVariable
     * @see	SFSUserVariable
     *
     * @readonly
     */
    readonly varName: string;
    /**
     * Returns the matching criteria used during values comparison among those provided by the <em>BoolMatch</em>, <em>NumberMatch</em> and <em>StringMatch</em> classes.
     *
     * @type Matcher
     *
     * @see	BoolMatch
     * @see	NumberMatch
     * @see	StringMatch
     *
     * @readonly
     */
    readonly condition: Matcher;
    /**
     * Returns the value against which the variable or property corresponding to <em>varName</em> is compared.
     *
     * @type *
     *
     * @readonly
     */
    readonly value: any;
    /**
     * In case of concatenated expressions, returns the current logical operator.
     *
     * @type LogicOperator
     *
     * @readonly
     */
    readonly logicOp: LogicOperator;
    /**
     * Returns the next matching expression concatenated to the current one, if existing.
     *
     * @type MatchExpression
     *
     * @readonly
     */
    readonly next: MatchExpression;
    /**
     * Concatenates the current expression with a new one using the logical <b>AND</b> operator.
     *
     * @param	{string} varName				Name of the additional variable or property to match.
     * @param	{Matcher} condition				The additional matching condition among those provided by the <em>BoolMatch</em>, <em>NumberMatch</em> and <em>StringMatch</em> classes.
     * @param	{boolean|number|string} value	The value to compare against the additional variable or property during the matching.
     *
     * @returns	{MatchExpression} A new <em>MatchExpression</em> resulting from the concatenation of the current expression with a new one generated from the specified parameters.
     *
     * @see	LogicOperator.AND
     */
    and(varName: string, condition: Matcher, value: boolean | number | string): MatchExpression;
    /**
     * Concatenates the current expression with a new one using the logical <b>OR</b> operator.
     *
     * @param	{string} varName				Name of the additional variable or property to match.
     * @param	{Matcher} condition				The additional matching condition among those provided by the <em>BoolMatch</em>, <em>NumberMatch</em> and <em>StringMatch</em> classes.
     * @param	{boolean|number|string} value	The value to compare against the additional variable or property during the matching.
     *
     * @returns	{MatchExpression} A new <em>MatchExpression</em> resulting from the concatenation of the current expression with a new one generated from the specified parameters.
     *
     * @see	LogicOperator.OR
     */
    or(varName: string, condition: Matcher, value: boolean | number | string): MatchExpression;
    /**
     * Checks if the current matching expression is concatenated to another one through a logical operator.
     *
     * @returns	{boolean} <code>true</code> if the current matching expression is concatenated to another one.
     */
    hasNext(): boolean;
    /**
     * Moves the iterator cursor to the first matching expression in the chain.
     *
     * @returns	{MatchExpression} The <em>MatchExpression</em> object at the top of the chain of matching expressions.
     */
    rewind(): MatchExpression;
    /**
     * Returns a string representation of the matching expression.
     *
     * @returns	{string} The string representation of the <em>MatchExpression</em> object.
     */
    toString(): string;
}

/**
 * Concatenate two matching expressions using the <b>AND</b> or <b>OR</b> logical operators.
 */
export class LogicOperator {
    constructor();
    /**
     * Returns the id of the current <em>LogicOperator</em> instance.
     * It can be the string "AND" or "OR".
     *
     * @type string
     *
     * @readonly
     */
    readonly id: string;
    /**
     * An instance of <em>LogicOperator</em> representing the <b>AND</b> logical operator.
     *
     * @constant {LogicOperator}
     *
     * @see	MatchExpression
     */
    static readonly AND: LogicOperator;
    /**
     * An instance of <em>LogicOperator</em> representing the <b>OR</b> logical operator.
     *
     * @constant {LogicOperator}
     *
     * @see	MatchExpression
     */
    static readonly OR: LogicOperator;
}

/**
 * <b>Developers never istantiate the <em>RoomProperties</em> class</b>: only use its static properties.
 *
 * @class
 * The predefined properties that can be used in matching expressions to search/filter Rooms.
 */
export class RoomProperties {
    constructor();
    /**
     * The Room name.
     * <p>Requires a <em>StringMatch</em> instance to be used for values comparison.</p>
     *
     * @constant {string}
     * @memberof RoomProperties
     *
     * @see	MatchExpression
     * @see StringMatch
     * @see	SFSRoom#name
     */
    static readonly NAME: string;
    /**
     * The name of the Group to which the Room belongs.
     * <p>Requires a <em>StringMatch</em> instance to be used for values comparison.</p>
     *
     * @constant {string}
     * @memberof RoomProperties
     *
     * @see	MatchExpression
     * @see StringMatch
     * @see	SFSRoom#groupId
     */
    static readonly GROUP_ID: string;
    /**
     * The maximum number of users allowed in the Room (players in Game Rooms).
     * <p>Requires a <em>NumberMatch</em> instance to be used for values comparison.</p>
     *
     * @constant {string}
     * @memberof RoomProperties
     *
     * @see	MatchExpression
     * @see NumberMatch
     * @see	SFSRoom#maxUsers
     */
    static readonly MAX_USERS: string;
    /**
     * The maximum number of spectators allowed in the Room (Game Rooms only).
     * <p>Requires a <em>NumberMatch</em> instance to be used for values comparison.</p>
     *
     * @constant {string}
     * @memberof RoomProperties
     *
     * @see	MatchExpression
     * @see NumberMatch
     * @see	SFSRoom#maxSpectators
     */
    static readonly MAX_SPECTATORS: string;
    /**
     * The Room users count (players in Game Rooms).
     * <p>Requires a <em>NumberMatch</em> instance to be used for values comparison.</p>
     *
     * @constant {string}
     * @memberof RoomProperties
     *
     * @see	MatchExpression
     * @see NumberMatch
     * @see	SFSRoom#userCount
     */
    static readonly USER_COUNT: string;
    /**
     * The Room spectators count (Game Rooms only).
     * <p>Requires a <em>NumberMatch</em> instance to be used for values comparison.</p>
     *
     * @constant {string}
     * @memberof RoomProperties
     *
     * @see	MatchExpression
     * @see NumberMatch
     * @see	SFSRoom#spectatorCount
     */
    static readonly SPECTATOR_COUNT: string;
    /**
     * The Room is a Game Room.
     * <p>Requires a <em>BoolMatch</em> instance to be used for values comparison.</p>
     *
     * @constant {string}
     * @memberof RoomProperties
     *
     * @see	MatchExpression
     * @see BoolMatch
     * @see	SFSRoom#isGame
     */
    static readonly IS_GAME: string;
    /**
     * The Room is private.
     * <p>Requires a <em>BoolMatch</em> instance to be used for values comparison.</p>
     *
     * @constant {string}
     * @memberof RoomProperties
     *
     * @see	MatchExpression
     * @see BoolMatch
     * @see	SFSRoom#isPasswordProtected
     */
    static readonly IS_PRIVATE: string;
    /**
     * The Room has at least one free player slot.
     * <p>Requires a <em>BoolMatch</em> instance to be used for values comparison.</p>
     *
     * @constant {string}
     * @memberof RoomProperties
     *
     * @see	MatchExpression
     * @see BoolMatch
     */
    static readonly HAS_FREE_PLAYER_SLOTS: string;
    /**
     * The Room is an <em>SFSGame</em> on the server-side.
     * <p>Requires a <em>BoolMatch</em> instance to be used for values comparison.</p>
     *
     * @constant {string}
     * @memberof RoomProperties
     *
     * @see	MatchExpression
     * @see	BoolMatch
     */
    static readonly IS_TYPE_SFSGAME: string;
}

/**
 * <b>Developers never istantiate the <em>UserProperties</em> class</b>: only use its static properties.
 *
 * @class
 * The predefined properties that can be used in matching expressions to search/filter users.
 */
export class UserProperties {
    constructor();
    /**
     * The Room name.
     * <p>Requires a <em>StringMatch</em> instance to be used for values comparison.</p>
     *
     * @constant {string}
     * @memberof UserProperties
     *
     * @see	MatchExpression
     * @see	StringMatch
     * @see	SFSUser#name
     */
    static readonly NAME: string;
    /**
     * The user is a player in a Game Room.
     * <p>Requires a <em>BoolMatch</em> instance to be used for values comparison.</p>
     *
     * @constant {string}
     * @memberof UserProperties
     *
     * @see	MatchExpression
     * @see	BoolMatch
     * @see	SFSUser#isPlayer
     * @see	SFSUser#isPlayerInRoom
     */
    static readonly IS_PLAYER: string;
    /**
     * The user is a spectator in a Game Room.
     * <p>Requires a <em>BoolMatch</em> instance to be used for values comparison.</p>
     *
     * @constant {string}
     * @memberof UserProperties
     *
     * @see	MatchExpression
     * @see	BoolMatch
     * @see	SFSUser#isSpectator
     * @see	SFSUser#isSpectatorInRoom
     */
    static readonly IS_SPECTATOR: string;
    /**
     * The user is a Non-Player Character (NPC).
     * <p>Requires a <em>BoolMatch</em> instance to be used for values comparison.</p>
     *
     * @constant {string}
     * @memberof UserProperties
     *
     * @see	MatchExpression
     * @see	BoolMatch
     */
    static readonly IS_NPC: string;
    /**
     * The user privilege id.
     * <p>Requires a <em>NumberMatch</em> instance to be used for values comparison.</p>
     *
     * @constant {string}
     * @memberof UserProperties
     *
     * @see	MatchExpression
     * @see	NumberMatch
     * @see	SFSUser#privilegeId
     */
    static readonly PRIVILEGE_ID: string;
    /**
     * The user joined at least one Room.
     * <p>Requires a <em>BoolMatch</em> instance to be used for values comparison.</p>
     *
     * @constant {string}
     * @memberof UserProperties
     *
     * @see	MatchExpression
     * @see	BoolMatch
     * @see	SFSUser#isJoinedInRoom
     */
    static readonly IS_IN_ANY_ROOM: string;
}

/**
 * The representation of a buddy in the current user's buddy list.
 *
 * @see	SmartFox#buddyManager
 * @see	SFSBuddyVariable
 */
export class SFSBuddy {
    constructor();
    /**
     * Indicates the id of this buddy.
     * This is equal to the id assigned by SmartFoxServer to the corresponding user.
     *
     * @type number
     *
     * @see	SFSUser#id
     *
     * @readonly
     */
    readonly id: number;
    /**
     * Indicates the name of this buddy.
     * This is equal to the name of the corresponding user.
     *
     * @type string
     *
     * @see	SFSUser#name
     *
     * @readonly
     */
    readonly name: string;
    /**
     * Indicates whether this buddy is blocked in the current user's buddy list or not.
     * A buddy can be blocked by means of a <em>BlockBuddyRequest</em> request.
     *
     * @type boolean
     *
     * @see	BlockBuddyRequest
     *
     * @readonly
     */
    readonly isBlocked: boolean;
    /**
     * Indicates whether this buddy is temporary (non-persistent) in the current user's buddy list or not.
     *
     * @type boolean
     *
     * @readonly
     */
    readonly isTemp: boolean;
    /**
     * Indicates whether this buddy is online in the Buddy List system or not.
     *
     * @type boolean
     *
     * @see	GoOnlineRequest
     *
     * @readonly
     */
    readonly isOnline: boolean;
    /**
     * Returns the custom state of this buddy.
     * Examples of custom states are "Available", "Busy", "Be right back", etc. If the custom state is not set, <code>null</code> is returned.
     *
     * <p>The list of available custom states is returned by the <em>SFSBuddyManager.getBuddyStates()</em> method.</p>
     *
     * @type string
     *
     * @see	SFSBuddyManager#getBuddyStates
     *
     * @readonly
     */
    readonly state: string;
    /**
     * Returns the nickname of this buddy.
     * If the nickname is not set, <code>null</code> is returned.
     *
     * @type string
     *
     * @readonly
     */
    readonly nickName: string;
    /**
     * Returns a string that contains the buddy id and name.
     *
     * @return	{string} The string representation of the <em>SFSBuddy</em> object.
     */
    toString(): string;
    /**
     * Retrieves a Buddy Variable from its name.
     *
     * @param	{string} varName	The name of the Buddy Variable to be retrieved.
     *
     * @returns	{SFSBuddyVariable} The object representing the Buddy Variable, or <code>undefined</code> if no Buddy Variable with the passed name is associated to this buddy.
     *
     * @see	#getVariables
     * @see	SetBuddyVariablesRequest
     */
    getVariable(varName: string): SFSBuddyVariable;
    /**
     * Indicates whether this user has the specified Buddy Variable set or not.
     *
     * @param	{string} varName	The name of the Buddy Variable whose existance must be checked.
     *
     * @returns	{boolean} <code>true</code> if a Buddy Variable with the passed name is set for this buddy.
     *
     * @see	SFSBuddyVariable
     */
    containsVariable(varName: string): boolean;
    /**
     * Retrieves all the Buddy Variables of this user.
     *
     * @returns	{SFSBuddyVariable[]} The list of <em>SFSBuddyVariable</em> objects associated to the buddy.
     *
     * @see	#getVariable
     * @see	SetBuddyVariablesRequest
     */
    getVariables(): SFSBuddyVariable[];
    /**
     * Retrieves the list of persistent Buddy Variables for this buddy.
     *
     * @returns	{SFSBuddyVariable[]} A list of <em>SFSBuddyVariable</em> objects corresponding to the buddy's persistent Buddy Variables.
     *
     * @see	SFSBuddyVariable#isOffline
     */
    getOfflineVariables(): SFSBuddyVariable[];
    /**
     * Retrieves the list of non-persistent Buddy Variables for this buddy.
     *
     * @returns	{SFSBuddyVariable[]} A list of <em>SFSBuddyVariable</em> objects corresponding to the buddy's non-persistent Buddy Variables.
     *
     * @see	SFSBuddyVariable#isOffline
     */
    getOnlineVariables(): SFSBuddyVariable[];
}

/**
 * The representation of an active non-player entity inside an MMORoom.
 *
 * @see	MMORoom
 * @see	MMOItemVariable
 */
export class MMOItem {
    constructor();
    /**
     * Indicates the id of this item.
     * The <em>id</em> is unique and it is generated by the server when the MMOItem is created.
     *
     * @type number
     *
     * @readonly
     */
    readonly id: number;
    /**
     * Returns the entry point of this item in the current user's AoI.
     *
     * <p>The returned coordinates are those that the item had when its presence in the current user's Area of Interest was last notified by a <em>proximityListUpdate</em> event.
     * This field is populated only if the MMORoom in which the item exists is configured to receive such data.</p>
     *
     * @type Vec3D
     *
     * @see	MMORoomSettings#sendAOIEntryPoint
     * @see	SFSEvent.PROXIMITY_LIST_UPDATE
     *
     * @readonly
     */
    readonly aoiEntryPoint: Vec3D;
    /**
     * Returns a string that contains the item id.
     *
     * @returns	{string} The string representation of the <em>MMOItem</em> object.
     */
    toString(): string;
    /**
     * Retrieves an MMOItem Variable from its name.
     *
     * @param	{string} varName	The name of the MMOItem Variable to be retrieved.
     *
     * @returns	{MMOItemVariable} The <em>MMOItemVariable</em> object, or <code>undefined</code> if no MMOItem Variable with the passed name is associated to this item.
     *
     * @see #getVariables
     */
    getVariable(varName: string): MMOItemVariable;
    /**
     * Indicates whether this item has the specified MMOItem Variable set or not.
     *
     * @param	{string} varName	The name of the MMOItem Variable whose existance must be checked.
     *
     * @returns	{boolean} <code>true</code> if an MMOItem Variable with the passed name is set for this item.
     *
     * @see	MMOItemVariable
     */
    containsVariable(varName: string): boolean;
    /**
     * Retrieves all the MMOItem Variables of this item.
     *
     * @returns	{MMOItemVariable[]} The list of <em>MMOItemVariable</em> objects associated to this item.
     *
     * @see #getVariable
     */
    getVariables(): MMOItemVariable[];
}

/**
 * The SmartFoxServer Room entity representation on the client.
 *
 * @see	SmartFox#roomManager
 * @see	CreateRoomRequest
 * @see	JoinRoomRequest
 * @see	SubscribeRoomGroupRequest
 * @see	UnsubscribeRoomGroupRequest
 * @see	ChangeRoomNameRequest
 * @see	ChangeRoomPasswordStateRequest
 * @see	ChangeRoomCapacityRequest
 */
export class SFSRoom {
    constructor();
    /**
     * Defines a generic utility object that can be used to store custom Room data.
     * The values added to this object are for client-side use only and are never transmitted to the server or to the other clients.
     *
     * @type object
     */
    properties: any;
    /**
     * Indicates the id of this Room.
     * The <em>id</em> is unique and it is generated by the server when the Room is created.
     *
     * @type number
     *
     * @readonly
     */
    readonly id: number;
    /**
     * Indicates the name of this Room.
     * Two Rooms in the same Zone can't have the same name.
     * If allowed, the <em>name</em> can be changed through the <em>ChangeRoomNameRequest</em> request.
     *
     * @type string
     *
     * @see	ChangeRoomNameRequest
     *
     * @readonly
     */
    readonly name: string;
    /**
     * Returns the Room Group name.
     * Each Group is identified by a unique string (its name or id) and it represents a different "container" for Rooms.
     *
     * <p>Room Groups enable developers to organize Rooms under different types or categories and let clients select only those Groups they are interested in, in order to receive their events only.
     * This is done via the <em>SubscribeRoomGroupRequest</em> and <em>UnsubscribeRoomGroupRequest</em> requests.</p>
     *
     * @type string
     *
     * @see	SubscribeRoomGroupRequest
     * @see	UnsubscribeRoomGroupRequest
     *
     * @readonly
     */
    readonly groupId: string;
    /**
     * Indicates whether this is a Game Room or not.
     *
     * @type boolean
     *
     * @readonly
     */
    readonly isGame: boolean;
    /**
     * Indicates whether this Room is hidden or not.
     * This is a utility flag that can be used by developers to hide certain Rooms from the interface of their application.
     *
     * @type boolean
     *
     * @readonly
     */
    readonly isHidden: boolean;
    /**
     * Indicates whether the client joined this Room or not.
     * Use the <em>JoinRoomRequest</em> request to join a new Room.
     *
     * @type boolean
     *
     * @see	JoinRoomRequest
     *
     * @readonly
     */
    readonly isJoined: boolean;
    /**
     * Indicates whether this Room requires a password to be joined or not.
     * This flag depends on the Room's password set when the Room is created or by means of the <em>ChangeRoomPasswordStateRequest</em> request.
     *
     * @type boolean
     *
     * @see	ChangeRoomPasswordStateRequest
     *
     * @readonly
     */
    readonly isPasswordProtected: boolean;
    /**
     * Returns the maximum number of users allowed in this Room.
     * In case of Game Rooms, this is the maximum number of players.
     * If allowed, the <em>maxUsers</em> value can be changed through the <em>ChangeRoomCapacityRequest</em> request.
     *
     * @type number
     *
     * @see	ChangeRoomCapacityRequest
     *
     * @readonly
     */
    readonly maxUsers: number;
    /**
     * Returns the maximum number of spectators allowed in this Room (Game Rooms only).
     * If allowed, the <em>maxSpectators</em> value can be changed through the <em>ChangeRoomCapacityRequest</em> request.
     *
     * @type number
     *
     * @see	ChangeRoomCapacityRequest
     *
     * @readonly
     */
    readonly maxSpectators: number;
    /**
     * Returns the current number of users in this Room.
     * In case of Game Rooms, this is the number of players.
     *
     * @type number
     *
     * @readonly
     */
    readonly userCount: number;
    /**
     * Returns the current number of spectators in this Room (Game Rooms only).
     *
     * @type number
     *
     * @readonly
     */
    readonly spectatorCount: number;
    /**
     * Returns the maximum amount of users, including spectators, that can be contained in this Room.
     *
     * @type number
     *
     * @see	ChangeRoomCapacityRequest
     *
     * @readonly
     */
    readonly capacity: number;
    /**
     * Returns a string that contains the Room id, name and id of the Group to which it belongs.
     *
     * @returns	{string} The string representation of the <em>SFSRoom</em> object.
     */
    toString(): string;
    /**
     * Retrieves a <em>SFSUser</em> object from its <em>name</em> property.
     *
     * @param	{string} name	The name of the user to be found.
     *
     * @returns	{SFSUser} An object representing the user, or <code>undefined</code> if no user with the passed name exists in this Room.
     */
    getUserByName(name: string): SFSUser;
    /**
     * Retrieves a <em>SFSUser</em> object from its <em>id</em> property.
     *
     * @param	{number} id	The id of the user to be found.
     *
     * @returns	{SFSUser} An object representing the user, or <code>undefined</code> if no user with the passed id exists in this Room.
     */
    getUserById(id: number): SFSUser;
    /**
     * Indicates whether the specified user is currently inside this Room or not.
     *
     * @param	{SFSUser} user	The <em>SFSUser</em> object representing the user whose presence in this Room must be checked.
     *
     * @returns	{boolean} <code>true</code> if the user is inside this Room; <code>false</code> otherwise.
     */
    containsUser(user: SFSUser): boolean;
    /**
     * Retrieves the list of <em>SFSUser</em> objects representing all the users currently inside this Room.
     *
     * @returns	{SFSUser[]} The list of <em>SFSUser</em> objects representing the users who joined the Room.
     */
    getUserList(): SFSUser[];
    /**
     * Retrieves the list of <em>SFSUser</em> objects representing the players currently inside this Room (Game Rooms only).
     *
     * @returns	{SFSUser[]} The list of <em>SFSUser</em> objects representing the users who joined the Room as players.
     */
    getPlayerList(): SFSUser[];
    /**
     * Retrieves the list of <em>SFSUser</em> objects representing the spectators currently inside this Room (Game Rooms only).
     *
     * @returns	{SFSUser[]} The list of <em>SFSUser</em> objects representing the users who joined the Room as spectators.
     */
    getSpectatorList(): SFSUser[];
    /**
     * Retrieves a Room Variable from its name.
     *
     * @param	{string} varName	The name of the Room Variable to be retrieved.
     *
     * @returns	{SFSRoomVariable} The object representing the Room Variable, or <code>undefined</code> if no Room Variable with the passed name exists in this Room.
     *
     * @see #getVariables
     * @see	SetRoomVariablesRequest
     */
    getVariable(varName: string): SFSRoomVariable;
    /**
     * Indicates whether this Room has the specified Room Variable set or not.
     *
     * @param	{string} varName	The name of the Room Variable whose existance in this Room must be checked.
     *
     * @returns	{boolean} <code>true</code> if a Room Variable with the passed name exists in this Room.
     *
     * @see	SFSRoomVariable
     */
    containsVariable(varName: string): boolean;
    /**
     * Retrieves all the Room Variables of this Room.
     *
     * @returns	{SFSRoomVariable[]} The list of <em>SFSRoomVariable</em> objects associated with this Room.
     *
     * @see #getVariable
     * @see	SetRoomVariablesRequest
     */
    getVariables(): SFSRoomVariable[];
    /**
     * Retrieves a reference to the Room Manager which manages this Room.
     *
     * @returns	{SFSRoomManager} The Room Manager to which this Room is associated.
     */
    getRoomManager(): SFSRoomManager;
}

/**
 * A specialized type of Room entity on the client.
 *
 * @see	CreateRoomRequest
 * @see	MMORoomSettings
 * @see	SetUserPositionRequest
 * @see	SFSEvent.PROXIMITY_LIST_UPDATE
 * @see	MMOItem
 */
export class MMORoom {
    constructor();
    /**
     * Returns the default Area of Interest (AoI) of this MMORoom.
     *
     * @type Vec3D
     *
     * @see	MMORoomSettings#defaultAOI
     *
     * @readonly
     */
    readonly defaultAOI: Vec3D;
    /**
     * Returns the lower coordinates limit of the virtual environment represented by the MMORoom along the X,Y,Z axes.
     * If <code>null</code> is returned, no limits were set at Room creation time.
     *
     * @type Vec3D
     *
     * @see	MMORoomSettings#mapLimits
     *
     * @readonly
     */
    readonly lowerMapLimit: Vec3D;
    /**
     * Returns the higher coordinates limit of the virtual environment represented by the MMORoom along the X,Y,Z axes.
     * If <code>null</code> is returned, no limits were set at Room creation time.
     *
     * @type Vec3D
     *
     * @see	MMORoomSettings#mapLimits
     *
     * @readonly
     */
    readonly higherMapLimit: Vec3D;
    /**
     * Retrieves an <em>MMOItem</em> object from its <em>id</em> property.
     *
     * The item is available to the current user if it falls within his Area of Interest only.
     *
     * @param	{number} id		The id of the item to be retrieved.
     *
     * @returns	{MMOItem} An <em>MMOItem</em> object, or <code>undefined</code> if the item with the passed id is not in proximity of the current user.
     */
    getMMOItem(id: number): MMOItem;
    /**
     * Retrieves all <em>MMOItem</em> object in the MMORoom that fall within the current user's Area of Interest.
     *
     * @returns	{MMOItem[]} A list of <em>MMOItem</em> objects, or an empty list if no item is in proximity of the current user.
     */
    getMMOItems(): MMOItem[];
}

/**
 * The representation of a client logged in SmartFoxServer.
 *
 * @see	SmartFox#userManager
 * @see	SmartFox#buddyManager
 * @see	JoinRoomRequest
 */
export class SFSUser {
    constructor();
    /**
     * Defines a generic utility object that can be used to store custom user data.
     * The values added to this object are for client-side use only and are never transmitted to the server or to the other clients.
     *
     * @type object
     */
    properties: any;
    /**
     * Indicates the id of this user.
     * The <em>id</em> is unique and it is generated by the server when the user logs in.
     *
     * @type number
     *
     * @readonly
     */
    readonly id: number;
    /**
     * Indicates the name of this user.
     * Two users in the same Zone can't have the same name.
     *
     * @type string
     *
     * @readonly
     */
    readonly name: string;
    /**
     * Indicates if this <em>SFSUser</em> object represents the current client.
     *
     * @type boolean
     *
     * @see	SmartFox#mySelf
     *
     * @readonly
     */
    readonly isItMe: boolean;
    /**
     * Returns the id which identifies the privilege level of this user.
     * Privileges are assigned to the user by the server when the user logs in.
     *
     * @type number
     *
     * @see UserPrivileges
     *
     * @readonly
     */
    readonly privilegeId: number;
    /**
     * Returns the entry point of this user in the current user's AoI.
     *
     * <p>The returned coordinates are those that the user had when his presence in the current user's Area of Interest was last notified by a <em>proximityListUpdate</em> event.
     * This field is populated only if the user joined a Room of type MMORoom and this is configured to receive such data from the server.</p>
     *
     * @type Vec3D
     *
     * @see MMORoomSettings#sendAOIEntryPoint
     * @see	SFSEvent.PROXIMITY_LIST_UPDATE
     *
     * @readonly
     */
    readonly aoiEntryPoint: Vec3D;
    /**
     * Indicates whether this user logged in as a guest or not.
     * Guest users have the <em>privilegeId</em> property set to <em>UserPrivileges.GUEST</em>.
     *
     * @type boolean
     *
     * @see	#isStandardUser
     * @see	#isModerator
     * @see	#isAdmin
     * @see	#privilegeId
     * @see	UserPrivileges.GUEST
     *
     * @readonly
     */
    readonly isGuest: boolean;
    /**
     * Indicates whether this user logged in as a standard user or not.
     * Standard users have the <em>privilegeId</em> property set to <em>UserPrivileges.STANDARD</em>.
     *
     * @type boolean
     *
     * @see	#isGuest
     * @see	#isModerator
     * @see	#isAdmin
     * @see	#privilegeId
     * @see	UserPrivileges.STANDARD
     *
     * @readonly
     */
    readonly isStandardUser: boolean;
    /**
     * Indicates whether this user logged in as a moderator or not.
     * Moderator users have the <em>privilegeId</em> property set to <em>UserPrivileges.MODERATOR</em>.
     *
     * @type boolean
     *
     * @see	#isGuest
     * @see	#isStandardUser
     * @see	#isAdmin
     * @see	#privilegeId
     * @see	UserPrivileges.MODERATOR
     *
     * @readonly
     */
    readonly isModerator: boolean;
    /**
     * Indicates whether this user logged in as an administrator or not.
     * Administrator users have the <em>privilegeId</em> property set to <em>UserPrivileges.ADMINISTRATOR</em>.
     *
     * @type boolean
     *
     * @see	#isGuest
     * @see	#isStandardUser
     * @see	#isModerator
     * @see	#privilegeId
     * @see	UserPrivileges.ADMINISTRATOR
     *
     * @readonly
     */
    readonly isAdmin: boolean;
    /**
     * Indicates whether this user is a player (<em>playerId</em> greater than <code>0</code>) in the last joined Room or not.
     * Non-Game Rooms always return <code>false</code>.
     *
     * <p>If the user is inside multiple Game Rooms at the same time, use the <em>isPlayerInRoom()</em> method.</p>
     *
     * @type boolean
     *
     * @see #getPlayerId
     * @see	#isPlayerInRoom
     * @see #isSpectator
     *
     * @readonly
     */
    readonly isPlayer: boolean;
    /**
     * Indicates whether this user is a spectator (<em>playerId</em> lower than <code>0</code>) in the last joined Room or not.
     * Non-Game Rooms always return <code>false</code>.
     *
     * <p>If the user is inside multiple Game Rooms at the same time, use the <em>isSpectatorInRoom()</em> method.</p>
     *
     * @type boolean
     *
     * @see #getPlayerId
     * @see	#isSpectatorInRoom
     * @see #isPlayer
     *
     * @readonly
     */
    readonly isSpectator: boolean;
    /**
     * Returns a string that contains the user id, name and a boolean indicating if the <em>SFSUser</em> object represents the current client.
     *
     * @returns	{string} The string representation of the <em>SFSUser</em> object.
     */
    toString(): string;
    /**
     * Indicates whether this user joined the passed Room or not.
     *
     * @param	{SFSRoom} room	The <em>SFSRoom</em> object representing the Room where to check the user presence.
     *
     * @returns	{boolean} <code>true</code> if this user is inside the passed Room.
     */
    isJoinedInRoom(room: SFSRoom): boolean;
    /**
     * Returns the <em>playerId</em> value of this user in the passed Room.
     * See the <em>playerId</em> property description for more informations.
     *
     * @param	{SFSRoom} room	The <em>SFSRoom</em> object representing the Room to retrieve the player id from.
     *
     * @returns	{number} The <em>playerId</em> of this user in the passed Room.
     */
    getPlayerId(room: SFSRoom): number;
    /**
     * Indicates whether this user is a player (<em>playerId</em> greater than <code>0</code>) in the passed Room or not.
     * Non-Game Rooms always return <code>false</code>.
     *
     * <p>If a user can join one Game Rooms at a time only, use the <em>isPlayer</em> property.</p>
     *
     * @param	{SFSRoom} room	The <em>SFSRoom</em> object representing the Room where to check if this user is a player.
     *
     * @returns	{boolean} <code>true</code> if this user is a player in the passed Room.
     *
     * @see	#getPlayerId
     * @see	#isPlayer
     * @see	#isSpectatorInRoom
     */
    isPlayerInRoom(room: SFSRoom): boolean;
    /**
     * Indicates whether this user is a spectator (<em>playerId</em> lower than <code>0</code>) in the passed Room or not.
     * Non-Game Rooms always return <code>false</code>.
     *
     * <p>If a user can join one Game Rooms at a time only, use the <em>isSpectator</em> property.</p>
     *
     * @param	{SFSRoom} room	The <em>SFSRoom</em> object representing the Room where to check if this user is a spectator.
     *
     * @returns	{boolean} <code>true</code> if this user is a spectator in the passed Room.
     *
     * @see	#getPlayerId
     * @see	#isSpectator
     * @see	#isPlayerInRoom
     */
    isSpectatorInRoom(room: SFSRoom): boolean;
    /**
     * Retrieves a User Variable from its name.
     *
     * @param	{string} varName	The name of the User Variable to be retrieved.
     *
     * @returns	{SFSUserVariable} The object representing the User Variable, or <code>undefined</code> if no User Variable with the passed name is associated with this user.
     *
     * @see	#getVariables
     * @see	SetUserVariablesRequest
     */
    getVariable(varName: string): SFSUserVariable;
    /**
     * Indicates whether this user has the specified User Variable set or not.
     *
     * @param	{string} varName	The name of the User Variable whose existance must be checked.
     *
     * @returns	{boolean} <code>true</code> if a User Variable with the passed name is set for this user.
     *
     * @see	SFSUserVariable
     */
    containsVariable(varName: string): boolean;
    /**
     * Retrieves all the User Variables of this user.
     *
     * @returns	{SFSUserVariable[]} The list of <em>SFSUserVariable</em> objects associated with the user.
     *
     * @see	#getVariable
     * @see	SetUserVariablesRequest
     */
    getVariables(): SFSUserVariable[];
    /**
     * Returns a reference to the User Manager which manages this user.
     *
     * @returns	{SFSUserManager} The User Manager to which this user is associated.
     */
    getUserManager(): SFSUserManager;
}

/**
 * <b>Developers never istantiate the <em>UserPrivileges</em> class</b>: only use its static properties.
 *
 * <p>Values contained in this class (or custom-defined ones) are assigned to the <em>SFSUser.privilegeId</em> property whenever a user logs in.<br/>
 * Read the SmartFoxServer 2X documentation for more informations about privilege profiles and their permissions.</p>
 *
 * @see	SFSUser#isGuest
 * @see	SFSUser#isStandardUser
 * @see	SFSUser#isModerator
 * @see	SFSUser#isAdmin
 * @see	SFSUser#privilegeId
 *
 * @class
 * The default user types known by SmartFoxServer.
 */
export class UserPrivileges {
    constructor();
    /**
     * The Guest user is usually the lowest level in the privilege profiles scale.
     *
     * @constant {number}
     * @memberof UserPrivileges
     */
    static readonly GUEST: number;
    /**
     * The standard user is usually registered in the application custom login system; uses a unique name and password to login.
     *
     * @constant {number}
     * @memberof UserPrivileges
     */
    static readonly STANDARD: number;
    /**
     * The moderator user can send dedicated "moderator messages", kick and ban users.
     *
     * @constant {number}
     * @memberof UserPrivileges
     *
     * @see	ModeratorMessageRequest
     * @see	KickUserRequest
     * @see	BanUserRequest
     */
    static readonly MODERATOR: number;
    /**
     * The administrator user can send dedicated "administrator messages", kick and ban users.
     *
     * @constant {number}
     * @memberof UserPrivileges
     *
     * @see	AdminMessageRequest
     * @see	KickUserRequest
     * @see	BanUserRequest
     */
    static readonly ADMINISTRATOR: number;
}

/**
 * <b>Developers never istantiate the <em>ReservedBuddyVariables</em> class</b>: only use its static properties.
 *
 * @class
 * The reserved Buddy Variable names used by the Buddy List API.
 *
 * @see SFSBuddyVariable
 */
export class ReservedBuddyVariables {
    constructor();
    /**
     * The Buddy Variable with this name keeps track of the online/offline state of the user in a buddy list.
     * <p>This variable is persistent, which means that the online/offline state is preserved upon disconnection.</p>
     *
     * @constant {string}
     * @memberof ReservedBuddyVariables
     *
     * @see SFSBuddy#isOnline
     * @see SFSBuddyManager#getMyOnlineState
     */
    static readonly BV_ONLINE: string;
    /**
     * The Buddy Variable with this name stores the custom state of the user in a buddy list.
     * <p>This variable is persistent, which means that the custom state is preserved upon disconnection.</p>
     *
     * @constant {string}
     * @memberof ReservedBuddyVariables
     *
     * @see SFSBuddy#state
     * @see SFSBuddyManager#getMyState
     */
    static readonly BV_STATE: string;
    /**
     * The Buddy Variable with this name stores the optional nickname of the user in a buddy list.
     * <p>This variable is persistent, which means that the nickname is preserved upon disconnection.</p>
     *
     * @constant {string}
     * @memberof ReservedBuddyVariables
     *
     * @see SFSBuddy#nickName
     * @see SFSBuddyManager#getMyNickName
     */
    static readonly BV_NICKNAME: string;
}

/**
 * The Buddy Variable entity representation on the client.
 *
 * @extends BaseVariable
 *
 * @see	VariableType
 * @see	SFSBuddy
 * @see	SetBuddyVariablesRequest
 */
export class SFSBuddyVariable extends BaseVariable {
    constructor(name: string, value: boolean | number | string | SFSObject | SFSArray, type?: number);
    /**
     * The prefix to be added to a Buddy Variable name to make it persistent.
     * A persistent Buddy Variable is made available to all users who have the owner in their Buddy List, whether that Buddy is online or not.
     *
     * @constant {string}
     */
    static readonly OFFLINE_PREFIX: string;
    /**
     * Indicates whether the Buddy Variable is persistent or not.
     *
     * <p>By convention any Buddy Variable whose name starts with the dollar sign (<code>$</code>) will be regarded as persistent and stored locally by the server.
     * Persistent Buddy Variables are also referred to as "offline variables" because they are available to all users
     * who have the owner in their Buddy List, whether that Buddy is online or not.</p>
     *
     * @type boolean
     *
     * @readonly
     */
    readonly isOffline: boolean;
    /**
     * Returns a string that contains the Buddy Variable name, type and value.
     *
     * @returns	{string} The string representation of the <em>SFSBuddyVariable</em> object.
     */
    toString(): string;
    /**
     * Indicates the name of this variable.
     *
     * @type string
     *
     * @readonly
     */
    readonly name: string;
    /**
     * Returns the value of this variable.
     *
     * @type *
     *
     * @readonly
     */
    readonly value: any;
    /**
     * Indicates the type of this Variable.
     * Possibly returned strings are: <code>null</code>, <code>boolean</code>, <code>int</code>, <code>double</code>, <code>string</code>, <code>SFSObject</code>, <code>SFSArray</code>.
     *
     * @type string
     *
     * @readonly
     */
    readonly type: string;
    /**
     * Indicates if the Variable is <code>null</code>.
     *
     * @type boolean
     *
     * @readonly
     */
    readonly isNull: boolean;
}

/**
 * The MMOItem Variable entity representation on the client.
 *
 * @extends BaseVariable
 *
 * @see	VariableType
 * @see	MMOItem
 * @see	MMORoom
 */
export class MMOItemVariable extends BaseVariable {
    constructor(name: string, value: boolean | number | string | SFSObject | SFSArray, type?: number);
    /**
     * Returns a string that contains the MMOItem Variable name, type and value.
     *
     * @returns	{string} The string representation of the <em>MMOItemVariable</em> object.
     */
    toString(): string;
    /**
     * Indicates the name of this variable.
     *
     * @type string
     *
     * @readonly
     */
    readonly name: string;
    /**
     * Returns the value of this variable.
     *
     * @type *
     *
     * @readonly
     */
    readonly value: any;
    /**
     * Indicates the type of this Variable.
     * Possibly returned strings are: <code>null</code>, <code>boolean</code>, <code>int</code>, <code>double</code>, <code>string</code>, <code>SFSObject</code>, <code>SFSArray</code>.
     *
     * @type string
     *
     * @readonly
     */
    readonly type: string;
    /**
     * Indicates if the Variable is <code>null</code>.
     *
     * @type boolean
     *
     * @readonly
     */
    readonly isNull: boolean;
}

/**
 * <b>Developers never istantiate the <em>ReservedRoomVariables</em> class</b>: only use its static properties.
 *
 * @class
 * The reserved Room Variable names used by the Game API.
 *
 * @see SFSRoomVariable
 */
export class ReservedRoomVariables {
    constructor();
    /**
     * The Room Variable with this name keeps track of the state (started or stopped) of a game created with the <em>CreateSFSGameRequest</em> request.
     *
     * @constant {string}
     * @memberof ReservedRoomVariables
     *
     * @see	CreateSFSGameRequest
     * @see	SFSGameSettings.notifyGameStarted
     */
    static readonly RV_GAME_STARTED: string;
}

/**
 * The Room Variable entity representation on the client.
 *
 * @extends BaseVariable
 *
 * @see	VariableType
 * @see	SFSRoom
 * @see	SetRoomVariablesRequest
 */
export class SFSRoomVariable extends BaseVariable {
    constructor(name: string, value: boolean | number | string | SFSObject | SFSArray, type?: number);
    /**
     * Indicates whether this Room Variable is private or not.
     * A private Room Variable is visible to all users in the same Room, but it can be modified only by its owner (the user that created it).
     *
     * <p><b>NOTE</b>: setting the <em>isPrivate</em> property manually on an existing Room Variable returned by the API has no effect on the server and can disrupt the API functioning.
     * This flag can be set after the Room Variable object is created using the constructor only.</p>
     *
     * @type boolean
     */
    isPrivate: boolean;
    /**
     * Indicates whether this Room Variable is persistent or not.
     * A persistent Room Variable continues to exist in the Room after the user who created it has left it and until he disconnects.
     *
     * <p><b>NOTE</b>: setting the <em>isPersistent</em> property manually on an existing Room Variable returned by the API has no effect on the server and can disrupt the API functioning.
     * This flag can be set after the Room Variable object is created using the constructor only.</p>
     *
     * @type boolean
     */
    isPersistent: boolean;
    /**
     * Returns a string that contains the Room Variable name, type, value and <em>isPrivate</em> flag.
     *
     * @returns	{string} The string representation of the <em>SFSRoomVariable</em> object.
     */
    toString(): string;
    /**
     * Indicates the name of this variable.
     *
     * @type string
     *
     * @readonly
     */
    readonly name: string;
    /**
     * Returns the value of this variable.
     *
     * @type *
     *
     * @readonly
     */
    readonly value: any;
    /**
     * Indicates the type of this Variable.
     * Possibly returned strings are: <code>null</code>, <code>boolean</code>, <code>int</code>, <code>double</code>, <code>string</code>, <code>SFSObject</code>, <code>SFSArray</code>.
     *
     * @type string
     *
     * @readonly
     */
    readonly type: string;
    /**
     * Indicates if the Variable is <code>null</code>.
     *
     * @type boolean
     *
     * @readonly
     */
    readonly isNull: boolean;
}

/**
 * The User Variable entity representation on the client.
 *
 * @extends BaseVariable
 *
 * @see	VariableType
 * @see	SFSUser
 * @see	SetUserVariablesRequest
 */
export class SFSUserVariable extends BaseVariable {
    constructor(name: string, value: boolean | number | string | SFSObject | SFSArray, type?: number);
    /**
     * Indicates whether this User Variable is private or not.
     * A private User Variable is visible only to its owner; any changes made to the variable will be transmitted to the owner only.
     *
     * <p><b>NOTE</b>: setting the <em>isPrivate</em> property manually on an existing User Variable returned by the API has no effect on the server and can disrupt the API functioning.
     * This flag can be set after the User Variable object is created using the constructor only.</p>
     *
     * @type boolean
     */
    isPrivate: boolean;
    /**
     * Returns a string that contains the User Variable name, type, value and <em>isPrivate</em> flag.
     *
     * @returns	{string} The string representation of the <em>SFSUserVariable</em> object.
     */
    toString(): string;
    /**
     * Indicates the name of this variable.
     *
     * @type string
     *
     * @readonly
     */
    readonly name: string;
    /**
     * Returns the value of this variable.
     *
     * @type *
     *
     * @readonly
     */
    readonly value: any;
    /**
     * Indicates the type of this Variable.
     * Possibly returned strings are: <code>null</code>, <code>boolean</code>, <code>int</code>, <code>double</code>, <code>string</code>, <code>SFSObject</code>, <code>SFSArray</code>.
     *
     * @type string
     *
     * @readonly
     */
    readonly type: string;
    /**
     * Indicates if the Variable is <code>null</code>.
     *
     * @type boolean
     *
     * @readonly
     */
    readonly isNull: boolean;
}

/**
 * @class
 * The valid types for User, Room, Buddy and MMOItem Variables to be passed to the respective constructors.
 */
export class VariableType {
    constructor();
    /**
     * The Variable is <code>null</code>.
     *
     * @constant {number}
     * @memberof VariableType
     */
    static readonly NULL: number;
    /**
     * The type of the Variable is boolean.
     *
     * @constant {number}
     * @memberof VariableType
     */
    static readonly BOOLEAN: number;
    /**
     * The type of the Variable is number (specifically an integer).
     *
     * @constant {number}
     * @memberof VariableType
     */
    static readonly INT: number;
    /**
     * The type of the Variable is number (specifically a double).
     *
     * @constant {number}
     * @memberof VariableType
     */
    static readonly DOUBLE: number;
    /**
     * The type of the Variable is string.
     *
     * @constant {number}
     * @memberof VariableType
     */
    static readonly STRING: number;
    /**
     * The type of the Variable is <em>SFSObject</em>.
     *
     * @constant {number}
     * @memberof VariableType
     */
    static readonly SFSOBJECT: number;
    /**
     * The type of the Variable is <em>SFSArray</em>.
     *
     * @constant {number}
     * @memberof VariableType
     */
    static readonly SFSARRAY: number;
}

/**
 * Base class for all SmartFoxServer Variable entities on the client.
 *
 * @see SFSRoomVariable
 * @see SFSUserVariable
 * @see SFSBuddyVariable
 */
export class BaseVariable {
    constructor();
    /**
     * Indicates the name of this variable.
     *
     * @type string
     *
     * @readonly
     */
    readonly name: string;
    /**
     * Returns the value of this variable.
     *
     * @type *
     *
     * @readonly
     */
    readonly value: any;
    /**
     * Indicates the type of this Variable.
     * Possibly returned strings are: <code>null</code>, <code>boolean</code>, <code>int</code>, <code>double</code>, <code>string</code>, <code>SFSObject</code>, <code>SFSArray</code>.
     *
     * @type string
     *
     * @readonly
     */
    readonly type: string;
    /**
     * Indicates if the Variable is <code>null</code>.
     *
     * @type boolean
     *
     * @readonly
     */
    readonly isNull: boolean;
}

/**
 * The manager of the current user's <b>Buddy List</b> system.
 *
 * @see SmartFox#buddyManager
 * @see InitBuddyListRequest
 */
export class SFSBuddyManager {
    constructor();
    /**
     * Indicates whether the client's Buddy List system is initialized or not.
     * If not, an <em>InitBuddyListRequest</em> request should be sent to the server in order to retrieve the persistent Buddy List data.
     *
     * @type boolean
     *
     * @see	InitBuddyListRequest
     *
     * @readonly
     */
    readonly isInited: boolean;
    /**
     * Indicates whether a buddy exists in user's buddy list or not.
     *
     * @param	{string} name	The name of the buddy whose presence in the buddy list is to be checked.
     *
     * @returns	{boolean} <code>true</code> if the specified buddy exists in the buddy list.
     *
     * @see SFSBuddy#name
     */
    containsBuddy(name: string): boolean;
    /**
     * Retrieves a <em>SFSBuddy</em> object from its <em>id</em> property.
     *
     * @param	{number} id	The id of the buddy to be retrieved.
     *
     * @returns	{SFSBuddy} The <em>SFSBuddy</em> object representing the buddy, or <code>undefined</code> if no buddy with the passed id exists in the buddy list.
     *
     * @see	SFSBuddy#id
     */
    getBuddyById(id: number): SFSBuddy;
    /**
     * Retrieves a <em>SFSBuddy</em> object from its <em>name</em> property.
     *
     * @param	{string} name	The name of the buddy to be retrieved.
     *
     * @returns	{SFSBuddy} The <em>SFSBuddy</em> object representing the buddy, or <code>undefined</code> if no buddy with the passed name exists in the buddy list.
     *
     * @see SFSBuddy#name
     */
    getBuddyByName(name: string): SFSBuddy;
    /**
     * Retrieves a <em>SFSBuddy</em> object using its <em>nickName</em> property.
     *
     * @param	{string} nickName	The nickname of the buddy to be found.
     *
     * @returns	{SFSBuddy} The <em>SFSBuddy</em> object representing the buddy, or <code>undefined</code> if no buddy with the passed nickname exists in the buddies list.
     *
     * @see	SFSBuddy#nickName
     */
    getBuddyByNickName(nickName: string): SFSBuddy;
    /**
     * Returns a list of <em>SFSBuddy</em> objects representing all the offline buddies in the user's buddy list.
     *
     * @returns	{SFSBuddy[]} A list of <em>SFSBuddy</em> objects representing the offline buddies.
     *
     * @see SFSBuddy#isOnline
     */
    getOfflineBuddies(): SFSBuddy[];
    /**
     * Returns a list of <em>SFSBuddy</em> objects representing all the online buddies in the user's buddy list.
     *
     * @returns	{SFSBuddy[]} A list of <em>SFSBuddy</em> objects representing the online buddies.
     *
     * @see SFSBuddy#isOnline
     */
    getOnlineBuddies(): SFSBuddy[];
    /**
     * Returns a list of <em>SFSBuddy</em> objects representing all the buddies in the user's buddy list.
     *
     * @returns	{SFSBuddy[]} A list of <em>SFSBuddy</em> objects representing all the buddies.
     *
     * @see InitBuddyListRequest
     */
    getBuddyList(): SFSBuddy[];
    /**
     * Retrieves a Buddy Variable set for the current user from its name.
     *
     * @param	{string} varName	The name of the Buddy Variable to be retrieved.
     *
     * @returns	{SFSBuddyVariable} The <em>SFSBuddyVariable</em> object representing the Buddy Variable, or <code>undefined</code> if no Buddy Variable with the passed name is associated to the current user.
     *
     * @see	SetBuddyVariablesRequest
     */
    getMyVariable(varName: string): SFSBuddyVariable;
    /**
     * Returns all the Buddy Variables set for the current user.
     *
     * @returns	{SFSBuddyVariable[]} A list of <em>SFSBuddyVariable</em> objects representing all the Buddy Variables set for the user.
     *
     * @see	SFSBuddyVariable
     */
    getMyVariables(): SFSBuddyVariable[];
    /**
     * Returns the current user's online/offline state.
     *
     * <p>If <code>true</code>, the user appears to be online in the buddy list of other users who have him as a buddy.<br/>
     * The online state of a user in a buddy list is handled by means of a reserved Buddy Variable (see <em>ReservedBuddyVariables</em> class);
     * it can be changed using the dedicated <em>GoOnlineRequest</em> request.</p>
     *
     * @returns	{boolean} <code>true</code> if the user is online in the Buddy List system.
     *
     * @see	SFSBuddy#isOnline
     * @see	ReservedBuddyVariables
     * @see	GoOnlineRequest
     */
    getMyOnlineState(): boolean;
    /**
     * Returns the current user's nickname (if set).
     *
     * If the nickname was never set before, <code>null</code> is returned.
     * <p>As the nickname of a user in a buddy list is handled by means of a reserved Buddy Variable (see <em>ReservedBuddyVariables</em> class),
     * it can be set using the <em>SetBuddyVariablesRequest</em> request.</p>
     *
     * @returns	{string} The user nickname in the Buddy List system.
     *
     * @see	SFSBuddy#getNickName
     * @see	ReservedBuddyVariables
     * @see	SetBuddyVariablesRequest
     */
    getMyNickName(): string;
    /**
     * Returns the current user's custom state (if set).
     *
     * Examples of custom states are "Available", "Busy", "Be right back", etc. If the custom state was never set before, <code>null</code> is returned.
     * <p>As the custom state of a user in a buddy list is handled by means of a reserved Buddy Variable (see <em>ReservedBuddyVariables</em> class),
     * it can be set using the <em>SetBuddyVariablesRequest</em> request.</p>
     *
     * @returns	{string} The user state in the Buddy List system.
     *
     * @see	SFSBuddy#getState
     * @see	ReservedBuddyVariables
     * @see	SetBuddyVariablesRequest
     */
    getMyState(): string;
    /**
     * Returns a list of strings representing the available custom buddy states.
     *
     * <p>The custom states are received by the client upon initialization of the Buddy List system. They can be configured by means of the SmartFoxServer 2X Administration Tool.</p>
     *
     * @returns	{string[]} The list of available custom buddy states in the Buddy List system.
     *
     * @see	SFSBuddy#getState
     */
    getBuddyStates(): string[];
}

/**
 * The manager of the client-side Rooms list.
 *
 * @see SmartFox#roomManager
 */
export class SFSRoomManager {
    constructor();
    /**
     * Returns the names of Groups currently subscribed by the client.
     *
     * <p><b>NOTE</b>: at login time, the client automatically subscribes all the Room Groups specified in the Zone's <b>Default Room Groups</b> setting.</p>
     *
     * @returns	{string[]} A list of Group names.
     *
     * @see	SFSRoom#groupId
     * @see	SubscribeRoomGroupRequest
     * @see	UnsubscribeRoomGroupRequest
     */
    getRoomGroups(): string[];
    /**
     * Indicates whether the specified Group has been subscribed by the client or not.
     *
     * @param	{string} groupId	The name of the Group.
     *
     * @returns	{boolean} <code>true</code> if the client subscribed the passed Group.
     */
    containsGroup(groupId: string): boolean;
    /**
     * Indicates whether a Room exists in the Rooms list or not.
     *
     * @param	{number|string} idOrName	The id or name of the <em>SFSRoom</em> object whose presence in the Rooms list is to be tested.
     *
     * @returns	{boolean} <code>true</code> if the passed Room exists in the Rooms list.
     *
     * @see	SFSRoom#id
     * @see	SFSRoom#name
     */
    containsRoom(idOrName: number | string): boolean;
    /**
     * Indicates whether the Rooms list contains a Room belonging to the specified Group or not.
     *
     * @param	{number|string} idOrName		The id or name of the <em>SFSRoom</em> object whose presence in the Rooms list is to be tested.
     * @param	{string} groupId	The name of the Group to which the specified Room must belong.
     *
     * @returns	{boolean} <code>true</code> if the Rooms list contains the passed Room and it belongs to the specified Group.
     *
     * @see	SFSRoom#id
     * @see	SFSRoom#name
     * @see	SFSRoom#groupId
     */
    containsRoomInGroup(idOrName: number | string, groupId: string): boolean;
    /**
     * Retrieves a <em>SFSRoom</em> object from its <em>id</em> property.
     *
     * @example
     * <caption>This example retrieves a SFSRoom object and traces its name.</caption>
     * var roomId = 3;
     * var room = sfs.getRoomById(roomId);
     * console.log("The name of Room " + roomId + " is " + room.name);
     *
     * @param	{number} id	The id of the Room to be retrieved.
     *
     * @returns	{SFSRoom} The object representing the requested Room; <code>undefined</code> if no <em>SFSRoom</em> object with the passed id exists in the Rooms list.
     */
    getRoomById(id: number): SFSRoom;
    /**
     * Retrieves a <em>SFSRoom</em> object from its <em>name</em> property.
     *
     * @example
     * <caption>This example retrieves a <em>SFSRoom</em> object and traces its id.</caption>
     * var roomName = "The Lobby";
     * var room = sfs.getRoomByName(roomName);
     * console.log("The ID of Room '" + roomName + "' is " + room.id);
     *
     * @param	{string} name	The name of the Room to be retrieved.
     *
     * @returns	{SFSRoom} The object representing the requested Room; <code>undefined</code> if no <em>SFSRoom</em> object with the passed name exists in the Rooms list.
     */
    getRoomByName(name: string): SFSRoom;
    /**
     * Returns a list of Rooms currently "known" by the client.
     *
     * <p>The list contains all the Rooms that are currently joined and all the Rooms belonging to the Room Groups that have been subscribed.</p>
     *
     * <p><b>NOTE</b>: at login time, the client automatically subscribes all the Room Groups specified in the Zone's <b>Default Room Groups</b> setting.</p>
     *
     * @returns	{SFSRoom[]} The list of the available <em>SFSRoom</em> objects.
     *
     * @see	JoinRoomRequest
     * @see	SubscribeRoomGroupRequest
     * @see	UnsubscribeRoomGroupRequest
     */
    getRoomList(): SFSRoom[];
    /**
     * Returns the current number of Rooms in the Rooms list.
     *
     * @returns	{number} The number of Rooms in the Rooms list.
     */
    getRoomCount(): number;
    /**
     * Retrieves the list of Rooms which are part of the specified Room Group.
     *
     * @param	{string} groupId	The name of the Group.
     *
     * @returns	{SFSRoom[]} The list of <em>SFSRoom</em> objects belonging to the passed Group.
     *
     * @see	SubscribeRoomGroupRequest
     */
    getRoomListFromGroup(groupId: string): SFSRoom[];
    /**
     * Returns a list of Rooms currently joined by the client.
     *
     * @returns	{SFSRoom[]} The list of <em>SFSRoom</em> objects representing the Rooms currently joined by the client.
     *
     * @see	JoinRoomRequest
     */
    getJoinedRooms(): SFSRoom[];
    /**
     * Retrieves a list of Rooms joined by the specified user.
     *
     * <p>The list contains only those Rooms "known" by the Room Manager; the user might have joined others the client is not aware of.</p>
     *
     * @param	{SFSUser} user	A <em>SFSUser</em> object representing the user to look for in the current Rooms list.
     *
     * @returns	{SFSRoom[]} The list of Rooms joined by the passed user.
     */
    getUserRooms(user: SFSUser): SFSRoom[];
}

/**
 * The manager of the local (client-side) users list.
 *
 * @see	SmartFox#userManager
 */
export class SFSUserManager {
    constructor();
    /**
     * Indicates whether a user exists in the local users list or not from the name.
     *
     * @param	{string} userName	The name of the user whose presence in the users list is to be tested.
     *
     * @returns	{boolean} <code>true</code> if the passed user exists in the users list.
     *
     * @see	SFSUser#name
     */
    containsUserName(userName: string): boolean;
    /**
     * Indicates whether a user exists in the local users list or not from the id.
     *
     * @param	{number} userId	The id of the user whose presence in the users list is to be tested.
     *
     * @returns	{boolean} <code>true</code> if the passed user exists in the users list.
     *
     * @see	SFSUser#id
     */
    containsUserId(userId: number): boolean;
    /**
     * Indicates whether a user exists in the local users list or not.
     *
     * @param	{SFSUser} user	The <em>SFSUser</em> object representing the user whose presence in the users list is to be tested.
     *
     * @returns	{boolean} <code>true</code> if the passed user exists in the users list.
     */
    containsUser(user: SFSUser): boolean;
    /**
     * Retrieves a <em>SFSUser</em> object from its <em>id</em> property.
     *
     * @param	{number} userId	The id of the user to be retrieved.
     *
     * @returns	{SFSUser} The <em>SFSUser</em> object representing the user, or <code>undefined</code> if no user with the passed id exists in the local users list.
     *
     * @see	SFSUser#id
     */
    getUserById(userId: number): SFSUser;
    /**
     * Retrieves a <em>SFSUser</em> object from its <em>name</em> property.
     *
     * @param	{string} userName	The name of the user to be retrieved.
     *
     * @returns	{SFSUser} The <em>SFSUser</em> object representing the user, or <code>undefined</code> if no user with the passed name exists in the local users list.
     *
     * @see	SFSUser#name
     */
    getUserByName(userName: string): SFSUser;
    /**
     * Returns the total number of users in the local users list.
     *
     * @returns	{number} The number of users in the local users list.
     */
    getUserCount(): number;
    /**
     * Get the whole list of users inside the Rooms joined by the client.
     *
     * @returns	{SFSUser[]} The list of <em>SFSUser</em> objects representing the users in the local users list.
     */
    getUserList(): SFSUser[];
}

/**
 * The settings required to create a Room using the <em>CreateRoomRequest</em> request.
 *
 * @see	CreateRoomRequest
 * @see	SFSRoom
 */
export class RoomSettings {
    constructor(name: string);
    /**
     * Defines the name of the Room.
     *
     * @type {string}
     */
    name: string;
    /**
     * Sets the password of the Room.
     *
     * <p>If the password is set to an empty string, the Room won't be password protected.</p>
     *
     * @type {string}
     * @default	An empty string
     */
    password: string;
    /**
     * Sets the id of the Group to which the Room should belong.
     *
     * <p>If the Group doesn't exist yet, a new one is created before assigning the Room to it.</p>
     *
     * @type {string}
     * @default	"default"
     *
     * @see SFSRoom#groupId
     */
    groupId: string;
    /**
     * Sets whether the Room is a Game Room or not.
     *
     * @type {boolean}
     * @default	false
     */
    isGame: boolean;
    /**
     * Sets the maximum number of users allowed in the Room.
     * <p>In case of Game Rooms, this is the maximum number of players.</p>
     *
     * @type {number}
     * @default	10
     */
    maxUsers: number;
    /**
     * Sets the maximum number of spectators allowed in the Room (only for Game Rooms).
     *
     * @type {number}
     * @default	0
     */
    maxSpectators: number;
    /**
     * Sets the maximum number of Room Variables allowed for the Room.
     *
     * @type {number}
     * @default	5
     */
    maxVariables: number;
    /**
     * Sets a list of <em>SFSRooomVariable</em> objects to be attached to the Room.
     *
     * @type	{SFSRoomVariable[]}
     * @default	An empty array
     */
    variables: SFSRoomVariable[];
    /**
     * Sets the flags indicating which operations are permitted on the Room.
     *
     * <p>Permissions include: name and password change, maximum users change and public messaging.
     * If set to <code>null</code>, the permissions configured on the server-side are used (see the SmartFoxServer 2X Administration Tool documentation).</p>
     *
     * @type	{RoomPermissions}
     * @default	null
     */
    permissions: RoomPermissions;
    /**
     * Sets the flags indicating which events related to the Room are dispatched by the <em>SmartFox</em> client.
     *
     * <p>Room events include: users entering or leaving the room, user count change and user variables update.
     * If set to <code>null</code>, the events configured on the server-side are used (see the SmartFoxServer 2X Administration Tool documentation).</p>
     *
     * @type	{RoomEvents}
     * @default	null
     */
    events: RoomEvents;
    /**
     * Sets the Extension that must be attached to the Room on the server-side, and its settings.
     *
     * @type	{RoomExtension}
     * @default	null
     */
    extension: RoomExtension;
    /**
     * Specifies if the Room allows "Join Room" invitations to be sent by any user or just by its owner.
     *
     * @type {boolean}
     * @default	true
     */
    allowOwnerOnlyInvitation: boolean;
}

/**
 * The settings required to create a Game Room using the <em>CreateSFSGameRequest</em> request.
 *
 * @see	CreateSFSGameRequest
 * @see	SFSRoom
 */
export class SFSGameSettings {
    constructor(name: string);
    /**
     * Indicates whether the game is public or private.
     *
     * <p>A public game can be joined by any player whose User Variables match the <em>playerMatchExpression</em> assigned to the Game Room.
     * A private game can be joined by users invited by the game creator by means of <em>invitedPlayers</em> list.</p>
     *
     * @type {boolean}
     * @default	true
     */
    isPublic: boolean;
    /**
     * Defines the minimum number of players required to start the game.
     *
     * <p>If the <em>notifyGameStarted</em> property is set to <code>true</code>, when this number is reached, the game start is notified.</p>
     *
     * @type {number}
     * @default	2
     */
    minPlayersToStartGame: number;
    /**
     * In private games, defines a list of <em>SFSUser</em> objects representing players to be invited to join the game.
     *
     * <p>If the invitations are less than the minimum number of players required to start the game (see the <em>minPlayersToStartGame</em> property),
     * the server will send additional invitations automatically, searching users in the Room Groups specified in the <em>searchableRooms</em> list
     * and filtering them by means of the object passed to the <em>playerMatchExpression</em> property.</p>
     *
     * <p>The game matching criteria contained in the <em>playerMatchExpression</em> property do not apply to the users specified in this list.</p>
     *
     * @type {SFSUser[]}
     * @default	null
     */
    invitedPlayers: SFSUser[];
    /**
     * In private games, defines a list of Groups names where to search players to invite.
     *
     * <p>If the users invited to join the game (specified through the <em>invitedPlayers</em> property) are less than the minimum number of
     * players required to start the game (see the <em>minPlayersToStartGame</em> property),
     * the server will invite others automatically, searching them in Rooms belonging to the Groups specified in this list
     * and filtering them by means of the object passed to the <em>playerMatchExpression</em> property.</p>
     *
     * @type {string[]}
     * @default	null
     */
    searchableRooms: string[];
    /**
     * In private games, defines the number of seconds that users have to reply to the invitation to join a game.
     *
     * <p>The suggested range is 10 to 40 seconds.</p>
     *
     * @type {number}
     * @default	15
     */
    invitationExpiryTime: number;
    /**
     * In private games, indicates whether the players must leave the previous Room when joining the game or not.
     *
     * <p>This setting applies to private games only because users join the Game Room automatically when they accept the invitation to play,
     * while public games require a <em>JoinRoomRequest</em> request to be sent, where this behavior can be determined manually.</p>
     *
     * @type {boolean}
     * @default	true
     */
    leaveLastJoinedRoom: boolean;
    /**
     * Indicates if a game state change must be notified when the minimum number of players is reached.
     *
     * <p>If this setting is <code>true</code>, the game state (started or stopped) is handled by means of the reserved Room Variable
     * represented by the <em>ReservedRoomVariables.RV_GAME_STARTED</em> constant. Listening to the <em>roomVariablesUpdate</em> event for this variable
     * allows clients to be notified when the game can start due to minimum number of players being reached.</p>
     *
     * <p>As the used Room Variable is created as <em>global</em> (see the <em>SFSRoomVariable</em> class description), its update is broadcast outside the Room too:
     * this can be used on the client-side, for example, to show the game state in a list of available games.</p>
     *
     * @type {boolean}
     * @default	false
     *
     * @see	ReservedRoomVariables.RV_GAME_STARTED
     * @see	SFSEvent.ROOM_VARIABLES_UPDATE
     * @see	SFSRoomVariable
     */
    notifyGameStarted: boolean;
    /**
     * Defines the game matching expression to be used to filters players.
     *
     * <p>Filtering is applied when:</p>
     * <ul>
     * <li>users try to join a public Game Room as players (their User Variables must match the matching criteria)</li>
     * <li>the server selects additional users to be invited to join a private game (see the <em>searchableRooms</em> property)</li>
     * </ul>
     *
     * <p>Filtering is not applied to users invited by the creator to join a private game (see the <em>invitedPlayers</em> property).</p>
     *
     * @type {MatchExpression}
     * @default	null
     */
    playerMatchExpression: MatchExpression;
    /**
     * Defines the game matching expression to be used to filters spectators.
     *
     * <p>Filtering is applied when users try to join a public Game Room as spectators (their User Variables must match the matching criteria).</p>
     *
     * @type {MatchExpression}
     * @default	null
     */
    spectatorMatchExpression: MatchExpression;
    /**
     * In private games, defines an optional <em>SFSObject</em> containing additional custom parameters to be sent together with the invitation.
     *
     * <p>Possible custom parameters to be transferred to the invitees are a message for the recipient, the game details (title, type...), the inviter details, etc.</p>
     *
     * @type {SFSObject}
     * @default	null
     */
    invitationParams: SFSObject;
}

/**
 * The settings required to create an MMORoom using the <em>CreateRoomRequest</em> request.
 *
 * @see	CreateRoomRequest
 * @see	MMORoom
 */
export class MMORoomSettings {
    constructor(name: string, defaultAOI: Vec3D);
    /**
     * Defines the Area of Interest (AoI) for the MMORoom.
     *
     * <p>This value represents the area/range around the user that will be affected by server events and other users events.
     * It is a <em>Vec3D</em> object providing 2D or 3D coordinates. For example a <code>Vec3D(50,50)</code> describes a range of 50 units (e.g. pixels) in all four directions (top, bottom, left, right)
     * with respect to the user position in a 2D coordinates system. A <code>Vec3D(120,120,60)</code> instead describes a range of 120 units in all four directions (top, bottom, left, right)
     * and 60 units along the two Z-axis directions (backward, forward) with respect to the user position in a 3D coordinates system.</p>
     *
     * @type Vec3D
     */
    defaultAOI: Vec3D;
    /**
     * Defines the limits of the virtual environment represented by the MMORoom.
     *
     * <p>When specified, this property must contain two non-null <em>Vec3D</em> objects representing the minimum and maximum limits of the 2D/3D coordinates systems.
     * Any positional value that falls outside the provided limit will be refused by the server.</p>
     *
     * <p>This setting is optional but its usage is highly recommended.</p>
     *
     * @type {MapLimits}
     * @default	null
     */
    mapLimits: MapLimits;
    /**
     * Defines the time limit before a user without a physical position set inside the MMORoom is kicked from the Room.
     *
     * <p>As soon as the MMORoom is joined, the user still doesn't have a physical position set in the coordinates system, therefore it is
     * considered in a "limbo" state. At this point the user is expected to set his position (via the <em>SetUserPositionRequest</em> request) within the
     * amount of seconds expressed by this value.</p>
     *
     * @type {number}
     * @default	50
     */
    userMaxLimboSeconds: number;
    /**
     * Configures the speed at which the <em>SFSEvent.PROXIMITY_LIST_UPDATE</em> event is sent by the server.
     *
     * <p>In an MMORoom, the regular users list is replaced by a proximity list, which keeps an updated view of the users currently within the Area of Interest
     * of the current user. The speed at which these updates are fired by the server is regulated by this parameter, which sets the minimum time between two subsequent updates.</p>
     *
     * <p><b>NOTE:</b> values below the default might be unnecessary for most applications unless they are in realtime.</p>
     *
     * @type {number}
     * @default	250
     *
     * @see SFSEvent.PROXIMITY_LIST_UPDATE
     */
    proximityListUpdateMillis: number;
    /**
     * Sets if the users entry points in the current user's Area of Interest should be transmitted in the <em>SFSEvent.PROXIMITY_LIST_UPDATE</em> event.
     *
     * <p>If this setting is set to <code>true</code>, when a user enters the AoI of another user, the server will also send the coordinates
     * at which the former "appeared" within the AoI. This option should be turned off in case these coordinates are not needed, in order to save bandwidth.</p>
     *
     * @type {boolean}
     * @default	true
     *
     * @see	SFSUser#aoiEntryPoint
     * @see	MMOItem#aoiEntryPoint
     * @see	SFSEvent.PROXIMITY_LIST_UPDATE
     */
    sendAOIEntryPoint: boolean;
}

/**
 * A subset of the <em>RoomSettings</em> defining which operations users will be able to execute on the Room after its creation.
 *
 * @see	RoomSettings#permissions
 * @see	CreateRoomRequest
 */
export class RoomPermissions {
    constructor();
    /**
     * Sets whether changing the Room name after its creation is allowed or not.
     *
     * <p>The Room name can be changed by means of the <em>ChangeRoomNameRequest</em> request.</p>
     *
     * @type {boolean}
     * @default	false
     *
     * @see	ChangeRoomNameRequest
     */
    allowNameChange: boolean;
    /**
     * Sets whether changing (or removing) the Room password after its creation is allowed or not.
     *
     * <p>The Room password can be changed by means of the <em>ChangeRoomPasswordStateRequest</em> request.</p>
     *
     * @type {boolean}
     * @default	false
     *
     * @see	ChangeRoomPasswordStateRequest
     */
    allowPasswordStateChange: boolean;
    /**
     * Sets whether users inside the Room are allowed to send public messages or not.
     *
     * <p>Public messages can be sent by means of the <em>PublicMessageRequest</em> request.</p>
     *
     * @type {boolean}
     * @default	true
     *
     * @see	PublicMessageRequest
     */
    allowPublicMessages: boolean;
    /**
     * Sets whether the Room capacity can be changed after its creation or not.
     *
     * <p>The capacity is the maximum number of users and spectators (in Game Rooms) allowed to enter the Room.
     * It can be changed by means of the <em>ChangeRoomCapacityRequest</em> request.</p>
     *
     * @type {boolean}
     * @default	false
     *
     * @see	ChangeRoomCapacityRequest
     */
    allowResizing: boolean;
}

/**
 * A subset of the <em>RoomSettings</em> defining which events related to the Room will be fired by the <em>SmartFox</em> client.
 *
 * @see	RoomSettings#events
 * @see	CreateRoomRequest
 */
export class RoomEvents {
    constructor();
    /**
     * Sets whether or not the <em>userCountChange</em> event should be dispatched whenever the users (or players+spectators) count changes in the Room.
     *
     * @type {boolean}
     * @default	false
     *
     * @see	SFSEvent.USER_COUNT_CHANGE
     */
    allowUserCountChange: boolean;
    /**
     * Sets whether the <em>userEnterRoom</em> event should be dispatched whenever a user joins the Room or not.
     *
     * @type {boolean}
     * @default	false
     *
     * @see SFSEvent.USER_ENTER_ROOM
     */
    allowUserEnter: boolean;
    /**
     * Sets whether the <em>userExitRoom</em> event should be dispatched whenever a user leaves the Room or not.
     *
     * @type {boolean}
     * @default	false
     *
     * @see SFSEvent.USER_EXIT_ROOM
     */
    allowUserExit: boolean;
    /**
     * Sets whether or not the <em>userVariablesUpdate</em> event should be dispatched whenever a user in the Room updates his User Variables.
     *
     * @type {boolean}
     * @default	false
     *
     * @see SFSEvent.USER_VARIABLES_UPDATE
     */
    allowUserVariablesUpdate: boolean;
}

/**
 * A subset of the <em>RoomSettings</em> defining which server-side Extension should be attached to the Room upon creation.
 *
 * @see	RoomSettings#extension
 * @see	CreateRoomRequest
 * @see	ExtensionRequest
 */
export class RoomExtension {
    constructor(id: string, className: string);
    /**
     * Returns the name of the Extension to be attached to the Room.
     *
     * <p>It's the name of the server-side folder containing the Extension classes inside the main <em>[sfs2x-install-folder]/SFS2X/extensions</em> folder.</p>
     *
     * @type {string}
     */
    id: string;
    /**
     * Returns the fully qualified name of the main class of the Extension.
     *
     * @type {string}
     */
    className: string;
    /**
     * Sets the name of an optional properties file that should be loaded on the server-side during the Extension initialization.
     *
     * <p>The file must be located in the server-side folder containing the Extension classes (see the <em>id</em> property).</p>
     *
     * @type {string}
     * @default	An empty string
     */
    propertiesFile: string;
}

/**
 * A subset of the <em>MMORoomSettings</em> defining the limits of the virtual environment represented by an MMORoom.
 *
 * @see	MMORoomSettings#mapLimits
 * @see	CreateRoomRequest
 */
export class MapLimits {
    constructor(lowerLimit: Vec3D, higherLimit: Vec3D);
    /**
     * Returns the lower coordinates limit of the virtual environment along the X,Y,Z axes.
     *
     * @type {Vec3D}
     */
    lowerLimit: Vec3D;
    /**
     * Returns the higher coordinates limit of the virtual environment along the X,Y,Z axes.
     *
     * @type {Vec3D}
     */
    higherLimit: Vec3D;
}

/**
 * <b>Developers never istantiate the <em>BanMode</em> class</b>: only use its static properties.
 *
 * @class
 * The available banning modes for a <em>BanUserRequest</em>.
 *
 * @see	BanUserRequest
 */
export class BanMode {
    constructor();
    /**
     * User is banned by IP address.
     *
     * @constant {number}
     * @memberof BanMode
     */
    static readonly BY_ADDRESS: number;
    /**
     * User is banned by name.
     *
     * @constant {number}
     * @memberof BanMode
     */
    static readonly BY_NAME: number;
}

/**
 * The recipient/s of moderator and administrator messages.
 */
export class MessageRecipientMode {
    constructor(mode: number, target: SFSUser | SFSRoom | string);
    /**
     * The moderator/administrator message will be sent to a specific user.
     * <p>A <em>SFSUser</em> instance must be passed as <em>target</em> parameter to the class constructor.</p>
     *
     * @constant {number}
     * @memberof MessageRecipientMode
     *
     * @see	SFSUser
     */
    static readonly TO_USER: number;
    /**
     * The moderator/administrator message will be sent to all the users in a specific Room.
     * <p>A <em>SFSRoom</em> instance must be passed as <em>target</em> parameter to the class constructor.</p>
     *
     * @constant {number}
     * @memberof MessageRecipientMode
     *
     * @see	SFSRoom
     */
    static readonly TO_ROOM: number;
    /**
     * The moderator/administrator message will be sent to all the clients who subscribed a specific Room Group.
     * <p>A Group id must be passed as <em>target</em> parameter to the class constructor.</p>
     *
     * @constant {number}
     * @memberof MessageRecipientMode
     *
     * @see	SFSRoom#groupId
     */
    static readonly TO_GROUP: number;
    /**
     * The moderator/administrator message will be sent to all the users in the Zone.
     * <p><code>null</code> can be passed as <em>target</em> parameter, in fact it will be ignored.</p>
     *
     * @constant {number}
     * @memberof MessageRecipientMode
     */
    static readonly TO_ZONE: number;
    /**
     * Returns the selected recipient mode.
     *
     * @type {number}
     *
     * @readonly
     */
    readonly mode: number;
    /**
     * Returns the moderator/administrator message target, according to the selected recipient mode.
     *
     * @type {SFSUser|SFSRoom|string}
     *
     * @readonly
     */
    readonly target: SFSUser | SFSRoom | string;
}

/**
 * Adds a new buddy to the current user's buddy list.
 *
 * @example
 * <caption>This example sends a request to add a buddy.</caption>
 * function someMethod()
 * {
 * 	sfs.addEventListener(SFS2X.SFSBuddyEvent.BUDDY_ADD, onBuddyAdded, this);
 * 	sfs.addEventListener(SFS2X.SFSBuddyEvent.BUDDY_ERROR, onBuddyError, this);
 *
 * 	// Add Jack as a new buddy to my buddies list
 * 	sfs.send(new SFS2X.AddBuddyRequest("Jack"));
 * }
 *
 * function onBuddyAdded(evtParams)
 * {
 * 	console.log("This buddy was added: " + evtParams.buddy.name);
 * }
 *
 * function onBuddyError(evtParams)
 * {
 * 	console.log("The following error occurred while executing a buddy-related request: " + evtParams.errorMessage);
 * }
 *
 * @see SmartFox#send
 * @see SFSBuddyEvent.BUDDY_ADD
 * @see	SFSBuddyEvent.BUDDY_ERROR
 * @see	RemoveBuddyRequest
 */
export class AddBuddyRequest {
    constructor(buddyName: string);
}

/**
 * Blocks or unblocks a buddy in the current user's buddy list.
 *
 * @example
 * <caption>This example handles the possible events caused by a request to block a buddy.</caption>
 * function someMethod()
 * {
 * 	sfs.addEventListener(SFS2X.SFSBuddyEvent.BUDDY_BLOCK, onBuddyBlock, this);
 * 	sfs.addEventListener(SFS2X.SFSBuddyEvent.BUDDY_ERROR, onBuddyError, this);
 *
 * 	// Block user "Jack" in my buddies list
 * 	smartFox.send(new SFS2X.BlockBuddyRequest("Jack", true));
 * }
 *
 * function onBuddyBlock(evtParams)
 * {
 * 	var isBlocked = evtParams.buddy.isBlocked;
 * 	console.log("Buddy " + evtParams.buddy.name + " is now " + (isBlocked ? "blocked" : "unblocked"));
 * }
 *
 * function onBuddyError(evtParams)
 * {
 * 	console.log("The following error occurred while executing a buddy-related request: " + evtParams.errorMessage);
 * }
 *
 * @see SmartFox#send
 * @see SFSBuddyEvent.BUDDY_BLOCK
 * @see SFSBuddyEvent.BUDDY_ERROR
 */
export class BlockBuddyRequest {
    constructor(buddyName: string, blocked: boolean);
}

/**
 * Sends a message to a buddy in the current user's buddy list.
 *
 * @example
 * <caption>This example sends a message to a buddy and handles the related event.</caption>
 * function someMethod()
 * {
 * 	sfs.addEventListener(SFS2X.SFSBuddyEvent.BUDDY_MESSAGE, onBuddyMessage, this);
 *
 * 	// Get the recipient of the message, in this case my buddy Jack
 * 	var buddy = sfs.buddyManager.getBuddyByName("Jack");
 *
 * 	// Send a message to Jack
 * 	sfs.send(new SFS2X.BuddyMessageRequest("Hello Jack!", buddy));
 * }
 *
 * function onBuddyMessage(evtParams)
 * {
 * 	// As messages are forwarded to the sender too,
 * 	// I have to check if I am the sender
 *
 * 	var isItMe = evtParams.isItMe;
 * 	var sender = evtParams.buddy;
 *
 * 	if (isItMe)
 * 		console.log("I said: " + evtParams.message);
 * 	else
 * 		console.log("My buddy " + sender.name + " said: " + evtParams.message);
 * }
 *
 * @see SmartFox#send
 * @see SFSBuddyEvent.BUDDY_MESSAGE
 */
export class BuddyMessageRequest {
    constructor(message: string, targetBuddy: SFSBuddy, params?: SFSObject);
}

/**
 * Toggles the current user's online/offline state as buddy in other users' buddy lists.
 *
 * @example
 * <caption>This example changes the user online state in the Buddy List system.</caption>
 * function someMethod()
 * {
 * 	sfs.addEventListener(SFS2X.SFSBuddyEvent.BUDDY_ONLINE_STATE_CHANGE, onBuddyOnlineStateChanged, this);
 *
 * 	// Put myself offline in the Buddy List system
 * 	sfs.send(new SFS2X.GoOnlineRequest(false));
 * }
 *
 * function onBuddyOnlineStateChanged(evtParams)
 * {
 * 	// As the state change event is dispatched to me too,
 * 	// I have to check if I am the one who changed his state
 *
 * 	var isItMe = evtParams.isItMe;
 *
 * 	if (isItMe)
 * 		console.log("I'm now " + (sfs.buddyManager.getMyOnlineState() ? "online" : "offline"));
 * 	else
 * 		console.log("My buddy " + evtParams.buddy.name + " is now " + (evtParams.buddy.isOnline ? "online" : "offline"));
 * }
 *
 * @see SmartFox#send
 * @see	SFSBuddyManager#getMyOnlineState
 * @see	SFSBuddy#isOnline
 * @see SFSBuddyEvent.BUDDY_ONLINE_STATE_CHANGE
 */
export class GoOnlineRequest {
    constructor(online: boolean);
}

/**
 * Initializes the Buddy List system on the current client.
 *
 * @example
 * <caption>This example initializes the Buddy List system.</caption>
 * function someMethod()
 * {
 * 	sfs.addEventListener(SFS2X.SFSBuddyEvent.BUDDY_LIST_INIT, onBuddyListInitialized, this);
 * 	sfs.addEventListener(SFS2X.SFSBuddyEvent.BUDDY_ERROR, onBuddyError, this)
 *
 * 	// Initialize the Buddy List system
 * 	sfs.send(new SFS2X.InitBuddyListRequest());
 * }
 *
 * function onBuddyListInitialized(evtParams)
 * {
 * 	console.log("Buddy List system initialized successfully");
 *
 * 	// Retrieve my buddies list
 * 	var buddies = sfs.buddyManager.getBuddyList();
 *
 * 	// Display the online buddies in a list component in the application interface
 * 	...
 * }
 *
 * function onBuddyError(evtParams)
 * {
 * 	console.log("The following error occurred while executing a buddy-related request: " + evtParams.errorMessage);
 * }
 *
 * @see SmartFox#send
 * @see SFSBuddyEvent.BUDDY_LIST_INIT
 * @see SFSBuddyEvent.BUDDY_ERROR
 */
export class InitBuddyListRequest {
    constructor();
}

/**
 * Removes a buddy from the current user's buddy list.
 *
 * @example
 * <caption>This example sends a request to remove a buddy.</caption>
 * function someMethod()
 * {
 * 	sfs.addEventListener(SFS2X.SFSBuddyEvent.BUDDY_REMOVE, onBuddyRemoved, this);
 * 	sfs.addEventListener(SFS2X.SFSBuddyEvent.BUDDY_ERROR, onBuddyError, this);
 *
 * 	// Remove Jack from my buddies list
 * 	sfs.send(new SFS2X.Requests.BuddyList.RemoveBuddyRequest("Jack"));
 * }
 *
 * function onBuddyRemoved(evtParams)
 * {
 * 	console.log("This buddy was removed: " + evtParams.buddy.name);
 * }
 *
 * function onBuddyError(evtParams)
 * {
 * 	console.log("The following error occurred while executing a buddy-related request: " + evtParams.errorMessage);
 * }
 *
 * @see SmartFox#send
 * @see SFSBuddyEvent.BUDDY_REMOVE
 * @see SFSBuddyEvent.BUDDY_ERROR
 * @see	AddBuddyRequest
 */
export class RemoveBuddyRequest {
    constructor(buddyName: string);
}

/**
 * Sets one or more Buddy Variables for the current user.
 *
 * @example
 * <caption>This example sets some Buddy Variables for the current user, one of which is persistent and another one is the reserved variable used to set the nickname; the example also handles changes made by the user or by his buddies.</caption>
 * function someMethod()
 * {
 * 	sfs.addEventListener(SFS2X.SFSBuddyEvent.BUDDY_VARIABLES_UPDATE, onBuddyVarsUpdate, this);
 *
 * 	// Create two Buddy Variables containing the title and artist of the song I'm listening to
 * 	var songTitle = new SFS2X.SFSBuddyVariable("songTitle", "Ascension");
 * 	var songAuthor = new SFS2X.SFSBuddyVariable("songAuthor", "Mike Oldfield");
 *
 * 	// Create a persistent Buddy Variable containing my mood message
 * 	var mood = new SFS2X.SFSBuddyVariable(SFS2X.SFSBuddyVariable.OFFLINE_PREFIX + "mood", "SFS2X rocks!");
 *
 * 	// Set my nickname
 * 	var nick = new SFS2X.SFSBuddyVariable(SFS2X.ReservedBuddyVariables.BV_NICKNAME, "Bax");
 *
 * 	// Set my Buddy Variables
 * 	var vars = [songTitle, songAuthor, mood, nick];
 * 	sfs.send(new SFS2X.SetBuddyVariablesRequest(vars));
 * }
 *
 * function onBuddyVarsUpdate(evtParams)
 * {
 * 	// As the update event is dispatched to me too,
 * 	// I have to check if I am the one who changed his Buddy Variables
 *
 * 	var isItMe = evtParams.isItMe;
 *
 * 	if (isItMe)
 * 	{
 * 		console.log("I've updated the following Buddy Variables:");
 *
 * 		for (var i = 0; i < evtParams.changedVars.length; i++)
 * 		{
 * 			var bVarName = evtParams.changedVars[i];
 * 			console.log(bVarName + " -->; " + sfs.buddyManager.getMyVariable(bVarName).value);
 * 		}
 * 	}
 * 	else
 * 	{
 * 		var buddyName = evtParams.buddy.name;
 *
 * 		console.log("My buddy " + buddyName + " updated the following Buddy Variables:");
 *
 * 		for (var i = 0; i < evtParams.changedVars.length; i++)
 * 		{
 * 			var bVarName = evtParams.changedVars[i];
 * 			console.log(bVarName + " --> " + sfs.buddyManager.getBuddyByName(buddyName).getVariable(bVarName).value);
 * 		}
 * 	}
 * }
 *
 * @see SmartFox#send
 * @see	ReservedBuddyVariables
 * @see SFSBuddyEvent.BUDDY_VARIABLES_UPDATE
 */
export class SetBuddyVariablesRequest {
    constructor(buddyVariables: SFSBuddyVariable[]);
}

/**
 * Creates a new public or private Game Room in the current Zone, including player matching criteria, invitations settings and more.
 *
 * @example
 * <caption>This example creates a new Game Room.</caption>
 * function someMethod()
 * {
 * 	sfs.addEventListener(SFS2X.SFSEvent.ROOM_ADD, onRoomCreated, this);
 * 	sfs.addEventListener(SFS2X.SFSEvent.ROOM_CREATION_ERROR, onRoomCreationError, this);
 *
 * 	// Prepare the settings for a public game
 * 	var settings = new SFS2X.SFSGameSettings("DartsGame");
 * 	settings.maxUsers = 2;
 * 	settings.maxSpectators = 8;
 * 	settings.isPublic = true;
 * 	settings.minPlayersToStartGame = 2;
 * 	settings.notifyGameStarted = true;
 *
 * 	// Set the matching expression to filter users who can join the Room
 * 	settings.playerMatchExpression = new SFS2X.MatchExpression("bestScore", SFS2X.NumberMatch.GREATER_THAN, 100);
 *
 * 	// Set a Room Variable containing the description of the game
 * 	settings.variables = [new SFS2X.SFSRoomVariable("desc", "Darts game, public, bestScore > 100")];
 *
 * 	// Create the game
 * 	sfs.send(new SFS2X.CreateSFSGameRequest(settings));
 * }
 *
 * function onRoomCreated(evtParams)
 * {
 * 	console.log("Room created: " + evtParams.room);
 * }
 *
 * function onRoomCreationError(evtParams)
 * {
 * 	console.log("Room creation failed: " + evtParams.errorMessage);
 * }
 *
 * @see SmartFox#send
 * @see SFSEvent.ROOM_ADD
 * @see SFSEvent.ROOM_CREATION_ERROR
 */
export class CreateSFSGameRequest {
    constructor(settings: SFSGameSettings);
}

/**
 * Replies to an invitation received by the current user.
 *
 * @example
 * <caption>This example receives an invitation and accepts it automatically; in a real case scenario, the application interface usually allows the user choosing to accept or refuse the invitation, or even ignore it.</caption>
 * function someMethod()
 * {
 * 	sfs.addEventListener(SFS2X.SFSEvent.INVITATION, onInvitationReceived, this);
 * 	sfs.addEventListener(SFS2X.SFSEvent.INVITATION_REPLY_ERROR, onInvitationReplyError, this);
 * }
 *
 * function onInvitationReceived(evtParams)
 * {
 * 	// Let's accept this invitation
 * 	sfs.send(new SFS2X.InvitationReplyRequest(evtParams.invitation, SFS2X.InvitationReply.ACCEPT));
 * }
 *
 * function onInvitationReplyError(evtParams)
 * {
 * 	console.log("Failed to reply to invitation due to the following problem: " + evtParams.errorMessage);
 * }
 *
 * @see SmartFox#send
 * @see	InviteUsersRequest
 * @see SFSEvent.INVITATION_REPLY
 * @see SFSEvent.INVITATION_REPLY_ERROR
 */
export class InvitationReplyRequest {
    constructor(invitation: SFSInvitation, invitationReply: number, params?: SFSObject);
}

/**
 * Sends a generic invitation to a list of users.
 *
 * <caption>This example sends an invitation to join the current user in his private Room; the invitation contains a custom message and the Room name and password, so that the recipient clients can join the Room if the users accept the invitation.</caption>
 * function someMethod()
 * {
 * 	sfs.addEventListener(SFS2X.SFSEvent.INVITATION_REPLY, onInvitationReply, this);
 *
 * 	// Choose the invitation recipients
 * 	var friend1 = sfs.userManager.getUserByName("Piggy");
 * 	var friend2 = sfs.userManager.getUserByName("Gonzo");
 *
 * 	// Set the custom invitation details
 * 	var params = new SFS2X.SFSObject();
 * 	params.putUtfString("msg", "Would you like to join me in my private room?");
 * 	params.putUtfString("roomName", "Kermit's room");
 * 	params.putUtfString("roomPwd", "drowssap");
 *
 * 	// Send the invitation; recipients have 20 seconds to reply before the invitation expires
 * 	sfs.send(new SFS2X.InviteUsersRequest([friend1, friend2], 20, params));
 * }
 *
 * function onInvitationReply(evtParams)
 * {
 * 	// If at least one recipient accepted the invitation, make me join my private Room to meet him there
 * 	if (evtParams.reply == SFS2X.InvitationReply.ACCEPT)
 * 	{
 * 		var currentRoom = sfs.lastJoinedRoom;
 *
 * 		if (currentRoom.name != "Kermit's room")
 * 			sfs.send(new SFS2X.JoinRoomRequest("Kermit's room"));
 * 	}
 * 	else
 * 	{
 * 		console.log(evtParams.invitee + " refused the invitation");
 * 	}
 * }
 *
 * @see SmartFox#send
 * @see	InvitationReplyRequest
 * @see SFSEvent.INVITATION
 * @see SFSEvent.INVITATION_REPLY
 */
export class InviteUsersRequest {
    constructor(invitedUsers: SFSUser[], secondsForAnswer: number, params?: SFSObject);
}

/**
 * Sends an invitation to other users/players to join a specific Room.
 *
 * @example
 * <caption>This example invites two more users in the current game.</caption>
 * function inviteMorePeople()
 * {
 * 	sfs.addEventListener(SFS2X.SFSEvent.USER_ENTER_ROOM, onUserJoin, this);
 *
 * 	var invitedUsers = ["Fozzie", "Piggy"];
 * 	var theRoom = sfs.getRoomByName("The Garden");
 *
 * 	var params = new SFS2X.SFSObject();
 * 	params.putUtfString("msg", "You are invited in this Room: " + theRoom.name);
 *
 * 	sfs.send(new SFS2X.JoinRoomInvitationRequest(theRoom, invitedUsers, params));
 * }
 *
 * function onUserJoin(evtParams)
 * {
 * 	console.log("User joined Room: " + evtParams.user.name);
 * }
 *
 * @see SmartFox#send
 * @see	InvitationReplyRequest
 * @see SFSEvent.INVITATION
 * @see SFSEvent.INVITATION_REPLY
 */
export class JoinRoomInvitationRequest {
    constructor(targetRoom: SFSRoom, invitedUserNames: string[], params?: SFSObject, expirySeconds?: number, asSpectator?: boolean);
}

/**
 * Quickly joins the current user in a public game.
 *
 * @example
 * <caption>This example makes the current user join a a Darts game with a "maximum bet" condition.</caption>
 * function someMethod()
 * {
 * 	sfs.addEventListener(SFS2X.SFSEvent.ROOM_JOIN, onRoomJoin, this);
 *
 * 	// Create a matching expression to find a Darts game with a "maxBet" variable less than 100
 * 	var exp = new SFS2X.MatchExpression("type", SFS2X.StringMatch.EQUALS, "darts").and("maxBet", SFS2X.NumberMatch.LESS_THAN, 100);
 *
 * 	// Search and join a public game within the "games" Group, leaving the last joined Room
 * 	sfs.send(new SFS2X.QuickJoinGameRequest(exp, ["games"], sfs.lastJoinedRoom));
 * }
 *
 * function onRoomJoin(evtParams)
 * {
 * 	console.log("Successfully joined Room: " + evtParams.room);
 * }
 *
 * @see SmartFox#send
 * @see SFSEvent.ROOM_JOIN
 */
export class QuickJoinGameRequest {
    constructor(matchExpression: MatchExpression, whereToSearch: SFSRoom[], roomToLeave?: SFSRoom);
}

/**
 * Updates the User position inside an MMORoom.
 *
 * @example
 * <caption>This example changes the position of the user in a 2D coordinates space.</caption>
 * function updatePlayerPosition(px, py)
 * {
 * 	var newPos = new SFS2X.Vec3D(px, py);
 * 	sfs.send(new SFS2X.SetUserPositionRequest(newPos));
 * }
 *
 * @see SmartFox#send
 * @see SFSEvent.PROXIMITY_LIST_UPDATE
 */
export class SetUserPositionRequest {
    constructor(pos: Vec3D, targetRoom?: MMORoom);
}

/**
 * Banishes a user from the server.
 *
 * @example
 * <caption>This example bans the user Jack from the system.</caption>
 * function someMethod()
 * {
 * 	var userToBan = sfs.userManager.getUserByName("Jack");
 * 	sfs.send(new SFS2X.BanUserRequest(userToBan.id));
 * }
 *
 * @see SmartFox#send
 * @see SFSEvent.MODERATOR_MESSAGE
 * @see	SFSUser#privilegeId
 * @see	KickUserRequest
 * @see	BanMode
 */
export class BanUserRequest {
    constructor(userId: number, message?: string, banMode?: number, delaySeconds?: number, durationHours?: number);
}

/**
 * Changes the maximum number of users and/or spectators who can join a Room.
 *
 * @example
 * <caption>This example changes the capacity of an existing Room.</caption>
 * function someMethod()
 * {
 * 	sfs.addEventListener(SFS2X.SFSEvent.ROOM_CAPACITY_CHANGE, onRoomCapacityChanged, this);
 * 	sfs.addEventListener(SFS2X.SFSEvent.ROOM_CAPACITY_CHANGE_ERROR, onRoomCapacityChangeError, this);
 *
 * 	var theRoom = sfs.getRoomByName("Gonzo's Room");
 *
 * 	// Resize the Room so that it allows a maximum of 100 users and zero spectators
 * 	sfs.send(new SFS2X.ChangeRoomCapacityRequest(theRoom, 100, 0));
 * }
 *
 * function onRoomCapacityChanged(evtParams)
 * {
 * 	console.log("The capacity of Room " + evtParams.room.name + " was changed successfully");
 * }
 *
 * function onRoomCapacityChangeError(evtParams)
 * {
 * 	console.log("Room capacity change failed: " + evtParams.errorMessage);
 * }
 *
 * @see SmartFox#send
 * @see	SFSRoom#maxUsers
 * @see	RoomSettings#permissions
 * @see SFSEvent.ROOM_CAPACITY_CHANGE
 * @see SFSEvent.ROOM_CAPACITY_CHANGE_ERROR
 */
export class ChangeRoomCapacityRequest {
    constructor(room: SFSRoom, newMaxUsers: number, newMaxSpect: number);
}

/**
 * Changes the name of a Room.
 *
 * @example
 * <caption>This example renames an existing Room.</caption>
 * function someMethod()
 * {
 * 	sfs.addEventListener(SFS2X.SFSEvent.ROOM_NAME_CHANGE, onRoomNameChanged, this);
 * 	sfs.addEventListener(SFS2X.SFSEvent.ROOM_NAME_CHANGE_ERROR, onRoomNameChangeError, this);
 *
 * 	var theRoom = sfs.getRoomByName("Gonzo's Room");
 * 	sfs.send(new SFS2X.ChangeRoomNameRequest(theRoom, "Gonzo The Great's Room"));
 * }
 *
 * function onRoomNameChanged(evtParams)
 * {
 * 	console.log("Room " + evtParams.oldName + " was successfully renamed to " + evtParams.room.name);
 * }
 *
 * function onRoomNameChangeError(evtParams)
 * {
 * 	console.log("Room name change failed: " + evtParams.errorMessage);
 * }
 *
 * @see SmartFox#send
 * @see	SFSRoom#name
 * @see	RoomSettings#permissions
 * @see SFSEvent.ROOM_NAME_CHANGE
 * @see SFSEvent.ROOM_NAME_CHANGE_ERROR
 */
export class ChangeRoomNameRequest {
    constructor(room: SFSRoom, newName: string);
}

/**
 * Changes the password of a Room.
 *
 * @example
 * <caption>This example changes the password of an existing Room.</caption>
 * function someMethod()
 * {
 * 	sfs.addEventListener(SFS2X.SFSEvent.ROOM_PASSWORD_STATE_CHANGE, onRoomPasswordStateChanged, this);
 * 	sfs.addEventListener(SFS2X.SFSEvent.ROOM_PASSWORD_STATE_CHANGE_ERROR, onRoomPasswordStateChangeError, this);
 *
 * 	var theRoom = sfs.getRoomByName("Gonzo's Room");
 * 	sfs.send(new SFS2X.ChangeRoomPasswordStateRequest(theRoom, "mammamia"));
 * }
 *
 * function onRoomPasswordStateChanged(evtParams)
 * {
 * 	trace("The password of Room " + evtParams.room.name + " was changed successfully");
 * }
 *
 * function onRoomPasswordStateChangeError(evtParams)
 * {
 * 	trace("Room password change failed: " + evtParams.errorMessage);
 * }
 *
 * @see SmartFox#send
 * @see	RoomSettings#permissions
 * @see SFSEvent.ROOM_PASSWORD_STATE_CHANGE
 * @see SFSEvent.ROOM_PASSWORD_STATE_CHANGE_ERROR
 */
export class ChangeRoomPasswordStateRequest {
    constructor(room: SFSRoom, newPass: string);
}

/**
 * Creates a new Room in the current Zone.
 *
 * @example
 * <caption>This example creates a new chat Room.</caption>
 * function someMethod()
 * {
 * 	sfs.addEventListener(SFS2X.SFSEvent.ROOM_ADD, onRoomCreated, this);
 * 	sfs.addEventListener(SFS2X.SFSEvent.ROOM_CREATION_ERROR, onRoomCreationError, this);
 *
 * 	// Create a new chat Room
 * 	var settings = new SFS2X.RoomSettings("My Chat Room");
 * 	settings.maxUsers = 40;
 * 	settings.groupId = "chats";
 *
 * 	sfs.send(new SFS2X.CreateRoomRequest(settings));
 * }
 *
 * function onRoomCreated(evtParams)
 * {
 * 	console.log("Room created: " + evtParams.room);
 * }
 *
 * function onRoomCreationError(evtParams)
 * {
 * 	console.log("Room creation failed: " + evtParams.errorMessage);
 * }
 *
 * @see SmartFox#send
 * @see	RoomSettings
 * @see	MMORoomSettings
 * @see	SFSRoom
 * @see	MMORoom
 * @see SFSEvent.ROOM_ADD
 * @see SFSEvent.ROOM_CREATION_ERROR
 */
export class CreateRoomRequest {
    constructor(settings: RoomSettings, autoJoin?: boolean, roomToLeave?: SFSRoom);
}

/**
 * Sends a command to the server-side Extension attached to the Zone or to a Room.
 *
 * @example
 * <caption>This example sends a command to the Zone Extension; it also handles responses coming from the Extension by implementing the EXTENSION_RESPONSE listener (the same command name is used in both the request and the response).</caption>
 * function someMethod()
 * {
 * 	sfs.addEventListener(SFS2X.SFSEvent.EXTENSION_RESPONSE, onExtensionResponse, this);
 *
 * 	// Send two integers to the Zone extension and get their sum in return
 * 	var params = new SFS2X.SFSObject();
 * 	params.putInt("n1", 26);
 * 	params.putInt("n2", 16);
 *
 * 	sfs.send(new SFS2X.ExtensionRequest("add", params));
 * }
 *
 * function onExtensionResponse(evtParams)
 * {
 * 	if (evtParams.cmd == "add")
 * 	{
 * 		var responseParams = evtParams.params;
 *
 * 		// We expect an integer called "sum"
 * 		console.log("The sum is: " + responseParams.getInt("sum"));
 * 	}
 * }
 *
 * @see SmartFox#send
 * @see SFSEvent.EXTENSION_RESPONSE
 */
export class ExtensionRequest {
    constructor(extCmd: string, params?: SFSObject, room?: SFSRoom);
}

/**
 * Retrieves a list of Rooms from the server which match the specified criteria.
 *
 * @example
 * <caption>This example looks for all the server Rooms whose "country" Room Variable is set to "Sweden".</caption>
 * function someMethod()
 * {
 * 	sfs.addEventListener(SFS2X.SFSEvent.ROOM_FIND_RESULT, onRoomFindResult, this);
 *
 * 	// Create a matching expression to find Rooms with a "country" variable equal to "Sweden"
 * 	var exp = new SFS2X.MatchExpression("country", SFS2X.StringMatch.EQUALS, "Sweden");
 *
 * 	// Find the Rooms
 * 	sfs.send(new SFS2X.FindRoomRequest(exp));
 * }
 *
 * function onRoomFindResult(evtParams)
 * {
 * 	console.log("Rooms found: " + evtParams.rooms);
 * }
 *
 * @see SmartFox#send
 * @see SFSEvent.ROOM_FIND_RESULT
 * @see	MatchExpression
 */
export class FindRoomsRequest {
    constructor(expr: MatchExpression, groupId?: string, limit?: number);
}

/**
 * Retrieves a list of users from the server which match the specified criteria.
 *
 * @example
 * <caption>This example looks for all the users whose "age" User Variable is greater than "29".</caption>
 * function someMethod()
 * {
 * 	sfs.addEventListener(SFS2X.SFSEvent.USER_FIND_RESULT, onUserFindResult, this);
 *
 * 	// Create a matching expression to find users with an "age" variable greater than 29:
 * 	var exp = new SFS2X.MatchExpression("age", SFS2X.NumberMatch.GREATER_THAN, 29);
 *
 * 	// Find the users
 * 	sfs.send(new SFS2X.FindUserRequest(exp));
 * }
 *
 * function onUserFindResult(evtParams)
 * {
 * 	console.log("Users found: " + evtParams.users);
 * }
 *
 * @see SmartFox#send
 * @see SFSEvent.USER_FIND_RESULT
 * @see	MatchExpression
 */
export class FindUsersRequest {
    constructor(expr: MatchExpression, target?: string | SFSRoom, limit?: number);
}

/**
 * Joins the current user in a Room.
 *
 * @example
 * <caption>This example makes the user join an existing Room.</caption>
 * function someMethod()
 * {
 * 	sfs.addEventListener(SFS2X.SFSEvent.ROOM_JOIN, onRoomJoined, this);
 * 	sfs.addEventListener(SFS2X.SFSEvent.ROOM_JOIN_ERROR, onRoomJoinError, this);
 *
 * 	// Join a Room called "Lobby"
 * 	sfs.send(new SFS2X.JoinRoomRequest("Lobby"));
 * }
 *
 * function onRoomJoined(evtParams)
 * {
 * 	console.log("Room joined successfully: " + evtParams.room);
 * }
 *
 * function onRoomJoinError(evtParams)
 * {
 * 	console.log("Room joining failed: " + evtParams.errorMessage);
 * }
 *
 * @see SmartFox#send
 * @see	RoomSettings#events
 * @see SFSEvent.ROOM_JOIN
 * @see SFSEvent.ROOM_JOIN_ERROR
 * @see SFSEvent.USER_ENTER_ROOM
 * @see SFSEvent.USER_COUNT_CHANGE
 */
export class JoinRoomRequest {
    constructor(room: number | string | SFSRoom, password?: string, roomIdToLeave?: number, asSpectator?: boolean);
}

/**
 * Kicks a user out of the server.
 *
 * @example
 * <caption>This example kicks the user Jack from the system.</caption>
 * function someMethod()
 * {
 * 	var userToKick = sfs.userManager.getUserByName("Jack");
 * 	sfs.send(new SFS2X.KickUserRequest(userToKick.id));
 * }
 *
 * @see SmartFox#send
 * @see SFSEvent.MODERATOR_MESSAGE
 * @see	SFSUser#privilegeId
 * @see	BanUserRequest
 */
export class KickUserRequest {
    constructor(userId: number, message?: string, delaySeconds?: number);
}

/**
 * Leaves one of the Rooms joined by the current user.
 *
 * @example
 * <caption>This example makes the user leave the currently joined Room and handles the related event.</caption>
 * function someMethod()
 * {
 * 	sfs.addEventListener(SFS2X.SFSEvent.USER_EXIT_ROOM, onUserExitRoom, this);
 *
 * 	// Leave the last joined Room
 * 	sfs.send(new SFS2X.LeaveRoomRequest());
 * }
 *
 * function onUserExitRoom(evtParams)
 * {
 * 	var room = evtParams.room;
 * 	var user = evtParams.user;
 *
 * 	console.log("User " + user.name + " just left Room " + room.name);
 * }
 *
 * @see SmartFox#send
 * @see SFSEvent.USER_EXIT_ROOM
 * @see SFSEvent.USER_COUNT_CHANGE
 */
export class LeaveRoomRequest {
    constructor(room?: SFSRoom);
}

/**
 * Logs the current user in one of the server Zones.
 *
 * @example
 * <caption>This example performs a login in the "BasicExamples" Zone.</caption>
 * function someMethod()
 * {
 * 	sfs.addEventListener(SFS2X.SFSEvent.LOGIN, onLogin, this);
 * 	sfs.addEventListener(SFS2X.SFSEvent.LOGIN_ERROR, onLoginError, this);
 *
 * 	// Login
 * 	sfs.send(new SFS2X.LoginRequest("FozzieTheBear", "", null, "BasicExamples"));
 * }
 *
 * function onLogin(evtParams)
 * {
 * 	console.log("Login successful!");
 * }
 *
 * function onLoginError(evtParams)
 * {
 * 	console.log("Login failure: " + evtParams.errorMessage);
 * }
 *
 * @see SmartFox#send
 * @see SFSEvent.LOGIN
 * @see SFSEvent.LOGIN_ERROR
 */
export class LoginRequest {
    constructor(userName: string, password?: string, params?: SFSObject, zoneName?: string);
}

/**
 * Logs the user out of the current server Zone.
 *
 * @example
 * <caption>This example performs a logout from the current Zone.</caption>
 * function someMethod()
 * {
 * 	sfs.addEventListener(SFS2X.SFSEvent.LOGOUT, onLogout, this);
 *
 * 	// Logout
 * 	sfs.send(new SFS2X.LogoutRequest());
 * }
 *
 * function onLogout(evtParams)
 * {
 * 	trace("Logout executed!");
 * }
 *
 * @see SmartFox#send
 * @see SFSEvent.LOGOUT
 */
export class LogoutRequest {
    constructor();
}

/**
 * Sends an object containing custom data to all users in a Room, or a subset of them.
 *
 * @example
 * <caption>This example sends the player's avatar movement coordinates and handles the respective event (note: the "myAvatar" instance is supposed to be the user sprite on the stage, while the "getUserAvatar()" method retrieves the sprite of other users' characters).</caption>
 * function someMethod()
 * {
 * 	sfs.addEventListener(SFS2X.SFSEvent.OBJECT_MESSAGE, onObjectMessage, this);
 *
 * 	// Send my movement to all players
 * 	var dataObj = new SFS2X.SFSObject();
 * 	dataObj.putInt("x", myAvatar.x);
 * 	dataObj.putInt("y", myAvatar.y);
 *
 * 	sfs.send(new SFS2X.ObjectMessageRequest(dataObj));
 * }
 *
 * function onObjectMessage(evtParams)
 * {
 * 	var dataObj = evtParams.message;
 *
 * 	var sender = evtParams.sender;
 * 	var avatar = getUserAvatar(sender.id);
 *
 * 	avatar.x = dataObj.get("x");
 * 	avatar.y = dataObj.get("y");
 * }
 *
 * @see SmartFox#send
 * @see SFSEvent.OBJECT_MESSAGE
 */
export class ObjectMessageRequest {
    constructor(object: SFSObject, targetRoom?: SFSRoom, recipients?: SFSUser[]);
}

/**
 * Sends a public chat message.
 *
 * @example
 * <caption>This example sends a public message and handles the respective event.</caption>
 * function someMethod()
 * {
 * 	sfs.addEventListener(SFS2X.SFSEvent.PUBLIC_MESSAGE, onPublicMessage, this);
 *
 * 	// Send a public message
 * 	sfs.send(new SFS2X.PublicMessageRequest("Hello everyone!"));
 * }
 *
 * function onPublicMessage(evtParams)
 * {
 * 	// As messages are forwarded to the sender too,
 * 	// I have to check if I am the sender
 *
 * 	var sender = evtParams.sender;
 *
 * 	if (sender == sfs.mySelf)
 * 		console.log("I said: " + evtParams.message);
 * 	else
 * 		console.log("User " + sender.name + " said: " + evtParams.message);
 * }
 *
 * @see SmartFox#send
 * @see SFSEvent.PUBLIC_MESSAGE
 */
export class PublicMessageRequest {
    constructor(message: string, params?: SFSObject, targetRoom?: SFSRoom);
}

/**
 * Sends a private chat message.
 *
 * @example
 * <caption>This example sends a private message and handles the respective event.</caption>
 * function someMethod()
 * {
 * 	sfs.addEventListener(SFS2X.SFSEvent.PRIVATE_MESSAGE, onPrivateMessage, this);
 *
 * 	// Send a private message to Jack
 * 	var user = sfs.usermanager.getUserByName("Jack");
 * 	sfs.send(new SFS2X.PrivateMessageRequest("Hello my friend!", user.id));
 * }
 *
 * function onPrivateMessage(evtparams
 * {
 * 	// As messages are forwarded to the sender too,
 * 	// I have to check if I am the sender
 *
 * 	var sender = evtParams.sender;
 *
 * 	if (sender != sfs.mySelf)
 * 		console.log("User " + sender.name + " sent me this PM: " + evtParams.message);
 * }
 *
 * @see SmartFox#send
 * @see SFSEvent.PRIVATE_MESSAGE
 */
export class PrivateMessageRequest {
    constructor(message: string, recipientId: number, params?: SFSObject);
}

/**
 * Sends a moderator message to a specific user or to a group of users.
 *
 * @example
 * <caption>This example sends a moderator message to all the users in the last joned Room; it also shows how to handle the related event.</caption>
 * function someMethod()
 * {
 * 	sfs.addEventListener(SFS2X.SFSEvent.MODERATOR_MESSAGE, onModeratorMessage, this);
 *
 * 	// Set the message recipients: all users in the current Room
 * 	var recipMode = new SFS2X.MessageRecipientMode(SFS2X.MessageRecipientMode.TO_ROOM, sfs.lastJoinedRoom);
 *
 * 	// Send the moderator message
 * 	sfs.send(new SFS2X.ModeratorMessageRequest("Hello everybody, I'm the Moderator!", recipMode));
 * }
 *
 * function onModeratorMessage(evtParams)
 * {
 * 	console.log("The moderator sent the following message: " + evtParams.message);
 * }
 *
 * @see SmartFox#send
 * @see SFSEvent.MODERATOR_MESSAGE
 * @see	SFSUser#privilegeId
 * @see	AdminMessageRequest
 */
export class ModeratorMessageRequest {
    constructor(message: string, recipientMode: MessageRecipientMode, params?: SFSObject);
}

/**
 * Sends an administrator message to a specific user or to a group of users.
 *
 * @example
 * <caption>This example sends an administration message to all the users in the Zone; it also shows how to handle the related event.</caption>
 * function someMethod()
 * {
 * 	sfs.addEventListener(SFS2X.SFSEvent.ADMIN_MESSAGE, onAdminMessage, this);
 *
 * 	// Set the message recipients: all users in the Zone
 * 	var recipMode = new SFS2X.MessageRecipientMode(SFS2X.MessageRecipientMode.TO_ZONE, null);
 *
 * 	// Send the administrator message
 * 	sfs.send(new SFS2X.AdminMessageRequest("Hello to everybody from the Administrator!", recipMode));
 * }
 *
 * function onAdminMessage(evtParams)
 * {
 * 	console.log("The administrator sent the following message: " + evtParams.message);
 * }
 *
 * @see SmartFox#send
 * @see SFSEvent.ADMIN_MESSAGE
 * @see	SFSUser#privilegeId
 * @see	ModeratorMessageRequest
 */
export class AdminMessageRequest {
    constructor(message: string, recipientMode: MessageRecipientMode, params?: SFSObject);
}

/**
 * Turns the current user from player to spectator in a Game Room.
 *
 * @example
 * <caption>This example turns the current user from player to spectator in the last joined Game Room.</caption>
 * function someMethod()
 * {
 * 	sfs.addEventListener(SFS2X.SFSEvent.PLAYER_TO_SPECTATOR, onPlayerToSpectatorSwitch, this);
 * 	sfs.addEventListener(SFS2X.SFSEvent.PLAYER_TO_SPECTATOR_ERROR, onPlayerToSpectatorSwitchError, this);
 *
 * 	// Switch player to spectator
 * 	sfs.send(new SFS2X.PlayerToSpectatorRequest());
 * }
 *
 * function onPlayerToSpectatorSwitch(evtParams)
 * {
 * 	console.log("Player " + evtParams.user + " is now a spectator");
 * }
 *
 * function onPlayerToSpectatorSwitchError(evtParams)
 * {
 * 	console.log("Unable to become a spectator due to the following error: " + evtParams.errorMessage);
 * }
 *
 * @see SmartFox#send
 * @see SFSEvent.PLAYER_TO_SPECTATOR
 * @see SFSEvent.PLAYER_TO_SPECTATOR_ERROR
 * @see	SpectatorToPlayerRequest
 */
export class PlayerToSpectatorRequest {
    constructor(targetRoom?: SFSRoom);
}

/**
 * Sets one or more custom Room Variables in a Room.
 *
 * @example
 * <caption>This example sets a number of Room Variables and handles the respective update event.</caption>
 * function someMethod()
 * {
 * 	sfs.addEventListener(SFS2X.SFSEvent.ROOM_VARIABLES_UPDATE, onRoomVarsUpdate, this);
 *
 * 	// Create some Room Variables
 * 	var roomVars = [];
 * 	roomVars.push(new SFS2X.SFSRoomVariable("gameStarted", false));
 * 	roomVars.push(new SFS2X.SFSRoomVariable("gameType", "Snooker"));
 * 	roomVars.push(new SFS2X.SFSRoomVariable("minRank", 10));
 *
 * 	sfs.send(new SFS2X.SetRoomVariablesRequest(roomVars));
 * }
 *
 * function onRoomVarsUpdate(evtParams)
 * {
 * 	var changedVars = evtParams.changedVars;
 * 	var room = evtParams.room;
 *
 * 	// Check if the "gameStarted" variable was changed
 * 	if (changedVars.indexOf("gameStarted") != -1)
 * 	{
 * 		if (room.getVariable("gameStarted").value == true)
 * 			trace("Game started");
 * 		else
 * 			trace("Game stopped");
 * 	}
 * }
 *
 * @see SmartFox#send
 * @see SFSEvent.ROOM_VARIABLES_UPDATE
 */
export class SetRoomVariablesRequest {
    constructor(roomVariables: SFSRoomVariable[], room?: SFSRoom);
}

/**
 * Sets one or more custom User Variables for the current user.
 *
 * @example
 * <caption>This example sets a number of User Variables and handles the respective update event.</caption>
 * function someMethod()
 * {
 * 	sfs.addEventListener(SFS2X.SFSEvent.USER_VARIABLES_UPDATE, onUserVarsUpdate, this);
 *
 * 	// Create some User Variables
 * 	var userVars = [];
 * 	userVars.push(new SFS2X.SFSUserVariable("avatarType", "SwedishCook"));
 * 	userVars.push(new SFS2X.SFSUserVariable("country", "Sweden"));
 * 	userVars.push(new SFS2X.SFSUserVariable("x", 10));
 * 	userVars.push(new SFS2X.SFSUserVariable("y", 5));
 *
 * 	sfs.send(new SFS2X.SetUserVariablesRequest(userVars));
 * }
 *
 * function onUserVarsUpdate(evtParams)
 * {
 * 	var changedVars = evtParams.changedVars;
 * 	var user = evtParams.user;
 *
 * 	// Check if the user changed his x and y user variables
 * 	if (changedVars.indexOf("x") != -1 || changedVars.indexOf("y") != -1)
 * 	{
 * 		// Move the user avatar to a new position
 * 		...
 * 	}
 * }
 *
 * @see SmartFox#send
 * @see SFSEvent.USER_VARIABLES_UPDATE
 */
export class SetUserVariablesRequest {
    constructor(userVariables: SFSUserVariable[]);
}

/**
 * Turns the current user from spectator to player in a Game Room.
 *
 * @example
 * <caption>This example turns the current user from spectator to player in the last joined Game Room.</caption>
 * function someMethod()
 * {
 * 	sfs.addEventListener(SFS2X.SFSEvent.SPECTATOR_TO_PLAYER, onSpectatorToPlayerSwitch, this);
 * 	sfs.addEventListener(SFS2X.SFSEvent.SPECTATOR_TO_PLAYER_ERROR, onSpectatorToPlayerSwitchError, this);
 *
 * 	// Switch spectator to player
 * 	sfs.send(new SFS2X.SpectatorToPlayerRequest());
 * }
 *
 * function onSpectatorToPlayerSwitch(evtParams)
 * {
 * 	console.log("Spectator " + evtParams.user + " is now a player");
 * }
 *
 * function onSpectatorToPlayerSwitchError(evtParams)
 * {
 * 	console.log("Unable to become a player due to the following error: " + evtParams.errorMessage);
 * }
 *
 * @see SmartFox#send
 * @see SFSEvent.SPECTATOR_TO_PLAYER
 * @see SFSEvent.SPECTATOR_TO_PLAYER_ERROR
 * @see	PlayerToSpectatorRequest
 */
export class SpectatorToPlayerRequest {
    constructor(targetRoom?: SFSRoom);
}

/**
 * Subscribes the current user to Room-related events occurring in the specified Group.
 *
 * @example
 * <caption>This example makes the current user subscribe a Group.</caption>
 * function someMethod()
 * {
 * 	sfs.addEventListener(SFS2X.SFSEvent.ROOM_GROUP_SUBSCRIBE, onGroupSubscribed, this);
 * 	sfs.addEventListener(SFS2X.SFSEvent.ROOM_GROUP_SUBSCRIBE_ERROR, onGroupSubscribeError, this);
 *
 * 	// Subscribe the "cardGames" group
 * 	sfs.send(new SFS2X.SubscribeRoomGroupRequest("cardGames"));
 * }
 *
 * function onGroupSubscribed(evtParams)
 * {
 * 	console.log("Group subscribed. The following rooms are now accessible: " + evtParams.newRooms);
 * }
 *
 * function onGroupSubscribeError(evtParams)
 * {
 * 	console.log("Group subscription failed: " + evtParams.errorMessage);
 * }
 *
 * @see SmartFox#send
 * @see	SFSRoom#groupId
 * @see SFSEvent.ROOM_GROUP_SUBSCRIBE
 * @see SFSEvent.ROOM_GROUP_SUBSCRIBE_ERROR
 * @see	UnsubscribeRoomGroupRequest
 */
export class SubscribeRoomGroupRequest {
    constructor(groupId: string);
}

/**
 * Unsubscribes the current user to Room-related events occurring in the specified Group.
 *
 * @example
 * <caption>This example makes the current user unsubscribe a Group.</caption>
 * function someMethod()
 * {
 * 	sfs.addEventListener(SFS2X.SFSEvent.ROOM_GROUP_UNSUBSCRIBE, onGroupUnsubscribed, this);
 * 	sfs.addEventListener(SFS2X.SFSEvent.ROOM_GROUP_UNSUBSCRIBE_ERROR, onGroupUnsubscribeError, this);
 *
 * 	// Unsubscribe the "cardGames" group
 * 	sfs.send(new SFS2X.UnsubscribeRoomGroupRequest("cardGames"));
 * }
 *
 * function onGroupUnsubscribed(evtParams)
 * {
 * 	console.log("Group unsubscribed: " + evtParams.groupId);
 * }
 *
 * function onGroupUnsubscribeError(evtParams)
 * {
 * 	console.log("Group unsubscribing failed: " + evtParams.errorMessage);
 * }
 *
 * @see SmartFox#send
 * @see	SFSRoom#groupId
 * @see SFSEvent.ROOM_GROUP_UNSUBSCRIBE
 * @see SFSEvent.ROOM_GROUP_UNSUBSCRIBE_ERROR
 * @see	SubscribeRoomGroupRequest
 */
export class UnsubscribeRoomGroupRequest {
    constructor(groupId: string);
}

/**
 * The SmartFoxServer error codes and the related error messages.
 *
 * <p>This class class provides a mean of translation between server error codes and the related error messages.</p>
 *
 * <p>Error messages are provided by defualt in the English language but they can be localized and substituted in any other language.
 * The error messages contain special placeholders that are processed at runtime and substituted with runtime data.
 * They are in the form of a number enclosed in curly brackets such as: {0}, {1}, etc.
 * Please make sure you maintain these placeholders while translating the messages.</p>
 *
 * <p>For more informations please check this link: <a href="http://docs2x.smartfoxserver.com/AdvancedTopics/client-error-messages" target="_blank">http://docs2x.smartfoxserver.com/AdvancedTopics/client-error-messages</a></p>
 */
export class SFSErrorCodes {
    constructor();
    /**
     * Sets the text of the error message corresponding to the passed error code.
     *
     * <p><b>NOTE</b>: you have to make sure you maintain all the placeholders while modifying a message.</p>
     *
     * @example
     * <caption>This example shows how to translate error 13 to French language retaining the required placeholders:</caption>
     * function someMethod()
     * {
     * 	SFS2X.SFSErrorCodes.setErrorMessage(13, "Le Groupe demandé n'est pas disponible - Salle: {0}; Groupe: {1}");
     * }
     *
     * @param	{number} code		The code of the error message to be modified.
     * @param	{string} message 	The new error message, including the placeholders for runtime informations.
     */
    static setErrorMessage(code: number, message: string): void;
}

/**
 * <b>Developers never istantiate the <em>LogLevel</em> class</b>: only use its static properties.
 *
 * @class
 * The severity levels of logged messages.
 */
export class LogLevel {
    constructor();
    /**
     * A DEBUG message is a fine-grained information on the client activity.
     *
     * @constant {number}
     * @memberof LogLevel
     */
    static readonly DEBUG: number;
    /**
     * An INFO message contains informations on the standard client activities.
     *
     * @constant {number}
     * @memberof LogLevel
     */
    static readonly INFO: number;
    /**
     * A WARN message is a warning caused by an unexpected behavior of the client.
     * <p>Client operations are not compromised when a warning is raised.</p>
     *
     * @constant {number}
     * @memberof LogLevel
     */
    static readonly WARN: number;
    /**
     * An ERROR message contains informations on a problem that occurred during the client activities.
     * <p>Client operations might be compromised when an error is raised.</p>
     *
     * @constant {number}
     * @memberof LogLevel
     */
    static readonly ERROR: number;
}

/**
 * <b>Developers never istantiate the <em>LoggerEvent</em> class</b>: only use its static properties.
 *
 * <p>The constants contained in this class are used to register the logging event listeners; when an event is dispatched, an object containing the logged message is passed to the listener.</p>
 *
 * @example
 * <caption>This example shows the approach to be implemented to listen to logging events.</caption>
 * var sfs = null;
 *
 * function init()
 * {
 * 	// Create SmartFox client instance
 * 	sfs = new SFS2X.SmartFox();
 *
 * 	...
 *
 * 	// Get a reference to the API internal logger
 * 	var logger = sfs.logger;
 *
 * 	// Enable logger events dispatching
 * 	logger.enableEventDispatching = true;
 *
 * 	// Add event listener to the logger
 * 	logger.addEventListener(SFS2X.LoggerEvent.ERROR, onErrorLogged, this);
 *
 * 	...
 * }
 *
 * function onErrorLogged(evtParams)
 * {
 * 	// Write the error message in a log text area of the application interface
 * 	log.text += "The following error occurred: " + evtParams.message;
 * }
 *
 * @class
 * The event types dispatched by the SmartFoxServer 2X JavaScript API internal logger.
 */
export class LoggerEvent {
    constructor();
    /**
     * The <em>debug</em> event type, dispatched when a low level message is logged by the SmartFoxServer 2X JavaScript API.
     *
     * <table class="jsdoc-details-table">
     * <caption>The object passed to the listener contains the following parameters:</caption>
     * <tr><th>Property</th><th>Type</th><th>Description</th></tr>
     * <tr><td>message</td><td>string</td><td>The logged debug message.</td></tr>
     * </table>
     *
     * @constant {string}
     * @memberof LoggerEvent
     *
     * @see	Logger
     */
    static readonly DEBUG: string;
    /**
     * The <em>info</em> event type, dispatched when a standard informative message is logged by the SmartFoxServer 2X JavaScript API.
     *
     * <table class="jsdoc-details-table">
     * <caption>The object passed to the listener contains the following parameters:</caption>
     * <tr><th>Property</th><th>Type</th><th>Description</th></tr>
     * <tr><td>message</td><td>string</td><td>The logged informative message.</td></tr>
     * </table>
     *
     * @constant {string}
     * @memberof LoggerEvent
     *
     * @see	Logger
     */
    static readonly INFO: string;
    /**
     * The <em>warn</em> event type, dispatched when a warning message is logged by the SmartFoxServer 2X JavaScript API.
     *
     * <table class="jsdoc-details-table">
     * <caption>The object passed to the listener contains the following parameters:</caption>
     * <tr><th>Property</th><th>Type</th><th>Description</th></tr>
     * <tr><td>message</td><td>string</td><td>The logged warning message.</td></tr>
     * </table>
     *
     * @constant {string}
     * @memberof LoggerEvent
     *
     * @see	Logger
     */
    static readonly WARNING: string;
    /**
     * The <em>error</em> event type, dispatched when an error message is logged by the SmartFoxServer 2X JavaScript API.
     *
     * <table class="jsdoc-details-table">
     * <caption>The object passed to the listener contains the following parameters:</caption>
     * <tr><th>Property</th><th>Type</th><th>Description</th></tr>
     * <tr><td>message</td><td>string</td><td>The logged error message.</td></tr>
     * </table>
     *
     * @constant {string}
     * @memberof LoggerEvent
     *
     * @see Logger
     */
    static readonly ERROR: string;
}

/**
 * The internal logger used by the SmartFoxServer 2X client API. This is a singleton class.
 *
 * @see LoggerEvent
 * @see SmartFox#logger
 *
 * @extends EventDispatcher
 */
export class Logger extends EventDispatcher {
    constructor();
    /**
     * Gets and sets the current logging level.
     *
     * <p>Debugging messages with a level lower than this value are not logged.<br/>
     * The available log levels are contained in the <em>LogLevel</em> class. The default value is <em>LogLevel.INFO</em>.</p>
     *
     * @type {number}
     *
     * @see	LogLevel
     */
    level: number;
    /**
     * Indicates whether or not the output of logged messages to the browser's console is enabled.
     *
     * <p>This property has no effect if the "console" object is undefined in the current environment.</p>
     *
     * @type {boolean}
     *
     * @see	#enableEventDispatching
     */
    enableConsoleOutput: boolean;
    /**
     * Indicates whether dispatching of log events is enabled or not.
     *
     * @type {boolean}
     *
     * @see LoggerEvent
     * @see	#enableConsoleOutput
     */
    enableEventDispatching: boolean;
    /**
     * Registers an event listener function that will receive notification of an event.
     *
     * <p>If you no longer need an event listener, remove it by calling the <em>removeEventListener()</em> method, or memory issues could arise.
     * In fact event listeners are not automatically removed from memory.</p>
     *
     * @example
     * <caption>This example shows how to add a number of common event listeners to the SmartFox instance, usually during initialization:</caption>
     * function init()
     * {
     * 	sfs = new SFS2X.SmartFox();
     *
     * 	// Add LoggerEvent listeners
     * 	sfs.logger.addEventListener(SFS2X.LoggerEvent.DEBUG, onDebugMessage, this);
     * 	sfs.logger.addEventListener(SFS2X.LoggerEvent.INFO, onInfoMessage, this);
     * 	sfs.logger.addEventListener(SFS2X.LoggerEvent.WARNING, onWarningMessage, this);
     * 	sfs.logger.addEventListener(SFS2X.LoggerEvent.ERROR, onErrorMessage, this);
     *
     * 	// Add SFSEvent listeners
     * 	sfs.addEventListener(SFS2X.SFSEvent.CONNECTION, onConnection, this);
     * 	sfs.addEventListener(SFS2X.SFSEvent.CONNECTION_LOST, onConnectionLost, this);
     * 	sfs.addEventListener(SFS2X.SFSEvent.LOGIN_ERROR, onLoginError, this);
     * 	sfs.addEventListener(SFS2X.SFSEvent.LOGIN, onLogin, this);
     * 	sfs.addEventListener(SFS2X.SFSEvent.LOGOUT, onLogout, this);
     * 	sfs.addEventListener(SFS2X.SFSEvent.ROOM_JOIN_ERROR, onRoomJoinError, this);
     * 	sfs.addEventListener(SFS2X.SFSEvent.ROOM_JOIN, onRoomJoin, this);
     * }
     *
     * @param	{string} evtType	The type of event to listen to, among those available in the <em>SFSEvent</em>, <em>SFSBuddyEvent</em> and <em>LoggerEvent</em> classes.
     * @param	{function} callback	The listener function that processes the event. This function should accept an object as its only parameter, which in turn contains the event parameters.
     * @param	{object} scope		The object that acts as a context for the event listener: it is the object that acts as a "parent scope" for the callback function, thus providing context (i.e. access to variables and other mehtods) to the function itself.
     *
     * @see		SFSEvent
     * @see		SFSBuddyEvent
     * @see		LoggerEvent
     * @see		#removeEventListener
     */
    addEventListener(evtType: string, callback: (...params: any[]) => any, scope: any): void;
    /**
     * Removes an event listener.
     *
     * @param	{string} evtType	The type of event to remove, among those available in the <em>SFSevent</em>, <em>SFSBuddyEvent</em> and <em>LoggerEvent</em> classes.
     * @param	{function} callback	The listener function to be removed.
     *
     * @see		SFSEvent
     * @see		SFSBuddyEvent
     * @see		#addEventListener
     */
    removeEventListener(evtType: string, callback: (...params: any[]) => any): void;
}

/**
 * <b>Developers never istantiate the <em>ClientDisconnectionReason</em> class</b>: only use its static properties.
 *
 * @class
 * The possible reasons why a disconnection from the server occurred.
 */
export class ClientDisconnectionReason {
    constructor();
    /**
     * Client was disconnected because it was idle for too long.
     * <p>The connection timeout depends on the server settings.</p>
     *
     * @constant {string}
     * @memberof ClientDisconnectionReason
     */
    static readonly IDLE: string;
    /**
     * Client was kicked out of the server.
     * <p>Kicking can occur automatically (i.e. for swearing, if the words filter is active)
     * or due to the intervention of a user with enough privileges (i.e. an administrator or a moderator).</p>
     *
     * @constant {string}
     * @memberof ClientDisconnectionReason
     */
    static readonly KICK: string;
    /**
     * Client was banned from the server.
     * <p>Banning can occur automatically (i.e. for flooding, if the flood filter is active)
     * or due to the intervention of a user with enough privileges (i.e. an administrator or a moderator).</p>
     *
     * @constant {string}
     * @memberof ClientDisconnectionReason
     */
    static readonly BAN: string;
    /**
     * The client manually disconnected from the server.
     * <p>The <em>disconnect()</em> method on the <b>SmartFox</b> class was called.</p>
     *
     * @constant {string}
     * @memberof ClientDisconnectionReason
     */
    static readonly MANUAL: string;
    /**
     * A generic network error occurred, and the client is unable to determine the cause of the disconnection.
     * <p>The server-side log should be checked for possible error messages or warnings.</p>
     *
     * @constant {string}
     * @memberof ClientDisconnectionReason
     */
    static readonly UNKNOWN: string;
}

