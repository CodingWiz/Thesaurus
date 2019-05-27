// Objet de la grille qui contient 
// sa postion, texture ...etc 
function object_Grille() {
    var object_Grille = {};

    object_Grille.objgl = null;
    
    object_Grille.TEX = null;
    object_Grille.strType = null;
    
    object_Grille.PosGrilleX = null;
    object_Grille.PosGrilleZ = null;

    /*object_Grille.PosMinX = null;
    object_Grille.PosMinY = null;
    object_Grille.PosMinZ = null;

    object_Grille.PosMaxX = null;
    object_Grille.PosMaxY = null;
    object_Grille.PosMaxZ = null;*/

    object_Grille.PosX = null;
    object_Grille.PosY = null;
    object_Grille.PosZ = null;

    object_Grille.obj3D = null;

    object_Grille.visible = true;

    return object_Grille;
}

// fonction qui manipule les donnees
// de la grille
function fct_Grille() {
    var fct_Grille = {};

    fct_Grille.arrOuvreursMurs = [];
    fct_Grille.arrFleches = [];
    fct_Grille.arrTeleTransporteurs = [];
    fct_Grille.arrTeleRecepteurs = [];

    fct_Grille.obj3DSol = null;
    fct_Grille.obj3DTresor = null;
    fct_Grille.arrObjGrille = [];
    fct_Grille.obj3DCiel = null;

    fct_Grille.arrObj3DFleches = [];

    // Math.floor(x) pour le x
    // Math.ceil(z) pour le z
    fct_Grille.getObjAtPosition = function(cameraPosX, cameraPosY, cameraPosZ) {
        //console.log(x + "x,\n" + Math.floor(x) + " floor x,\n" + z + " z,\n" + Math.ceil(z) + " floor z\n\n");

        //console.log(arrGrille[Math.ceil(z) + Math.floor(arrGrille.length / 2)][Math.floor(x) + Math.floor(arrGrille.length / 2)]);
        
        for (var objGrille of this.arrObjGrille) {
            if (objGrille.PosY == cameraPosY && objGrille.PosX == Math.floor(cameraPosX) && objGrille.PosZ == Math.ceil(cameraPosZ)) {
                //console.log(objGrille.strType);

                // save bcp d'espace dans la memoire et recherche plus rapidement
                return objGrille;
                //break;
            }
        }
    }

    fct_Grille.blnCollision = function(cameraPosX, cameraPosY, cameraPosZ, ...args) {
        for (var objGrille of this.arrObjGrille) {
            if (objGrille.PosY == cameraPosY && ((args.length == 1) ? objGrille.TEX == args[0] : (objGrille.TEX == args[0] || objGrille.TEX == args[1])) && 
                objGrille.visible == true && 
                objGrille.PosX == Math.floor(cameraPosX) && 
                objGrille.PosZ == Math.ceil(cameraPosZ)
                /*(cameraPosX >= objGrille.PosMinX && cameraPosX <= objGrille.PosMaxX) &&
                (cameraPosY >= objGrille.PosMinY && cameraPosY <= objGrille.PosMaxY) &&
                (cameraPosZ >= objGrille.PosMinZ && cameraPosZ <= objGrille.PosMaxZ)*/) {
                //console.log(objGrille.strType);

                // save bcp d'espace dans la memoire et recherche plus rapidement
                return true;
                //break;
            }
        }

        return false;
    }

    fct_Grille.rmObjAtPosition = function(cameraPosX, cameraPosY, cameraPosZ, ...args) {
        for (var objGrille of this.arrObjGrille) {
            if (objGrille.PosY == cameraPosY && ((args.length == 1) ? objGrille.TEX == args[0] : (objGrille.TEX == args[0] || objGrille.TEX == args[1])) &&
                objGrille.PosX == Math.floor(cameraPosX) && 
                objGrille.PosZ == Math.ceil(cameraPosZ)) {
                //this.arrObjGrille.splice(this.arrObjGrille.indexOf(objGrille), 1);
                objGrille.visible = false;

                return true;
            }
        }

        return false;
    }

    fct_Grille.listGrille = function() {
        console.log(this.arrObjGrille);
    }

    return fct_Grille;
}