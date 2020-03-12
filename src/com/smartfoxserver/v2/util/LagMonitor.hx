package com.smartfoxserver.v2.util;

import com.smartfoxserver.v2.SmartFox;
import com.smartfoxserver.v2.core.SFSEvent;
import com.smartfoxserver.v2.requests.PingPongRequest;
import openfl.utils.Timer;

import flash.events.Event;
import flash.events.EventDispatcher;
import flash.events.TimerEvent;
//import flash.utils.Timer;

/**
 * @private
 */
class LagMonitor extends EventDispatcher
{
	private var _lastReqTime:Float;
	private var _valueQueue:Array<Float>;
	private var _interval:Float;
	private var _queueSize:Int;
	private var _thread:Timer;
	private var _sfs:SmartFox;
	
	public function new(sfs:SmartFox, interval:Int=4, queueSize:Int=10)
	{
		super();
		
		if(interval<1)
			interval=1;
		
		_sfs=sfs;
		_valueQueue=[];
		_interval=interval;
		_queueSize=queueSize;
		_thread=new Timer(interval * 1000);
		_thread.addEventListener(TimerEvent.TIMER, threadRunner);	
	}
	
	public function start():Void
	{
		if(!isRunning)
			_thread.start();
	}
	
	public function stop():Void
	{
		if(isRunning)
			_thread.stop();
	}
	
	public function destroy():Void
	{
		if(_thread !=null)
		{
			stop();
			_thread.removeEventListener(TimerEvent.TIMER, threadRunner);
			_thread=null;
			_sfs=null;
		}
	}
	
	public var isRunning(get, null):Bool;
 	private function get_isRunning():Bool
	{
		return _thread.running;
	}
	
	public function onPingPong():Float
	{
		// Calculate lag
		var lagValue:Float= haxe.Timer.stamp() - _lastReqTime;
		
		// Remove older value
		if(_valueQueue.length>=_queueSize)
			_valueQueue.shift();
				
		// Add new lag
		_valueQueue.push(lagValue);
			
		return averagePingTime;
	}
	
	public var lastPingTime(get, null):Float;
 	private function get_lastPingTime():Float
	{
		if(_valueQueue.length>0)
			return _valueQueue[_valueQueue.length -1];
		else
			return 0;
	}
	
	public var averagePingTime(get, null):Float;
 	private function get_averagePingTime():Float
	{
		if(_valueQueue.length==0)
			return 0;
		
		var lagAverage:Float=0;
		for(lagValue in _valueQueue)
			lagAverage += lagValue;
				
		return lagAverage / _valueQueue.length;
	}
	
	
	//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
	
	private function threadRunner(evt:Event):Void
	{
		_lastReqTime=haxe.Timer.stamp();
		_sfs.send(new PingPongRequest());
	}
}