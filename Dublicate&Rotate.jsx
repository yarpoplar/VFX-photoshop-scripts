//Create dublicates of selected layer and applies desired rotation to each of them in arithmetic progression
//For example, if Angle = 90 and Copies = 3, then result angles of copies will be 90, 180, 270.
//
//Part of the VFX-Photoshop-scripts: https://github.com/yarpoplar/VFX-photoshop-scripts
//Copyright (c) 2018 Alex Vinogradov

#target photoshop

var mainWindow = new Window ("dialog", "Dublicate & Rotate", undefined, {closeButton: true});
mainWindow.orientation = "column";
mainWindow.alignChildren = "left";

var inputGroup1 = mainWindow.add("group");
inputGroup1.add("statictext", undefined, "Angle:");
var angleRotText = inputGroup1.add("edittext", undefined, "90");
    angleRotText.characters = 5;
    angleRotText.active = true;

var inputGroup2 = mainWindow.add("group");
inputGroup2.add("statictext", undefined, "Copies:");
var copiesNumText = inputGroup2.add("edittext", undefined, "3");
    copiesNumText.characters = 5;
    copiesNumText.active = true;

var buttonGroup = mainWindow.add("group");
var buttonGroup = mainWindow.add ("group");
    buttonGroup.alignment = "right";

var btnOK = buttonGroup.add ("button", undefined, "OK");
var btnCancel = buttonGroup.add ("button", undefined, "Cancel");

btnOK.onClick = function () {
    DublicateAndRotate(angleRotText.text, copiesNumText.text)
}

btnCancel.onClick = function () {
    return mainWindow.close();
}

function DublicateAndRotate(angle, numOfCopies) {
    for (var i = numOfCopies - 1; i >= 0; i--) {
        var oldLayer = activeDocument.activeLayer;
        var newLayer = oldLayer.duplicate();
        //oldLayer.visible = false;
        newLayer.rotate(angle);
        activeDocument.activeLayer = newLayer;
    }
    
    return mainWindow.close();
}

mainWindow.show();