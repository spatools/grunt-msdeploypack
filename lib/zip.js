var fs = require("fs");
var path = require("path");
var JSZip = require("jszip");
var xml = require("./xml");

function createFolder(rootFolder, dest) {
	if (dest === "." || dest === "..") {
		return rootFolder;
	}
	
	var zipFolder = rootFolder,
		parts = path.normalize(dest).split(/\/\\/);
		
	parts.forEach(function (part) {
		zipFolder = zipFolder.folder(part);
	});

	return zipFolder;
}

function createFile(rootFolder, dest, buffer) {
	var zipFolder = createFolder(rootFolder, path.dirname(dest));
	zipFolder.file(path.basename(dest), buffer);
}

function addEntryToZip(zipFolder, src, dest) {
	var stat = fs.statSync(src);

	if (stat.isDirectory()) {
		return addFolderToZip(zipFolder, src, dest);
	}

	createFile(zipFolder, dest || src, fs.readFileSync(src));
}

function addFolderToZip(zipFolder, src, dest) {
	fs.readdirSync(src)
		.forEach(function (entry) { addEntryToZip(zipFolder, path.join(src, entry), !!dest ? path.join(dest, entry) : null); });
}

function createFromFiles(files) {
	var zip = new JSZip(),
		appFolder = zip.folder("application");

	zip.file("manifest.xml", xml.createManifest());
	zip.file("parameters.xml", xml.createParameters());

	files.forEach(function (file) {
		var dest = file.dest,
			isDestAFile = !!dest && !!path.extname(dest);

		file.src.forEach(function (src) {
			addEntryToZip(appFolder, src, isDestAFile ? dest : !!dest ? path.join(dest, src) : null);
		});
	});

	return zip.generate({ type: "nodebuffer" });
}
exports.createFromFiles = createFromFiles;
