//Extract opacity from the selected layer
//
//Part of the VFX-Photoshop-scripts: https://github.com/yarpoplar/VFX-photoshop-scripts
//Copyright (c) 2018 Alex Vinogradov

main();

function main() {
	if (activeDocument.mode == DocumentMode.RGB)
	{
		MaskFromTransparency();
        SelectAndExtractMask();
	}
}

function MaskFromTransparency() {
    var idMk = charIDToTypeID( "Mk  " );
    var desc47 = new ActionDescriptor();
    var idNw = charIDToTypeID( "Nw  " );
    var idChnl = charIDToTypeID( "Chnl" );
    desc47.putClass( idNw, idChnl );
    var idAt = charIDToTypeID( "At  " );
    var ref18 = new ActionReference();
    var idChnl = charIDToTypeID( "Chnl" );
    var idChnl = charIDToTypeID( "Chnl" );
    var idMsk = charIDToTypeID( "Msk " );
    ref18.putEnumerated( idChnl, idChnl, idMsk );
    desc47.putReference( idAt, ref18 );
    var idUsng = charIDToTypeID( "Usng" );
    var idUsrM = charIDToTypeID( "UsrM" );
    var idTrns = charIDToTypeID( "Trns" );
    desc47.putEnumerated( idUsng, idUsrM, idTrns );
    executeAction( idMk, desc47, DialogModes.NO );
}

function SelectAndExtractMask() {
    //Select mask
    var idslct = charIDToTypeID( "slct" );
    var desc36 = new ActionDescriptor();
    var idnull = charIDToTypeID( "null" );
    var ref8 = new ActionReference();
    var idChnl = charIDToTypeID( "Chnl" );
    var idChnl = charIDToTypeID( "Chnl" );
    var idMsk = charIDToTypeID( "Msk " );
    ref8.putEnumerated( idChnl, idChnl, idMsk );
    desc36.putReference( idnull, ref8 );
    var idMkVs = charIDToTypeID( "MkVs" );
    desc36.putBoolean( idMkVs, false );
    executeAction( idslct, desc36, DialogModes.NO );    

    //Select all
    var idsetd = charIDToTypeID( "setd" );
    var desc67 = new ActionDescriptor();
    var idnull = charIDToTypeID( "null" );
    var ref32 = new ActionReference();
    var idChnl = charIDToTypeID( "Chnl" );
    var idfsel = charIDToTypeID( "fsel" );
    ref32.putProperty( idChnl, idfsel );
    desc67.putReference( idnull, ref32 );
    var idT = charIDToTypeID( "T   " );
    var idOrdn = charIDToTypeID( "Ordn" );
    var idAl = charIDToTypeID( "Al  " );
    desc67.putEnumerated( idT, idOrdn, idAl );
    executeAction( idsetd, desc67, DialogModes.NO );

    //Copy
    var idcopy = charIDToTypeID( "copy" );
    executeAction( idcopy, undefined, DialogModes.NO );

    //Delete mask
    var idDlt = charIDToTypeID( "Dlt " );
    var desc70 = new ActionDescriptor();
    var idnull = charIDToTypeID( "null" );
    var ref33 = new ActionReference();
    var idChnl = charIDToTypeID( "Chnl" );
    var idOrdn = charIDToTypeID( "Ordn" );
    var idTrgt = charIDToTypeID( "Trgt" );
    ref33.putEnumerated( idChnl, idOrdn, idTrgt );
    desc70.putReference( idnull, ref33 );
    executeAction( idDlt, desc70, DialogModes.NO );

    //New layer
    var idMk = charIDToTypeID( "Mk  " );
    var desc71 = new ActionDescriptor();
    var idnull = charIDToTypeID( "null" );
    var ref34 = new ActionReference();
    var idLyr = charIDToTypeID( "Lyr " );
    ref34.putClass( idLyr );
    desc71.putReference( idnull, ref34 );
    var idLyrI = charIDToTypeID( "LyrI" );
    desc71.putInteger( idLyrI, 16 );
    executeAction( idMk, desc71, DialogModes.NO );

    //Paste mask
    var idpast = charIDToTypeID( "past" );
    var desc73 = new ActionDescriptor();
    var idAntA = charIDToTypeID( "AntA" );
    var idAnnt = charIDToTypeID( "Annt" );
    var idAnno = charIDToTypeID( "Anno" );
    desc73.putEnumerated( idAntA, idAnnt, idAnno );
    var idAs = charIDToTypeID( "As  " );
    var idPxel = charIDToTypeID( "Pxel" );
    desc73.putClass( idAs, idPxel );
    executeAction( idpast, desc73, DialogModes.NO );
}
