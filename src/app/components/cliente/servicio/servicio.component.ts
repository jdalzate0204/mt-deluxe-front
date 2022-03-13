import { ValidacionesPropias } from 'src/app/_model/utilidades/ValidacionesPropias';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { environment } from './../../../../environments/environment';
//import { JwtHelperService } from '@auth0/angular-jwt';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Conductor } from 'src/app/_model/Conductor';
import { Destino } from 'src/app/_model/Destino';
import { Pago } from 'src/app/_model/Pago';
import { ClienteService } from 'src/app/_service/cliente.service';
import { Notificacion } from 'src/app/_model/Notificacion';

@Component({
  selector: 'app-servicio',
  templateUrl: './servicio.component.html',
  styleUrls: ['./servicio.component.css']
})

export class ServicioComponent implements OnInit {

  gridColumns = 3;
  formCalcular: FormGroup;
  formSolicitar: FormGroup;
  conductor!: Conductor[];
  dataSource = new MatTableDataSource<Conductor>();
  displayedColumns!: string[];
  selectDestino: Destino = { id: 0, lugarDestino: '', lugarUbicacion: '' };
  selectUbicacion: Destino = { id: 0, lugarDestino: '', lugarUbicacion: '' };
  selectPago: Pago = { id: 0, descripcion: '' };
  destino!: Destino[];
  ubicacion!: Destino[];
  pago!: Pago[];
  kilometros!: number;
  tarifa!: number;
  solicitud: Notificacion = new Notificacion();

  createFormGroupCalcular() {
    return new FormGroup({
      destino1: new FormControl('', [Validators.required]),
      ubicacion1: new FormControl('', [Validators.required, ValidacionesPropias.verificacionSolicitud]),
      descripcion: new FormControl
    });
  }

  createFormGroupSolicitar() {
    return new FormGroup({
      pag: new FormControl('', [Validators.required])
    });
  }

  /**
   * Deshabilita los formularios
   */
  disableSelect = new FormControl(false);

  /**
  * Permite indicar el número de columnas de la grilla según el caso
  */
  toggleGridColumns() {
    this.gridColumns = this.gridColumns === 3 ? 4 : 3;
  }

  constructor(private clienteService: ClienteService,
    private _snackBar: MatSnackBar,
    public route: ActivatedRoute,
    protected changeDetectorRef: ChangeDetectorRef) {
    this.formCalcular = this.createFormGroupCalcular();
    this.formSolicitar = this.createFormGroupSolicitar();
  }

  ngOnInit(): void {
    this.clienteService.getConductoresDisponibles().subscribe(data => {
      this.conductor = data;
      this.dataSource = new MatTableDataSource(this.conductor);
    });

    this.displayedColumns = ['nombre', 'apellido'];

    this.clienteService.getDestino().subscribe(data => {
      this.destino = data;
    });

    this.clienteService.getUbicacion().subscribe(data => {
      this.ubicacion = data;
    });

    this.clienteService.getPago().subscribe(data => {
      this.pago = data;
    });
  }

  calcular() {
    if (this.formCalcular.valid) {
      var obj = {
        Destino: this.formCalcular.controls["destino1"].value,
        Ubicacion: this.formCalcular.controls["ubicacion1"].value
      };

      this.clienteService.postCalcular(obj).subscribe(data => {
        this.solicitud = data;
        this.kilometros = data.kilometros;
        this.tarifa = data.pago;
      });
    }
  }

  solicitarServicio() {
    //const helper = new JwtHelperService();

    //var user = helper.decodeToken(sessionStorage.getItem(environment.TOKEN))["name"];
    if (this.formSolicitar.valid) {
      var obj = {
        idDestino: this.formCalcular.controls["destino1"].value,
        idUbicacion: this.formCalcular.controls["ubicacion1"].value,
        descripcionServicio: this.formCalcular.controls["descripcion"].value,
        kilometros: this.kilometros,
        tarifa: this.tarifa,
        pago: this.formSolicitar.controls["pag"].value,
        usuario: "james"
      };

      this.clienteService.postSolicitarServicio(obj).subscribe(data => {
        this._snackBar.open('Por favor espera a que uno de nuestros conductores acepte tu solictud, Recibirá un correo notificando su servicio', 'Cancel  ', {
          duration: 5000
        });
        this.onResetForm();
      });
    }
  }

  onResetForm() {
    this.formCalcular.reset();
    this.formSolicitar.reset();

    Object.keys(this.formCalcular.controls).forEach(key => {
      this.formCalcular.get(key)?.setErrors(null);
    });

    Object.keys(this.formSolicitar.controls).forEach(key => {
      this.formSolicitar.get(key)?.setErrors(null);
    });
  }


}

