//Combines selected layers to R+G+B mask
//
//Part of the VFX-Photoshop-scripts: https://github.com/yarpoplar/VFX-photoshop-scripts
//Copyright (c) 2018 Alex Vinogradov

main();

function main() {
	if (activeDocument.mode == DocumentMode.RGB)
	{
		var selectedLayers = getSelectedLayers();

		for (var i = 0; i < selectedLayers.length; i++)
		{
			selectedLayers[i].visible = false;
		}
		
		var layers = activeDocument.artLayers;
		var newLayer = layers.add();

		fillColor = new SolidColor;
		fillColor.rgb.red = 0;
		fillColor.rgb.green = 0;
		fillColor.rgb.blue = 0;
		activeDocument.selection.fill(fillColor);
		newLayer.visible = false;

		var iMax = selectedLayers.length < 3 ? selectedLayers.length : 3;

		for (var i = 0; i < iMax; i++)
		{
			activeDocument.activeLayer = selectedLayers[i];
			activeDocument.selection.selectAll();
			activeDocument.selection.copy();  
			activeDocument.selection.deselect();
			activeDocument.activeLayer = newLayer;
			activeDocument.activeChannels = [activeDocument.channels[i]];
			activeDocument.paste();
			selectedLayers[i].visible = false;
		}

		activeDocument.selection.deselect();
	}
}

function getSelectedLayers() {
  var resultLayers=new Array();

	try {
		var idGrp = stringIDToTypeID( "groupLayersEvent" );
		var descGrp = new ActionDescriptor();
		var refGrp = new ActionReference();

		refGrp.putEnumerated(charIDToTypeID( "Lyr " ),charIDToTypeID( "Ordn" ),charIDToTypeID( "Trgt" ));
		descGrp.putReference(charIDToTypeID( "null" ), refGrp );
		executeAction( idGrp, descGrp, DialogModes.NO );

		for (var ix=0; ix < app.activeDocument.activeLayer.layers.length; ix++)
		{
			resultLayers.push(app.activeDocument.activeLayer.layers[ix]);
		}

		var id8 = charIDToTypeID( "slct" );
		var desc5 = new ActionDescriptor();
		var id9 = charIDToTypeID( "null" );
		var ref2 = new ActionReference();
		var id10 = charIDToTypeID( "HstS" );
		var id11 = charIDToTypeID( "Ordn" );
		var id12 = charIDToTypeID( "Prvs" );

		ref2.putEnumerated( id10, id11, id12 );
		desc5.putReference( id9, ref2 );
		executeAction( id8, desc5, DialogModes.NO );
	} 
	catch (e) {
		alert(e);
	}

	return resultLayers;
}   

$.writeln(getSelectedLayers());