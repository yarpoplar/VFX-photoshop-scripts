//Creates transparent layer from grayscale layer, where black color is transparency and white color is white pixels
//
//Part of the VFX-Photoshop-scripts: https://github.com/yarpoplar/VFX-photoshop-scripts
//Copyright (c) 2018 Alex Vinogradov

if (app.documents.length) {	
	activeDocument.selection.selectAll();
	activeDocument.selection.copy();

	activeDocument.layers[0].visible = false;
	
	var doc = activeDocument;
	var layers = doc.artLayers;
	var newLayer = layers.add();

	doc.activeLayer = newLayer;

	fillColor = new SolidColor;
	fillColor.rgb.red = 255;
	fillColor.rgb.green = 255;
	fillColor.rgb.blue = 255;

	activeDocument.selection.fill(fillColor);
	makeLayerMask('RvlA');
	SwitchToMask();

	activeDocument.paste(true);
	applyLayerMask();

	activeDocument.selection.deselect();
}

function SwitchToMask() {
	var idSlct = charIDToTypeID("slct");
	var idNull = charIDToTypeID("null");
	var idChnl = charIDToTypeID("Chnl");
	var idChnl = charIDToTypeID("Chnl");
	var idMsk = charIDToTypeID("Msk ");
	var idMkVs = charIDToTypeID("MkVs");

	var switchToMaskDescriptor = new ActionDescriptor();  
	var actionRef = new ActionReference();  

	actionRef.putEnumerated( idChnl, idChnl, idMsk );  
	switchToMaskDescriptor.putReference( idNull, actionRef );  
	switchToMaskDescriptor.putBoolean( idMkVs, true );  

	executeAction( idSlct, switchToMaskDescriptor, DialogModes.NO );  
}  

function makeLayerMask(maskType) {
	if( maskType == undefined) maskType = 'RvlS' ; //from selection
	//requires a selection 'RvlS'  complete mask 'RvlA' otherThanSelection 'HdSl'
		var desc140 = new ActionDescriptor();

		desc140.putClass( charIDToTypeID('Nw  '), charIDToTypeID('Chnl') );

		var ref51 = new ActionReference();

		ref51.putEnumerated(charIDToTypeID('Chnl'), charIDToTypeID('Chnl'), charIDToTypeID('Msk '));
		desc140.putReference(charIDToTypeID('At  '), ref51 );
		desc140.putEnumerated(charIDToTypeID('Usng'), charIDToTypeID('UsrM'), charIDToTypeID(maskType));

		executeAction( charIDToTypeID('Mk  '), desc140, DialogModes.NO );
}

function applyLayerMask() {
	var id1949 = charIDToTypeID( "Dlt " );
	var desc398 = new ActionDescriptor();
	var id1950 = charIDToTypeID( "null" );
	var ref291 = new ActionReference();
	var id1951 = charIDToTypeID( "Chnl" );
	var id1952 = charIDToTypeID( "Chnl" );
	var id1953 = charIDToTypeID( "Msk " );

	ref291.putEnumerated( id1951, id1952, id1953 );
	desc398.putReference( id1950, ref291 );

	var id1954 = charIDToTypeID( "Aply" );

	desc398.putBoolean( id1954, true );

	executeAction( id1949, desc398, DialogModes.NO );
}