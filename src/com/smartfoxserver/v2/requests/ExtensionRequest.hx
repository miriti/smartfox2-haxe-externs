package com.smartfoxserver.v2.requests;

#if html5
@:native('SFS2X.ExtensionRequest') extern class ExtensionRequest {
	public function new(extCmd:String, params:Dynamic = null, room:Dynamic = null);
}
#else
class ExtensionRequest {}
#end
