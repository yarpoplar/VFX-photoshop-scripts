//Save current image to TGA in location, where PSD file is stored
//If PSD file doesn't exist, script will create it in user selected folder
//
//Part of the VFX-Photoshop-scripts: https://github.com/yarpoplar/VFX-photoshop-scripts
//Copyright (c) 2018 Alex Vinogradov

#target photoshop

main();

function main()
{
	if(!documents.length) 
		return;

	if (app.activeDocument.bitsPerChannel==BitsPerChannelType.SIXTEEN) {
		alert("TGA does not support 16 bit color!"); 
		return;
	}

	var isPSDSaved = true;

	try
	{
	    var Path = decodeURI(activeDocument.path);
	}
	catch(e)
	{
		var Path = Folder.selectDialog("Select folder to save");
		isPSDSaved = false;
		//alert(e); 
		//return;
	}

	if(!Folder(Path).exists)
	{
	    alert(Path + " Does not exist!");
	    return;
	}

	var Name = decodeURI(app.activeDocument.name).replace(/\.[^\.]+$/, '');
	var SaveName = prompt("Type in the name of the file", Name); 
	var saveFile = File(Path + "/" + SaveName + ".tga");
	SaveToTGA(saveFile);
	
	var psdSaveName = isPSDSaved ? Name : SaveName;
	saveFile = File(Path + "/" + psdSaveName + ".psd");
	SaveToPSD(saveFile);
}

function SaveToTGA(saveFile)
{
	targaSaveOptions = new TargaSaveOptions();  
	targaSaveOptions.alphaChannels = true;  
	targaSaveOptions.resolution = TargaBitsPerPixels.THIRTYTWO;  
	activeDocument.saveAs(saveFile, targaSaveOptions, true, Extension.LOWERCASE);
}

function SaveToPSD(saveFile)
{
	psdSaveOptions = new PhotoshopSaveOptions();
	psdSaveOptions.embedColorProfile = true;
	psdSaveOptions.alphaChannels = true;
	activeDocument.saveAs(saveFile, psdSaveOptions, false, Extension.LOWERCASE);
}