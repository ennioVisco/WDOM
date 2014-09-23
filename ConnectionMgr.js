const HOST = 'localhost';
const PORT = '3306';
const USER = 'root';
const PASSWORD = 'root';
const DATABASE = 'world';

function ConnectionMgr(host, user, password, database, port)
{
	this.host = host;
	this.port = port;
	this.user = user;
	this.password = password;
	this.database = database;
	
}

ConnectionMgr.prototype.getDBStructure = function ()
{
	var sql = "SHOW TABLES IN `" + this.dbname + "`;";
	//result is now taken from GLOBAL variables... (TODO)
	return result;
}


ConnectionMgr.prototype.query = function(sql)
{
	var data = {};
	if(sql =="SELECT * FROM creature_template WHERE entry = 12345 ;")
	{
		data = [{"entry":"1","difficulty_entry_1":"0","difficulty_entry_2":"0","difficulty_entry_3":"0","KillCredit1":"0","KillCredit2":"0","modelid1":"0","modelid2":"0","modelid3":"0","modelid4":"0","name":"Test","subname":"SubTest","IconName":null,"gossip_menu_id":"0","minlevel":"1","maxlevel":"1","exp":"0","faction":"0","npcflag":"0","speed_walk":"1","speed_run":"1.14286","scale":"1","rank":"0","dmgschool":"0","BaseAttackTime":"0","RangeAttackTime":"0","BaseVariance":"1","RangeVariance":"1","unit_class":"0","unit_flags":"0","unit_flags2":"0","dynamicflags":"0","family":"0","trainer_type":"0","trainer_spell":"0","trainer_class":"0","trainer_race":"0","type":"0","type_flags":"0","lootid":"0","pickpocketloot":"0","skinloot":"0","resistance1":"0","resistance2":"0","resistance3":"0","resistance4":"0","resistance5":"0","resistance6":"0","spell1":"0","spell2":"0","spell3":"0","spell4":"0","spell5":"0","spell6":"0","spell7":"0","spell8":"0","PetSpellDataId":"0","VehicleId":"0","mingold":"0","maxgold":"0","AIName":"","MovementType":"0","InhabitType":"3","HoverHeight":"1","HealthModifier":"1","ManaModifier":"1","ArmorModifier":"1","DamageModifier":"1","ExperienceModifier":"1","RacialLeader":"0","questItem1":"0","questItem2":"0","questItem3":"0","questItem4":"0","questItem5":"0","questItem6":"0","movementId":"0","RegenHealth":"1","mechanic_immune_mask":"0","flags_extra":"0","ScriptName":"","VerifiedBuild":"0"}]
	}
	//this.httpGet("ajax.php","1");
	return data[0];
	//alert(sql);
}

ConnectionMgr.prototype.httpGet = function(strURL,entry) 
{
	var xmlHttpReq = false;
	var data = {};
	// Mozilla/Safari
	if (window.XMLHttpRequest) {
		this.xmlHttpReq = new XMLHttpRequest();
	}
	// IE
	else if (window.ActiveXObject) {
		this.xmlHttpReq = new ActiveXObject("Microsoft.XMLHTTP");
	}
	
	this.xmlHttpReq.open('GET', strURL, true);
	this.xmlHttpReq.setRequestHeader('Content-Type', 'application/json');
	this.xmlHttpReq.onreadystatechange = function() {
		if (this.xmlHttpReq.readyState == 4) {
			data = this.xmlHttpReq.responseText;
			alert(this.xmlHttpReq.responseText);
		}
	}
	this.xmlHttpReq.send("?type=c&entry=" + entry);
	return data;
}