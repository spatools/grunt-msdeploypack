var 
	os = require("os"),
	xmlbuilder = require("xmlbuilder");
	
function createSystemInfo() {
	var root = {
		systemInfo: {
			"@osVersion": os.release().split(".").slice(0, 2).join("."),
			"@winDir": process.env.windir,
			"@machineName": os.hostname(),
			"@processorArchitecture": process.arch,
			"@msdeployVersion": "1.0",
			"@buildVersion": "7.1.1955.0",
		
			iisSystemInfo: {
				"@issMajorVersion": 0,
				"@issMinorVersion": 0,
				
				aspNetVersionInfo: {
					aspNetVersion: {
						"@version": "4.0.30319.0"
					}
				}
			}
		}
	};
	
	return xmlbuilder.create(root).toString({ pretty: true, indent: "    ", newline: os.EOL });
}
exports.createSystemInfo = createSystemInfo;

function createParameters() {
	var root = {
		parameters: {
			parameter: {
				"@name": "ISS Web Application Name",
				"@defaultValue": "Default Web Site/Deploy",
				"@tags": "IisApp",
				
				"#list": [
					{ parameterEntry: { "@kind": "ProviderPath", "@scope": "IisApp", "@match": "^application$" } },
					{ parameterEntry: { "@kind": "ProviderPath", "@scope": "setAcl", "@match": "^application$" } }
				]
			}
		}
	};
	
	return xmlbuilder.create(root).toString({ pretty: true, indent: "    ", newline: os.EOL });
}
exports.createParameters = createParameters;

function createManifest() {
	var root = {
		"MSDeploy.iisApp": [
			{ iisApp: {
				"@path": "application"
			} },
			{ setAcl: {
				"@path": "application",
				"@setAclAccess": "Read",
				"@setAclUser": ""
			} },
			{ setAcl: {
				"@path": "application",
				"@setAclAccess": "Read",
				"@setAclUser": "anonymousAuthenticationUser"
			} }
		]
			
	};
	
	return xmlbuilder.create(root).toString({ pretty: true, indent: "    ", newline: os.EOL });
}
exports.createManifest = createManifest;

function createArchive() {
	var root = {
		sitemanifest: {
			"@MSDeploy.ObjectResolver.createApp": "Microsoft.Web.Deployment.CreateApplicationObjectResolver",
			"@MSDeploy.ObjectResolver.dirPath": "Microsoft.Web.Deployment.DirPathObjectResolver",
			"@MSDeploy.ObjectResolver.filePath": "Microsoft.Web.Deployment.FilePathObjectResolver",
			
			"#list": [
				{ issApp: {
					"@path": "C:\\Project",
					"@MSDeploy.path": "2",
					"@MSDeploy.MSDeployLinkName": "Child1",
					"@MSDeploy.MSDeployKeyAttributeName": "path",
					"@MSDeploy.MSDeployProviderOptions": "H4sIAAAAAAAEAE2QTU/DMAyGO9gCE1x24N4fUEUd3QZCqgSMGwKqqYIDuaStx7KlSZSPTv31kEhj4MPrV5Htx3E0iKLo20fIIS5PvHy+sFpLI9cW76HCDSgu+xaETeJ30IZJkd/gKU5xmsRLx63TkAtwVlOexIWrOKufoS/lDkSeTat1djtf0CZbzCCbjwLp+g/w4QFPR8A/W2jZsQb0m7IeaIZhOXV4e6UtDBW1m5HwzqCOcgdmMEAorI9OgzBmHpRCoe9+eUf8uC3U1pBSunrD1j15dIw3BBpmpSay2pIVcKAGSEHrHf065rJV45GfMkZeJsGFL6AzL1ctFb6iWTlhWQuH40zQb825l2E3w+nFD2R2ZbJpAQAA",
					
					"#list": [
						{ createApp: {
							"@path": "C:\\Project",
							"@MSDeploy.path": "2",
							"@isDest": "AA==",
							"@MSDeploy.isDest.Type": "Microsoft.Web.Deployment.DeploymentObjectBooleanAttributeValue",
							"@managedRuntimeVersion": "v4.0",
							"@MSDeploy.managedRuntimeVersion": "2",
							"@enable32BitAppOnWin64": "",
							"@MSDeploy.enable32BitAppOnWin64": "2",
							"@managedPipelineMode": "",
							"@MSDeploy.managedPipelineMode": "2",
							"@applicationPool": "",
							"@MSDeploy.applicationPool": "1",
							"@appExists": "True",
							"@MSDeploy.appExists": "1",
							"@MSDeploy.MSDeployLinkName": "createApp",
							"@MSDeploy.MSDeployKeyAttributeName": "path"
						} },
						{ contentPath: {
							"@path": "C:\\Project",
							"@MSDeploy.path": "2",
							"@MSDeploy.MSDeployLinkName": "contentPath",
							"@MSDeploy.MSDeployProviderOptions": "H4sIAAAAAAAEAE2Q30rDMBTGW10DY97sDfoApWzWTREK4rwTZ5GyXZibNDl12dKk5M+kT68JlOm5+M5HOOf7HRLFURT9+Ao91M2Vl883TrUyqrX5NzQ5g16ooQNps3QH2nAly/t8mS/yRZZunLBOQynBWU1EllauEZy+wlCrE8iyWDZt8bBaE1as76BYJYF0+wfYe8DLBfDPVlqdOQP93lsPNJNwXD++bUkHk57YQyK9M+hMhAMTxwiF89G1lxlV0oYYP4XC8tPmEfvMI1BrcK0cPfB2wM+OC4aBcas0Vs0Rf4AAYgBXhJ7I16XXXT9NfMoUeZkn42/N0Whmv/DtWkJJAQAA",
							
							"MSDeploy.dirPath": {
								"@path": "C:\\Project",
								"@MSDeploy.MSDeployLinkName": "contentPath",
							}														
						} }
					]
				} },
				
				{ setAcl: {
					"@path": "C:\\Project",
					"@MSDeploy.path": "2",
					"@isDest": "AA==",
					"@MSDeploy.isDest.Type": "Microsoft.Web.Deployment.DeploymentObjectBooleanAttributeValue",
					"@setAclUser": "",
					"@MSDeploy.setAclUser": "1", 
					"@setAclAccess": "Read", 
					"@MSDeploy.setAclAccess": "1", 
					"@MSDeploy.MSDeployLinkName": "Child2", 
					"@MSDeploy.MSDeployKeyAttributeName": "path", 
					"@MSDeploy.MSDeployProviderOptions": "H4sIAAAAAAAEAE2Pz07DMAzGW1gDE1zGE/QBqmqjbCCkSsB2Q7BqquBALmnqsmxpE+XPpj49JIINfPj8ybL9s4MwCIIvFz77uDxx8vHCqBJaNCbdQ5XWILnoW+hMEr+B0kx0+W06ScfpOInnlhurIO/AGkV4Ehe24ow+Q1+KLXR5Nqma7G46I3U2u4FsGnnS9R/g3QEWR8A/WyixYzWopTQOqAf+OPlbeyUtDCQx66hzTqMd4RZ0GCLkz0enXjSYR8qRn3uY32O3bgPUaFwKS9es6fGTZbzGUDMjFBbVBq+AA9GAC0K35POYy1YOI7dliJyMvPMvoDMnVz+QFWhhFYWylzBCh4ZzP7NgylGF6i++AQKKXt5rAQAA"
				} },
				
				{ setAcl: {
					"@path": "C:\\Project",
					"@MSDeploy.path": "2",
					"@isDest": "AA==",
					"@MSDeploy.isDest.Type": "Microsoft.Web.Deployment.DeploymentObjectBooleanAttributeValue",
					"@setAclUser": "anonymousAuthenticationUser",
					"@MSDeploy.setAclUser": "1", 
					"@setAclAccess": "Read", 
					"@MSDeploy.setAclAccess": "1", 
					"@MSDeploy.MSDeployLinkName": "Child3", 
					"@MSDeploy.MSDeployKeyAttributeName": "path", 
					"@MSDeploy.MSDeployProviderOptions": "H4sIAAAAAAAEAE2PTU8CMRCGF4Uq6AWvXvgBZAOuoDEhkY+bUQlZ9WAv3e4ghW676Qdmf71OQdE5vPORzPvMRLUoir4wQg5xfoTy/ii40VYvXfwJWZxDKXVVgHLdzisYK7Qa3cT9uBf3up2pl84bGCnwzjDZ7cx9JgV/gCrVG1CjpJ8tk9vBkOXJ8BqSQSOQrv4AbwiYHQD/yrnRW5GDeS4dAm09HFf+zJ5YAfWSuVVDYWXJlkkPtlYjJJxPjoNYcGMuSdi7n95RtFsDd5am2vOVWFZ04oXMKeTCaUN1tqYLkMAs0DnjG/ZxyGlRNhvo0iQo7VDtICcorT3kxYIhp9hf7PsFWO0Nh7QqoU1+F5ool0xpVRXa27F3K/xScBbe2zm0AmQmDJ6pTXX2Dfhwt0ScAQAA"
				} }
			]
		}
	};
	
var test = { setAcl: {
		"@path": "C:\\Project",
		"@MSDeploy.path": "2",
		"@isDest": "AA==",
		"@MSDeploy.isDest.Type": "Microsoft.Web.Deployment.DeploymentObjectBooleanAttributeValue",
		"@setAclUser": "anonymousAuthenticationUser",
		"@MSDeploy.setAclUser": "1", 
		"@setAclAccess": "Read", 
		"@MSDeploy.setAclAccess": "1", 
		"@MSDeploy.MSDeployLinkName": "Child3", 
		"@MSDeploy.MSDeployKeyAttributeName": "path", 
	} };
	
	var str = xmlbuilder.create(test).toString({ pretty: true, indent: "    ", newline: os.EOL });
	var sha1 = require("crypto").createHash("sha512");
	sha1.update(str);
	return sha1.digest("base64");
	
	return xmlbuilder.create(root).toString({ pretty: true, indent: "    ", newline: os.EOL });
}
exports.createArchive = createArchive;
