﻿(function (thisObj) {  main();  function main() {    var doc = app.activeDocument;    var sels = doc.selection;    var pars = [];    var parstyles = [];    var pg = null;    var ftf = null;    for (var s = 0; s < sels.length; s++) {      if (sels[s] instanceof TextFrame) {        if (ftf === null) {          ftf = sels[s];          pg = ftf.parentPage;        }        for (var p = 0; p < sels[s].paragraphs.length; p++) {          pars.push(sels[s].paragraphs[p].contents);          parstyles.push(sels[s].paragraphs[p].appliedParagraphStyle);        }      }    }    if (ftf === null) {      return;    }    var newtf = pg.textFrames.add({      geometricBounds: ftf.geometricBounds,      contents: pars.join("\r")    });    newtf.fit(FitOptions.FRAME_TO_CONTENT);    newtf.geometricBounds[3] = ftf.geometricBounds[3];    for (var np = 0; np < newtf.paragraphs.length; np++) {      newtf.paragraphs[np].appliedParagraphStyle = parstyles[np];    }    marginfitting(newtf);  }  function marginfitting(obj) {    // var sel = app.activeDocument.selection;    // if(sel.length < 1) {    //     alert("no selection");    //     return;    //     }    var page = obj.parentPage;    var margPrefs = page.marginPreferences;    var columns = margPrefs.columnsPositions;    //~     alert( columns[1] + margPrefs.left  - columns[0]);    var mwidth = columns[1] - columns[0]; //  62.333 ;    fit_to_margins(obj, mwidth);    function fit_to_margins(obj, newwidth) {      // for(var i =0;i < sel.length;i++){      var curbnds = obj.geometricBounds;      obj.geometricBounds = [curbnds[0], curbnds[1], curbnds[2], curbnds[1] +        newwidth      ];      // }    }  }})(this);