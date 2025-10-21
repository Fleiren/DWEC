"use strict";
import {calcularMedia, resultadoEquipos} from './../biblioteca.js';

let equipoJuan = [89, 120, 103];
let equipoMiguel = [116, 94, 123];
let equipoMaria = [200,200,200];
let mediaEquipoJuan = calcularMedia(equipoJuan);
let mediaEquipoMiguel = calcularMedia(equipoMiguel);
console.log(resultadoEquipos(mediaEquipoJuan, mediaEquipoMiguel));
// terminar en casa 