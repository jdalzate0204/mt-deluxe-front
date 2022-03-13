import { AbstractControl } from '@angular/forms';

export class ValidacionesPropias {
    static verificacionSolicitud(control:AbstractControl){
        if(control.parent!= undefined){
          var ubicacion = control.get('destino1')?.value;
          var destino = control.get('ubicacion1')?.value;
    
          if(ubicacion==destino){
            return { verificacionSolicitud: true };
          } 
        }
        return null;
    }
}