function dessiner(objgl, objProgShaders, objScene3D) {
    // La vue
    objgl.viewport(0, 0, objgl.drawingBufferWidth, objgl.drawingBufferHeight);

    // Matrice de projection
    var matProjection = mat4.create();
    var fltRapportCanevas = objgl.drawingBufferWidth / objgl.drawingBufferHeight;
    mat4.perspective(45, fltRapportCanevas, 0.01, 100, matProjection);

    // Relier la matrice aux shaders
    objgl.uniformMatrix4fv(objProgShaders.matProjection, false, matProjection);

    for (var i = 0; i < objScene3D.tabObjets3D.length; i++) {
        var vertex = objScene3D.tabObjets3D[i].vertex;
        var couleurs = objScene3D.tabObjets3D[i].couleurs;
        var texels = objScene3D.tabObjets3D[i].texels;
        var maillage = objScene3D.tabObjets3D[i].maillage;
        var transformations = objScene3D.tabObjets3D[i].transformations;

        // Matrice du modèle             
        var matModeleVue = mat4.create();
        mat4.identity(matModeleVue);

        // Placer la caméra sur la scène
        mat4.lookAt(getPositionsCameraXYZ(objScene3D.camera),
            getCiblesCameraXYZ(objScene3D.camera),
            getOrientationsXYZ(objScene3D.camera),
            matModeleVue);

        // Appliquer les transformations sur le modèle 
        mat4.translate(matModeleVue, getPositionsXYZ(transformations));
        mat4.scale(matModeleVue, getEchellesXYZ(transformations));
        mat4.rotateX(matModeleVue, getAngleX(transformations) * Math.PI / 180);
        mat4.rotateY(matModeleVue, getAngleY(transformations) * Math.PI / 180);
        mat4.rotateZ(matModeleVue, getAngleZ(transformations) * Math.PI / 180);

        // Relier la matrice aux shaders
        objgl.uniformMatrix4fv(objProgShaders.matModeleVue, false, matModeleVue);

        if (maillage == null) {
            // Dessiner les sous-objets
            for (var j = 0; j < vertex.length; j++) {

                // Relier les vertex aux shaders
                objgl.bindBuffer(objgl.ARRAY_BUFFER, vertex[j]);
                objgl.vertexAttribPointer(objProgShaders.posVertex, 3, objgl.FLOAT, false, 0, 0);
                var intNbVertex = (objgl.getBufferParameter(objgl.ARRAY_BUFFER, objgl.BUFFER_SIZE) / 4) / 3;

                // Relier les couleurs aux shaders
                objgl.bindBuffer(objgl.ARRAY_BUFFER, couleurs[j]);
                objgl.vertexAttribPointer(objProgShaders.couleurVertex, 4, objgl.FLOAT, false, 0, 0);

                // Activer la texture
                objgl.activeTexture(objgl.TEXTURE0 + texels[j].intNoTexture);
                objgl.bindTexture(objgl.TEXTURE_2D, objScene3D.textures[texels[j].intNoTexture]);

                // Relier les texels aux shaders
                objgl.bindBuffer(objgl.ARRAY_BUFFER, texels[j]);
                objgl.vertexAttribPointer(objProgShaders.posTexel, 2, objgl.FLOAT, false, 0, 0);

                // Relier le no de texture et le taux de couleur aux shaders                 
                objgl.uniform1i(objProgShaders.noTexture, texels[j].intNoTexture);
                objgl.uniform1f(objProgShaders.pcCouleurTexel, texels[j].pcCouleurTexel);

                // Dessiner
                objgl.drawArrays(vertex[j].typeDessin, 0, intNbVertex);
            }
        }
        else { // Dessiner le maillage
            // Relier les vertex aux shaders
            objgl.bindBuffer(objgl.ARRAY_BUFFER, vertex);
            objgl.vertexAttribPointer(objProgShaders.posVertex, 3, objgl.FLOAT, false, 0, 0);

            // Relier les couleurs aux shaders
            objgl.bindBuffer(objgl.ARRAY_BUFFER, couleurs);
            objgl.vertexAttribPointer(objProgShaders.couleurVertex, 4, objgl.FLOAT, false, 0, 0)

            // Activer la texture
            objgl.activeTexture(objgl.TEXTURE0 + texels.intNoTexture);
            objgl.bindTexture(objgl.TEXTURE_2D, objScene3D.textures[texels.intNoTexture]);

            // Relier les texels aux shaders
            objgl.bindBuffer(objgl.ARRAY_BUFFER, texels);
            objgl.vertexAttribPointer(objProgShaders.posTexel, 2, objgl.FLOAT, false, 0, 0);

            // Relier le no de texture et le taux de couleur aux shaders                 
            objgl.uniform1i(objProgShaders.noTexture, texels.intNoTexture);
            objgl.uniform1f(objProgShaders.pcCouleurTexel, texels.pcCouleurTexel);

            // Sélectionner le maillage qu'on va utiliser pour les triangles et les droites
            objgl.bindBuffer(objgl.ELEMENT_ARRAY_BUFFER, maillage);

            // Dessiner les triangles
            objgl.drawElements(objgl.TRIANGLES, maillage.intNbTriangles * 3, objgl.UNSIGNED_SHORT, 0);
            // Dessiner les droites à la suite des triangles
            objgl.drawElements(objgl.LINES, maillage.intNbDroites * 2, objgl.UNSIGNED_SHORT, maillage.intNbTriangles * 2 * 3);
        }
    }
}

function effacerCanevas(objgl) {
    // Met la couleur d'effacement au noir et complétement opaque
    objgl.clearColor(0.0, 0.0, 0.0, 1.0);
    // Efface les couleurs et le buffer de profondeur.
    objgl.clear(objgl.COLOR_BUFFER_BIT | objgl.DEPTH_BUFFER_BIT);
}