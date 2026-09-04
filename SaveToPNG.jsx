//Save current image to PNG in location, where PSD file is stored
//If PSD file doesn't exist, script will create it in user selected folder
//PNG export can use a custom resolution without resizing the original PSD
//
//Part of the VFX-Photoshop-scripts: https://github.com/yarpoplar/VFX-photoshop-scripts
//Copyright (c) 2018 Alex Vinogradov

#target photoshop

main();

function main() {
	if(!documents.length)
		return;

	var originalDocument = activeDocument;
	var isPSDSaved = true;

	try {
		var Path = decodeURI(originalDocument.path);
	}
	catch(e) {
		var Path = Folder.selectDialog("Select folder to save");

		if(Path == null)
			return;

		isPSDSaved = false;
	}

	if(!Folder(Path).exists) {
		alert(Path + " Does not exist!");
		return;
	}

	var Name = decodeURI(originalDocument.name).replace(/\.[^\.]+$/, '');
	var currentWidth = Math.round(originalDocument.width.as("px"));
	var currentHeight = Math.round(originalDocument.height.as("px"));

	var exportSettings = ShowExportDialog(Name, currentWidth, currentHeight);
	if(exportSettings == null)
		return;

	var SaveName = exportSettings.name;
	var exportWidth = exportSettings.width;
	var exportHeight = exportSettings.height;

	var saveFile = File(Path + "/" + SaveName + ".png");

	SaveToPNG24Resized(originalDocument, saveFile, exportWidth, exportHeight);

	// Make sure the original PSD is active and save it at its original resolution.
	app.activeDocument = originalDocument;

	var psdSaveName = isPSDSaved ? Name : SaveName;
	saveFile = File(Path + "/" + psdSaveName + ".psd");
	SaveToPSD(saveFile);
}

function ShowExportDialog(defaultName, defaultWidth, defaultHeight) {
	var dialog = new Window("dialog", "Export PNG");
	dialog.orientation = "column";
	dialog.alignChildren = "fill";

	var nameGroup = dialog.add("group");
	nameGroup.add("statictext", undefined, "File name:");
	var nameInput = nameGroup.add("edittext", undefined, defaultName);
	nameInput.characters = 28;

	var sizePanel = dialog.add("panel", undefined, "Export size (px)");
	sizePanel.orientation = "row";
	sizePanel.alignChildren = ["center", "top"];
	sizePanel.spacing = 12;
	sizePanel.margins = [16, 18, 16, 12];

	var presetButtonSize = [58, 24];
	var columnWidth = 132;

	// Width controls.
	var widthColumn = sizePanel.add("group");
	widthColumn.orientation = "column";
	widthColumn.alignChildren = "center";
	widthColumn.preferredSize.width = columnWidth;

	var widthInputGroup = widthColumn.add("group");
	widthInputGroup.orientation = "row";
	widthInputGroup.alignChildren = "center";
	widthInputGroup.alignment = "center";
	widthInputGroup.add("statictext", undefined, "Width:");
	var widthInput = widthInputGroup.add("edittext", undefined, defaultWidth.toString());
	widthInput.characters = 7;

	var widthPresetGroup = widthColumn.add("group");
	widthPresetGroup.orientation = "column";
	widthPresetGroup.alignChildren = "center";
	widthPresetGroup.alignment = "center";
	widthPresetGroup.spacing = 4;

	var widthPresetRow1 = widthPresetGroup.add("group");
	widthPresetRow1.alignment = "center";
	widthPresetRow1.spacing = 4;
	var width128 = widthPresetRow1.add("button", undefined, "128");
	var width256 = widthPresetRow1.add("button", undefined, "256");
	width128.preferredSize = presetButtonSize;
	width256.preferredSize = presetButtonSize;

	var widthPresetRow2 = widthPresetGroup.add("group");
	widthPresetRow2.alignment = "center";
	widthPresetRow2.spacing = 4;
	var width512 = widthPresetRow2.add("button", undefined, "512");
	var width1024 = widthPresetRow2.add("button", undefined, "1024");
	width512.preferredSize = presetButtonSize;
	width1024.preferredSize = presetButtonSize;

	width128.onClick = function() { widthInput.text = "128"; };
	width256.onClick = function() { widthInput.text = "256"; };
	width512.onClick = function() { widthInput.text = "512"; };
	width1024.onClick = function() { widthInput.text = "1024"; };

	// Vertical divider between Width and Height.
	var separator = sizePanel.add("panel");
	separator.alignment = ["center", "fill"];
	separator.preferredSize.width = 1;
	separator.minimumSize.width = 1;
	separator.maximumSize.width = 1;

	// Height controls.
	var heightColumn = sizePanel.add("group");
	heightColumn.orientation = "column";
	heightColumn.alignChildren = "center";
	heightColumn.preferredSize.width = columnWidth;

	var heightInputGroup = heightColumn.add("group");
	heightInputGroup.orientation = "row";
	heightInputGroup.alignChildren = "center";
	heightInputGroup.alignment = "center";
	heightInputGroup.add("statictext", undefined, "Height:");
	var heightInput = heightInputGroup.add("edittext", undefined, defaultHeight.toString());
	heightInput.characters = 7;

	var heightPresetGroup = heightColumn.add("group");
	heightPresetGroup.orientation = "column";
	heightPresetGroup.alignChildren = "center";
	heightPresetGroup.alignment = "center";
	heightPresetGroup.spacing = 4;

	var heightPresetRow1 = heightPresetGroup.add("group");
	heightPresetRow1.alignment = "center";
	heightPresetRow1.spacing = 4;
	var height128 = heightPresetRow1.add("button", undefined, "128");
	var height256 = heightPresetRow1.add("button", undefined, "256");
	height128.preferredSize = presetButtonSize;
	height256.preferredSize = presetButtonSize;

	var heightPresetRow2 = heightPresetGroup.add("group");
	heightPresetRow2.alignment = "center";
	heightPresetRow2.spacing = 4;
	var height512 = heightPresetRow2.add("button", undefined, "512");
	var height1024 = heightPresetRow2.add("button", undefined, "1024");
	height512.preferredSize = presetButtonSize;
	height1024.preferredSize = presetButtonSize;

	height128.onClick = function() { heightInput.text = "128"; };
	height256.onClick = function() { heightInput.text = "256"; };
	height512.onClick = function() { heightInput.text = "512"; };
	height1024.onClick = function() { heightInput.text = "1024"; };

	var buttonGroup = dialog.add("group");
	buttonGroup.alignment = "right";
	var cancelButton = buttonGroup.add("button", undefined, "Cancel", {name: "cancel"});
	var okButton = buttonGroup.add("button", undefined, "Export", {name: "ok"});

	dialog.defaultElement = okButton;
	dialog.cancelElement = cancelButton;
	nameInput.active = true;

	if(dialog.show() != 1)
		return null;

	var saveName = nameInput.text;
	var width = parseInt(widthInput.text, 10);
	var height = parseInt(heightInput.text, 10);

	if(saveName == null || saveName.replace(/^\s+|\s+$/g, "") == "") {
		alert("Please enter a file name.");
		return null;
	}

	if(isNaN(width) || isNaN(height) || width <= 0 || height <= 0) {
		alert("Width and height must be positive whole numbers.");
		return null;
	}

	return {
		name: saveName,
		width: width,
		height: height
	};
}

function SaveToPNG24Resized(sourceDocument, saveFile, width, height) {
	var exportDocument = null;

	try {
		// Resize a temporary duplicate so the source PSD remains untouched.
		exportDocument = sourceDocument.duplicate();
		app.activeDocument = exportDocument;

		if(Math.round(exportDocument.width.as("px")) != width ||
		   Math.round(exportDocument.height.as("px")) != height) {
			exportDocument.resizeImage(
				UnitValue(width, "px"),
				UnitValue(height, "px"),
				null,
				ResampleMethod.BICUBIC
			);
		}

		var pngSaveOptions = new PNGSaveOptions;
		pngSaveOptions.compression = 9;
		pngSaveOptions.interlaced = false;

		exportDocument.saveAs(saveFile, pngSaveOptions, true, Extension.LOWERCASE);
	}
	finally {
		if(exportDocument != null) {
			try {
				exportDocument.close(SaveOptions.DONOTSAVECHANGES);
			}
			catch(closeError) {}
		}

		app.activeDocument = sourceDocument;
	}
}

function SaveToPSD(saveFile) {
	var psdSaveOptions = new PhotoshopSaveOptions();

	psdSaveOptions.embedColorProfile = true;
	psdSaveOptions.alphaChannels = true;

	activeDocument.saveAs(saveFile, psdSaveOptions, false, Extension.LOWERCASE);
}
