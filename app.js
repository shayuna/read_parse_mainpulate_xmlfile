var fs=require("fs");
var xml2js=require("xml2js");
var parser = new xml2js.Parser();
var sPath="../../sitemap.xml";
fs.readFile(sPath,'utf8',function(err,sData){
//    console.log (sData);
    parser.parseString(sData,function(err,oXML1){
        parser.parseString(sData,function(err,oXML2){
            oXML2.urlset.url=[];
            var arURL1=oXML1.urlset.url;
            var arURL2=oXML2.urlset.url;
            arURL1.forEach(function(oURL1,iIndx){
                var sLoc1=oURL1.loc.toString().replace(/[.]asp.*/ig,".asp"),bIsFound=false;
                sLoc1=sLoc1.replace(/[/][?].*/ig,"/");
                arURL2.forEach(function(oURL2,iIndx){
                    var sLoc2=oURL2.loc.toString().replace(/[.]asp.*/ig,".asp");
                   sLoc2=sLoc2.replace(/[/][?].*/ig,"/");
                    if (sLoc1==sLoc2){
                        bIsFound=true;
                        return false;
                    }
                });
                if (!bIsFound){
                    console.log (sLoc1);
                    oURL1.loc=sLoc1;
                    oXML2.urlset.url.push(oURL1);
                }
            });
            process.exit();
    });


//        var oXML_New = oXML;
  //      oXML_New.urlset.url=[];

//        var arURL=oXML.urlset.url;
  //      console.log (arURL.length);
  //      arURL.forEach(function(oURL,iIndx){
    //        console.log(oURL.loc);
      //  })

        //process.exit();

    });
})
