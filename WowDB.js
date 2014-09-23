const TYPE_CREATURE;
const TYPE_GAMEOBJECT;
const TYPE_OTHER;

//DB Object constructor
function WoWDB (connection)
{
	this.connection = connection;
	this.getStructure(this.connection);
	if(this.structure)
	{
		this.creature = this.structure.creature;
		this.gameObject = this.structure.gameObject;
	}
}

WoWDB.prototype.getStructure = function (connection) 
{
	this.structure = {"creature":[{"tableName":"","alias":""}],"gameObject":[{"tableName":"","alias":""}]};
	var tableList = this.connection.getDBStructure();
	for(i = 0; i < tableList.length; i++)
	{
		//Creating Creature Structure
		if(tableList[i].substring(0, 9) == "creature_")
		{
			var item = {"tableName":tableList[i], "alias":tableList[i].substring(9)};
			this.structure.creature.push(item);
		}
		
		//Creating GameObject Structure
		if(tableList[i].substring(0, 11) == "gameobject_")
		{
			var item = {"tableName":tableList[i], "alias":tableList[i].substring(11)};
			this.structure.gameObject.push(item);
		}
	}
	return structure;
}

WoWDB.prototype.getObjectFromField = function (object, field, entry)
{
	var data = {};
	if(object == TYPE_CREATURE)
		data = this.getCreature(field, entry);
	else if (object == TYPE_GAMEOBJECT)
		data = this.getGameObject(field, entry);
	else
	{
		data = "NULL"; // TO DO
	}
	
	return data;
}

WoWDB.prototype.getCreature = function (field, entry)
{
	var data = {};
	this.creature.forEach(function(table){
							data[table.alias] = this.connection.query("SELECT * FROM "+ table.tableName + " WHERE " + field + " = " + entry + " ;");
						 });
	return data;
}

WoWDB.prototype.getGameObject = function (field, entry)
{
	var data = {};
	this.gameObject.forEach(function(table){
							data[table.alias] = this.connection.query("SELECT * FROM "+ table.tableName +" WHERE " + field + " = " + entry + " ;");
						 });
	return data;
}

WoWDB.prototype.getCreatureFromEntry = function (entry)
{
	var data = this.getCreature("entry", entry);
	return data;
}

WoWDB.prototype.getGameObjectFromEntry = function (entry)
{
	var data = this.getGameObject("entry", entry);
	return data;
}



