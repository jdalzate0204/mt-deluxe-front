import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/_model/Cliente';
import { ClienteService } from 'src/app/_service/cliente.service';
import { ValidacionComponent } from '../../validacion/validacion.component';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  registroForm!: FormGroup;

  constructor(private clienteService: ClienteService,
    private _snackBar: MatSnackBar,
    private router: Router) {
    this.registroForm = this.createFormGroup();
  }

  createFormGroup() {
    return new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      apellido: new FormControl('', [Validators.required]),
      fecha: new FormControl('', [Validators.required]),
      correo: new FormControl('', [Validators.required, Validators.email]),
      usuario: new FormControl('', [Validators.required]),
      contrasena: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
  }

  errores() {
    let error: string[] = [];

    if(this.registroForm.controls.nombre.hasError('required')){
      error.push("Digite un nombre de usuario");
    }
    if(this.registroForm.controls.apellido.hasError('required')){
      error.push("Digite un apellido de usuario");
    }
    if(this.registroForm.controls.fecha.hasError('required')){
      error.push("Digite la fecha de nacimiento del usuario");
    }
    if(this.registroForm.controls.correo.hasError('required') || this.registroForm.controls.correo.hasError('email')){
      error.push("Digite un correo electrónico válido");
    }
    if(this.registroForm.controls.usuario.hasError('required')){
      error.push("Digite un usuario");
    }
    if(this.registroForm.controls.contrasena.hasError('required')){
      error.push("Digite una contraseña");
    }

    return error;
  }

  registrar(event: Event) {
    if(this.registroForm.valid) {
      const value = this.registroForm.value;
      let cliente  = new Cliente();

      cliente.Nombrecl = value.nombre;
      cliente.Apellido = value.apellido;
      cliente.FechaDeNacimiento = value.fecha;
      cliente.Email = value.correo;
      cliente.Usuario = value.usuario;
      cliente.Contrasena = value.contrasena;

      this.clienteService.postRegistro(cliente).subscribe( data => {
        this._snackBar.open('Usuario registrado exitosamente', 'Cerrar', {
          duration: 5000
        });
        this.router.navigate(["login"]);
      }, err => {
        if (err.status == 400){
          this._snackBar.open('Usuario existente, porfavor intente con otro', 'Cerrar', {
            duration: 5000
          });
        }
      });
    } else {
      let error = this.errores();

      this._snackBar.openFromComponent(ValidacionComponent, {
        data: error,
        duration: 5000
      });
    }
  }
}