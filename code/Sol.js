
function creerObj3DSol(objgl, intNoTexture, intDebutX, intDebutZ, fltLargeur, fltProfondeur) {
    var obj3DSol = new Object();
    //obj3DSol.fltProfondeur = 15;
    //obj3DSol.fltLargeur = 15;
    obj3DSol.fltProfondeur = fltProfondeur;
    obj3DSol.fltLargeur = fltLargeur;
    obj3DSol.fltHauteur = 0;

    obj3DSol.intDebutX = intDebutX;
    obj3DSol.intDebutZ = intDebutZ;
    
    obj3DSol.vertex = creerVertexSol(objgl, obj3DSol.intDebutX, obj3DSol.intDebutZ, obj3DSol.fltLargeur, obj3DSol.fltProfondeur);
    obj3DSol.couleurs = creerCouleursSol(objgl, [1, 1, 1, 1]);
	obj3DSol.texels = creerTexelsSol(objgl, obj3DSol.fltLargeur, obj3DSol.fltProfondeur, intNoTexture);
	obj3DSol.maillage = creerMaillageSol(objgl);
	obj3DSol.type = 1;
    obj3DSol.transformations = creerTransformations();
    return obj3DSol;
}

function creerVertexSol(objgl, intDebutX, intDebutZ, fltLargeurX, fltProfondeurZ) {
    var tabVertex = [
            /*
                1   2
                3   4
            */
             /*-fltLargeur / 2, 0.0, -fltProfondeur / 2,
             fltLargeur / 2, 0.0, -fltProfondeur / 2,
             -fltLargeur / 2, 0.0, fltProfondeur / 2,
             fltLargeur / 2, 0.0, fltProfondeur / 2*/

            intDebutX, 0, intDebutZ,
            intDebutX + fltLargeurX, 0, intDebutZ,
            intDebutX, 0, intDebutZ + fltProfondeurZ,
            intDebutX + fltLargeurX, 0, intDebutZ + fltProfondeurZ

            /*(intDebutX + (intDebutX + fltLargeurX)) / 2, 0, (intDebutZ + (intDebutZ + fltProfondeurZ)) / 2,
            intDebutX + fltLargeurX, 0, intDebutZ,
            intDebutX + fltLargeurX, 0, intDebutZ + fltProfondeurZ,
            intDebutX, 0, intDebutZ + fltProfondeurZ,
            intDebutX, 0, intDebutZ*/
        ];
    
    var objSol = objgl.createBuffer();
    objgl.bindBuffer(objgl.ARRAY_BUFFER, objSol);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabVertex), objgl.STATIC_DRAW);

    return objSol;
}

function creerCouleursSol(objgl, tabCouleur) {
    tabCouleurs = []; 
    for (var i = 0; i < 4; i++)
        tabCouleurs = tabCouleurs.concat(tabCouleur);

    var objCouleursSol = objgl.createBuffer();
    objgl.bindBuffer(objgl.ARRAY_BUFFER, objCouleursSol);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabCouleurs), objgl.STATIC_DRAW);
 
	return objCouleursSol;
}

function creerTexelsSol(objgl, fltLargeur, fltProfondeur, intNoTexture) {
     var tabTexels = [
             0.0, 0.0,
             fltLargeur, 0.0,
             0.0, fltProfondeur,
             fltLargeur, fltProfondeur

            /*0.5, 0.5, // 0: Centre devant
            1.0, 0.0, // 1: Coin haut droit
            1.0, 1.0, // 2: Coin bas droit
            0.0, 1.0, // 3: Coin bas gauche
            0.0, 0.0, // 4: Coin haut gauche*/
        ];
    
    var objTexelsSol = objgl.createBuffer();
    objgl.bindBuffer(objgl.ARRAY_BUFFER, objTexelsSol);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabTexels), objgl.STATIC_DRAW);

    objTexelsSol.intNoTexture = intNoTexture; objTexelsSol.pcCouleurTexel = 1.0;
    
    return objTexelsSol;
  }

function creerMaillageSol(objgl) {

       var tabMaillage =
            [ // Les 2 triangles du sol
             0, 1, 2,
             1, 2, 3,

                /*0, 1, 2,
                0, 2, 3,
                0, 3, 4,
                0, 4, 1,*/
            ];

	    var objMaillageSol = objgl.createBuffer();
        objgl.bindBuffer(objgl.ELEMENT_ARRAY_BUFFER, objMaillageSol);
        objgl.bufferData(objgl.ELEMENT_ARRAY_BUFFER, new Uint16Array(tabMaillage), objgl.STATIC_DRAW);

        // Le nombre de triangles
        objMaillageSol.intNbTriangles = 2;
        // Le nombre de droites
        objMaillageSol.intNbDroites = 0;
		
        return objMaillageSol;
    }
  
  
