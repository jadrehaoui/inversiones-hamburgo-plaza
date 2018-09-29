module.exports = function(table, rows, params){
  var rowsString = "";
  var paramsString = "";
  for(var i = 0; i<rows.length; i++){
    if(i == rows.length - 1){
      rowsString = rowsString + rows[i];
    } else {
      rowsString = rowsString + rows[i] + ",";
    }
  }
  for(var j = 0; j<params.length; j++){
    if(j == params.length - 1){
      paramsString = paramsString +"\""+ params[j]+"\"";
    } else {
      paramsString = paramsString + "\"" + params[j]+"\",";
    }
  }
  return "INSERT INTO "+table+" ("+rowsString+") VALUES ("+paramsString+")";
}
